import { Outlet } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import { Bot, Siren, ShieldAlert, Zap, SquareCheck, BotIcon } from 'lucide-react';

export default function AuthLayout() {
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-base-300 text-base-content relative">
      {/* Top Right Theme Toggle */}
      <div className="absolute top-5 right-5 z-50">
        <ThemeToggle />
      </div>

      {/* Left Branding Side (Visible on Mobile & Stacks on Desktop) */}
      <div className="flex flex-col w-full lg:w-1/2 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-12 gap-y-10 relative overflow-hidden text-white min-h-[50vh] lg:min-h-screen">
        {/* 🔴 BACKGROUND EFFECTS */}
        <div className="absolute top-5 right-5 w-96 h-96 bg-cyan-400/40 rounded-full blur-3xl pointer-events-none z-0"></div>
        <div className="absolute bottom-5 left-5 w-96 h-96 bg-teal-400/30 rounded-full blur-3xl pointer-events-none z-0"></div>

        {/* 🌐 CENTERED & BIGGER 3D AI TECH CONSTELLATION ORB */}
        <svg
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[750px] h-[600px] sm:h-[750px] pointer-events-none z-0 opacity-45 overflow-visible"
          viewBox="0 0 500 500"
        >
          <defs>
            <radialGradient id="orbGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#0D9488" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#080C14" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.35" />
            </linearGradient>
          </defs>

          <circle cx="250" cy="250" r="200" fill="url(#orbGlow)" />
          <ellipse cx="250" cy="250" rx="190" ry="60" stroke="url(#lineGrad)" strokeWidth="1.5" fill="none" strokeDasharray="6 4" />
          <ellipse cx="250" cy="250" rx="190" ry="120" stroke="url(#lineGrad)" strokeWidth="1.5" fill="none" />
          <ellipse cx="250" cy="250" rx="190" ry="170" stroke="url(#lineGrad)" strokeWidth="1.5" fill="none" strokeDasharray="4 4" />
          <ellipse cx="250" cy="250" rx="60" ry="190" stroke="url(#lineGrad)" strokeWidth="1.5" fill="none" />
          <ellipse cx="250" cy="250" rx="120" ry="190" stroke="url(#lineGrad)" strokeWidth="1.5" fill="none" strokeDasharray="8 4" />
          <ellipse cx="250" cy="250" rx="170" ry="190" stroke="url(#lineGrad)" strokeWidth="1.5" fill="none" />
          <circle cx="250" cy="250" r="215" stroke="#00D4FF" strokeWidth="1" strokeDasharray="12 12" fill="none" opacity="0.35" />
          <line x1="160" y1="180" x2="250" y2="250" stroke="#00D4FF" strokeWidth="1" opacity="0.6" />
          <line x1="340" y1="180" x2="250" y2="250" stroke="#00D4FF" strokeWidth="1" opacity="0.6" />
          <line x1="190" y1="310" x2="250" y2="250" stroke="#10B981" strokeWidth="1" opacity="0.6" />
          <line x1="310" y1="310" x2="250" y2="250" stroke="#8B5CF6" strokeWidth="1" opacity="0.6" />

          <g className="animate-pulse">
            <circle cx="250" cy="250" r="7.5" fill="#00D4FF" />
            <circle cx="160" cy="180" r="5" fill="#00D4FF" />
            <circle cx="340" cy="180" r="5" fill="#00D4FF" />
            <circle cx="190" cy="310" r="5" fill="#10B981" />
            <circle cx="310" cy="310" r="5" fill="#8B5CF6" />
            <circle cx="250" cy="60" r="4.5" fill="#00D4FF" />
            <circle cx="250" cy="440" r="4.5" fill="#00D4FF" />
          </g>
        </svg>

        {/* Logo & Title */}
        <div className="flex relative z-10 items-center gap-2 text-2xl">
          <span className="text-text-muted border-3 px-3 py-2 font-bold bg-bg-letter">P</span>
          <div className="flex flex-col items-start">
            <h1 className="font-bold tracking-wider text-cyan-400">
              Project Monitor <span className="text-white font-extrabold">AI</span>
            </h1>
            <h2 className="font-semibold tracking-wider text-xs text-text-muted">
              Team Intelligence <span className="text-teal-400 font-extrabold ps-1">Platform</span>
            </h2>
          </div>
        </div>

        {/* Hero / Value Proposition */}
        <div className="flex-col relative z-10 flex justify-start items-start gap-5">
          <div className="flex-col text-5xl sm:text-7xl tracking-[-0.1em] leading-[1em]">
            Your team, <br />
            <span className="text-teal-400">focused</span> <br />
            every day. <br />
          </div>
          <div className="flex-col">
            <p className="text-sm sm:text-md font-bold tracking-wide text-text-secondary w-full sm:w-[70%]">
              AI-powered project management that monitors your team, detects risk before it escalates, and surfaces the insights you need — automatically.
            </p>
          </div>

          <div className="flex flex-col gap-3 w-full max-w-lg">
            {/* Card 1: Critical Risk */}
            <div className="flex items-center justify-between gap-3 text-white bg-white/5 backdrop-blur-md border border-rose-500/20 rounded-xl p-3 transition-all hover:translate-x-1">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  <Siren className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <p className="font-semibold text-xs sm:text-sm">Atlas Redesign — deadline risk</p>
                  <p className="text-[10px] sm:text-xs text-slate-400">AI flagged · 38% done · 2 days left</p>
                </div>
              </div>
              <span className="text-rose-400 bg-rose-500/20 border border-rose-500/30 px-2.5 py-0.5 rounded-full text-xs font-semibold">critical</span>
            </div>

            {/* Card 2: Task Done */}
            <div className="flex items-center justify-between gap-3 text-white bg-white/5 backdrop-blur-md border border-emerald-500/20 rounded-xl p-3 transition-all hover:translate-x-1">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <SquareCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-xs sm:text-sm">Sara K. completed a task</p>
                  <p className="text-[10px] sm:text-xs text-slate-400">Auth flow screens · just now</p>
                </div>
              </div>
              <span className="text-emerald-400 bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-0.5 rounded-full text-xs font-semibold">Done</span>
            </div>

            {/* Card 3: AI Scan Report */}
            <div className="flex items-center justify-between gap-3 text-white bg-white/5 backdrop-blur-md border border-slate-500/20 rounded-xl p-3 transition-all hover:translate-x-1">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <BotIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-xs sm:text-sm">Morning AI scan complete</p>
                  <p className="text-[10px] sm:text-xs text-slate-400">No issues detected · 2 mins ago</p>
                </div>
              </div>
              <span className="text-slate-300 bg-slate-500/20 border border-slate-500/30 px-2.5 py-0.5 rounded-full text-xs font-semibold">Report</span>
            </div>
          </div>
        </div>

        {/* Footer Credit */}
        <p className="text-xs sm:text-sm text-slate-500">© 2026 Project Monitor AI</p>
      </div>

      {/* Right Form Area */}
      <div className="w-full lg:w-1/2 flex-1 flex flex-col items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <Outlet /> {/* Login / Register form renders here */}
        </div>
      </div>
    </div>
  );
}