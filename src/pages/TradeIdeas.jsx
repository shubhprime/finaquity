import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { TrendingUp, Lock, ShieldCheck, Sparkles, Activity, Key } from 'lucide-react';

const TradeIdeas = () => {
  const location = useLocation();
  const path = location.pathname;
  const [pageTitle, setPageTitle] = useState('Pro Trade Ideas');
  
  useEffect(() => {
    // Map URL path to Title
    const formatted = path
      .replace('/', '')
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    setPageTitle(formatted || 'Trade Ideas');
  }, [path]);

  // Mock trade signals
  const mockSignals = [
    { symbol: "TATA MOTORS", type: "Buy", entry: "₹970 - ₹980", target: "₹1080", stopLoss: "₹940", status: "Active", date: "Today" },
    { symbol: "RELIANCE", type: "Buy", entry: "₹2930 - ₹2945", target: "₹3200", stopLoss: "₹2850", status: "Active", date: "Yesterday" },
    { symbol: "INFOSYS", type: "Buy", entry: "₹1415 - ₹1425", target: "₹1550", stopLoss: "₹1370", status: "Target Met", date: "3 Days ago" },
    { symbol: "COAL INDIA", type: "Buy", entry: "₹430 - ₹438", target: "₹490", stopLoss: "₹410", status: "Target Met", date: "1 Week ago" }
  ];

  return (
    <div className="fq-page min-h-screen pt-28 pb-16 px-4">
      {/* Subtle grid background */}
      <div className="absolute inset-0 fq-grid-bg opacity-[0.03] pointer-events-none z-0" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Banner Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <TrendingUp size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-white">{pageTitle}</h1>
              <p className="text-xs text-gray-400 mt-1">SEBI-certified trading parameters and targets.</p>
            </div>
          </div>
          <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider self-start md:self-center">
            🔐 Club Member Area
          </span>
        </div>

        {/* Lock Overlay Content */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-zinc-950/80">
          {/* Blurred Background Table Preview */}
          <div className="p-6 filter blur-sm pointer-events-none opacity-40">
            <h3 className="font-bold text-white mb-4">Signal Recommendations</h3>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                  <th className="py-2.5 px-3">Stock</th>
                  <th className="py-2.5 px-3">Call</th>
                  <th className="py-2.5 px-3 text-right">Entry</th>
                  <th className="py-2.5 px-3 text-right">Target</th>
                  <th className="py-2.5 px-3 text-right">Stop Loss</th>
                </tr>
              </thead>
              <tbody>
                {mockSignals.map((sig, i) => (
                  <tr key={i} className="border-b border-white/5 text-xs font-semibold text-gray-300">
                    <td className="py-3 px-3">{sig.symbol}</td>
                    <td className="py-3 px-3">{sig.type}</td>
                    <td className="py-3 px-3 text-right">{sig.entry}</td>
                    <td className="py-3 px-3 text-right">{sig.target}</td>
                    <td className="py-3 px-3 text-right">{sig.stopLoss}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Premium Lock Card */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-black/60 backdrop-blur-md">
            <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6 shadow-lg shadow-amber-500/5 animate-pulse">
              <Lock size={24} />
            </div>
            
            <h2 className="text-2xl font-extrabold text-white mb-2">
              Unlock Premium <span className="fq-gradient-text">{pageTitle}</span>
            </h2>
            <p className="text-xs text-gray-400 max-w-md mb-8 leading-relaxed">
              This module requires an active Finaquity Club membership. Subscribe today to receive high-win-rate signals directly on WhatsApp.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/club"
                className="fq-btn-primary px-8 py-3 text-sm font-bold shadow-xl shadow-emerald-500/20 hover:scale-105 transition-transform"
              >
                Join Finaquity Club
              </Link>
              <Link
                to="/LoginSignup?mode=login"
                className="fq-btn-ghost px-8 py-3 text-sm border border-white/10 hover:border-white/20 transition-all"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeIdeas;
