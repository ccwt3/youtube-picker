import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";
import "dotenv/config";

const apiKey = process.env.GEMINI;

if (apiKey == undefined) throw new Error("API is null or undefined");

const genai = new GoogleGenerativeAI(apiKey);
const jsonModel: GenerativeModel = genai.getGenerativeModel({
  model: "gemini-2.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
  },
});

export async function genaiWorker(prompt: string) {
  try {
    const result = await jsonModel.generateContent(prompt);
    const response = JSON.parse(result.response.text());

    return response;
  } catch (err) {
    throw new Error(`Error al parsear or sum: ${err}`);
  }
}
