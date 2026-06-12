import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, LayoutDashboard, Send, TrendingUp, Newspaper, 
  Sparkles, Lock, AlertTriangle, ArrowRight, RefreshCw, CheckCircle 
} from 'lucide-react';
import axios from 'axios';

const Admin = () => {
  const navigate = useNavigate();
  const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // Auth States
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [userEmail, setUserEmail] = useState('');

  // Stock Form States
  const [stockSymbol, setStockSymbol] = useState('');
  const [stockType, setStockType] = useState('Swing Buy');
  const [entryRange, setEntryRange] = useState('');
  const [target, setTarget] = useState('');
  const [stopLoss, setStopLoss] = useState('');
  const [researchNote, setResearchNote] = useState('');
  const [stockLoading, setStockLoading] = useState(false);
  const [stockSuccess, setStockSuccess] = useState(false);

  // News Form States
  const [newsTitle, setNewsTitle] = useState('');
  const [newsSource, setNewsSource] = useState('');
  const [newsSentiment, setNewsSentiment] = useState('Bullish');
  const [newsTime, setNewsTime] = useState('10 mins ago');
  const [newsLoading, setNewsLoading] = useState(false);
  const [newsSuccess, setNewsSuccess] = useState(false);

  // Recent Activity Feed
  const [recentStocks, setRecentStocks] = useState([]);
  const [recentNews, setRecentNews] = useState([]);
  const [feedLoading, setFeedLoading] = useState(false);
  const [users, setUsers] = useState([]);

  // List of authorized admin emails
  const adminEmails = [
    "kalyanjit@gmail.com",
    "djmedhi.proedgetrader@gmail.com"
  ];

  useEffect(() => {
    // Check if user is logged in and is an admin
    const email = localStorage.getItem("userEmail") || "";
    setUserEmail(email);
    
    if (email && adminEmails.map(e => e.toLowerCase()).includes(email.toLowerCase())) {
      setIsAdmin(true);
      fetchRecentData();
    } else {
      setIsAdmin(false);
    }
    setCheckingAuth(false);
  }, []);

  const fetchRecentData = async () => {
    setFeedLoading(true);
    try {
      const stocksRes = await axios.get(`${apiBase}/api/stocks`);
      if (Array.isArray(stocksRes.data)) {
        setRecentStocks(stocksRes.data.slice(0, 5));
      }
      
      const newsRes = await axios.get(`${apiBase}/api/news`);
      if (Array.isArray(newsRes.data)) {
        setRecentNews(newsRes.data.slice(0, 5));
      }

      const usersRes = await axios.get(`${apiBase}/api/users`);
      if (Array.isArray(usersRes.data)) {
        setUsers(usersRes.data);
      }
    } catch (err) {
      console.error("Failed to fetch recent data: ", err);
    } finally {
      setFeedLoading(false);
    }
  };

  const handleStockSubmit = async (e) => {
    e.preventDefault();
    setStockLoading(true);
    setStockSuccess(false);

    try {
      const payload = {
        symbol: stockSymbol.toUpperCase().trim(),
        type: stockType,
        entry: entryRange.trim(),
        target: target.trim(),
        stop_loss: stopLoss.trim(),
        note: researchNote.trim(),
        date: "Today"
      };

      await axios.post(`${apiBase}/api/stocks`, payload);
      setStockSuccess(true);
      setStockSymbol('');
      setEntryRange('');
      setTarget('');
      setStopLoss('');
      setResearchNote('');
      fetchRecentData();

      // Clear success message after 4s
      setTimeout(() => setStockSuccess(false), 4000);
    } catch (err) {
      alert("Error adding stock recommendation: " + (err.response?.data?.error || err.message));
    } finally {
      setStockLoading(false);
    }
  };

  const handleNewsSubmit = async (e) => {
    e.preventDefault();
    setNewsLoading(true);
    setNewsSuccess(false);

    try {
      const payload = {
        title: newsTitle.trim(),
        source: newsSource.trim() || 'Reuters',
        sentiment: newsSentiment,
        time: newsTime.trim() || '10 mins ago'
      };

      await axios.post(`${apiBase}/api/news`, payload);
      setNewsSuccess(true);
      setNewsTitle('');
      setNewsSource('');
      setNewsTime('10 mins ago');
      fetchRecentData();

      // Clear success message after 4s
      setTimeout(() => setNewsSuccess(false), 4000);
    } catch (err) {
      alert("Error adding news: " + (err.response?.data?.error || err.message));
    } finally {
      setNewsLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="fq-page min-h-screen flex items-center justify-center">
        <RefreshCw className="animate-spin text-emerald-400 h-8 w-8" />
      </div>
    );
  }

  // Access Denied Screen
  if (!isAdmin) {
    return (
      <div className="fq-page min-h-screen pt-28 pb-16 flex items-center justify-center px-4">
        <div className="absolute inset-0 fq-grid-bg opacity-[0.03] pointer-events-none z-0" />
        <div className="w-full max-w-md relative z-10">
          <div className="group relative">
            <div className="fq-ring opacity-35 bg-gradient-to-br from-rose-500 to-amber-500" />
            <div className="fq-glass p-8 bg-zinc-950/80 border border-white/10 text-center">
              <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shadow-lg animate-pulse">
                <Lock size={24} />
              </div>
              <h2 className="text-2xl font-extrabold text-white mb-2">Access Denied</h2>
              <p className="text-xs text-gray-400 leading-relaxed mb-8">
                Your email <span className="text-white font-semibold">{userEmail || 'Guest'}</span> is not authorized as an administrator. Please log in with an admin account to access the Greenmarket Admin Console.
              </p>
              <button
                onClick={() => navigate('/LoginSignup?mode=login')}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-black font-bold text-xs shadow hover:scale-102 transition-all flex items-center justify-center gap-1.5"
              >
                Go to Login Page
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard Content
  return (
    <div className="fq-page min-h-screen pt-28 pb-16 px-4">
      <div className="absolute inset-0 fq-grid-bg opacity-[0.03] pointer-events-none z-0" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header banner */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          <div>
            <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
              <ShieldCheck size={28} className="text-emerald-400" />
              Greenmarket <span className="fq-gradient-text">Admin Console</span>
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Logged in as admin: <span className="text-white font-semibold">{userEmail}</span>
            </p>
          </div>
          
          <button
            onClick={() => {
              localStorage.removeItem("userEmail");
              navigate('/LoginSignup?mode=login');
            }}
            className="px-4 py-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold hover:bg-rose-500/20 transition-all self-start md:self-center"
          >
            Log Out Admin
          </button>
        </div>

        {/* Form sections grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Stock recommendation form */}
          <div className="fq-glass p-6 border border-white/10 bg-zinc-950/60 flex flex-col justify-between relative">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-60" />
            
            <form onSubmit={handleStockSubmit} className="space-y-4">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp size={18} className="text-emerald-400" />
                Publish Trade Recommendation
              </h3>

              {stockSuccess && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs font-bold flex items-center gap-2 animate-pulse">
                  <CheckCircle size={14} />
                  Stock advisory added! The Telegram Bot will broadcast it next.
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Stock Symbol</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. INFY"
                    value={stockSymbol}
                    onChange={(e) => setStockSymbol(e.target.value)}
                    className="fq-input text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Call Type</label>
                  <select
                    value={stockType}
                    onChange={(e) => setStockType(e.target.value)}
                    className="fq-input text-xs bg-zinc-900 border border-white/10 text-white rounded-xl h-10 px-3"
                  >
                    <option value="Swing Buy">Swing Buy</option>
                    <option value="Positional Buy">Positional Buy</option>
                    <option value="Intraday Buy">Intraday Buy</option>
                    <option value="Long Term Buy">Long Term Buy</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Buy Range</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 1400-1420"
                    value={entryRange}
                    onChange={(e) => setEntryRange(e.target.value)}
                    className="fq-input text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Target</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 1550"
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    className="fq-input text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Stop Loss</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 1350"
                    value={stopLoss}
                    onChange={(e) => setStopLoss(e.target.value)}
                    className="fq-input text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Research note / logic</label>
                <textarea
                  required
                  rows="3"
                  placeholder="e.g. Breaking out of key support levels on daily candles..."
                  value={researchNote}
                  onChange={(e) => setResearchNote(e.target.value)}
                  className="fq-input text-xs py-3 h-auto resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={stockLoading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-black font-bold text-xs shadow hover:shadow-emerald-500/25 transition-all flex items-center justify-center gap-1.5"
              >
                {stockLoading ? <RefreshCw className="animate-spin" size={14} /> : <Send size={14} />}
                Publish Stock Call
              </button>
            </form>
          </div>

          {/* News publication form */}
          <div className="fq-glass p-6 border border-white/10 bg-zinc-950/60 flex flex-col justify-between relative">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-60" />
            
            <form onSubmit={handleNewsSubmit} className="space-y-4">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Newspaper size={18} className="text-emerald-400" />
                Publish Market Intelligence News
              </h3>

              {newsSuccess && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs font-bold flex items-center gap-2 animate-pulse">
                  <CheckCircle size={14} />
                  News article added to live ticker feed successfully!
                </div>
              )}

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Headline Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Nifty holds strong above key moving average..."
                  value={newsTitle}
                  onChange={(e) => setNewsTitle(e.target.value)}
                  className="fq-input text-xs"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Source</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Reuters"
                    value={newsSource}
                    onChange={(e) => setNewsSource(e.target.value)}
                    className="fq-input text-xs"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Sentiment</label>
                  <select
                    value={newsSentiment}
                    onChange={(e) => setNewsSentiment(e.target.value)}
                    className="fq-input text-xs bg-zinc-900 border border-white/10 text-white rounded-xl h-10 px-3"
                  >
                    <option value="Bullish">Bullish</option>
                    <option value="Bearish">Bearish</option>
                    <option value="Neutral">Neutral</option>
                  </select>
                </div>
                <div className="col-span-1">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Time Label</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 5 mins ago"
                    value={newsTime}
                    onChange={(e) => setNewsTime(e.target.value)}
                    className="fq-input text-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={newsLoading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-black font-bold text-xs shadow hover:shadow-emerald-500/25 transition-all flex items-center justify-center gap-1.5"
              >
                {newsLoading ? <RefreshCw className="animate-spin" size={14} /> : <Send size={14} />}
                Publish News Item
              </button>
            </form>
          </div>
        </div>

        {/* Live feeds check */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Stocks */}
          <div className="fq-glass border border-white/10 bg-zinc-950/80 p-6">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <TrendingUp size={16} className="text-emerald-400" />
              Active Recommendations Feed
            </h3>

            {feedLoading ? (
              <div className="py-12 flex justify-center"><RefreshCw className="animate-spin text-emerald-400" /></div>
            ) : (
              <div className="space-y-3">
                {recentStocks.map((stock, i) => (
                  <div key={i} className="p-3.5 rounded-xl border border-white/5 bg-white/[0.01] flex items-center justify-between gap-4">
                    <div>
                      <h4 className="text-xs font-bold text-white mb-0.5">{stock.symbol}</h4>
                      <p className="text-[10px] text-gray-500">{stock.type} • Buy: ₹{stock.entry} • Target: ₹{stock.target}</p>
                    </div>
                    
                    <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase ${stock.is_posted || stock.isPosted ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/10' : 'bg-amber-500/10 text-amber-400 border border-amber-500/10'}`}>
                      {stock.is_posted || stock.isPosted ? 'Posted to Telegram' : 'Pending Telegram'}
                    </span>
                  </div>
                ))}
                {recentStocks.length === 0 && <p className="text-xs text-gray-500 text-center py-6">No recommendations found.</p>}
              </div>
            )}
          </div>

          {/* Recent News */}
          <div className="fq-glass border border-white/10 bg-zinc-950/80 p-6">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <Newspaper size={16} className="text-emerald-400" />
              Recent News Articles Feed
            </h3>

            {feedLoading ? (
              <div className="py-12 flex justify-center"><RefreshCw className="animate-spin text-emerald-400" /></div>
            ) : (
              <div className="space-y-3">
                {recentNews.map((news, i) => (
                  <div key={i} className="p-3.5 rounded-xl border border-white/5 bg-white/[0.01] flex items-center justify-between gap-4">
                    <div className="max-w-xs">
                      <h4 className="text-xs font-bold text-white truncate">{news.title}</h4>
                      <p className="text-[10px] text-gray-500">{news.source} • {news.time}</p>
                    </div>
                    
                    <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase ${news.sentiment === 'Bullish' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-zinc-800 text-gray-400'}`}>
                      {news.sentiment}
                    </span>
                  </div>
                ))}
                {recentNews.length === 0 && <p className="text-xs text-gray-500 text-center py-6">No news articles found.</p>}
              </div>
            )}
          </div>
        </div>

        {/* Registered Users panel */}
        <div className="mt-8 fq-glass border border-white/10 bg-zinc-950/80 p-6">
          <h3 className="text-sm font-bold text-white mb-6 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            Registered Clients & Collaborators
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Active Plan</th>
                  <th className="py-3 px-4 text-right">Join Date</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, i) => (
                  <tr key={i} className="border-b border-white/5 last:border-0 text-xs font-semibold text-gray-300 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4 text-white font-bold">{u.name}</td>
                    <td className="py-4 px-4 text-gray-400">{u.email}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase ${u.role === 'admin' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/10' : 'bg-zinc-800 text-gray-400 border border-zinc-700'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-bold text-white">{u.plan}</td>
                    <td className="py-4 px-4 text-right text-gray-500">
                      {u.created_at ? new Date(u.created_at).toLocaleDateString() : 'N/A'}
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-xs text-gray-500 text-center py-6">No users found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
