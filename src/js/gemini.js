import { GoogleGenerativeAI } from "@google/generative-ai";
const API_KEY = "YOUR_GEMINI_API_KEY";
const genAI = new GoogleGenerativeAI(API_KEY);
window.geminiModel = genAI.getGenerativeModel({ model: "gemini-pro"});
