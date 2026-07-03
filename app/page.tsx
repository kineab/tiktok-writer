'use client';

import { useState, useRef } from 'react';

export default function Home() {
  // --- CORE WORKING LOGIC (UNTOUCHED) ---
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
        setScript('Error: ' + data.error);
      } else {
        setScript(data.script);
      }
    } catch (err) {
      setScript('Failed to connect to the AI engine.');
    } finally {
      setLoading(false);
    }
  };

  // --- NEW STABLE SCROLL ANCHORS ---
  const workbenchRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const handleScroll = (target: React.RefObject<HTMLDivElement | null>) => {
    target.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-[#070709] text-[#fafafa] flex flex-col items-center justify-start px-4 antialiased font-sans scroll-smooth">
      {/* Premium Ambient Background Light glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-purple-500/10 via-transparent to-transparent blur-3xl pointer-events-none" />

      {/* --- PREMIUM FIXED HEADER --- */}
      <nav className="w-full max-w-4xl flex items-center justify-between py-5 border-b border-zinc-900 z-50 sticky top-0 bg-[#070709]/80 backdrop-blur-md">
        <div className="flex items-center gap-2 font-black tracking-tight text-lg cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className="text-purple-500">◈</span> HookFlow
        </div>
        <div className="flex items-center gap-6 text-xs font-semibold text-zinc-400">
          <button onClick={() => handleScroll(infoRef)} className="hover:text-white transition-colors duration-200">How It Works</button>
          <button onClick={() => handleScroll(workbenchRef)} className="bg-zinc-900 border border-zinc-800 text-white px-3.5 py-2 rounded-xl hover:bg-zinc-800 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200">Launch Workbench</button>
        </div>
      </nav>

      <div className="w-full max-w-2xl z-10">
        
        {/* --- SECTION 1: VISUAL LANDING HERO PAGE --- */}
        <section className="py-24 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-900/30 bg-purple-950/10 text-[11px] text-purple-300 mb-6 tracking-wide">
            ✨ AI-Powered Short Form Script Engine
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-b from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent sm:text-5xl leading-[1.2]">
            Stop Staring at a Blank Script Window
          </h1>
          <p className="mt-4 text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
            Generate high-retention, psychology-backed short-form scripts explicitly structured for TikTok and Reels viral viewer algorithms.
          </p>
          <div className="mt-8 flex gap-3">
            <button onClick={() => handleScroll(workbenchRef)} className="bg-white text-black text-xs font-bold px-5 py-3 rounded-xl hover:bg-zinc-200 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-md">
              Start Generating Free
            </button>
            <button onClick={() => handleScroll(infoRef)} className="border border-zinc-800 bg-zinc-900/30 text-zinc-300 text-xs font-bold px-5 py-3 rounded-xl hover:bg-zinc-800 active:scale-[0.98] transition-all duration-200">
              Read Parameters
            </button>
          </div>
        </section>

        {/* --- SECTION 2: BENTO VALUE SECTION --- */}
        <section ref={infoRef} className="w-full py-12 border-t border-zinc-900/60 scroll-mt-24">
          <h2 className="text-lg font-bold tracking-tight text-center text-zinc-300 mb-8">Engineered For Dynamic Watch-Time</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#0b0b0d] border border-zinc-900 p-5 rounded-2xl group hover:border-purple-500/20 transition-all duration-300">
              <div className="w-7 h-7 bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs flex items-center justify-center rounded-lg mb-3 font-bold">01</div>
              <h3 className="font-bold text-sm text-white mb-1">Scroll-Stopping Hooks</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">Forces highly interactive opening parameters to break viewer scrolling habits in under 3 seconds.</p>
            </div>
            <div className="bg-[#0b0b0d] border border-zinc-900 p-5 rounded-2xl group hover:border-purple-500/20 transition-all duration-300">
              <div className="w-7 h-7 bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs flex items-center justify-center rounded-lg mb-3 font-bold">02</div>
              <h3 className="font-bold text-sm text-white mb-1">Elaborated Value Logic</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">Skips boring bullet summaries. Delivers deep, conversational, step-by-step storytelling frameworks.</p>
            </div>
          </div>
        </section>

        {/* --- SECTION 3: CORE APP LOGIC ENGINE --- */}
        <section ref={workbenchRef} className="w-full py-16 border-t border-zinc-900/60 scroll-mt-24">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold tracking-tight text-white">Studio Workbench</h2>
            <p className="text-xs text-zinc-500 mt-1">Configure your content parameters below.</p>
          </div>

          <div className="space-y-5 bg-[#121214]/60 border border-zinc-800/60 p-6 rounded-2xl shadow-2xl backdrop-blur-md">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                What is your video topic?
              </label>
              <input 
                className="w-full bg-[#161619] border border-zinc-800 text-sm text-white placeholder-zinc-500 p-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500/40 transition-all shadow-inner" 
                placeholder="e.g., 3 subtle mistakes beginner coders make that waste years" 
                value={topic} 
                onChange={(e) => setTopic(e.target.value)} 
              />
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Select Video Tone
              </label>
              <select 
                className="w-full bg-[#161619] border border-zinc-800 text-sm text-white p-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500/40 transition-all cursor-pointer" 
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
              className="w-full bg-white text-black p-3.5 rounded-xl text-xs font-bold tracking-wide hover:bg-zinc-200 active:scale-[0.99] disabled:opacity-40 disabled:pointer-events-none transition-all shadow-md duration-200"
            >
              {loading ? 'Engine processing text models...' : 'Compile Viral Script'}
            </button>
          </div>

          {/* OUTPUT BOX BLOCK */}
          {script && (
            <div className="mt-8 bg-[#0a0a0c] border border-zinc-800/60 rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
              <div className="bg-[#121214]/80 border-b border-zinc-800/60 px-5 py-3 flex items-center justify-between">
                <span className="text-xs font-mono tracking-wider text-purple-400">VIRAL_SCRIPT_V1.MD</span>
              </div>
              <div className="p-6 whitespace-pre-line text-sm font-medium tracking-wide leading-relaxed text-zinc-200 selection:bg-zinc-800">
                <p className="font-sans antialiased">{script}</p>
              </div>
            </div>
          )}
        </section>

      </div>
    </main>
  );
}
