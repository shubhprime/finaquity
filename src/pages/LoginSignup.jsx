import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';

const LoginSignup = () => {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get('mode') === 'signup' ? 'signup' : 'login';
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save user email to localStorage session
    localStorage.setItem("userEmail", email.trim());
    
    // Check if user is an administrator
    const admins = ["kalyanjit@gmail.com", "djmedhi.proedgetrader@gmail.com"];
    if (admins.map(a => a.toLowerCase()).includes(email.trim().toLowerCase())) {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="fq-page min-h-screen pt-28 pb-16 flex items-center justify-center px-4">
      {/* Subtle grid background */}
      <div className="absolute inset-0 fq-grid-bg opacity-[0.03] pointer-events-none z-0" />

      <div className="w-full max-w-md relative z-10">
        <div className="group relative">
          <div className="fq-ring opacity-30" />
          <div className="fq-glass p-8 bg-zinc-950/80 border border-white/10">
            {/* Header logo/badge */}
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-4">
                <ShieldCheck size={12} />
                Secure Onboarding
              </span>
              <h2 className="text-2xl font-extrabold text-white">
                {mode === 'login' ? 'Welcome back to' : 'Join the'} <span className="fq-gradient-text">Greenmarket Portal</span>
              </h2>
              <p className="text-xs text-gray-400 mt-2">
                {mode === 'login' ? 'Access your dashboard and live advisory calls.' : 'Create an account to begin trading with SEBI insights.'}
              </p>
            </div>

            {/* Toggle tabs */}
            <div className="grid grid-cols-2 p-1 rounded-xl bg-zinc-900 border border-white/5 mb-6">
              <button
                type="button"
                onClick={() => setMode('login')}
                className={`py-2 rounded-lg text-xs font-bold transition-all ${mode === 'login' ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-black shadow' : 'text-gray-400'}`}
              >
                Log In
              </button>
              <button
                type="button"
                onClick={() => setMode('signup')}
                className={`py-2 rounded-lg text-xs font-bold transition-all ${mode === 'signup' ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-black shadow' : 'text-gray-400'}`}
              >
                Sign Up
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Full Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="fq-input pl-10 text-xs"
                    />
                    <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="jane@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="fq-input pl-10 text-xs"
                  />
                  <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="fq-input pl-10 text-xs"
                  />
                  <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-black font-bold text-xs shadow hover:shadow-emerald-500/20 transition-all flex items-center justify-center gap-1.5"
              >
                {mode === 'login' ? 'Access Portal' : 'Create Account'}
                <ArrowRight size={14} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
