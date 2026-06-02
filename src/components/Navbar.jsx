import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChevronDown, ChevronUp, User, LogIn, Menu, X, Lock, 
  TrendingUp, Newspaper, Database, Flame, Percent, Activity, 
  Search, ShieldAlert, BarChart2, Globe, Landmark, CircleDollarSign, 
  LineChart, Sparkles, MessageSquare, ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Monitor scroll for styling navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  // Live Indices Dummy Data
  const indices = [
    { name: "NIFTY 50", price: "23,452.15", change: 104.40, pct: 0.45 },
    { name: "SENSEX", price: "77,156.80", change: 421.30, pct: 0.55 },
    { name: "BANK NIFTY", price: "49,824.50", change: -60.10, pct: -0.12 },
    { name: "FIN NIFTY", price: "21,234.90", change: 68.20, pct: 0.32 },
    { name: "MIDCAP NIFTY", price: "12,414.20", change: 101.40, pct: 0.82 },
    { name: "USD/INR", price: "83.52", change: -0.04, pct: -0.05 },
    { name: "CRUDE OIL", price: "6,540.00", change: 85.00, pct: 1.32 }
  ];

  // Navigation Structure
  const marketPulseColumns = [
    {
      title: "Market Analytics",
      items: [
        { title: "Market News", href: "/market-news", icon: Newspaper },
        { title: "FII/DII Activity", href: "/FiiDiidata", icon: Database },
        { title: "Top Gainers", href: "/top-gainers", icon: TrendingUp },
        { title: "Top Losers", href: "/top-losers", icon: ShieldAlert },
        { title: "Heatmap", href: "/heatmap", icon: Flame },
        { title: "Volume Buzzers", href: "/volume-buzzers", icon: Activity },
        { title: "Option Chain", href: "/option-chain", icon: Percent },
        { title: "Advance-Decline", href: "/advance-decline", icon: BarChart2 },
        { title: "Indices", href: "/market-research-indices", icon: Landmark }
      ]
    },
    {
      title: "Market Research",
      items: [
        { title: "Index Analysis", href: "/index-analysis", icon: LineChart },
        { title: "Sector", href: "/market-research-sector", icon: Globe },
        { title: "Industry", href: "/market-research-industry", icon: Landmark },
        { title: "Global Markets", href: "/market-research-global", icon: Globe },
        { title: "Currencies", href: "/market-research-currencies", icon: CircleDollarSign },
        { title: "Commodities", href: "/market-research-commodities", icon: Database },
        { title: "Deep Insights", href: "/deep-insights", icon: Sparkles, locked: true },
        { title: "F&O Strategies", href: "/f-and-o-strategies", icon: Activity, locked: true },
        { title: "Stock Research", href: "/Daily-Stock-Research", icon: Search, locked: true }
      ]
    }
  ];

  const proTradeIdeas = [
    { title: "Swing Trading Ideas", href: "/swing-trading-ideas", icon: TrendingUp, locked: true },
    { title: "Positional Picks", href: "/positional-picks", icon: BarChart2, locked: true },
    { title: "Intraday Alerts", href: "/intraday-trades", icon: Activity, locked: true },
    { title: "F&O Trade", href: "/F&O-Trade", icon: Percent, locked: true },
    { title: "Investment Ideas", href: "/investment-ideas", icon: Sparkles, locked: true },
    { title: "Commodities Trade", href: "/commodities-trade", icon: Database, locked: true },
    { title: "Crypto Trade Ideas", href: "/crypto-trades", icon: CircleDollarSign, locked: true },
    { title: "Portfolio Hedge Ideas", href: "/portfolio-hedge-ideas", icon: ShieldCheck, locked: true }
  ];

  const screenersColumns = [
    {
      title: "Fundamental Screener",
      items: [
        { title: "Undervalued Stocks", href: "/screener/stocks?endpoint=undervalued", icon: Search },
        { title: "High Dividend Yield", href: "/screener/stocks?endpoint=high-dividend", icon: Search },
        { title: "Potential Growth", href: "/screener/stocks?endpoint=growth", icon: Search },
        { title: "Stable Stocks", href: "/screener/stocks?endpoint=stable", icon: Search },
        { title: "Undervalued Book Value", href: "/screener/stocks?endpoint=book-value", icon: Search }
      ]
    },
    {
      title: "Technical Screener",
      items: [
        { title: "Golden Cross Over", href: "/screener/stocks?endpoint=golden-cross", icon: LineChart },
        { title: "High Volume Breakout", href: "/screener/stocks?endpoint=high-volume", icon: LineChart },
        { title: "New 52-Weeks High", href: "/screener/stocks?endpoint=new-high", icon: LineChart },
        { title: "Price Near 52-Weeks High", href: "/screener/stocks?endpoint=near-high", icon: LineChart },
        { title: "Gap Up Stocks", href: "/screener/stocks?endpoint=gap-up", icon: LineChart }
      ]
    }
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-zinc-950/90 backdrop-blur-xl border-b border-white/10 transition-all duration-300">
      {/* Live Index Ticker */}
      <div className="w-full bg-black py-2 overflow-hidden border-b border-white/5 relative flex">
        <div className="flex animate-marquee whitespace-nowrap gap-8">
          {[...indices, ...indices].map((index, key) => (
            <div key={key} className="inline-flex items-center gap-2 text-xs font-medium">
              <span className="text-gray-400 uppercase">{index.name}</span>
              <span className="text-white font-semibold">{index.price}</span>
              <span className={`inline-flex items-center font-bold ${index.change >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                {index.change >= 0 ? "+" : ""}{index.pct.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav ref={dropdownRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center font-black text-black text-sm">F</span>
            <span className="font-extrabold text-lg tracking-wider bg-gradient-to-r from-emerald-400 via-teal-300 to-green-500 bg-clip-text text-transparent uppercase font-poppins">
              Finaquity
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Market Pulse Dropdown Trigger */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown("market-pulse")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className={`flex items-center gap-1 text-sm font-medium hover:text-emerald-400 transition-colors ${activeDropdown === "market-pulse" ? "text-emerald-400" : "text-gray-300"}`}>
                Market Pulse
                <ChevronDown size={14} />
              </button>

              <AnimatePresence>
                {activeDropdown === "market-pulse" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute left-0 mt-3 p-6 w-[560px] rounded-2xl border border-white/10 bg-zinc-950/95 backdrop-blur-xl shadow-2xl grid grid-cols-2 gap-8"
                  >
                    {marketPulseColumns.map((col, index) => (
                      <div key={index}>
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 mb-3">{col.title}</h4>
                        <div className="flex flex-col gap-1">
                          {col.items.map((item, key) => {
                            const Icon = item.icon;
                            return (
                              <Link 
                                key={key}
                                to={item.href} 
                                className="group flex items-center justify-between p-2 rounded-xl text-xs text-gray-300 hover:text-white hover:bg-white/5 transition-all"
                              >
                                <span className="flex items-center gap-2">
                                  <Icon size={14} className="text-emerald-400" />
                                  <span>{item.title}</span>
                                </span>
                                {item.locked && <Lock size={12} className="text-gray-600" />}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Pro Trade Ideas Dropdown Trigger */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown("pro-trade")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className={`flex items-center gap-1 text-sm font-medium hover:text-emerald-400 transition-colors ${activeDropdown === "pro-trade" ? "text-emerald-400" : "text-gray-300"}`}>
                Pro Trade Ideas
                <ChevronDown size={14} />
              </button>

              <AnimatePresence>
                {activeDropdown === "pro-trade" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute left-0 mt-3 p-4 w-[240px] rounded-2xl border border-white/10 bg-zinc-950/95 backdrop-blur-xl shadow-2xl flex flex-col gap-1"
                  >
                    {proTradeIdeas.map((item, key) => {
                      const Icon = item.icon;
                      return (
                        <Link 
                          key={key} 
                          to={item.href} 
                          className="group flex items-center justify-between p-2.5 rounded-xl text-xs text-gray-300 hover:text-white hover:bg-white/5 transition-all"
                        >
                          <span className="flex items-center gap-2">
                            <Icon size={14} className="text-emerald-400" />
                            <span>{item.title}</span>
                          </span>
                          {item.locked && <Lock size={12} className="text-gray-600" />}
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Finaquity Club Link */}
            <Link to="/club" className="relative text-sm font-medium text-gray-300 hover:text-white transition-colors">
              Finaquity Club
              <span className="absolute -top-3.5 -right-6 px-1.5 py-0.5 rounded-full bg-gradient-to-r from-emerald-400 to-green-600 text-black text-[9px] font-extrabold animate-bounce">
                Join
              </span>
            </Link>

            {/* Screeners Dropdown Trigger */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown("screeners")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className={`flex items-center gap-1 text-sm font-medium hover:text-emerald-400 transition-colors ${activeDropdown === "screeners" ? "text-emerald-400" : "text-gray-300"}`}>
                Screeners
                <ChevronDown size={14} />
              </button>

              <AnimatePresence>
                {activeDropdown === "screeners" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute right-0 mt-3 p-6 w-[560px] rounded-2xl border border-white/10 bg-zinc-950/95 backdrop-blur-xl shadow-2xl grid grid-cols-2 gap-8"
                  >
                    {screenersColumns.map((col, index) => (
                      <div key={index}>
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 mb-3">{col.title}</h4>
                        <div className="flex flex-col gap-1">
                          {col.items.map((item, key) => (
                            <Link 
                              key={key} 
                              to={item.href} 
                              className="group flex items-center gap-2 p-2 rounded-xl text-xs text-gray-300 hover:text-white hover:bg-white/5 transition-all"
                            >
                              <Search size={12} className="text-emerald-400" />
                              <span>{item.title}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Algo Trade Link */}
            <Link to="/algo-trade" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              Algo Trade
            </Link>

            {/* Success Link */}
            <Link to="/PastPerformance" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              Our Success
            </Link>
          </div>
        </div>

        {/* Action Button */}
        <div className="hidden lg:flex items-center gap-4">
          <Link 
            to="/LoginSignup?mode=login" 
            className="group flex items-center gap-1.5 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <LogIn size={16} />
            Login
          </Link>
          <Link 
            to="/club" 
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 text-black font-bold text-xs shadow-lg hover:shadow-emerald-500/25 active:scale-95 transition-all"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-white/10 bg-zinc-950/95 overflow-y-auto max-h-[80vh] px-6 py-6 flex flex-col gap-6"
          >
            {/* Market Pulse Link Group */}
            <div>
              <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 mb-3">Market Pulse</h4>
              <div className="grid grid-cols-2 gap-2">
                {marketPulseColumns.flatMap(c => c.items).map((item, key) => (
                  <Link key={key} to={item.href} className="flex items-center gap-2 p-2 rounded-lg text-xs text-gray-300 hover:bg-white/5">
                    <span>{item.title}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Pro Trade Link Group */}
            <div>
              <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 mb-3">Pro Trade Ideas</h4>
              <div className="grid grid-cols-2 gap-2">
                {proTradeIdeas.map((item, key) => (
                  <Link key={key} to={item.href} className="flex items-center gap-2 p-2 rounded-lg text-xs text-gray-300 hover:bg-white/5">
                    <span>{item.title}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Other links */}
            <div className="flex flex-col gap-3 pt-3 border-t border-white/5">
              <Link to="/club" className="text-sm font-semibold text-gray-200">Finaquity Club</Link>
              <Link to="/algo-trade" className="text-sm font-semibold text-gray-200">Algo Trade</Link>
              <Link to="/PastPerformance" className="text-sm font-semibold text-gray-200">Our Success</Link>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-3 pt-6 border-t border-white/5">
              <Link 
                to="/LoginSignup?mode=login" 
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 text-sm font-semibold text-white hover:bg-white/5 transition-all"
              >
                <LogIn size={16} />
                Login
              </Link>
              <Link 
                to="/club" 
                className="w-full py-3 text-center rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-black font-bold text-sm"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
