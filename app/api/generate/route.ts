import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const API_KEY = process.env.GEMINI_API_KEY || 
                process.env.NEXT_PUBLIC_GEMINI_API_KEY || 
                "";

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function POST(req: Request) {
  try {
    const { topic, vibe } = await req.json();
    
    if (!API_KEY) {
      return NextResponse.json({ 
        error: "The server code cannot find your API key string." 
      }, { status: 500 });
    }

    const systemPrompt = `
      You are an elite multi-million view short-form video copywriter. 
      Write a highly engaging, fully fleshed-out video script about: "${topic}".
      The overall tone and energy of the video must be: "${vibe}".

      CRITICAL SCRIPT RULES:
      - Do NOT summarize or use lazy high-level bullet points. 
      - Elaborate deeply on the topic with specific, real-world examples, actionable tactics, and detailed breakdowns that add massive value to the viewer.
      - Write out exactly what the speaker should say word-for-word, using a natural, punchy, conversational flow.
      - Include visual staging/b-roll suggestions in parentheses to guide the creator.

      Strictly format your response exactly like this template layout:

      🔥 [THE SCROLL-STOPPING HOOK: 0-3 SECONDS]
      (Write an absolute pattern-interrupting opening line that creates extreme curiosity or handles a massive frustration. Explicitly state the on-screen visual action.)

      💡 [THE VALUE BREAKDOWN & STORY: 3-25 SECONDS]
      (Break down the core concepts in deep detail. For every point made, explain the "why" and "how" with comprehensive, value-rich elaboration. Do not rush the details; write comprehensive, engaging text lines for the speaker.)

      🎯 [THE HIGH-CONVERSION CTA: 25-30 SECONDS]
      (Craft a seamless, psychological transition into a powerful Call To Action that tells the viewer exactly why they need to follow the account or click the link.)
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
