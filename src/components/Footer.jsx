import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Sparkles, Heart, Facebook, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navigationColumns = [
    {
      title: "Other Links",
      items: [
        { label: "About Us", href: "/about" },
        { label: "Our Team", href: "/team" },
        { label: "Qtr Earnings", href: "/qtr-earnings" },
        { label: "Chat with Expert", href: "/chat-with-expert" },
        { label: "Portfolio Advisory", href: "/PortfolioAdvisory" }
      ]
    },
    {
      title: "Support",
      items: [
        { label: "Contact Us", href: "/contact" },
        { label: "Our Success", href: "/PastPerformance" },
        { label: "Become an Affiliate", href: "/become-an-affiliate" },
        { label: "Testimonials", href: "/testimonials" },
        { label: "FAQ's", href: "/faqs" }
      ]
    },
    {
      title: "Legal",
      items: [
        { label: "Return And Cancellation", href: "/ReturnAndCancellation" },
        { label: "Terms and Conditions", href: "/TermsAndConditions" },
        { label: "Privacy Policy", href: "/PrivacyPolicy" },
        { label: "Shipping Policy", href: "/ShippingPolicy" },
        { label: "Disclaimer", href: "/Disclaimer" }
      ]
    }
  ];

  const socialLinks = [
    { label: "Facebook", href: "https://www.facebook.com/", icon: Facebook, hover: "hover:text-blue-500 hover:border-blue-500/40 hover:bg-blue-500/5" },
    { label: "Instagram", href: "https://www.instagram.com/", icon: Instagram, hover: "hover:text-pink-500 hover:border-pink-500/40 hover:bg-pink-500/5" },
    { label: "Twitter", href: "https://twitter.com/", icon: Twitter, hover: "hover:text-white hover:border-white/40 hover:bg-white/5" },
    { label: "LinkedIn", href: "https://www.linkedin.com/", icon: Linkedin, hover: "hover:text-sky-400 hover:border-sky-400/40 hover:bg-sky-400/5" },
    { label: "YouTube", href: "https://www.youtube.com/", icon: Youtube, hover: "hover:text-red-500 hover:border-red-500/40 hover:bg-red-500/5" }
  ];

  return (
    <footer className="relative mt-20 text-white z-10 bg-[#070a0b]">
      {/* Top Gradient Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />

      {/* Slogan Banner */}
      <div className="relative overflow-hidden bg-[#0a0d0e]/80 border-y border-white/5 py-4">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none fq-grid-bg" />
        <div className="container mx-auto px-4 flex items-center justify-center gap-2 text-center">
          <Sparkles className="h-4 w-4 text-emerald-400 animate-pulse shrink-0" />
          <h2 className="text-xs sm:text-sm font-bold bg-gradient-to-r from-emerald-300 via-teal-300 to-emerald-300 text-transparent bg-clip-text">
            Turn complexity into clarity — trade smart, trade confidently
          </h2>
        </div>
      </div>

      {/* Main Grid */}
      <div className="relative py-12 container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-32 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute bottom-0 -right-32 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
        </div>

        <div className="relative grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Nav Columns */}
          {navigationColumns.map((col, index) => (
            <div key={index} className="col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-emerald-300 via-teal-300 to-emerald-300 bg-clip-text text-transparent">
                  {col.title}
                </h3>
              </div>
              <ul className="space-y-3">
                {col.items.map((item, key) => (
                  <li key={key}>
                    <Link
                      to={item.href}
                      className="group inline-flex items-center text-xs text-gray-400 hover:text-white transition-colors"
                    >
                      <span className="h-1 w-1 rounded-full bg-gray-600 group-hover:bg-emerald-400 mr-2 transition-colors" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Address Column */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-emerald-300 via-teal-300 to-emerald-300 bg-clip-text text-transparent">
                Address
              </h3>
            </div>
            
            <div className="rounded-2xl bg-white/[0.02] border border-white/10 p-4 mb-6">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-xs text-gray-300 leading-relaxed">
                  Atal Incubation Centre, BIRLA INSTITUTE OF MANAGEMENT TECHNOLOGY, Plot No. 5, BIMTECH Second, Knowledge Park II, Greater Noida, Uttar Pradesh 201306
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-emerald-300 via-teal-300 to-emerald-300 bg-clip-text text-transparent">
                Backed By
              </h3>
            </div>
            
            <div className="inline-block rounded-xl border border-white/10 bg-white/[0.02] p-4 hover:border-emerald-400/30 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-bold border border-emerald-500/20">
                  AIC
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Atal Incubation Centre</h4>
                  <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">BIMTECH Incubation</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Bar */}
        <div className="mt-12 flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-2xl bg-white/[0.02] border border-white/10 px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="text-sm font-semibold text-white">Follow us for live insights</h3>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`h-9 w-9 rounded-xl bg-white/[0.04] border border-white/10 text-gray-400 flex items-center justify-center transition-all duration-300 ${social.hover}`}
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Legal & Disclaimers */}
        <div className="mt-8 pt-6 border-t border-white/5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-center md:text-left">
            <p className="text-xs font-semibold text-gray-400">
              © {currentYear} Greenmarket — All rights reserved
            </p>
            <p className="text-xs text-gray-500 flex items-center justify-center md:justify-end gap-1.5">
              Built with <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" /> for everyone who loves to learn, trade & invest
            </p>
          </div>
          
          <div className="mt-4 text-[10px] text-gray-500 leading-relaxed space-y-2">
            <p>
              Trading is risky, especially with leverage. Greenmarket isn't a financial advisor. You're responsible for your decisions; we assume no liability.
            </p>
            <p>
              The above analysis is for educational purposes only, based on research, and not a recommendation to buy or sell. Always consult your financial advisor before making any investment decisions.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
