import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, TrendingUp, Sparkles, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

const Screener = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [screenerType, setScreenerType] = useState('fundamental');
  const [activeFilter, setActiveFilter] = useState('undervalued');

  const fundamentalFilters = [
    { id: 'undervalued', label: 'Undervalued Stocks' },
    { id: 'dividend', label: 'High Dividend Yield' },
    { id: 'growth', label: 'Potential Growth' },
    { id: 'stable', label: 'Stable Bluechips' },
    { id: 'debt', label: 'Low Debt Outperformers' }
  ];

  const technicalFilters = [
    { id: 'golden-cross', label: 'Golden Cross Over' },
    { id: 'volume', label: 'High Volume Breakout' },
    { id: 'high-52w', label: '52-Week High Breakout' },
    { id: 'oversold', label: 'RSI Oversold Bounce' },
    { id: 'dma200', label: 'Above 200 DMA' }
  ];

  // Mock Stock Data
  const stockDatabase = {
    undervalued: [
      { symbol: "TATA STEEL", sector: "Metals", price: 174.50, pe: 11.2, divYield: 2.1, mcap: "₹2.17T", score: "Very Safe" },
      { symbol: "ONGC", sector: "Energy", price: 268.40, pe: 6.8, divYield: 4.8, mcap: "₹3.37T", score: "Fairly Priced" },
      { symbol: "GAIL", sector: "Utilities", price: 198.15, pe: 9.2, divYield: 3.4, mcap: "₹1.30T", score: "Very Safe" },
      { symbol: "NTPC", sector: "Utilities", price: 362.40, pe: 14.5, divYield: 2.5, mcap: "₹3.51T", score: "Very Safe" },
      { symbol: "WIPRO", sector: "IT Services", price: 472.10, pe: 18.2, divYield: 1.8, mcap: "₹2.46T", score: "Undervalued" }
    ],
    dividend: [
      { symbol: "COAL INDIA", sector: "Mining", price: 442.50, pe: 8.5, divYield: 6.2, mcap: "₹2.72T", score: "Stable" },
      { symbol: "REC LTD", sector: "NBFC", price: 512.40, pe: 7.2, divYield: 5.5, mcap: "₹1.34T", score: "High Growth" },
      { symbol: "PFC", sector: "NBFC", price: 485.10, pe: 6.5, divYield: 5.2, mcap: "₹1.60T", score: "Stable" },
      { symbol: "IOC", sector: "Energy", price: 168.30, pe: 5.9, divYield: 5.8, mcap: "₹2.37T", score: "Fairly Priced" },
      { symbol: "HINDUSTAN ZINC", sector: "Metals", price: 620.40, pe: 24.1, divYield: 8.4, mcap: "₹2.62T", score: "Overvalued" }
    ],
    growth: [
      { symbol: "TATA MOTORS", sector: "Automotive", price: 982.40, pe: 22.4, divYield: 0.6, mcap: "₹3.25T", score: "High Growth" },
      { symbol: "HAL", sector: "Defense", price: 4120.80, pe: 38.5, divYield: 0.8, mcap: "₹2.75T", score: "Very High" },
      { symbol: "BEL", sector: "Defense", price: 285.40, pe: 32.1, divYield: 1.2, mcap: "₹2.08T", score: "High Growth" },
      { symbol: "ZOMATO", sector: "Internet", price: 188.50, pe: 85.0, divYield: 0.0, mcap: "₹1.65T", score: "Extreme" },
      { symbol: "TRENT", sector: "Retail", price: 4620.10, pe: 92.5, divYield: 0.2, mcap: "₹1.64T", score: "Extreme" }
    ],
    stable: [
      { symbol: "RELIANCE", sector: "Conglomerate", price: 2942.10, pe: 26.2, divYield: 0.3, mcap: "₹19.90T", score: "Safe" },
      { symbol: "TCS", sector: "IT Services", price: 3820.40, pe: 28.5, divYield: 1.5, mcap: "₹13.97T", score: "Safe" },
      { symbol: "HDFC BANK", sector: "Banking", price: 1614.50, pe: 18.4, divYield: 1.2, mcap: "₹12.28T", score: "Safe" },
      { symbol: "INFOSYS", sector: "IT Services", price: 1485.30, pe: 22.1, divYield: 2.4, mcap: "₹6.16T", score: "Safe" },
      { symbol: "L&T", sector: "Engineering", price: 3512.40, pe: 34.2, divYield: 0.8, mcap: "₹4.92T", score: "Safe" }
    ],
    debt: [
      { symbol: "INFOSYS", sector: "IT Services", price: 1485.30, pe: 22.1, divYield: 2.4, mcap: "₹6.16T", score: "Zero Debt" },
      { symbol: "TCS", sector: "IT Services", price: 3820.40, pe: 28.5, divYield: 1.5, mcap: "₹13.97T", score: "Zero Debt" },
      { symbol: "COAL INDIA", sector: "Mining", price: 442.50, pe: 8.5, divYield: 6.2, mcap: "₹2.72T", score: "Low Debt" },
      { symbol: "ITC", sector: "FMCG", price: 432.10, pe: 25.4, divYield: 3.1, mcap: "₹5.39T", score: "Zero Debt" },
      { symbol: "HINDUSTAN UNILEVER", sector: "FMCG", price: 2380.50, pe: 54.2, divYield: 1.6, mcap: "₹5.59T", score: "Zero Debt" }
    ],
    // Technical cross overs
    'golden-cross': [
      { symbol: "TATA MOTORS", sector: "Automotive", price: 982.40, rsi: 62.4, signal: "Strong Bullish", sma50: 940.5, sma200: 890.2 },
      { symbol: "BHARTI AIRTEL", sector: "Telecom", price: 1380.15, rsi: 65.8, signal: "Bullish Cross", sma50: 1310.2, sma200: 1250.4 },
      { symbol: "AXIS BANK", sector: "Banking", price: 1142.10, rsi: 59.2, signal: "Bullish Cross", sma50: 1110.4, sma200: 1090.8 },
      { symbol: "MAHINDRA & MAHINDRA", sector: "Automotive", price: 2480.60, rsi: 68.1, signal: "Strong Bullish", sma50: 2320.1, sma200: 2190.5 }
    ],
    volume: [
      { symbol: "COAL INDIA", sector: "Mining", price: 442.50, rsi: 68.2, signal: "Volume Spike", sma50: 420.4, sma200: 395.2 },
      { symbol: "REC LTD", sector: "NBFC", price: 512.40, rsi: 72.5, signal: "Breakout", sma50: 475.2, sma200: 420.8 },
      { symbol: "IOC", sector: "Energy", price: 168.30, rsi: 64.0, signal: "Volume Spike", sma50: 160.1, sma200: 154.5 },
      { symbol: "POWER GRID", sector: "Utilities", price: 310.40, rsi: 61.2, signal: "Breakout", sma50: 295.4, sma200: 282.1 }
    ],
    'high-52w': [
      { symbol: "HAL", sector: "Defense", price: 4120.80, rsi: 74.2, signal: "ATH Breakout", sma50: 3820.1, sma200: 3450.4 },
      { symbol: "TRENT", sector: "Retail", price: 4620.10, rsi: 78.5, signal: "ATH Breakout", sma50: 4210.8, sma200: 3820.1 },
      { symbol: "BEL", sector: "Defense", price: 285.40, rsi: 71.0, signal: "ATH Breakout", sma50: 260.4, sma200: 220.8 }
    ],
    oversold: [
      { symbol: "HCL TECH", sector: "IT Services", price: 1320.15, rsi: 28.5, signal: "Oversold Buy", sma50: 1410.2, sma200: 1390.4 },
      { symbol: "TECH MAHINDRA", sector: "IT Services", price: 1285.50, rsi: 26.1, signal: "Oversold Buy", sma50: 1360.5, sma200: 1340.2 },
      { symbol: "WIPRO", sector: "IT Services", price: 472.10, rsi: 31.4, signal: "Near Support", sma50: 495.2, sma200: 480.8 }
    ],
    dma200: [
      { symbol: "RELIANCE", sector: "Conglomerate", price: 2942.10, rsi: 52.4, signal: "Above 200dma", sma50: 2910.4, sma200: 2840.1 },
      { symbol: "TCS", sector: "IT Services", price: 3820.40, rsi: 54.1, signal: "Above 200dma", sma50: 3790.2, sma200: 3680.4 },
      { symbol: "HDFC BANK", sector: "Banking", price: 1614.50, rsi: 48.2, signal: "Above 200dma", sma50: 1590.5, sma200: 1530.2 }
    ]
  };

  // Toggle filter list
  const filters = screenerType === 'fundamental' ? fundamentalFilters : technicalFilters;
  const currentStocks = stockDatabase[activeFilter] || [];

  // Map backend query parameter endpoints to component states
  const endpoint = searchParams.get('endpoint');
  
  useEffect(() => {
    if (endpoint) {
      const mappings = {
        'undervalued': { type: 'fundamental', filter: 'undervalued' },
        'high-dividend': { type: 'fundamental', filter: 'dividend' },
        'growth': { type: 'fundamental', filter: 'growth' },
        'stable': { type: 'fundamental', filter: 'stable' },
        'book-value': { type: 'fundamental', filter: 'debt' },
        'golden-cross': { type: 'technical', filter: 'golden-cross' },
        'high-volume': { type: 'technical', filter: 'volume' },
        'new-high': { type: 'technical', filter: 'high-52w' },
        'near-high': { type: 'technical', filter: 'oversold' },
        'gap-up': { type: 'technical', filter: 'dma200' }
      };
      const match = mappings[endpoint];
      if (match) {
        setScreenerType(match.type);
        setActiveFilter(match.filter);
      }
    }
  }, [endpoint]);

  const syncUrl = (filterId) => {
    const reverseMappings = {
      'undervalued': 'undervalued',
      'dividend': 'high-dividend',
      'growth': 'growth',
      'stable': 'stable',
      'debt': 'book-value',
      'golden-cross': 'golden-cross',
      'volume': 'high-volume',
      'high-52w': 'new-high',
      'oversold': 'near-high',
      'dma200': 'gap-up'
    };
    setSearchParams({ endpoint: reverseMappings[filterId] || filterId });
  };

  const handleTypeChange = (type) => {
    setScreenerType(type);
    const defaultFilter = type === 'fundamental' ? 'undervalued' : 'golden-cross';
    setActiveFilter(defaultFilter);
    syncUrl(defaultFilter);
  };

  const handleFilterClick = (filterId) => {
    setActiveFilter(filterId);
    syncUrl(filterId);
  };

  return (
    <div className="fq-page min-h-screen pt-28 pb-16 px-4">
      {/* Subtle grid background */}
      <div className="absolute inset-0 fq-grid-bg opacity-[0.03] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Banner header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-4">
            <SlidersHorizontal size={12} />
            Instant Screening
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-3">
            Equity <span className="fq-gradient-text">Stock Screener</span>
          </h1>
          <p className="text-sm text-gray-400 leading-relaxed">
            Scan and filter Nifty 50 and midcap stocks using premium mathematical triggers. Spot breakouts, value traps, and high-growth options instantly.
          </p>
        </div>

        {/* Selector Tabs */}
        <div className="flex justify-center mb-8">
          <div className="p-1 rounded-full bg-zinc-900 border border-white/10 flex gap-2">
            <button
              onClick={() => handleTypeChange('fundamental')}
              className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all ${screenerType === 'fundamental' ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-black shadow' : 'text-gray-400 hover:text-white'}`}
            >
              Fundamental Screener
            </button>
            <button
              onClick={() => handleTypeChange('technical')}
              className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all ${screenerType === 'technical' ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-black shadow' : 'text-gray-400 hover:text-white'}`}
            >
              Technical Screener
            </button>
          </div>
        </div>

        {/* Filter Badges list */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10 max-w-4xl mx-auto">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => handleFilterClick(filter.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all ${activeFilter === filter.id ? 'bg-emerald-500/10 border-emerald-400 text-emerald-400' : 'bg-zinc-900/40 border-white/5 text-gray-400 hover:border-white/10 hover:text-white'}`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Screener Table */}
        <div className="fq-glass border border-white/10 bg-zinc-950/80 overflow-hidden max-w-5xl mx-auto">
          <div className="px-6 py-4 flex items-center justify-between border-b border-white/5 bg-white/[0.01]">
            <div className="flex items-center gap-2">
              <Filter className="text-emerald-400" size={16} />
              <h3 className="font-bold text-white text-base">Scan Results</h3>
            </div>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
              {currentStocks.length} Stocks Found
            </span>
          </div>

          <div className="overflow-x-auto">
            {screenerType === 'fundamental' ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                    <th className="py-3 px-6">Symbol</th>
                    <th className="py-3 px-6">Sector</th>
                    <th className="py-3 px-6 text-right">LTP (₹)</th>
                    <th className="py-3 px-6 text-right">P/E Ratio</th>
                    <th className="py-3 px-6 text-right">Div. Yield</th>
                    <th className="py-3 px-6 text-right">Market Cap</th>
                    <th className="py-3 px-6 text-right">Advisory Call</th>
                  </tr>
                </thead>
                <tbody>
                  {currentStocks.map((stock, i) => (
                    <tr key={i} className="border-b border-white/5 last:border-0 text-xs font-semibold text-gray-300 hover:bg-white/5 transition-colors">
                      <td className="py-4 px-6 text-white font-bold">{stock.symbol}</td>
                      <td className="py-4 px-6 text-gray-400">{stock.sector}</td>
                      <td className="py-4 px-6 text-right">₹{stock.price.toLocaleString("en-IN")}</td>
                      <td className="py-4 px-6 text-right text-emerald-400">{stock.pe}</td>
                      <td className="py-4 px-6 text-right">{stock.divYield}%</td>
                      <td className="py-4 px-6 text-right">{stock.mcap}</td>
                      <td className="py-4 px-6 text-right">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] uppercase font-bold tracking-wider">
                          {stock.score}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                    <th className="py-3 px-6">Symbol</th>
                    <th className="py-3 px-6">Sector</th>
                    <th className="py-3 px-6 text-right">LTP (₹)</th>
                    <th className="py-3 px-6 text-right">RSI (14)</th>
                    <th className="py-3 px-6 text-right">50 SMA (₹)</th>
                    <th className="py-3 px-6 text-right">200 SMA (₹)</th>
                    <th className="py-3 px-6 text-right">Technical Call</th>
                  </tr>
                </thead>
                <tbody>
                  {currentStocks.map((stock, i) => (
                    <tr key={i} className="border-b border-white/5 last:border-0 text-xs font-semibold text-gray-300 hover:bg-white/5 transition-colors">
                      <td className="py-4 px-6 text-white font-bold">{stock.symbol}</td>
                      <td className="py-4 px-6 text-gray-400">{stock.sector}</td>
                      <td className="py-4 px-6 text-right">₹{stock.price.toLocaleString("en-IN")}</td>
                      <td className="py-4 px-6 text-right text-amber-400">{stock.rsi}</td>
                      <td className="py-4 px-6 text-right">₹{stock.sma50.toLocaleString("en-IN")}</td>
                      <td className="py-4 px-6 text-right">₹{stock.sma200.toLocaleString("en-IN")}</td>
                      <td className="py-4 px-6 text-right">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] uppercase font-bold tracking-wider">
                          {stock.signal}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Screener;
