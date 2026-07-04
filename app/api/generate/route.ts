import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

// Pulls cleanly from Netlify environment settings
const API_KEY = process.env.GEMINI_API_KEY || "";
const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function POST(req: Request) {
  try {
    const { topic, vibe } = await req.json();
    
    if (!API_KEY) {
      return NextResponse.json({ 
        error: "The server code cannot find your API key string. Please verify your Netlify variable panel." 
      }, { status: 500 });
    }

    const systemPrompt = `
      You are an expert short-form video copywriter specializing in viral TikToks, YouTube Shorts, and Instagram Reels.
      Write a highly engaging video script about: "${topic}".
      The overall tone of the video must be: "${vibe}".

      Strictly format your response exactly like this template layout:
      [0-3 SECONDS: THE SCROLL-STOPPING HOOK]
      (Insert dramatic or high-energy opening line here)

      [3-20 SECONDS: THE BODY POINTS]
      (Break down the core value into 3 quick, punchy, sentence-long beats)

      [20-30 SECONDS: THE CTA]
      (Give a quick call to action, like "Follow for daily coding hacks")
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: systemPrompt,
    });

    return NextResponse.json({ script: response.text });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "API Connection Failed" }, { status: 500 });
  }
}
