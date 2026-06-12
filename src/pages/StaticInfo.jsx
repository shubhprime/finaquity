import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  ShieldCheck, HelpCircle, Users, MessageSquare, 
  Mail, Phone, MapPin, Send, CheckCircle, FileText, ArrowRight
} from 'lucide-react';

const StaticInfo = () => {
  const location = useLocation();
  const path = location.pathname;
  
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');

  // Handle Mock Contact Submit
  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSuccess(true);
    setContactName('');
    setContactEmail('');
    setContactMsg('');
    setTimeout(() => setContactSuccess(false), 4000);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

  // Dynamic Content Renderer
  const renderContent = () => {
    switch (path) {
      case '/about':
        return (
          <div className="space-y-6 text-gray-300 text-sm leading-relaxed">
            <p className="text-base text-white font-semibold">
              Greenmarket is India's leading wealth-tech platform built to democratize institutional-grade market research for retail investors.
            </p>
            <p>
              Founded by SEBI-registered research analysts and algorithmic trading developers, we bridge the gap between high-end quantitative research and retail trading desks. Our platform offers risk-managed swing trade setups, automated technical screeners, and real-time news alerts.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
              <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01]">
                <h4 className="font-bold text-white mb-2">🎯 Our Mission</h4>
                <p className="text-xs text-gray-400">To simplify technical trading and enable retail investors to manage capital systematically.</p>
              </div>
              <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01]">
                <h4 className="font-bold text-white mb-2">🛡️ SEBI Compliance</h4>
                <p className="text-xs text-gray-400">All advisory signals are validated by SEBI-registered specialists with rigorous audit logs.</p>
              </div>
              <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01]">
                <h4 className="font-bold text-white mb-2">⚡ Algorithmic Triggers</h4>
                <p className="text-xs text-gray-400">Utilizing high-speed screeners to identify DMA breakouts and volume surges instantly.</p>
              </div>
            </div>
          </div>
        );
      
      case '/team':
        return (
          <div className="space-y-8">
            <p className="text-gray-300 text-sm leading-relaxed">
              We are a team of quantitative developers, market research specialists, and compliance experts dedicated to providing absolute clarity in financial markets.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="p-6 rounded-xl border border-white/10 bg-zinc-950/60 flex gap-4">
                <span className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-black shrink-0 text-lg">KJ</span>
                <div>
                  <h4 className="font-bold text-white text-base">Kalyanjit</h4>
                  <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider mb-2">Founder & SEBI Research Analyst</p>
                  <p className="text-xs text-gray-400">Lead strategist managing model portfolios and swing advisory execution triggers.</p>
                </div>
              </div>
              <div className="p-6 rounded-xl border border-white/10 bg-zinc-950/60 flex gap-4">
                <span className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-black shrink-0 text-lg">DM</span>
                <div>
                  <h4 className="font-bold text-white text-base">DJ Medhi</h4>
                  <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider mb-2">Co-Founder & Head of Algorithmic Systems</p>
                  <p className="text-xs text-gray-400">Oversees screeners development, automated webhook integrations, and server infrastructure.</p>
                </div>
              </div>
            </div>
          </div>
        );

      case '/contact':
      case '/chat-with-expert':
        return (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-2 space-y-6 text-gray-300 text-sm">
              <p>Have questions about plans, integrations, or SEBI advisory? Our desk is ready to support you.</p>
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-emerald-400" />
                  <span>support@greenmarket.in</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-emerald-400" />
                  <span>+91 80692 27648</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs leading-relaxed">
                    AIC, BIMTECH, Knowledge Park II, Greater Noida, UP 201306
                  </span>
                </div>
              </div>
            </div>
            <div className="md:col-span-3">
              <form onSubmit={handleContactSubmit} className="fq-glass p-6 border border-white/10 bg-zinc-950/40 space-y-4">
                <h4 className="font-bold text-white text-sm">Send a message</h4>
                {contactSuccess && (
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-2 animate-pulse">
                    <CheckCircle size={14} /> Message sent! We will contact you shortly.
                  </div>
                )}
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="fq-input text-xs"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    required
                    placeholder="Your Email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="fq-input text-xs"
                  />
                </div>
                <div>
                  <textarea
                    required
                    rows="3"
                    placeholder="How can we help you?"
                    value={contactMsg}
                    onChange={(e) => setContactMsg(e.target.value)}
                    className="fq-input text-xs py-3 h-auto resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-black font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <Send size={12} /> Submit Query
                </button>
              </form>
            </div>
          </div>
        );

      case '/faqs':
        const faqs = [
          { q: "Is Greenmarket a SEBI registered platform?", a: "Yes, all our advisory signals, entry ranges, and targets are validated by SEBI-registered research analysts before publication." },
          { q: "How does the Zerodha Kite Auto-Trade integration work?", a: "Once you connect your Zerodha Kite broker credentials via our Live Connection Desk, orders are pushed as trigger alerts. You can configure them to auto-execute or prompt you for approval." },
          { q: "How do I receive signals on WhatsApp?", a: "Subscribers of the Trader or Pro plans will receive instant WhatsApp notifications with formatted entry, target, and stop-loss levels immediately when our analysts publish them." },
          { q: "What is your refund/cancellation policy?", a: "You can cancel your subscription at any time. Due to the real-time nature of advisory alerts, we do not offer refunds for active billing cycles." }
        ];
        return (
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="p-5 rounded-xl border border-white/5 bg-white/[0.01] hover:border-emerald-500/10 transition-all">
                <h4 className="font-bold text-white text-sm flex items-center gap-2 mb-2">
                  <HelpCircle size={14} className="text-emerald-400 shrink-0" />
                  {faq.q}
                </h4>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed pl-6">{faq.a}</p>
              </div>
            ))}
          </div>
        );

      case '/PortfolioAdvisory':
        return (
          <div className="space-y-6 text-gray-300 text-sm leading-relaxed">
            <p>Our Portfolio Advisory service offers curated equity baskets designed to outperform benchmarks over medium-to-long horizons.</p>
            <div className="p-6 rounded-xl border border-white/10 bg-zinc-950/80 text-center max-w-xl mx-auto my-8">
              <span className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl mx-auto mb-4 font-bold">💼</span>
              <h4 className="text-base font-bold text-white mb-2">Custom Wealth advisory desks</h4>
              <p className="text-xs text-gray-400 leading-relaxed mb-4">
                Receive customized rebalancing triggers based on market capitalization, relative momentum, and value scorecards. Unlocks with Trader & Pro plans.
              </p>
              <Link to="/club" className="fq-btn-primary px-6 py-2.5 text-xs font-bold inline-flex items-center gap-1">
                Explore Premium Club <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        );

      // Legal Pages
      case '/ReturnAndCancellation':
        return (
          <div className="space-y-4 text-xs sm:text-sm text-gray-400 leading-relaxed">
            <h4 className="font-bold text-white text-sm">Subscription Cancellations</h4>
            <p>Users can cancel their automated monthly or annual recurring billing cycles directly from their dashboard. Cancellations prevent the next cycle from charging.</p>
            <h4 className="font-bold text-white text-sm">Refund Policy</h4>
            <p>Given the digital and real-time delivery nature of research recommendation logs, advisory reports, and signals, we maintain a strict no-refund policy for current billing periods. Please evaluate our free technical indicators and screeners before purchasing a club plan.</p>
          </div>
        );

      case '/TermsAndConditions':
        return (
          <div className="space-y-4 text-xs sm:text-sm text-gray-400 leading-relaxed">
            <h4 className="font-bold text-white text-sm">Acceptance of Terms</h4>
            <p>By using the Greenmarket website, web applications, or Telegram feeds, you agree to comply with and be bound by these Terms and Conditions.</p>
            <h4 className="font-bold text-white text-sm">User Responsibilities</h4>
            <p>You acknowledge that financial market trading involves substantial risk. You agree that any advisory content, target ranges, or screeners logs are educational recommendations, and you maintain complete financial responsibility for all trades executed on your broker terminals.</p>
          </div>
        );

      case '/PrivacyPolicy':
        return (
          <div className="space-y-4 text-xs sm:text-sm text-gray-400 leading-relaxed">
            <h4 className="font-bold text-white text-sm">Information Collection</h4>
            <p>We collect personal information such as name, email address, phone number, and broker details when you register, subscribe, or link your broker terminal.</p>
            <h4 className="font-bold text-white text-sm">Data Security</h4>
            <p>Your connection details, API keys, and database records are securely stored using advanced encryption protocols. We never share your broker credentials or personal data with third-party advertising companies.</p>
          </div>
        );

      case '/Disclaimer':
        return (
          <div className="space-y-4 text-xs sm:text-sm text-gray-400 leading-relaxed">
            <h4 className="font-bold text-white text-sm">SEBI Disclosure & Disclaimer</h4>
            <p>Greenmarket and its research associates act as SEBI-registered specialists. However, stock markets are subject to system-wide volatility risks.</p>
            <p className="font-semibold text-rose-400 bg-rose-500/5 border border-rose-500/10 p-3 rounded-lg">
              Advisory calls are based on technical and fundamental analysis algorithms and past achievements do not guarantee future returns. Please consult a registered investment advisor before committing capital.
            </p>
          </div>
        );

      default:
        // Default generic placeholder
        return (
          <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
            <p>Detailed information for this section is currently under development by our research team. Check back shortly for updates.</p>
          </div>
        );
    }
  };

  // Setup titles based on pathname
  useEffect(() => {
    const titles = {
      '/about': { t: 'About Greenmarket', s: 'Our mission, SEBI registration, and technology stack.' },
      '/team': { t: 'Meet the Team', s: 'SEBI-registered advisors and quant systems architects.' },
      '/qtr-earnings': { t: 'Quarterly Earnings Desk', s: 'Financial performance reviews and investor briefings.' },
      '/chat-with-expert': { t: 'Chat with an Expert', s: 'Get in touch with a licensed advisory representative.' },
      '/PortfolioAdvisory': { t: 'Portfolio Advisory', s: 'Curated index-outperforming equity portfolios.' },
      '/contact': { t: 'Contact Us', s: 'We are here to support your wealth-tech integration.' },
      '/become-an-affiliate': { t: 'Affiliate Program', s: 'Partner with India\'s premier wealth-tech desk.' },
      '/testimonials': { t: 'Client Testimonials', s: 'Stories and feedback from 3,000+ active members.' },
      '/faqs': { t: 'Frequently Asked Questions', s: 'Clear answers on billing, auto-trade, and advisory calls.' },
      '/ReturnAndCancellation': { t: 'Return & Cancellation', s: 'Policy details regarding billing cycles and returns.' },
      '/TermsAndConditions': { t: 'Terms & Conditions', s: 'Rules, user agreements, and system access policies.' },
      '/PrivacyPolicy': { t: 'Privacy Policy', s: 'How we manage and encrypt your personal and broker data.' },
      '/ShippingPolicy': { t: 'Shipping Policy', s: 'Service delivery criteria for digital Wealth Desk subscriptions.' },
      '/Disclaimer': { t: 'SEBI Disclaimer', s: 'Standard investment alerts, regulatory compliance, and risk disclosures.' }
    };
    
    const current = titles[path] || { t: 'Information Desk', s: 'Greenmarket portal intelligence desk.' };
    setTitle(current.t);
    setSubtitle(current.s);
  }, [path]);

  return (
    <div className="fq-page min-h-screen pt-28 pb-16 px-4">
      {/* Subtle grid background */}
      <div className="absolute inset-0 fq-grid-bg opacity-[0.03] pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Banner Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <FileText size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-white">{title}</h1>
              <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
            </div>
          </div>
          <Link to="/" className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300 font-bold hover:bg-white/10 transition-colors">
            Back to Home
          </Link>
        </div>

        {/* Content Box */}
        <div className="fq-glass p-8 border border-white/10 bg-zinc-950/80">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default StaticInfo;
