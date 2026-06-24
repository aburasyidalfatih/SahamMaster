import { GoogleGenAI } from "@google/genai";
import { Lesson, ChatMessage } from '../types';

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

// Fungsi Generate Image dengan API Gemini
export const generateLessonImage = async (visualDescription: string, lessonDay: number): Promise<string | null> => {
  if (!apiKey) return null;

  const filename = `lesson-day-${lessonDay}.png`;
  const imageUrl = `/static/images/${filename}`;

  try {
    // 1. Cek apakah gambar sudah ada di server backend
    const checkRes = await fetch(imageUrl, { method: 'HEAD' });
    const contentType = checkRes.headers.get('content-type');
    if (checkRes.ok && contentType && contentType.startsWith('image/')) {
       console.log(`[Cache] Gambar hari ${lessonDay} sudah ada di server.`);
       return imageUrl;
    }
  } catch (e) {
    console.log("Pengecekan cache gagal, melanjutkan ke proses generate...");
  }

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
                const dataUrl = `data:${mimeType};base64,${base64Data}`;
                
                // 2. Simpan gambar yang baru di-generate ke server
                try {
                    await fetch('/api/images/upload', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            filename: filename,
                            image: dataUrl
                        })
                    });
                    console.log(`[Success] Gambar hari ${lessonDay} berhasil disimpan ke server.`);
                } catch (err) {
                    console.error("Gagal menyimpan gambar ke server:", err);
                }

                return dataUrl;
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