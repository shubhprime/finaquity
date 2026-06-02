import React from 'react';
import { AreaChart, TrendingUp, CheckCircle, BarChart3, Clock, Sparkles } from 'lucide-react';

const Success = () => {
  const stats = [
    { label: "Overall Win Rate", value: "81.4%", sub: "Last 12 Months" },
    { label: "Total Recommendations", value: "342 Trades", sub: "Equity & Options" },
    { label: "Average Gain/Trade", value: "14.8%", sub: "Swing Portfolio" },
    { label: "Max Drawdown", value: "-6.2%", sub: "Risk Sandboxed" }
  ];

  const pastTrades = [
    { symbol: "TATA MOTORS", type: "Swing Buy", entry: 890, exit: 1050, gain: "+17.9%", date: "May 2026", status: "Target Hit" },
    { symbol: "RELIANCE", type: "Positional Buy", entry: 2840, exit: 3180, gain: "+11.9%", date: "Apr 2026", status: "Target Hit" },
    { symbol: "INFOSYS", type: "Intraday Buy", entry: 1420, exit: 1455, gain: "+2.4%", date: "May 2026", status: "Target Hit" },
    { symbol: "COAL INDIA", type: "Dividend Yield", entry: 390, exit: 442, gain: "+13.3%", date: "Mar 2026", status: "Target Hit" },
    { symbol: "WIPRO", type: "Swing Buy", entry: 490, exit: 474, gain: "-3.2%", date: "Apr 2026", status: "Stop Loss Hit" },
    { symbol: "REC LTD", type: "Positional Buy", entry: 430, exit: 512, gain: "+19.0%", date: "Feb 2026", status: "Target Hit" }
  ];

  return (
    <div className="fq-page min-h-screen pt-28 pb-16 px-4">
      {/* Subtle grid background */}
      <div className="absolute inset-0 fq-grid-bg opacity-[0.03] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Banner header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-4">
            <CheckCircle size={12} />
            Track Record
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-3">
            Our <span className="fq-gradient-text">Past Performance</span>
          </h1>
          <p className="text-sm text-gray-400 leading-relaxed">
            100% verified track record of all closed equity, option, and index recommendations. All data is audit-logged and SEBI compliant.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
          {stats.map((stat, i) => (
            <div key={i} className="fq-glass p-6 border border-white/10 bg-zinc-950/60 text-center hover:border-emerald-500/30 transition-all duration-300">
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2">{stat.label}</p>
              <h3 className="text-3xl font-extrabold text-white mb-1">{stat.value}</h3>
              <p className="text-[10px] text-emerald-400 font-semibold uppercase">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Closed recommendations Table */}
        <div className="fq-glass border border-white/10 bg-zinc-950/80 overflow-hidden max-w-5xl mx-auto">
          <div className="px-6 py-4 flex items-center justify-between border-b border-white/5 bg-white/[0.01]">
            <div className="flex items-center gap-2">
              <BarChart3 className="text-emerald-400" size={16} />
              <h3 className="font-bold text-white text-base">Recently Closed Trades</h3>
            </div>
            <span className="flex items-center gap-1 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
              <Clock size={12} />
              Audit Logged
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                  <th className="py-3 px-6">Stock Symbol</th>
                  <th className="py-3 px-6">Trade Type</th>
                  <th className="py-3 px-6 text-right">Entry Price</th>
                  <th className="py-3 px-6 text-right">Exit Price</th>
                  <th className="py-3 px-6 text-right">Closed PnL</th>
                  <th className="py-3 px-6 text-right">Close Date</th>
                  <th className="py-3 px-6 text-right">Outcome</th>
                </tr>
              </thead>
              <tbody>
                {pastTrades.map((trade, i) => (
                  <tr key={i} className="border-b border-white/5 last:border-0 text-xs font-semibold text-gray-300 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6 text-white font-bold">{trade.symbol}</td>
                    <td className="py-4 px-6 text-gray-400">{trade.type}</td>
                    <td className="py-4 px-6 text-right">₹{trade.entry.toLocaleString("en-IN")}</td>
                    <td className="py-4 px-6 text-right">₹{trade.exit.toLocaleString("en-IN")}</td>
                    <td className={`py-4 px-6 text-right font-bold ${trade.gain.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {trade.gain}
                    </td>
                    <td className="py-4 px-6 text-right text-gray-500">{trade.date}</td>
                    <td className="py-4 px-6 text-right">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] uppercase font-bold tracking-wider ${trade.status === 'Target Hit' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
                        {trade.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
