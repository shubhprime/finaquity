import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';

// Import Pages
import Home from './pages/Home';
import Club from './pages/Club';
import Screener from './pages/Screener';
import AlgoTrade from './pages/AlgoTrade';
import Success from './pages/Success';
import LoginSignup from './pages/LoginSignup';
import Dashboard from './pages/Dashboard';
import MarketAnalysis from './pages/MarketAnalysis';
import TradeIdeas from './pages/TradeIdeas';
import Admin from './pages/Admin';

function App() {
  return (
    <Router>
      <div className="relative min-h-screen bg-[#070a0b] text-white">
        {/* Navigation bar */}
        <Navbar />

        {/* Page Content Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/club" element={<Club />} />
          <Route path="/screener" element={<Screener />} />
          <Route path="/algo-trade" element={<AlgoTrade />} />
          <Route path="/PastPerformance" element={<Success />} />
          <Route path="/LoginSignup" element={<LoginSignup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<Admin />} />

          {/* Market Pulse Dropdowns */}
          <Route path="/market-news" element={<MarketAnalysis />} />
          <Route path="/FiiDiidata" element={<MarketAnalysis />} />
          <Route path="/top-gainers" element={<MarketAnalysis />} />
          <Route path="/top-losers" element={<MarketAnalysis />} />
          <Route path="/heatmap" element={<MarketAnalysis />} />
          <Route path="/volume-buzzers" element={<MarketAnalysis />} />
          <Route path="/option-chain" element={<MarketAnalysis />} />
          <Route path="/advance-decline" element={<MarketAnalysis />} />
          <Route path="/market-research-indices" element={<MarketAnalysis />} />
          <Route path="/index-analysis" element={<MarketAnalysis />} />
          <Route path="/market-research-sector" element={<MarketAnalysis />} />
          <Route path="/market-research-industry" element={<MarketAnalysis />} />
          <Route path="/market-research-global" element={<MarketAnalysis />} />
          <Route path="/market-research-currencies" element={<MarketAnalysis />} />
          <Route path="/market-research-commodities" element={<MarketAnalysis />} />
          <Route path="/deep-insights" element={<MarketAnalysis />} />
          <Route path="/f-and-o-strategies" element={<MarketAnalysis />} />
          <Route path="/Daily-Stock-Research" element={<MarketAnalysis />} />

          {/* Pro Trade Ideas Dropdowns */}
          <Route path="/swing-trading-ideas" element={<TradeIdeas />} />
          <Route path="/positional-picks" element={<TradeIdeas />} />
          <Route path="/intraday-trades" element={<TradeIdeas />} />
          <Route path="/F&O-Trade" element={<TradeIdeas />} />
          <Route path="/investment-ideas" element={<TradeIdeas />} />
          <Route path="/commodities-trade" element={<TradeIdeas />} />
          <Route path="/crypto-trades" element={<TradeIdeas />} />
          <Route path="/portfolio-hedge-ideas" element={<TradeIdeas />} />

          {/* Fallback to Home */}
          <Route path="*" element={<Home />} />
        </Routes>

        {/* Global Footer */}
        <Footer />

        {/* Floating WhatsApp Widget */}
        <WhatsAppWidget />
      </div>
    </Router>
  );
}

export default App;
