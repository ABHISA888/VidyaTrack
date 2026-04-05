import React, { useState, useMemo } from 'react';
import { Send, BrainCircuit, Sparkles, AlertCircle, Quote, Loader2, Play } from 'lucide-react';
import { buildAIContext } from '../../data/dataUtils';

const AIAdvisorTab = ({ data }) => {
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [apiSource, setApiSource] = useState('');

  const systemContext = useMemo(() => buildAIContext(data), [data]);

  const quickQuestions = [
    "Why is Bihar performing so poorly?",
    "What are the best Gr3 reading interventions?",
    "Explain the subtraction-to-division cliff",
    "Which 3 states need priority action?",
    "Why will VidyaTrack work where others haven't?"
  ];

  const callGemini = async (q, apiKey) => {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `${systemContext}\n\nUser Question: ${q}` }] }]
      })
    });
    if (!response.ok) throw new Error('Gemini API Error');
    const result = await response.json();
    return result.candidates[0].content.parts[0].text;
  };

  const callGroq = async (q, apiKey) => {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: systemContext },
          { role: "user", content: q }
        ]
      })
    });
    if (!response.ok) throw new Error('Groq API Error');
    const result = await response.json();
    return result.choices[0].message.content;
  };

  const handleAsk = async (q = query) => {
    if (!q) return;
    setLoading(true);
    setAnswer('');
    setError('');
    setApiSource('');
    const currentQuery = q;
    setQuery(currentQuery);

    try {
      const geminiKey = import.meta.env.VITE_GEMINI_KEY;
      const groqKey = import.meta.env.VITE_GROQ_KEY;

      if (!geminiKey && !groqKey) {
        throw new Error('Please provide at least VITE_GEMINI_KEY or VITE_GROQ_KEY in your .env file');
      }

      // Try Gemini First
      if (geminiKey && geminiKey !== 'your_gemini_key_here') {
        try {
          const res = await callGemini(currentQuery, geminiKey);
          setAnswer(res);
          setApiSource('Gemini 1.5 Flash');
          setLoading(false);
          return;
        } catch (err) {
          console.warn('Gemini failed, falling back to Groq...', err);
        }
      }

      // Fallback to Groq
      if (groqKey && groqKey !== 'your_groq_key_here') {
        const res = await callGroq(currentQuery, groqKey);
        setAnswer(res);
        setApiSource('Groq (Llama 3.1)');
      } else {
        throw new Error('Gemini failed and no Groq key provided.');
      }

    } catch (err) {
      setError(err.message || 'Failed to connect to AI Advisor.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10 animate-fade-in p-8">
      <div className="bg-navy rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden border-b-8 border-saffron">
        <div className="absolute top-0 right-0 p-20 bg-saffron/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-teal p-3 rounded-2xl shadow-xl animate-pulse">
              <BrainCircuit size={32} className="text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-syne font-extrabold uppercase tracking-tighter text-blue-50">Intelligence Advisor</h2>
              <p className="text-xs font-bold text-blue-300 uppercase tracking-widest mt-1">Multi-Model LLM Integration (Gemini + Groq)</p>
            </div>
          </div>

          <div className="bg-white/10 p-6 rounded-2xl border border-white/10 backdrop-blur-md mb-8">
            <div className="flex items-center gap-4">
               <input 
                 type="text" 
                 value={query}
                 onChange={(e) => setQuery(e.target.value)}
                 onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
                 placeholder="Ask about state proficiency, trends, or intervention strategy..." 
                 className="flex-1 bg-transparent text-lg font-medium text-white placeholder-blue-300/50 focus:outline-none border-b-2 border-white/20 focus:border-saffron pb-2 transition-colors"
               />
               <button 
                 onClick={() => handleAsk()}
                 disabled={loading}
                 className="bg-teal text-white px-8 py-4 rounded-xl font-bold font-syne text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-teal/90 hover:translate-y-[-2px] transition-all shadow-lg active:translate-y-0 disabled:opacity-50"
               >
                 {loading ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />} 
                 {loading ? 'Consulting Experts...' : 'Generate Insight'}
               </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            {quickQuestions.map((q, idx) => (
              <button 
                key={idx} 
                onClick={() => handleAsk(q)}
                className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-[10px] font-bold text-blue-100 hover:bg-white hover:text-navy transition-all uppercase tracking-widest shadow-sm active:scale-95"
              >
                {q}
              </button>
            ))}
          </div>

          {loading && (
             <div className="bg-white/5 p-8 rounded-2xl border border-dashed border-white/20 animate-pulse text-center">
                <p className="text-sm font-bold text-blue-300 uppercase tracking-widest">Processing Intelligence Report via {apiSource || 'Models'}...</p>
             </div>
          )}

          {error && (
            <div className="bg-red-500/20 p-6 rounded-2xl border border-red-500/50 flex items-start gap-4">
              <AlertCircle className="text-red-400 mt-1" size={20} />
              <div>
                <p className="text-sm font-bold text-red-200 uppercase tracking-widest mb-1">Intelligence Error</p>
                <p className="text-xs text-red-100 font-medium">{error}</p>
              </div>
            </div>
          )}

          {answer && (
            <div className="bg-white p-10 rounded-2xl text-navy shadow-2xl animate-fade-in border-l-8 border-teal">
              <div className="flex justify-between items-start mb-6">
                <Quote size={32} className="text-teal rotate-180 opacity-20" />
                <Sparkles size={24} className="text-saffron" />
              </div>
              <p className="text-lg font-medium leading-relaxed font-ibm mb-8 whitespace-pre-wrap">
                {answer}
              </p>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-center justify-between">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Intelligence Source: ASER Dataset + {apiSource}
                </p>
                <button className="text-[10px] font-bold text-teal uppercase tracking-widest hover:underline">Download Insight PDF</button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 opacity-70">
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm transition-all">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-blue-50 p-3 rounded-xl border border-blue-100 text-blue-600">
               <BrainCircuit size={24} />
            </div>
            <h4 className="font-syne font-bold uppercase tracking-tight text-lg text-navy tracking-widest">Predictive Stability</h4>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed font-ibm">
             AI uses current proficiency bands to predict potential stagnation points in the next 24-month ASER cycle.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm transition-all">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-teal/5 p-3 rounded-xl border border-teal/10 text-teal">
               <Sparkles size={24} />
            </div>
            <h4 className="font-syne font-bold uppercase tracking-tight text-lg text-navy tracking-widest">Evidence Correlation</h4>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed font-ibm">
             Correlates learning outcomes with known administrative intervention data to suggest optimized resource allocation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIAdvisorTab;
