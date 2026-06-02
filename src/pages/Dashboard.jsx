import React, { useState, useEffect } from 'react';
import { AreaChart, Compass, Lock, Sliders, Bell, LayoutDashboard, Database, Power, AlertCircle } from 'lucide-react';
import axios from 'axios';

const Dashboard = () => {
  const [isSynced, setIsSynced] = useState(true);
  const [activeTrades, setActiveTrades] = useState([
    { symbol: "TATA MOTORS", type: "Swing Buy", entry: "₹970 - ₹980", target: "₹1080", stop_loss: "₹940", note: "Strong momentum on EV order updates.", date: "Today" },
    { symbol: "RELIANCE", type: "Positional Buy", entry: "₹2930 - ₹2945", target: "₹3200", stop_loss: "₹2850", note: "Consolidating near 50 DMA support. Expecting breakout.", date: "Yesterday" }
  ]);

  useEffect(() => {
    const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    axios.get(`${apiBase}/api/stocks`)
      .then(res => {
        if (res.data && res.data.length > 0) {
          setActiveTrades(res.data);
        }
      })
      .catch(err => console.log("Failed to fetch dashboard recommendations: ", err));
  }, []);

  return (
    <div className="fq-page min-h-screen pt-28 pb-16 px-4">
      {/* Subtle grid background */}
      <div className="absolute inset-0 fq-grid-bg opacity-[0.03] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Banner header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          <div>
            <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
              <LayoutDashboard size={28} className="text-emerald-400" />
              Client <span className="fq-gradient-text">Portal Dashboard</span>
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Welcome back, Jane Doe. Here are your active advisory calls and automated trades.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-gray-300">
              Live Connection Desk
            </span>
          </div>
        </div>

        {/* Sync panel / Warning */}
        <div className={`p-4 rounded-xl border mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all ${isSynced ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-amber-500/5 border-amber-500/10'}`}>
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isSynced ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
              <Database size={14} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">
                {isSynced ? 'Broker account Kite Zerodha Synced' : 'Broker Sync Inactive'}
              </h4>
              <p className="text-[10px] text-gray-500">
                {isSynced ? 'Auto-execute execution triggers are active.' : 'Connect your account to auto-trade.'}
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setIsSynced(!isSynced)}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${isSynced ? 'bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20' : 'bg-emerald-500 text-black font-bold'}`}
          >
            <Power size={12} />
            {isSynced ? 'Deactivate Auto-Trade' : 'Activate Auto-Trade'}
          </button>
        </div>

        {/* Recommendations list */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Trades Columns */}
          <div className="lg:col-span-2 space-y-6">
            <div className="fq-glass border border-white/10 bg-zinc-950/80 p-6">
              <h3 className="text-base font-bold text-white mb-6 flex items-center gap-2">
                <Compass size={18} className="text-emerald-400" />
                Active Advisory Recommendations
              </h3>

              <div className="space-y-4">
                {activeTrades.map((trade, i) => (
                  <div 
                    key={i} 
                    className="p-5 rounded-xl border border-white/5 bg-white/[0.01] hover:border-emerald-500/20 transition-all duration-300 relative"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="text-base font-bold text-white mb-0.5">{trade.symbol}</h4>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[9px] uppercase font-bold border border-emerald-500/10">
                          {trade.type}
                        </span>
                      </div>
                      <span className="text-[10px] text-gray-500 font-semibold">{trade.date}</span>
                    </div>

                    <p className="text-xs text-gray-400 leading-relaxed mb-4">
                      {trade.note}
                    </p>

                    <div className="grid grid-cols-3 gap-2 bg-black/40 border border-white/5 rounded-xl p-3 text-center">
                      <div>
                        <p className="text-[9px] text-gray-500 uppercase tracking-wider mb-0.5">Buy Range</p>
                        <span className="text-xs font-bold text-white">₹{trade.entry}</span>
                      </div>
                      <div>
                        <p className="text-[9px] text-gray-500 uppercase tracking-wider mb-0.5">Target Range</p>
                        <span className="text-xs font-bold text-emerald-400">₹{trade.target}</span>
                      </div>
                      <div>
                        <p className="text-[9px] text-gray-500 uppercase tracking-wider mb-0.5">Stop Loss</p>
                        <span className="text-xs font-bold text-rose-400">₹{trade.stop_loss || trade.stopLoss}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar: Security, Billing & Subscriptions */}
          <div className="space-y-6">
            {/* Account active plan */}
            <div className="fq-glass border border-white/10 bg-zinc-950/80 p-6 text-center">
              <span className="w-10 h-10 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 font-black">
                👑
              </span>
              <h3 className="text-sm font-bold text-white mb-1">Trader Club Plan</h3>
              <p className="text-[10px] text-gray-500 mb-4">Expires: July 2026 (Renewing Monthly)</p>
              
              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl mb-4 text-xs font-semibold text-emerald-400">
                Active Features: Equity + Options + Commodity
              </div>
            </div>

            {/* Locked Pages indicator */}
            <div className="fq-glass border border-white/10 bg-zinc-950/80 p-6">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Lock size={12} className="text-amber-400" />
                Locked Research Modules
              </h3>
              
              <div className="space-y-3.5 text-xs text-gray-500">
                <div className="flex items-center justify-between p-2 rounded-lg bg-black/20 border border-white/5">
                  <span>Crypto Trade module</span>
                  <span className="text-[9px] font-bold text-amber-400 uppercase">Pro Exclusive</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-black/20 border border-white/5">
                  <span>Deep Insights desk</span>
                  <span className="text-[9px] font-bold text-amber-400 uppercase">Pro Exclusive</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
