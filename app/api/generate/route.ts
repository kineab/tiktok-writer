import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { topic, vibe } = await req.json();

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

    // Direct network call to Google AI Studio using your verified key
    const targetUrl = `https://googleapis.com`;

    const googleResponse = await fetch(targetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: systemPrompt }] }]
      }),
    });

    const data = await googleResponse.json();

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 400 });
    }

    // Safely reads down through Google's response array layers natively
    let scriptText = "Empty response from AI.";
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
      scriptText = data.candidates[0].content.parts[0].text || "Empty text payload.";
    }

    return NextResponse.json({ script: scriptText });

  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Internal Server Failure" }, { status: 500 });
  }
}
