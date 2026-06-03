import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, ShieldCheck, Zap, HelpCircle, Users, BarChart3, 
  MessageSquare, Star, Sparkles, Send, BrainCircuit, Activity,
  TrendingUp, TrendingDown, RefreshCw, AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CanvasRays from '../components/CanvasRays';

const Home = () => {
  // Rotating Slogans
  const slogans = [
    "Research-based <span class='text-emerald-400 font-semibold'>stock ideas</span> for smarter investing",
    "Helping traders find <span class='text-emerald-400 font-semibold'>high-potential opportunities</span>",
    "Easy-to-understand market research with <span class='text-emerald-400 font-semibold'>actionable insights</span>",
    "Data-driven stock analysis designed for <span class='text-emerald-400 font-semibold'>retail investors</span>",
    "Discover fundamentally strong stocks with <span class='text-emerald-400 font-semibold'>expert research</span>"
  ];
  const [sloganIndex, setSloganIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSloganIndex((prev) => (prev + 1) % slogans.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Marquee categories
  const categories = [
    "FII/DII Activity", "Market News", "Option Chain", "Top Gainers", 
    "Top Losers", "F&O Trade", "Commodities", "Global Markets", 
    "Crypto Trade", "Greenmarket Club", "Stock Research"
  ];

  // Pricing Billing Cycle Toggle
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      id: "starter",
      name: "Starter Plan",
      category: "Equity, F&O",
      status: "Consistent",
      statusColor: "text-teal-400 bg-teal-400/10 border-teal-400/20",
      growth: "12%",
      rebalance: billingCycle === "monthly" ? "Monthly" : "Annually",
      price: billingCycle === "monthly" ? "499" : "349",
      chartColor: "#2dd4bf",
      chartPath: "M10,80 L30,70 L50,75 L70,60 L90,50 L110,55 L130,40 L150,30 L170,35 L190,20 L210,25 L230,10 L250,5"
    },
    {
      id: "trader",
      name: "Trader Plan",
      category: "Equity, F&O, Commodity",
      status: "Popular",
      statusColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
      growth: "21%",
      rebalance: billingCycle === "monthly" ? "Monthly" : "Annually",
      price: billingCycle === "monthly" ? "1499" : "1199",
      chartColor: "#34d399",
      chartPath: "M10,80 L30,65 L50,70 L70,50 L90,45 L110,35 L130,25 L150,30 L170,15 L190,10 L210,15 L230,5 L250,2"
    },
    {
      id: "pro",
      name: "Pro Plan",
      category: "Equity, F&O, Commodity, Crypto",
      status: "New",
      statusColor: "text-amber-400 bg-amber-400/10 border-amber-400/20",
      growth: "33%",
      rebalance: billingCycle === "monthly" ? "Monthly" : "Annually",
      price: billingCycle === "monthly" ? "2499" : "2099",
      chartColor: "#fbbf24",
      chartPath: "M10,80 L30,60 L50,50 L70,55 L90,35 L110,40 L130,20 L150,15 L170,22 L190,8 L210,12 L230,2 L250,0"
    }
  ];

  // Tired of Losing Money checklist
  const features = [
    { icon: BrainCircuit, text: "Algo Based Trading" },
    { icon: ShieldCheck, text: "Perfect View & Support" },
    { icon: BarChart3, text: "Daily Trade Ideas" },
    { icon: HelpCircle, text: "Risk Management Tools" },
    { icon: Users, text: "Educational Resources" },
    { icon: MessageSquare, text: "Community Support" }
  ];

  // Live gainers / losers data
  const [gainers, setGainers] = useState([
    { symbol: "TATA MOTORS", ltp: 982.40, pct: 4.85 },
    { symbol: "RELIANCE", ltp: 2942.10, pct: 3.20 },
    { symbol: "HDFC BANK", ltp: 1614.50, pct: 2.75 },
    { symbol: "INFOSYS", ltp: 1485.30, pct: 2.10 },
    { symbol: "ICICI BANK", ltp: 1120.80, pct: 1.95 }
  ]);

  const [losers, setLosers] = useState([
    { symbol: "TCS", ltp: 3820.40, pct: -3.40 },
    { symbol: "WIPRO", ltp: 472.10, pct: -2.85 },
    { symbol: "TECH MAHINDRA", ltp: 1285.50, pct: -2.15 },
    { symbol: "HCL TECH", ltp: 1320.15, pct: -1.80 },
    { symbol: "SBIN", ltp: 830.40, pct: -1.50 }
  ]);

  // Simulate price ticks to show live content
  useEffect(() => {
    const timer = setInterval(() => {
      setGainers((prev) => 
        prev.map(item => {
          const change = (Math.random() - 0.48) * 2; // slight positive bias
          const newLtp = item.ltp + change;
          const newPct = Math.max(0.1, item.pct + change * 0.05);
          return { ...item, ltp: Number(newLtp.toFixed(2)), pct: Number(newPct.toFixed(2)) };
        })
      );
      setLosers((prev) => 
        prev.map(item => {
          const change = (Math.random() - 0.52) * 2; // slight negative bias
          const newLtp = item.ltp + change;
          const newPct = Math.min(-0.1, item.pct + change * 0.05);
          return { ...item, ltp: Number(newLtp.toFixed(2)), pct: Number(newPct.toFixed(2)) };
        })
      );
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  // Testimonials stacked 3D carousel
  const testimonials = [
    {
      id: 1,
      name: "Rohit Sharma",
      designation: "Full-Time Trader, Mumbai",
      rating: 5,
      feedback: "Greenmarket completely shifted my trading style. The SEBI advisory insights are extremely accurate and it cut my research time in half!"
    },
    {
      id: 2,
      name: "Neha Patel",
      designation: "Retail Investor, Bangalore",
      rating: 5,
      feedback: "The Swing Trading ideas are incredible. Risk management parameters like stop-loss and targets are clearly defined, which gives me confidence."
    },
    {
      id: 3,
      name: "Aditya Verma",
      designation: "Software Engineer & Trader, Delhi",
      rating: 5,
      feedback: "AlgoMind is like a neurosurgeon for stocks. It answers my queries in seconds with historical correlation, sentiment, and sector data."
    },
    {
      id: 4,
      name: "Priyanka Sen",
      designation: "F&O Trader, Kolkata",
      rating: 5,
      feedback: "Being a part of the Greenmarket Club WhatsApp community is worth every rupee. The live trade alerts are highly profitable and fast."
    }
  ];

  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <div className="fq-page min-h-screen pt-24 pb-12 overflow-x-hidden">
      {/* 1. Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden">
        {/* Background Rays */}
        <CanvasRays />
        
        {/* Subtle grid background */}
        <div className="absolute inset-0 fq-grid-bg opacity-[0.03] pointer-events-none z-0" />

        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
          {/* Logo badge in Hero */}
          <div className="mb-6 flex items-center justify-center gap-3 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 shadow-2xl backdrop-blur-xl animate-fade-in">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
              India's Premier Wealth-Tech Platform
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight text-white mb-6">
            Revolutionizing Retail <br />
            <span className="fq-gradient-text">Trading & Investing</span>
          </h1>

          {/* Rotating slogan */}
          <div className="h-16 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={sloganIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5 }}
                className="text-base sm:text-xl md:text-2xl text-gray-300 max-w-3xl leading-relaxed"
                dangerouslySetInnerHTML={{ __html: slogans[sloganIndex] }}
              />
            </AnimatePresence>
          </div>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link 
              to="/club" 
              className="fq-btn-primary px-8 py-3.5 text-base shadow-xl shadow-emerald-500/20 hover:scale-105 transition-transform"
            >
              Join Greenmarket Club
              <ArrowRight size={18} />
            </Link>
            <Link 
              to="/screener" 
              className="fq-btn-ghost px-8 py-3.5 text-base border border-white/10 hover:border-white/20 transition-all"
            >
              Explore Screeners
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Popular Categories Marquee */}
      <section className="py-12 border-y border-white/5 bg-[#0a0d0e]/40 relative overflow-hidden">
        <div className="absolute inset-0 fq-grid-bg opacity-[0.03] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 text-center mb-8">
          <div className="fq-section-eyebrow mb-3 mx-auto">
            <Sparkles size={12} className="text-emerald-400" />
            Popular at Greenmarket
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
            Decode markets <span className="fq-gradient-text">like never before</span>
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Quick access to tools, data, and research ideas retail traders are using.
          </p>
        </div>

        {/* Marquee Row 1 */}
        <div className="w-full overflow-hidden whitespace-nowrap mb-4 relative py-2">
          <div className="flex gap-4 animate-marquee hover:[animation-play-state:paused]">
            {[...categories, ...categories].map((cat, idx) => (
              <div key={idx} className="fq-cat-pill hover:scale-105 cursor-pointer">
                <span className="fq-cat-icon">⚡</span>
                <span className="text-xs sm:text-sm font-semibold">{cat}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Daily Stock Research Banner */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="relative group">
          <div className="fq-ring opacity-40" />
          <div className="fq-glass p-8 sm:p-12 overflow-hidden bg-zinc-950/80 border border-white/10">
            <div className="absolute inset-0 fq-grid-bg opacity-[0.03]" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-left max-w-2xl">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-4">
                  Validated · SEBI Registered Advisory
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-tight">
                  Explore our daily <br />
                  <span className="fq-gradient-text">Stock Research</span>
                </h2>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  All insights and buy/sell signals are generated by SEBI-registered analysts, ensuring institutional-grade research built for retail budgets.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-gray-300">
                    🛡️ Risk-Managed
                  </span>
                  <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-gray-300">
                    📈 Daily Updates
                  </span>
                  <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-gray-300">
                    🎯 Entry & Exit Targets
                  </span>
                </div>
              </div>
              <div className="shrink-0 w-full md:w-auto">
                <Link
                  to="/club"
                  className="fq-btn-primary px-8 py-4 text-base font-bold shadow-xl shadow-emerald-500/20 w-full md:w-auto text-center"
                >
                  Access Live Trades
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Tired of Losing Money section */}
      <section className="py-16 bg-[#090d0e]/50 border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 fq-grid-bg opacity-[0.03] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-3 tracking-wide">
            Tired of Losing Money in Stock Market?
          </h2>
          <span className="text-lg sm:text-2xl font-semibold text-emerald-400 block mb-10">
            Join Greenmarket Club
          </span>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
            {features.map((feat, index) => {
              const Icon = feat.icon;
              return (
                <div 
                  key={index} 
                  className="p-6 rounded-2xl border border-white/10 bg-zinc-950/60 hover:bg-zinc-950/90 hover:border-emerald-500/30 transition-all duration-300 flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-black flex items-center justify-center font-bold shadow-md shrink-0">
                    <Icon size={18} />
                  </div>
                  <span className="text-sm sm:text-base font-semibold text-white group-hover:text-emerald-400 transition-colors">
                    {feat.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Select Your Experience Level (Pricing) */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Select your experience level and <br />
            <span className="bg-gradient-to-r from-emerald-400 to-green-600 bg-clip-text text-transparent">
              start your trading journey
            </span>
          </h2>
          
          {/* Toggle Tab */}
          <div className="inline-flex p-1 rounded-full bg-zinc-900 border border-white/10 mt-4 relative">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`relative z-10 px-6 py-2 rounded-full text-sm font-semibold transition-all ${billingCycle === 'monthly' ? 'text-black' : 'text-gray-400'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annually')}
              className={`relative z-10 px-6 py-2 rounded-full text-sm font-semibold transition-all ${billingCycle === 'annually' ? 'text-black' : 'text-gray-400'}`}
            >
              Annually (Save 30%)
            </button>
            
            {/* Animated Slider backdrop */}
            <div 
              className={`absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-full bg-gradient-to-r from-emerald-400 to-green-500 transition-all duration-300 ${billingCycle === 'annually' ? 'translate-x-full' : ''}`}
            />
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={plan.id}
              className={`rounded-2xl border ${plan.id === 'trader' ? 'border-emerald-500/40 bg-zinc-950/80' : 'border-white/10 bg-zinc-950/40'} p-6 flex flex-col justify-between hover:border-emerald-500/30 hover:scale-[1.02] transition-all duration-300 relative overflow-hidden`}
            >
              {/* Glow top edge */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-60" />

              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{plan.category}</p>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${plan.statusColor}`}>
                    {plan.status}
                  </span>
                </div>

                {/* Simulated Chart preview */}
                <div className="h-16 my-4 w-full relative">
                  <svg className="w-full h-full" viewBox="0 0 260 90" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id={`grad-${plan.id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={plan.chartColor} stopOpacity="0.4" />
                        <stop offset="100%" stopColor={plan.chartColor} stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d={plan.chartPath + " L250,90 L10,90 Z"}
                      fill={`url(#grad-${plan.id})`}
                    />
                    <path
                      d={plan.chartPath}
                      fill="none"
                      stroke={plan.chartColor}
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <div className="grid grid-cols-3 py-4 border-y border-white/5 my-4 text-center">
                  <div>
                    <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mb-1">Target CAGR</p>
                    <span className="text-sm font-bold text-emerald-400">{plan.growth}</span>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mb-1">Rebalancing</p>
                    <span className="text-sm font-bold text-white">{plan.rebalance}</span>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mb-1">Monthly Cost</p>
                    <span className="text-sm font-bold text-white">₹{plan.price}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <Link
                  to="/club"
                  className={`w-full py-3 rounded-xl font-bold text-center block text-sm transition-all duration-300 ${plan.id === 'trader' ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-black shadow-lg hover:shadow-emerald-500/20' : 'bg-white/5 border border-white/10 hover:bg-white/10 text-white'}`}
                >
                  Subscribe Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. AlgoMind AI section */}
      <section className="py-16 bg-[#0a0d0e]/30 border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 fq-grid-bg opacity-[0.03] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="fq-section-eyebrow mb-3 mx-auto">
              <BrainCircuit size={12} className="text-emerald-400" />
              AI Market Intelligence
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Meet <span className="fq-gradient-text">AlgoMind</span>: Your AI Market Analyst
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-400">
              Ask questions. Get data-driven answers computed across 140+ index dimensions in seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Left AI Interaction Card */}
            <div className="fq-glass p-6 border border-white/10 bg-zinc-950/60 min-h-[400px] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs text-gray-500 italic mb-4">
                  <span className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-[10px]">U</span>
                  User Query
                </div>
                <h3 className="text-xl font-semibold text-white mb-6">"Why did RELIANCE drop 4% today?"</h3>
                
                <div className="flex items-center gap-2 text-xs text-gray-500 italic mb-4">
                  <span className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px]">A</span>
                  AlgoMind Analysis
                </div>
                
                <div className="flex flex-col sm:flex-row items-center gap-6 my-4">
                  {/* Mock Donut Chart */}
                  <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="15.91" fill="none" stroke="#27272a" strokeWidth="3" />
                      {/* Negative News 60% (gold/amber) */}
                      <circle cx="18" cy="18" r="15.91" fill="none" stroke="#fbbf24" strokeWidth="3.2" strokeDasharray="60 40" strokeDashoffset="0" />
                      {/* Sector Trend 25% (emerald) */}
                      <circle cx="18" cy="18" r="15.91" fill="none" stroke="#10b981" strokeWidth="3.2" strokeDasharray="25 75" strokeDashoffset="-60" />
                      {/* FII Activity 15% (gray/slate) */}
                      <circle cx="18" cy="18" r="15.91" fill="none" stroke="#6b7280" strokeWidth="3.2" strokeDasharray="15 85" strokeDashoffset="-85" />
                    </svg>
                    <div className="absolute text-center">
                      <span className="text-[10px] font-bold text-white">RELIANCE</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-xs font-semibold w-full">
                    <div className="flex justify-between items-center text-amber-400 py-1 border-b border-white/5">
                      <span>Negative News (BPCL Partnership delay)</span>
                      <span>60%</span>
                    </div>
                    <div className="flex justify-between items-center text-emerald-400 py-1 border-b border-white/5">
                      <span>Sector Trend Sell-off</span>
                      <span>25%</span>
                    </div>
                    <div className="flex justify-between items-center text-gray-400 py-1">
                      <span>FII Outflow Outflow</span>
                      <span>15%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 border-t border-white/5 pt-4">
                <p className="text-sm font-semibold text-emerald-400 italic">
                  "BPCL partnership delay cited as key factor"
                </p>
              </div>
            </div>

            {/* Right Interactive Mock Terminal */}
            <div className="fq-glass p-6 border border-white/10 bg-zinc-950/60 min-h-[400px] flex flex-col justify-between">
              <div>
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    disabled
                    placeholder="Ask AlgoMind about stock performance..."
                    className="fq-input text-xs"
                  />
                  <button className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                    <Send size={16} />
                  </button>
                </div>
                
                <div className="space-y-2 mb-6">
                  <button className="w-full text-left p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/20 text-xs text-gray-300 font-medium transition-all">
                    👉 Show me Tata Motors' EV strategy vs. global competitors
                  </button>
                  <button className="w-full text-left p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/20 text-xs text-gray-300 font-medium transition-all">
                    👉 Analyze IT sector PE ratios vs. 10-year average
                  </button>
                </div>

                {/* Nodes simulation */}
                <div className="h-32 rounded-xl bg-black/40 border border-white/5 relative overflow-hidden flex items-center justify-center">
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <line x1="50%" y1="50%" x2="25%" y2="25%" stroke="#10b981" strokeWidth="1" strokeOpacity="0.4" />
                    <line x1="50%" y1="50%" x2="75%" y2="30%" stroke="#10b981" strokeWidth="1" strokeOpacity="0.4" />
                    <line x1="50%" y1="50%" x2="60%" y2="80%" stroke="#10b981" strokeWidth="1" strokeOpacity="0.4" />
                  </svg>
                  
                  {/* Central Node */}
                  <div className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center font-bold text-[9px] text-white shadow-lg">
                    RELIANCE
                  </div>
                  
                  {/* Connected Outer Nodes */}
                  <div className="absolute left-[25%] top-[25%] -translate-x-1/2 -translate-y-1/2 px-2 py-1 rounded bg-zinc-900 border border-white/10 text-[9px] text-gray-300">
                    Crude Oil Prices
                  </div>
                  <div className="absolute left-[75%] top-[30%] -translate-x-1/2 -translate-y-1/2 px-2 py-1 rounded bg-zinc-900 border border-white/10 text-[9px] text-gray-300">
                    FII Holdings
                  </div>
                  <div className="absolute left-[60%] top-[80%] -translate-x-1/2 -translate-y-1/2 px-2 py-1 rounded bg-zinc-900 border border-white/10 text-[9px] text-gray-300">
                    Nifty Trend
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center text-[10px] text-gray-500 pt-4 border-t border-white/5">
                <span>Updates every 15s</span>
                <span className="text-amber-400 font-bold">100% Zero Hallucination Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Trending Stocks (Gainers & Losers) */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="fq-section-eyebrow mb-3 mx-auto">
            <Activity size={12} className="text-emerald-400 animate-pulse" />
            Live Nifty 50 Tracking
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
            Explore <span className="fq-gradient-text">trending stocks</span>
          </h2>
          <p className="text-sm text-gray-400">
            Today's biggest movers across Nifty 50 — refreshed dynamically in real time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Price Gainers Table */}
          <div className="group relative">
            <div className="fq-ring opacity-35 bg-gradient-to-br from-emerald-500 to-green-500" />
            <div className="fq-glass overflow-hidden border border-white/10 bg-zinc-950/80">
              <div className="px-6 py-4 flex items-center justify-between border-b border-white/5 bg-white/[0.01]">
                <div className="flex items-center gap-2">
                  <TrendingUp className="text-emerald-400" size={18} />
                  <h3 className="font-bold text-white text-base">Top Price Gainers</h3>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20 uppercase tracking-wider">
                  Live
                </span>
              </div>
              <div className="p-4 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                      <th className="py-2.5 px-3">Symbol</th>
                      <th className="py-2.5 px-3 text-right">LTP (₹)</th>
                      <th className="py-2.5 px-3 text-right">Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gainers.map((stock, i) => (
                      <tr key={stock.symbol} className="border-b border-white/5 last:border-0 text-xs font-semibold text-gray-300 hover:bg-white/5 transition-colors">
                        <td className="py-3 px-3 flex items-center gap-2">
                          <span className="w-6 h-6 rounded bg-emerald-500/10 text-emerald-400 font-black text-[10px] flex items-center justify-center border border-emerald-500/10">
                            {stock.symbol.charAt(0)}
                          </span>
                          {stock.symbol}
                        </td>
                        <td className="py-3 px-3 text-right text-white">₹{stock.ltp.toLocaleString("en-IN")}</td>
                        <td className="py-3 px-3 text-right text-emerald-400 font-bold">+{stock.pct}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Price Losers Table */}
          <div className="group relative">
            <div className="fq-ring opacity-35 bg-gradient-to-br from-rose-500 to-amber-500" />
            <div className="fq-glass overflow-hidden border border-white/10 bg-zinc-950/80">
              <div className="px-6 py-4 flex items-center justify-between border-b border-white/5 bg-white/[0.01]">
                <div className="flex items-center gap-2">
                  <TrendingDown className="text-rose-400" size={18} />
                  <h3 className="font-bold text-white text-base">Top Price Losers</h3>
                </div>
                <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 text-[10px] font-bold border border-rose-500/20 uppercase tracking-wider">
                  Live
                </span>
              </div>
              <div className="p-4 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                      <th className="py-2.5 px-3">Symbol</th>
                      <th className="py-2.5 px-3 text-right">LTP (₹)</th>
                      <th className="py-2.5 px-3 text-right">Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {losers.map((stock, i) => (
                      <tr key={stock.symbol} className="border-b border-white/5 last:border-0 text-xs font-semibold text-gray-300 hover:bg-white/5 transition-colors">
                        <td className="py-3 px-3 flex items-center gap-2">
                          <span className="w-6 h-6 rounded bg-rose-500/10 text-rose-400 font-black text-[10px] flex items-center justify-center border border-rose-500/10">
                            {stock.symbol.charAt(0)}
                          </span>
                          {stock.symbol}
                        </td>
                        <td className="py-3 px-3 text-right text-white">₹{stock.ltp.toLocaleString("en-IN")}</td>
                        <td className="py-3 px-3 text-right text-rose-400 font-bold">{stock.pct}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Loved by 3,000+ traders (Testimonials 3D stack slider) */}
      <section className="py-16 bg-[#090d0e]/50 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 fq-grid-bg opacity-[0.03] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="fq-section-eyebrow mb-3 mx-auto">
              <Star size={12} className="text-amber-400 fill-amber-400" />
              Testimonials
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
              Loved by <span className="fq-gradient-text">3,000+ active traders</span>
            </h2>
            <p className="text-sm text-gray-400">
              Read how members of the Greenmarket Club are scaling their portfolios.
            </p>
          </div>

          {/* Slider Container */}
          <div className="max-w-2xl mx-auto relative px-10">
            <div className="fq-glass p-8 border border-white/10 bg-zinc-950/80 min-h-[200px] flex flex-col justify-between">
              <div>
                <div className="flex gap-1 mb-4 text-amber-400">
                  {Array(testimonials[activeTestimonial].rating).fill(0).map((_, i) => (
                    <Star key={i} size={16} className="fill-current" />
                  ))}
                </div>
                
                <p className="text-sm sm:text-base text-gray-300 italic mb-6 leading-relaxed">
                  "{testimonials[activeTestimonial].feedback}"
                </p>
              </div>

              <div className="flex justify-between items-end border-t border-white/5 pt-4">
                <div>
                  <h4 className="font-bold text-white text-sm sm:text-base">
                    {testimonials[activeTestimonial].name}
                  </h4>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">
                    {testimonials[activeTestimonial].designation}
                  </p>
                </div>
                
                {/* Dots indicator */}
                <div className="flex gap-1">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTestimonial(i)}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${i === activeTestimonial ? 'w-4 bg-emerald-400' : 'bg-gray-700'}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Slider arrows */}
            <button
              onClick={() => setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-white/10 bg-zinc-950/80 hover:bg-zinc-950 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            >
              ←
            </button>
            <button
              onClick={() => setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-white/10 bg-zinc-950/80 hover:bg-zinc-950 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            >
              →
            </button>
          </div>

          <div className="text-center mt-12">
            <Link
              to="/club"
              className="fq-btn-primary px-8 py-3.5 text-base font-bold shadow-xl shadow-emerald-500/20"
            >
              Join the Greenmarket Club
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
