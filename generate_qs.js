import { GoogleGenAI } from "@google/genai";
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

async function run() {
  console.log("Generating 80 questions...");
  const prompt = `Generate exactly 80 unique multiple choice questions about stock trading in Indonesia (IDX). 
Format strictly as a JSON array of objects with this interface:
{
  "question": "string",
  "options": ["string", "string", "string", "string"],
  "correctAnswer": number (0-3),
  "category": "Mindset" | "Basic" | "Fundamental" | "Technical" | "Bandarmologi" | "Risk Management"
}
Only output the JSON array, nothing else. No markdown block. Ensure exactly 80 objects in the array.`;
  
  try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            temperature: 0.7,
        }
      });
      let text = response.text;
      if(text.startsWith('```json')){
          text = text.replace(/^```json\n/, '').replace(/\n```$/, '');
      } else if (text.startsWith('```')) {
          text = text.replace(/^```\n/, '').replace(/\n```$/, '');
      }
      fs.writeFileSync('generated_qs.json', text);
      console.log("Done");
  } catch (e) {
      console.error(e);
  }
}
run();
