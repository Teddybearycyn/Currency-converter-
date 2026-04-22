/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ReactNode } from 'react';
import Background from './components/Background';
import ConverterCard from './components/ConverterCard';
import { motion } from 'motion/react';
import { Globe, ShieldCheck, Zap } from 'lucide-react';

export default function App() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-6 md:p-12 selection:bg-blue-500/30">
      <Background />

      {/* Floating Header */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute top-0 left-0 right-0 px-8 flex justify-between items-center z-50 py-8 lg:px-12 pointer-events-none"
      >
        <div className="flex items-center gap-2 pointer-events-auto cursor-default">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Globe className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight uppercase text-white">Lumina<span className="text-blue-500">FX</span></span>
        </div>
        
        <div className="hidden md:flex gap-10 items-center pointer-events-auto">
          <NavLink href="#" label="Converter" active />
          <NavLink href="#" label="Markets" />
          <NavLink href="#" label="Enterprise" />
          <NavLink href="#" label="API" />
        </div>

        <button className="hidden md:block pointer-events-auto px-6 py-2 bg-slate-800 border border-slate-700 rounded-full text-xs font-semibold hover:bg-slate-700 transition-all text-white uppercase tracking-wider">
          Sign In
        </button>
      </motion.nav>

      {/* Hero Section */}
      <div className="w-full max-w-6xl flex flex-col items-center gap-16 md:gap-20 relative z-10 text-center pt-20">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold text-blue-400 tracking-[0.2em] uppercase">
            Institutional Grade Data
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tight max-w-4xl mx-auto leading-[1.05] bg-gradient-to-b from-white to-slate-400 text-transparent bg-clip-text">
            Global Currency Intelligence
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
            Premium real-time exchange rates with global precision and fluid 3D-layered visualization for the modern era.
          </p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4, type: "spring", stiffness: 100 }}
          className="w-full flex justify-center"
        >
          <ConverterCard />
        </motion.div>

        {/* Feature Grid */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.6
              }
            }
          }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-4xl"
        >
          <StatusCard label="GBP / USD" value="1.214" trend="+0.12%" up />
          <StatusCard label="USD / JPY" value="149.82" trend="-0.04%" />
          <StatusCard label="BTC / USD" value="34,120" trend="+4.82%" up />
          <StatusCard label="ETH / USD" value="1,842.1" trend="+1.20%" up />
        </motion.div>
      </div>

      {/* Footer Decoration */}
      <footer className="absolute bottom-8 w-full px-12 flex justify-between text-[10px] text-slate-600 font-bold uppercase tracking-[0.2em]">
        <span>© 2023 Lumina Financial Systems</span>
        <div className="hidden md:flex gap-8">
          <span>Market Status: Open</span>
          <span>Latency: 14ms</span>
        </div>
      </footer>
    </main>
  );
}

function NavLink({ href, label, active }: { href: string; label: string; active?: boolean }) {
  return (
    <a 
      href={href} 
      className={`text-xs font-bold uppercase tracking-[0.2em] transition-all pb-1 border-b-2 ${
        active ? 'text-white border-blue-500' : 'text-slate-400 border-transparent hover:text-white'
      }`}
    >
      {label}
    </a>
  )
}

function StatusCard({ label, value, trend, up }: { label: string; value: string; trend: string; up?: boolean }) {
  return (
    <motion.div 
      variants={{
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
      }}
      className="glass p-5 rounded-2xl border border-white/5 text-left"
    >
      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-2">{label}</p>
      <div className="flex items-baseline gap-2">
        <span className="text-xl font-semibold text-white tracking-tight">{value}</span>
        <span className={`text-[10px] font-bold ${up ? 'text-emerald-400' : 'text-rose-400'}`}>{trend}</span>
      </div>
    </motion.div>
  );
}
