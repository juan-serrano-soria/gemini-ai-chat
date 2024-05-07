import { GoogleGenerativeAI } from "@google/generative-ai";
const API_KEY = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
window.geminiModel = genAI.getGenerativeModel({ model: "gemini-pro"});
