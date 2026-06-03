import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, MessageSquare, Zap, Target, BookOpen, Crown, CheckCircle2 } from 'lucide-react';

const Club = () => {
  const benefits = [
    {
      icon: MessageSquare,
      title: "Direct WhatsApp Trade Alerts",
      description: "Receive instant buy/sell triggers with precise Entry, Stop-Loss, and Target points directly on WhatsApp so you never miss a move."
    },
    {
      icon: ShieldCheck,
      title: "SEBI Registered Advisory",
      description: "Rest easy knowing all analysis and trades are validated and approved by certified NISM & SEBI-registered research analysts."
    },
    {
      icon: Target,
      title: "Index & Stock Options Strategies",
      description: "Leverage proprietary multi-leg options strategies, BankNifty breakouts, Hero-Zero setups, and high-probability positional picks."
    },
    {
      icon: Zap,
      title: "Algo Automations Support",
      description: "Connect your Demat/broker account via API and auto-execute Greenmarket Club trade recommendations with zero delay."
    },
    {
      icon: BookOpen,
      title: "Exclusive Learning Webinars",
      description: "Join weekly live sessions analyzing current market structures, charting masterclasses, and interactive risk-management training."
    },
    {
      icon: Crown,
      title: "Priority Portfolio Review",
      description: "Starter, Trader, and Pro members get periodic reviews of their portfolios directly by our head advisory desks."
    }
  ];

  return (
    <div className="fq-page min-h-screen pt-28 pb-16 px-4">
      {/* Subtle grid background */}
      <div className="absolute inset-0 fq-grid-bg opacity-[0.03] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Banner header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase bg-amber-500/10 border border-amber-500/20 text-amber-400 mb-6">
            👑 Premium Access
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            Welcome to <span className="fq-gradient-text font-black">Greenmarket Club</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
            The ultimate wealth circle for retail traders. Access institutional-grade signals, automated algo execution, and direct advisory desks.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div 
                key={idx}
                className="group relative"
              >
                <div className="fq-ring opacity-25" />
                <div className="fq-glass p-6 bg-zinc-950/60 border border-white/10 hover:border-emerald-500/20 transition-all duration-300 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                      <Icon size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3">{benefit.title}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">{benefit.description}</p>
                  </div>
                  <div className="mt-6 flex items-center gap-1 text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                    <CheckCircle2 size={12} />
                    Included in membership
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Join CTA Callout */}
        <div className="fq-glass p-8 sm:p-12 text-center bg-zinc-950/40 border border-white/10 max-w-4xl mx-auto rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-50" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
            Ready to trade like a professional?
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            Get instant setup on WhatsApp, Demat sync API keys, and unlock all research indices. Consult our desks for a custom plan.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a 
              href="https://chat.whatsapp.com/G19OxJKfAOU49BtcrGq7YF"
              target="_blank"
              rel="noopener noreferrer"
              className="fq-btn-primary px-8 py-3.5 text-base font-bold shadow-xl shadow-emerald-500/20 hover:scale-105 transition-transform"
            >
              Talk to Advisor Desk
            </a>
            <Link 
              to="/"
              className="fq-btn-ghost px-8 py-3.5 text-base border border-white/10 hover:border-white/20 transition-all"
            >
              View Pricing Plans
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Club;
