import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  Newspaper, Database, Flame, Percent, Activity, BarChart2, 
  Landmark, Globe, LineChart, ShieldAlert, Sparkles, TrendingUp 
} from 'lucide-react';

import axios from 'axios';

const MarketAnalysis = () => {
  const location = useLocation();
  const path = location.pathname;
  const [pageTitle, setPageTitle] = useState('Market Pulse');
  const [icon, setIcon] = useState(Newspaper);
  const [newsList, setNewsList] = useState([
    { title: "Nifty hits record high of 23,450 led by IT and Banking rally.", source: "Reuters", time: "10 mins ago", sentiment: "Bullish" },
    { title: "Reliance Industries announces expansion plan into green hydrogen storage.", source: "Bloomberg", time: "45 mins ago", sentiment: "Bullish" },
    { title: "Global oil prices fall 1.8% on OPEC supply forecasting updates.", source: "FT", time: "2 hours ago", sentiment: "Neutral" },
    { title: "IT major announces quarterly results beating market consensus by 4%.", source: "CNBC", time: "4 hours ago", sentiment: "Bullish" }
  ]);

  // Map path to title and icon
  useEffect(() => {
    switch (path) {
      case '/market-news':
        setPageTitle('Market News');
        setIcon(Newspaper);
        break;
      case '/FiiDiidata':
        setPageTitle('FII/DII Activity');
        setIcon(Database);
        break;
      case '/top-gainers':
        setPageTitle('Top Gainers');
        setIcon(TrendingUp);
        break;
      case '/top-losers':
        setPageTitle('Top Losers');
        setIcon(ShieldAlert);
        break;
      case '/heatmap':
        setPageTitle('Heatmap');
        setIcon(Flame);
        break;
      case '/volume-buzzers':
        setPageTitle('Volume Buzzers');
        setIcon(Activity);
        break;
      case '/option-chain':
        setPageTitle('Option Chain');
        setIcon(Percent);
        break;
      case '/advance-decline':
        setPageTitle('Advance-Decline');
        setIcon(BarChart2);
        break;
      case '/market-research-indices':
        setPageTitle('Indices Pulse');
        setIcon(Landmark);
        break;
      case '/index-analysis':
        setPageTitle('Index Analysis');
        setIcon(LineChart);
        break;
      case '/market-research-sector':
        setPageTitle('Sector Trends');
        setIcon(Globe);
        break;
      case '/market-research-industry':
        setPageTitle('Industry Research');
        setIcon(Landmark);
        break;
      case '/market-research-global':
        setPageTitle('Global Markets');
        setIcon(Globe);
        break;
      case '/market-research-currencies':
        setPageTitle('Currencies Tracker');
        setIcon(Percent);
        break;
      case '/market-research-commodities':
        setPageTitle('Commodities Market');
        setIcon(Database);
        break;
      case '/deep-insights':
        setPageTitle('Deep Insights');
        setIcon(Sparkles);
        break;
      case '/f-and-o-strategies':
        setPageTitle('F&O Strategies');
        setIcon(Activity);
        break;
      case '/Daily-Stock-Research':
        setPageTitle('Stock Research');
        setIcon(LineChart);
        break;
      default:
        setPageTitle('Market Analysis');
        setIcon(Newspaper);
    }
  }, [path]);

  // Fetch news from PostgreSQL backend API
  useEffect(() => {
    if (path === '/market-news') {
      axios.get('http://localhost:5000/api/news')
        .then(res => {
          if (res.data && res.data.length > 0) {
            setNewsList(res.data);
          }
        })
        .catch(err => console.log("Failed to fetch news: ", err));
    }
  }, [path]);

  const IconComponent = icon;

  // Mock data for FII/DII Activity
  const fiiDiiData = [
    { client: "FII (Foreign Institutional)", buyValue: "₹12,450 Cr", sellValue: "₹11,120 Cr", netValue: "+₹1,330 Cr", status: "Positive" },
    { client: "DII (Domestic Institutional)", buyValue: "₹8,920 Cr", sellValue: "₹9,450 Cr", netValue: "-₹530 Cr", status: "Negative" },
    { client: "Retail & HNIs", buyValue: "₹15,100 Cr", sellValue: "₹15,900 Cr", netValue: "-₹800 Cr", status: "Negative" }
  ];

  return (
    <div className="fq-page min-h-screen pt-28 pb-16 px-4">
      {/* Subtle grid background */}
      <div className="absolute inset-0 fq-grid-bg opacity-[0.03] pointer-events-none z-0" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Page Banner Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <IconComponent size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-white">{pageTitle}</h1>
              <p className="text-xs text-gray-400 mt-1">Live market data tracking for Finaquity users.</p>
            </div>
          </div>
          <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider self-start md:self-center">
            Updated Real-time
          </span>
        </div>

        {/* Dynamic renders based on URL */}
        {path === '/FiiDiidata' ? (
          <div className="fq-glass p-6 border border-white/10 bg-zinc-950/80">
            <h3 className="text-base font-bold text-white mb-6">FII/DII Net Flow Trends (Today)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4 text-right">Gross Buy</th>
                    <th className="py-3 px-4 text-right">Gross Sell</th>
                    <th className="py-3 px-4 text-right">Net Value</th>
                  </tr>
                </thead>
                <tbody>
                  {fiiDiiData.map((row, i) => (
                    <tr key={i} className="border-b border-white/5 last:border-0 text-xs font-semibold text-gray-300 hover:bg-white/5 transition-colors">
                      <td className="py-4 px-4 text-white font-bold">{row.client}</td>
                      <td className="py-4 px-4 text-right">{row.buyValue}</td>
                      <td className="py-4 px-4 text-right">{row.sellValue}</td>
                      <td className={`py-4 px-4 text-right font-bold ${row.status === 'Positive' ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {row.netValue}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : path === '/market-news' ? (
          <div className="space-y-4">
            {newsList.map((news, i) => (
              <div key={i} className="fq-glass p-5 border border-white/10 bg-zinc-950/80 hover:border-emerald-500/20 transition-all duration-300">
                <div className="flex justify-between items-start gap-4 mb-2">
                  <h3 className="text-sm sm:text-base font-bold text-white leading-relaxed">
                    {news.title}
                  </h3>
                  <span className={`px-2 py-0.5 rounded text-[9px] uppercase font-bold shrink-0 ${news.sentiment === 'Bullish' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-zinc-800 text-gray-400'}`}>
                    {news.sentiment}
                  </span>
                </div>
                <div className="flex gap-3 text-[10px] text-gray-500 font-semibold uppercase tracking-wider">
                  <span>{news.source}</span>
                  <span>•</span>
                  <span>{news.time}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* General fallback dashboard for other links */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 fq-glass p-6 border border-white/10 bg-zinc-950/80">
              <h3 className="text-sm font-bold text-white mb-4">Market Pulse Metrics</h3>
              <div className="h-48 rounded-xl bg-black/40 border border-white/5 flex items-center justify-center text-gray-500 italic text-xs">
                Line chart visual under development
              </div>
            </div>
            
            <div className="fq-glass p-6 border border-white/10 bg-zinc-950/80 text-center flex flex-col justify-center">
              <span className="w-12 h-12 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 font-bold">
                💡
              </span>
              <h3 className="text-sm font-bold text-white mb-2">SEBI Market Brief</h3>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                Check indexes levels and market sector indicators periodically. Trade ideas are unlocked under Finaquity Club.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketAnalysis;
