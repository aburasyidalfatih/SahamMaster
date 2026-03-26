import { GoogleGenAI } from "@google/genai";
import { Lesson, ChatMessage } from '../types';
import { supabase } from './supabaseClient';

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
Anda adalah seorang Mentor Saham Profesional Pasar Modal Indonesia (IDX/BEI) dengan pengalaman 15 tahun.
Nama Anda adalah "Coach SahamPro".
Gaya bahasa Anda: Profesional, memotivasi, mudah dimengerti pemula, namun tajam dan berdasarkan data.
Konteks: Anda sedang mengajar user dalam aplikasi "SahamMaster 30 Hari".

Aturan Penting:
1. Selalu gunakan istilah pasar modal Indonesia (Lot, Emiten, IHSG, ARA/ARB, Bandarmologi, Broker Summary).
2. Jika membahas saham, berikan contoh saham Bluechip (BBCA, BBRI, TLKM, ASII) atau saham Second Liner yang populer, namun sertakan disclaimer "Bukan ajakan membeli/menjual".
3. Jelaskan konsep rumit dengan analogi sederhana sehari-hari.
4. Tekankan Manajemen Risiko (Cut Loss, Money Management).
`;

export const getLessonContent = (lesson: Lesson): string => {
  return lesson.content || "Materi sedang dalam pengembangan. Silakan cek kembali nanti.";
};

// Helper untuk konversi Base64 ke Blob
const base64ToBlob = (base64: string, mimeType: string) => {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
};

// Fungsi Generate Image dengan Supabase Storage
export const generateLessonImage = async (visualDescription: string, lessonDay: number): Promise<string | null> => {
  // 1. Tentukan nama file yang konsisten berdasarkan Hari
  const fileName = `lesson-visual-day-${lessonDay}.png`;
  const bucketName = 'images';

  try {
    // 2. Cek apakah gambar sudah ada di Supabase?
    if (supabase) {
      const { data: existingFiles, error: listError } = await supabase
        .storage
        .from(bucketName)
        .list('', { search: fileName });

      // Jika bucket tidak ditemukan, listError akan muncul. Kita abaikan dulu di sini.
      if (!listError && existingFiles && existingFiles.length > 0) {
        const { data } = supabase.storage.from(bucketName).getPublicUrl(fileName);
        console.log(`[Cache Hit] Mengambil gambar hari ${lessonDay} dari Supabase.`);
        return data.publicUrl;
      }
    }
  } catch (error) {
    console.warn("Gagal cek Supabase (Cache Miss), mencoba generate baru...");
  }

  // 3. Jika belum ada (atau Supabase error), Generate Baru pakai Gemini
  if (!apiKey) return null;

  try {
    console.log(`[Generating] Membuat gambar baru untuk hari ${lessonDay}...`);
    const prompt = `Create a high-quality, realistic educational illustration regarding stock trading.
    Subject: ${visualDescription}.
    Style: Professional, clean, realistic digital art or high-end infographic style. 
    Ensure it is visually appealing and easy to understand for beginners.
    No heavy text overlays, focus on the visual concept.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }]
      },
    });

    const candidates = response.candidates;
    if (candidates && candidates[0] && candidates[0].content && candidates[0].content.parts) {
        for (const part of candidates[0].content.parts) {
            if (part.inlineData && part.inlineData.data) {
                const base64Data = part.inlineData.data;
                const mimeType = part.inlineData.mimeType || 'image/png';
                
                // 4. Upload ke Supabase (Jika dikonfigurasi)
                if (supabase) {
                  try {
                    const blob = base64ToBlob(base64Data, mimeType);
                    
                    let { error: uploadError } = await supabase.storage
                      .from(bucketName)
                      .upload(fileName, blob, {
                        contentType: mimeType,
                        upsert: true
                      });

                    // AUTO-FIX: Jika error "Bucket not found", coba buat bucket secara otomatis
                    if (uploadError && (uploadError.message.includes("Bucket not found") || (uploadError as any).error === "Bucket not found")) {
                        console.log(`Bucket '${bucketName}' tidak ditemukan. Mencoba membuat bucket baru...`);
                        const { error: createError } = await supabase.storage.createBucket(bucketName, {
                            public: true,
                            allowedMimeTypes: ['image/png', 'image/jpeg', 'image/webp'],
                            fileSizeLimit: 5242880 // 5MB limit
                        });
                        
                        if (!createError) {
                            // Retry upload setelah bucket dibuat
                            const retry = await supabase.storage
                                .from(bucketName)
                                .upload(fileName, blob, {
                                    contentType: mimeType,
                                    upsert: true
                                });
                            uploadError = retry.error;
                        } else {
                            console.warn("Gagal membuat bucket otomatis (Mungkin butuh izin admin). Gunakan fallback Base64.");
                        }
                    }

                    if (!uploadError) {
                      const { data } = supabase.storage.from(bucketName).getPublicUrl(fileName);
                      return data.publicUrl;
                    } else {
                      // Log warning dengan detail error
                      if (uploadError.message.includes("row-level security")) {
                         console.warn("⚠️ RLS Policy Error: Pastikan Anda mencentang SELECT, INSERT, UPDATE saat membuat Policy di Supabase.");
                      }
                      console.warn("Upload ke Supabase gagal, menggunakan gambar langsung (Base64).", uploadError.message);
                    }
                  } catch (upErr) {
                    console.error("Exception saat upload ke Supabase:", upErr);
                  }
                }

                // Fallback: Jika gagal upload/tidak ada supabase, return base64 langsung
                return `data:${mimeType};base64,${base64Data}`;
            }
        }
    }
    return null;
  } catch (error) {
    console.error("Image generation error:", error);
    return null;
  }
};

export const sendChatMessage = async (history: ChatMessage[], newMessage: string): Promise<string> => {
  if (!apiKey) return "API Key not configured. Please check your settings.";

  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }))
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text || "Maaf, saya tidak dapat menjawab saat ini.";
  } catch (error) {
    console.error("Chat error:", error);
    return "Maaf, terjadi gangguan pada sistem AI Mentor. Pastikan koneksi internet lancar.";
  }
};

// Fungsi untuk menjawab pertanyaan spesifik tentang materi (Diskusi)
export const askMentorAboutLesson = async (lessonTitle: string, userQuestion: string): Promise<string> => {
    if (!apiKey) return "Maaf, API Key belum dikonfigurasi.";

    try {
        const prompt = `
        Konteks: User sedang membaca materi tentang "${lessonTitle}".
        Pertanyaan User: "${userQuestion}".
        
        Tugas Anda: Jawab pertanyaan user tersebut dengan singkat, padat, dan relevan dengan topik materi.
        Maksimal 3-4 kalimat. Fokus membantu user memahami materi tersebut. Jangan bertele-tele.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: { parts: [{ text: prompt }] },
            config: {
                systemInstruction: SYSTEM_INSTRUCTION
            }
        });

        return response.text || "Maaf, saya sedang tidak bisa menjawab pertanyaan ini.";
    } catch (error) {
        console.error("Discussion AI error:", error);
        return "Terjadi kesalahan saat menghubungi Mentor AI.";
    }
};