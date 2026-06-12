import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  Newspaper, Database, Flame, Percent, Activity, BarChart2, 
  Landmark, Globe, LineChart, ShieldAlert, Sparkles, TrendingUp,
  TrendingDown, ArrowUpRight, ArrowDownRight, Lock, Eye
} from 'lucide-react';
import axios from 'axios';

const MarketAnalysis = () => {
  const location = useLocation();
  const path = location.pathname;
  const [pageTitle, setPageTitle] = useState('Market Pulse');
  const [icon, setIcon] = useState(Newspaper);
  const [newsList, setNewsList] = useState([]);
  const [newsLoading, setNewsLoading] = useState(false);

  // Live simulation states
  const [gainers, setGainers] = useState([
    { symbol: "TATA MOTORS", ltp: 982.40, change: 45.40, pct: 4.85, vol: "5.2M" },
    { symbol: "RELIANCE", ltp: 2942.10, change: 91.20, pct: 3.20, vol: "4.8M" },
    { symbol: "HDFC BANK", ltp: 1614.50, change: 43.30, pct: 2.75, vol: "8.1M" },
    { symbol: "INFOSYS", ltp: 1485.30, change: 30.60, pct: 2.10, vol: "3.4M" },
    { symbol: "ICICI BANK", ltp: 1120.80, change: 21.40, pct: 1.95, vol: "6.2M" }
  ]);

  const [losers, setLosers] = useState([
    { symbol: "TCS", ltp: 3820.40, change: -134.40, pct: -3.40, vol: "1.9M" },
    { symbol: "WIPRO", ltp: 472.10, change: -13.80, pct: -2.85, vol: "4.2M" },
    { symbol: "TECH MAHINDRA", ltp: 1285.50, change: -28.20, pct: -2.15, vol: "2.1M" },
    { symbol: "HCL TECH", ltp: 1320.15, change: -24.20, pct: -1.80, vol: "1.7M" },
    { symbol: "SBIN", ltp: 830.40, change: -12.65, pct: -1.50, vol: "5.5M" }
  ]);

  const [indices, setIndices] = useState([
    { name: "NIFTY 50", price: 23452.15, change: 104.40, pct: 0.45, high: 23480.00, low: 23320.10 },
    { name: "SENSEX", price: 77156.80, change: 421.30, pct: 0.55, high: 77250.00, low: 76680.50 },
    { name: "BANK NIFTY", price: 49824.50, change: -60.10, pct: -0.12, high: 50100.20, low: 49650.00 },
    { name: "FIN NIFTY", price: 21234.90, change: 68.20, pct: 0.32, high: 21290.40, low: 21140.10 },
    { name: "MIDCAP NIFTY", price: 12414.20, change: 101.40, pct: 0.82, high: 12440.00, low: 12300.20 }
  ]);

  const [heatmapData, setHeatmapData] = useState([
    { symbol: "RELIANCE", pct: 3.20 }, { symbol: "TCS", pct: -3.40 }, { symbol: "HDFC BANK", pct: 2.75 },
    { symbol: "INFOSYS", pct: 2.10 }, { symbol: "ICICI BANK", pct: 1.95 }, { symbol: "BHARTI AIRTEL", pct: 1.45 },
    { symbol: "SBI", pct: -1.50 }, { symbol: "L&T", pct: 0.85 }, { symbol: "ITC", pct: -0.45 },
    { symbol: "AXIS BANK", pct: 1.10 }, { symbol: "KOTAK BANK", pct: -0.80 }, { symbol: "HINDUNILVR", pct: -1.25 }
  ]);

  const [commodities, setCommodities] = useState([
    { name: "Gold (10g)", price: 71850.00, change: 320.00, pct: 0.45 },
    { name: "Silver (1kg)", price: 89450.00, change: -680.00, pct: -0.76 },
    { name: "Crude Oil", price: 6540.00, change: 85.00, pct: 1.32 },
    { name: "Natural Gas", price: 238.40, change: -4.20, pct: -1.73 }
  ]);

  const [currencies, setCurrencies] = useState([
    { name: "USD/INR", price: 83.525, change: -0.045, pct: -0.05 },
    { name: "EUR/INR", price: 89.840, change: 0.120, pct: 0.13 },
    { name: "GBP/INR", price: 106.450, change: -0.210, pct: -0.20 },
    { name: "JPY/INR (100)", price: 53.120, change: 0.080, pct: 0.15 }
  ]);

  const [globals, setGlobals] = useState([
    { name: "S&P 500", price: 5431.10, change: 35.80, pct: 0.66 },
    { name: "NASDAQ", price: 17665.40, change: 180.20, pct: 1.03 },
    { name: "DOW JONES", price: 38647.10, change: -65.20, pct: -0.17 },
    { name: "FTSE 100", price: 8163.50, change: 12.40, pct: 0.15 },
    { name: "NIKKEI 225", price: 38720.00, change: 240.00, pct: 0.62 }
  ]);

  // Option Chain Mock Data (Nifty 50 Spot: 23,450)
  const optionChain = [
    { callOI: "42.5L", callChg: "+12.1%", callLTP: 185.40, strike: 23300, putLTP: 42.10, putChg: "-35.4%", putOI: "18.4L" },
    { callOI: "38.2L", callChg: "+8.4%", callLTP: 124.60, strike: 23400, putLTP: 76.50, putChg: "-21.2%", putOI: "29.8L" },
    { callOI: "55.4L", callChg: "-15.2%", callLTP: 81.20, strike: 23500, putLTP: 128.40, putChg: "+18.5%", putOI: "45.1L" },
    { callOI: "24.1L", callChg: "-30.5%", callLTP: 45.30, strike: 23600, putLTP: 195.20, putChg: "+42.1%", putOI: "12.5L" }
  ];

  // Map path to Title and Icon
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
      case '/index-analysis':
        setPageTitle(path === '/index-analysis' ? 'Index Analysis' : 'Indices Pulse');
        setIcon(Landmark);
        break;
      case '/market-research-sector':
      case '/market-research-industry':
        setPageTitle(path === '/market-research-industry' ? 'Industry Research' : 'Sector Trends');
        setIcon(Globe);
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
        setPageTitle('Deep Insights Desk');
        setIcon(Sparkles);
        break;
      case '/f-and-o-strategies':
        setPageTitle('F&O Strategies');
        setIcon(Activity);
        break;
      case '/Daily-Stock-Research':
        setPageTitle('Stock Research Desk');
        setIcon(LineChart);
        break;
      default:
        setPageTitle('Market Analysis');
        setIcon(Newspaper);
    }
  }, [path]);

  // Fetch News from Backend
  useEffect(() => {
    if (path === '/market-news') {
      setNewsLoading(true);
      const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      axios.get(`${apiBase}/api/news`)
        .then(res => {
          if (res.data && res.data.length > 0) {
            setNewsList(res.data);
          }
        })
        .catch(err => console.log("Failed to fetch news: ", err))
        .finally(() => setNewsLoading(false));
    }
  }, [path]);

  // Simulate price ticks in real-time
  useEffect(() => {
    const timer = setInterval(() => {
      // 1. Gainers tick
      setGainers(prev => prev.map(stock => {
        const tick = (Math.random() - 0.45) * 2.5;
        const newPrice = Math.max(10, stock.ltp + tick);
        const change = stock.change + tick;
        const pct = (change / (stock.ltp - change)) * 100;
        return { ...stock, ltp: Number(newPrice.toFixed(2)), change: Number(change.toFixed(2)), pct: Number(pct.toFixed(2)) };
      }));

      // 2. Losers tick
      setLosers(prev => prev.map(stock => {
        const tick = (Math.random() - 0.55) * 2.5;
        const newPrice = Math.max(10, stock.ltp + tick);
        const change = stock.change + tick;
        const pct = (change / (stock.ltp - change)) * 100;
        return { ...stock, ltp: Number(newPrice.toFixed(2)), change: Number(change.toFixed(2)), pct: Number(pct.toFixed(2)) };
      }));

      // 3. Indices tick
      setIndices(prev => prev.map(index => {
        const tick = (Math.random() - 0.5) * index.price * 0.001;
        const newPrice = index.price + tick;
        const change = index.change + tick;
        const pct = (change / (index.price - change)) * 100;
        return { 
          ...index, 
          price: Number(newPrice.toFixed(2)), 
          change: Number(change.toFixed(2)), 
          pct: Number(pct.toFixed(2)),
          high: Number(Math.max(index.high, newPrice).toFixed(2)),
          low: Number(Math.min(index.low, newPrice).toFixed(2))
        };
      }));

      // 4. Heatmap tick
      setHeatmapData(prev => prev.map(stock => {
        const tick = (Math.random() - 0.5) * 0.2;
        return { ...stock, pct: Number((stock.pct + tick).toFixed(2)) };
      }));

      // 5. Commodities tick
      setCommodities(prev => prev.map(c => {
        const tick = (Math.random() - 0.5) * c.price * 0.002;
        const newPrice = c.price + tick;
        const change = c.change + tick;
        const pct = (change / (c.price - change)) * 100;
        return { ...c, price: Number(newPrice.toFixed(2)), change: Number(change.toFixed(2)), pct: Number(pct.toFixed(2)) };
      }));

      // 6. Currencies tick
      setCurrencies(prev => prev.map(c => {
        const tick = (Math.random() - 0.5) * 0.03;
        const newPrice = c.price + tick;
        const change = c.change + tick;
        const pct = (change / (c.price - change)) * 100;
        return { ...c, price: Number(newPrice.toFixed(3)), change: Number(change.toFixed(3)), pct: Number(pct.toFixed(2)) };
      }));

      // 7. Globals tick
      setGlobals(prev => prev.map(g => {
        const tick = (Math.random() - 0.48) * g.price * 0.0015;
        const newPrice = g.price + tick;
        const change = g.change + tick;
        const pct = (change / (g.price - change)) * 100;
        return { ...g, price: Number(newPrice.toFixed(2)), change: Number(change.toFixed(2)), pct: Number(pct.toFixed(2)) };
      }));

    }, 3500);

    return () => clearInterval(timer);
  }, []);

  const IconComponent = icon;

  // Premium Locked Route Check
  const isLockedRoute = ['/deep-insights', '/f-and-o-strategies', '/Daily-Stock-Research'].includes(path);

  // Dynamic Renders for Pulse Routes
  const renderDashboard = () => {
    if (isLockedRoute) {
      return (
        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-zinc-950/80">
          <div className="p-8 filter blur-md pointer-events-none opacity-25 space-y-4">
            <h3 className="font-bold text-white mb-2">Premium Research Briefings</h3>
            <div className="h-6 bg-white/5 rounded w-3/4" />
            <div className="h-24 bg-white/5 rounded" />
            <div className="h-6 bg-white/5 rounded w-1/2" />
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-black/60 backdrop-blur-md">
            <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6 shadow-lg shadow-amber-500/5 animate-pulse">
              <Lock size={24} />
            </div>
            <h2 className="text-2xl font-extrabold text-white mb-2">
              Unlock <span className="fq-gradient-text">{pageTitle}</span>
            </h2>
            <p className="text-xs text-gray-400 max-w-md mb-8 leading-relaxed">
              This institutional-grade research desk requires a Greenmarket Club membership. Subscribe today to receive high-win-rate signals and reports.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/club" className="fq-btn-primary px-8 py-3 text-sm font-bold shadow-xl shadow-emerald-500/25 hover:scale-105 transition-transform">
                Join Greenmarket Club
              </Link>
              <Link to="/LoginSignup?mode=login" className="fq-btn-ghost px-8 py-3 text-sm border border-white/10 hover:border-white/20 transition-all">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      );
    }

    switch (path) {
      case '/market-news':
        return (
          <div className="space-y-4">
            {newsLoading ? (
              <div className="py-12 flex justify-center"><RefreshCw className="animate-spin text-emerald-400" /></div>
            ) : (
              newsList.map((news, i) => (
                <div key={i} className="fq-glass p-5 border border-white/10 bg-zinc-950/80 hover:border-emerald-500/20 transition-all duration-300">
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <h3 className="text-sm sm:text-base font-bold text-white leading-relaxed">{news.title}</h3>
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
              ))
            )}
            {newsList.length === 0 && !newsLoading && (
              <p className="text-xs text-gray-500 text-center py-6">No news articles found. Try adding some from the admin desk.</p>
            )}
          </div>
        );

      case '/FiiDiidata':
        const fiiDiiData = [
          { client: "FII (Foreign Institutional)", buyValue: "₹12,450 Cr", sellValue: "₹11,120 Cr", netValue: "+₹1,330 Cr", status: "Positive" },
          { client: "DII (Domestic Institutional)", buyValue: "₹8,920 Cr", sellValue: "₹9,450 Cr", netValue: "-₹530 Cr", status: "Negative" },
          { client: "Retail & HNIs", buyValue: "₹15,100 Cr", sellValue: "₹15,900 Cr", netValue: "-₹800 Cr", status: "Negative" }
        ];
        return (
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
        );

      case '/top-gainers':
      case '/top-losers':
        const activeList = path === '/top-gainers' ? gainers : losers;
        return (
          <div className="fq-glass p-6 border border-white/10 bg-zinc-950/80">
            <h3 className="text-base font-bold text-white mb-6">{path === '/top-gainers' ? 'Top Price Gainers' : 'Top Price Losers'}</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                    <th className="py-3 px-4">Symbol</th>
                    <th className="py-3 px-4 text-right">LTP (₹)</th>
                    <th className="py-3 px-4 text-right">Change (₹)</th>
                    <th className="py-3 px-4 text-right">% Change</th>
                    <th className="py-3 px-4 text-right">Volume</th>
                  </tr>
                </thead>
                <tbody>
                  {activeList.map((stock, i) => (
                    <tr key={i} className="border-b border-white/5 last:border-0 text-xs font-semibold text-gray-300 hover:bg-white/5 transition-colors">
                      <td className="py-4 px-4 text-white font-bold">{stock.symbol}</td>
                      <td className="py-4 px-4 text-right">₹{stock.ltp.toLocaleString("en-IN")}</td>
                      <td className={`py-4 px-4 text-right ${stock.pct >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}
                      </td>
                      <td className={`py-4 px-4 text-right font-bold ${stock.pct >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {stock.pct >= 0 ? '+' : ''}{stock.pct.toFixed(2)}%
                      </td>
                      <td className="py-4 px-4 text-right text-gray-500">{stock.vol}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case '/heatmap':
        return (
          <div className="fq-glass p-6 border border-white/10 bg-zinc-950/80">
            <h3 className="text-base font-bold text-white mb-6">Nifty 50 Sector Heatmap</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {heatmapData.map((item, i) => {
                const isPositive = item.pct >= 0;
                const bgOpacity = Math.min(0.35, Math.abs(item.pct) * 0.1);
                const colorClass = isPositive 
                  ? `border-emerald-500/20 text-emerald-400`
                  : `border-rose-500/20 text-rose-400`;
                
                return (
                  <div 
                    key={i} 
                    className="p-5 rounded-xl border text-center relative overflow-hidden transition-all hover:scale-102"
                    style={{ backgroundColor: isPositive ? `rgba(16, 185, 129, ${bgOpacity})` : `rgba(244, 63, 94, ${bgOpacity})` }}
                  >
                    <span className="block text-xs font-bold text-white mb-1">{item.symbol}</span>
                    <span className={`text-[10px] font-bold ${colorClass}`}>
                      {isPositive ? '+' : ''}{item.pct.toFixed(2)}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case '/option-chain':
        return (
          <div className="fq-glass p-6 border border-white/10 bg-zinc-950/80">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-base font-bold text-white">NIFTY 50 Option Chain (Spot: 23,450)</h3>
              <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded text-emerald-400 font-bold uppercase">Weekly Expiry</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-center border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-[9px] text-gray-500 font-bold uppercase tracking-wider bg-white/[0.01]">
                    <th colSpan="3" className="py-2 border-r border-white/10 text-emerald-400">CALLS (CE)</th>
                    <th className="py-2 border-r border-white/10">STRIKE</th>
                    <th colSpan="3" className="py-2 text-rose-400">PUTS (PE)</th>
                  </tr>
                  <tr className="border-b border-white/5 text-[9px] text-gray-500 font-bold uppercase tracking-wider">
                    <th className="py-2">OI</th>
                    <th className="py-2">Chg %</th>
                    <th className="py-2 border-r border-white/10">LTP (₹)</th>
                    <th className="py-2 border-r border-white/10">Strike Price</th>
                    <th className="py-2">LTP (₹)</th>
                    <th className="py-2">Chg %</th>
                    <th className="py-2">OI</th>
                  </tr>
                </thead>
                <tbody>
                  {optionChain.map((row, i) => (
                    <tr key={i} className="border-b border-white/5 last:border-0 text-xs font-semibold text-gray-300 hover:bg-white/5 transition-colors">
                      <td className="py-3.5 text-gray-500">{row.callOI}</td>
                      <td className="py-3.5 text-emerald-400">{row.callChg}</td>
                      <td className="py-3.5 border-r border-white/10 font-bold text-white">₹{row.callLTP.toFixed(2)}</td>
                      <td className="py-3.5 border-r border-white/10 bg-zinc-900/60 font-black text-white">{row.strike}</td>
                      <td className="py-3.5 font-bold text-white">₹{row.putLTP.toFixed(2)}</td>
                      <td className="py-3.5 text-rose-400">{row.putChg}</td>
                      <td className="py-3.5 text-gray-500">{row.putOI}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case '/advance-decline':
        return (
          <div className="fq-glass p-6 border border-white/10 bg-zinc-950/80 space-y-6">
            <h3 className="text-base font-bold text-white">Nifty 50 Advance-Decline Ratio</h3>
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-emerald-400">32 Advances</span>
                <span className="text-gray-400">18 Declines</span>
              </div>
              <div className="h-3 rounded-full bg-rose-500 overflow-hidden flex">
                <div className="h-full bg-emerald-500" style={{ width: '64%' }} />
              </div>
              <p className="text-[10px] text-gray-500 text-center">Market breadth is currently Bullish (ratio of 1.78)</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="p-4 rounded-xl border border-emerald-500/10 bg-emerald-500/5">
                <h4 className="text-xs font-bold text-emerald-400 uppercase mb-3 flex items-center gap-1">
                  <ArrowUpRight size={14} /> Strongly Advancing Sectors
                </h4>
                <ul className="text-xs space-y-2 text-gray-300 font-semibold">
                  <li>🚀 IT & Technologies (+2.45%)</li>
                  <li>🚀 Automotive (+1.82%)</li>
                  <li>🚀 Pharmaceuticals (+1.20%)</li>
                </ul>
              </div>
              <div className="p-4 rounded-xl border border-rose-500/10 bg-rose-500/5">
                <h4 className="text-xs font-bold text-rose-400 uppercase mb-3 flex items-center gap-1">
                  <ArrowDownRight size={14} /> Declining Sectors
                </h4>
                <ul className="text-xs space-y-2 text-gray-300 font-semibold">
                  <li>📉 Banking & Financials (-0.45%)</li>
                  <li>📉 FMCG (-0.85%)</li>
                  <li>📉 Oil & Gas (-1.12%)</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case '/market-research-indices':
      case '/index-analysis':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {indices.map((idx, i) => (
                <div key={i} className="fq-glass p-5 border border-white/10 bg-zinc-950/80 hover:border-emerald-500/20 transition-all">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-bold text-gray-400 uppercase">{idx.name}</span>
                    <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase ${idx.change >= 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                      {idx.change >= 0 ? 'Bullish' : 'Bearish'}
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-white mb-1">₹{idx.price.toLocaleString("en-IN")}</h3>
                  <div className={`text-xs font-bold flex items-center gap-1 ${idx.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {idx.change >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {idx.change >= 0 ? '+' : ''}{idx.pct.toFixed(2)}%
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-white/5 text-[10px] text-gray-500">
                    <span>H: ₹{idx.high.toLocaleString("en-IN")}</span>
                    <span className="text-right">L: ₹{idx.low.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case '/market-research-sector':
      case '/market-research-industry':
        const sectors = [
          { name: "IT Index", change: "+2.45%", value: "34,250", status: "Outperforming" },
          { name: "Nifty Auto", change: "+1.80%", value: "21,480", status: "Bullish" },
          { name: "Nifty Metal", change: "+0.95%", value: "8,920", status: "Neutral" },
          { name: "Nifty Bank", change: "-0.12%", value: "49,824", status: "Consolidating" },
          { name: "Nifty FMCG", change: "-0.85%", value: "54,120", status: "Bearish" }
        ];
        return (
          <div className="fq-glass p-6 border border-white/10 bg-zinc-950/80">
            <h3 className="text-base font-bold text-white mb-6">Sectoral Indices Performance</h3>
            <div className="space-y-4">
              {sectors.map((sec, i) => (
                <div key={i} className="p-3.5 rounded-xl border border-white/5 bg-white/[0.01] flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-white mb-0.5">{sec.name}</h4>
                    <p className="text-[10px] text-gray-500">Spot Value: {sec.value}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-bold block mb-1 ${sec.change.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {sec.change}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white/5 text-gray-400 text-[8px] font-bold uppercase tracking-wider">
                      {sec.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case '/market-research-commodities':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {commodities.map((c, i) => (
              <div key={i} className="fq-glass p-5 border border-white/10 bg-zinc-950/80 text-center">
                <span className="text-[10px] font-bold text-gray-500 uppercase block mb-2">{c.name}</span>
                <h3 className="text-lg font-extrabold text-white mb-1">₹{c.price.toLocaleString("en-IN")}</h3>
                <span className={`text-xs font-bold inline-flex items-center gap-0.5 ${c.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {c.change >= 0 ? '+' : ''}{c.pct.toFixed(2)}%
                </span>
              </div>
            ))}
          </div>
        );

      case '/market-research-currencies':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {currencies.map((c, i) => (
              <div key={i} className="fq-glass p-5 border border-white/10 bg-zinc-950/80 text-center">
                <span className="text-[10px] font-bold text-gray-500 uppercase block mb-2">{c.name}</span>
                <h3 className="text-lg font-extrabold text-white mb-1">₹{c.price.toFixed(3)}</h3>
                <span className={`text-xs font-bold inline-flex items-center gap-0.5 ${c.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {c.change >= 0 ? '+' : ''}{c.pct.toFixed(2)}%
                </span>
              </div>
            ))}
          </div>
        );

      case '/market-research-global':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {globals.map((g, i) => (
              <div key={i} className="fq-glass p-5 border border-white/10 bg-zinc-950/80">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-gray-400 uppercase">{g.name}</span>
                  <Globe className="text-emerald-500/30" size={14} />
                </div>
                <h3 className="text-lg font-extrabold text-white mb-1">{g.price.toLocaleString("en-US")}</h3>
                <span className={`text-xs font-bold inline-flex items-center gap-0.5 ${g.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {g.change >= 0 ? '+' : ''}{g.pct.toFixed(2)}%
                </span>
              </div>
            ))}
          </div>
        );

      default:
        return (
          <div className="fq-glass p-6 border border-white/10 bg-zinc-950/80 text-center">
            <p className="text-xs text-gray-500">Market Visualizer under active development.</p>
          </div>
        );
    }
  };

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
              <p className="text-xs text-gray-400 mt-1">Live market data tracking for Greenmarket users.</p>
            </div>
          </div>
          <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider self-start md:self-center flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live Desk
          </span>
        </div>

        {/* Dynamic Renders */}
        {renderDashboard()}
      </div>
    </div>
  );
};

export default MarketAnalysis;
