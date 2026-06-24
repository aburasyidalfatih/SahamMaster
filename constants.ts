import { Difficulty } from './types';

export const APP_NAME = "SahamMaster ID";

export const VISUAL_PLACEHOLDER = (text: string) => `\n\n![Visual: ${text}](https://placehold.co/800x400/f8fafc/334155?text=${encodeURIComponent(text.substring(0, 60))}...)\n\n`;





export const CATEGORY_COLORS = {
  Mindset: "bg-blue-100 text-blue-800",
  Technical: "bg-purple-100 text-purple-800",
  Fundamental: "bg-green-100 text-green-800",
  Bandarmologi: "bg-orange-100 text-orange-800",
  "Risk Management": "bg-red-100 text-red-800",
};