'use client';

import { useState } from 'react';

export default function Home() {
  const [topic, setTopic] = useState('');
  const [vibe, setVibe] = useState('energetic');
  const [script, setScript] = useState('');
  const [loading, setLoading] = useState(false);

  const generateScript = async () => {
    if (!topic) return alert('Please enter a video topic!');
    setLoading(true);
    setScript('');
    
    try {
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

      // Universal endpoint that allows browser fetch calls when structured correctly
      const targetUrl = `https://googleapis.com`;

      const response = await fetch(targetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: systemPrompt }]
          }]
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        setScript(data.candidates[0].content.parts[0].text);
      } else {
        setScript('Error: Received empty text from the AI system.');
      }
    } catch (err: any) {
      setScript(`AI Generation Error: ${err.message || 'Connection Failed'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: '4rem 1rem', maxWidth: '42rem', margin: '0 auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{ inlineSize: 'max-content', margin: '0 auto 1rem', padding: '0.25rem 0.75rem', borderRadius: '9999px', border: '1px solid #27272a', backgroundColor: '#18181b', fontSize: '0.75rem', color: '#a1a1aa' }}>
          ✨ Powered by Gemini 2.5 Flash
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-0.025em', color: '#ffffff', marginBottom: '0.75rem' }}>
          Short Video Essay Writer
        </h1>
        <p style={{ fontSize: '0.875rem', color: '#a1a1aa', maxWidth: '28rem', margin: '0 auto' }}>
          Generate high-retention, fully fleshed-out short-form video scripts instantly.
        </p>
      </header>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1.25rem', backgroundColor: '#141416', border: '1px solid #27272a', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#a1a1aa', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            What is your video topic?
          </label>
          <input 
            style={{ width: '100%' }}
            placeholder="e.g., 3 subtle mistakes beginner coders make that waste years" 
            value={topic} 
            onChange={(e) => setTopic(e.target.value)} 
          />
        </div>
        
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#a1a1aa', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Select Video Tone
          </label>
          <select 
            style={{ width: '100%' }}
            value={vibe} 
            onChange={(e) => setVibe(e.target.value)}
          >
            <option value="energetic">🔥 Energetic / High Velocity</option>
            <option value="educational">💡 Calm / Deep Value Insight</option>
            <option value="dramatic">🎬 Cinematic Storytelling</option>
          </select>
        </div>

        <button 
          onClick={generateScript} 
          disabled={loading} 
          style={{ width: '100%' }}
        >
          {loading ? 'Engine processing text...' : 'Compile Viral Script'}
        </button>
      </div>

      {script && (
        <div style={{ width: '100%', marginTop: '2rem', backgroundColor: '#0c0c0e', border: '1px solid #27272a', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
          <div style={{ backgroundColor: '#141416', borderBottom: '1px solid #27272a', padding: '0.75rem 1.25rem' }}>
            <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#a1a1aa' }}>VIRAL_SCRIPT_V1.MD</span>
          </div>
          <div style={{ padding: '1.5rem', whiteSpace: 'pre-line', fontSize: '1rem', color: '#e4e4e7', lineHeight: '1.75' }}>
            <p style={{ margin: '0' }}>{script}</p>
          </div>
        </div>
      )}
    </main>
  );
}
