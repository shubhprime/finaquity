import React, { useState, useEffect, useRef } from 'react';
import { X, MessageSquare, ArrowRight } from 'lucide-react';

const WhatsAppWidget = ({ groupLink = "https://chat.whatsapp.com/G19OxJKfAOU49BtcrGq7YF" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const widgetRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={widgetRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Pop up Card */}
      {isOpen && (
        <div className="mb-4 w-72 p-6 rounded-2xl bg-zinc-950/95 border border-white/10 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-5 duration-300 relative text-center">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 p-1 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <X size={14} />
          </button>
          
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <svg
              viewBox="0 0 24 24"
              width="28"
              height="28"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </div>

          <h4 className="text-lg font-bold text-white mb-1">Be an insider</h4>
          <p className="text-xs text-gray-400 mb-5">Join our exclusive community for live updates and ideas.</p>
          
          <a
            href={groupLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold text-sm shadow-lg hover:shadow-emerald-500/25 hover:scale-105 active:scale-95 transition-all"
          >
            Join WhatsApp
            <ArrowRight size={16} />
          </a>
          
          {/* Down-pointing arrow */}
          <div className="absolute -bottom-2 right-6 w-4 h-4 bg-zinc-950/95 border-r border-b border-white/10 rotate-45" />
        </div>
      )}

      {/* FAB (Floating Action Button) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 text-white flex items-center justify-center shadow-xl hover:scale-110 transition-all hover:shadow-emerald-500/35 relative group"
      >
        {/* Pulse rings */}
        <span className="absolute inset-0 rounded-full border border-emerald-400 animate-ping opacity-25" />
        
        <svg
          viewBox="0 0 24 24"
          width="28"
          height="28"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      </button>
    </div>
  );
};

export default WhatsAppWidget;
