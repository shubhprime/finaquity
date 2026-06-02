import React, { useState } from 'react';
import { Cpu, CheckCircle2, Shield, Zap, Sparkles, Key } from 'lucide-react';

const AlgoTrade = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [broker, setBroker] = useState('zerodha');

  const brokers = [
    { id: 'zerodha', name: 'Kite Zerodha', logo: 'K' },
    { id: 'angelone', name: 'Angel One', logo: 'A' },
    { id: 'groww', name: 'Groww', logo: 'G' },
    { id: 'fyers', name: 'Fyers Securities', logo: 'F' }
  ];

  return (
    <div className="fq-page min-h-screen pt-28 pb-16 px-4">
      {/* Subtle grid background */}
      <div className="absolute inset-0 fq-grid-bg opacity-[0.03] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Banner header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-4">
            <Cpu size={12} />
            Automated Execution
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-3">
            Finaquity <span className="fq-gradient-text">Algo Trade</span>
          </h1>
          <p className="text-sm text-gray-400 leading-relaxed">
            Execute professional trade suggestions instantly in your Demat account. Zero latency, zero manual errors, and zero emotional bias.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-start">
          {/* Left Column: Connection & Setup */}
          <div className="fq-glass p-6 border border-white/10 bg-zinc-950/60">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Key size={18} className="text-emerald-400" />
              Demat / Broker Integration
            </h3>

            {/* Broker selection grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {brokers.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setBroker(b.id)}
                  className={`p-4 rounded-xl border flex items-center gap-3 transition-all ${broker === b.id ? 'bg-emerald-500/5 border-emerald-500/40 text-emerald-400 shadow-md' : 'bg-zinc-900/40 border-white/5 text-gray-400 hover:border-white/10 hover:text-white'}`}
                >
                  <span className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center font-black text-xs text-white">
                    {b.logo}
                  </span>
                  <span className="text-xs font-bold text-left">{b.name}</span>
                </button>
              ))}
            </div>

            {/* Connection panel */}
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 text-center">
              {isConnected ? (
                <div>
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mx-auto mb-4 animate-bounce">
                    ✓
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">Zerodha Connected Successfully!</h4>
                  <p className="text-[10px] text-gray-500 mb-4">API Token status: Valid for next 14 hours.</p>
                  <button
                    onClick={() => setIsConnected(false)}
                    className="px-6 py-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold hover:bg-rose-500/20 transition-all"
                  >
                    Disconnect Broker
                  </button>
                </div>
              ) : (
                <div>
                  <h4 className="text-sm font-bold text-white mb-2">Connect your account to start trading</h4>
                  <p className="text-[10px] text-gray-400 mb-5 leading-relaxed max-w-sm mx-auto">
                    Linking redirect takes you to your broker login panel to generate standard secure API token access. We never store password keys.
                  </p>
                  <button
                    onClick={() => setIsConnected(true)}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-black font-bold text-xs shadow hover:shadow-emerald-500/20 transition-all"
                  >
                    Connect via Broker API Portal
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Execution Metrics & Security */}
          <div className="space-y-6">
            {/* Security banner */}
            <div className="fq-glass p-6 border border-white/10 bg-zinc-950/60 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <Shield size={18} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-1">Military-Grade API Encryption</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  FinEquity employs AES-256 secure encryption protocols. Your broker details remain fully sandboxed and are never shared or logged.
                </p>
              </div>
            </div>

            {/* Features check list */}
            <div className="fq-glass p-6 border border-white/10 bg-zinc-950/60">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles size={14} className="text-emerald-400" />
                Execution Privileges
              </h3>
              
              <div className="space-y-3.5 text-xs text-gray-300">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span>**Auto Order Entry**: Sub-second trade triggers matching certified calls.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span>**Stop Loss Safeguards**: Automatic hard-stop placements inside broker books.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span>**Trailing Support**: Profit-locking adjustment updates calculated in real time.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span>**Flexible Leverages**: Fully customizable risk ratios per individual trade.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlgoTrade;
