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
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, vibe }),
      });

      const data = await response.json();

      if (data.error) {
        setScript(`AI Engine Error: ${data.error}`);
      } else if (data.script) {
        setScript(data.script);
      } else {
        setScript('Error: Received empty text from the AI system.');
      }
    } catch (err: any) {
      setScript(`Network Error: ${err.message || 'Connection Refused'}`);
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
