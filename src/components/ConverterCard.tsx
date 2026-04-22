/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo, type MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ArrowLeftRight, RefreshCw, ChevronDown, TrendingUp } from 'lucide-react';
import { currencies, getExchangeRates, type ExchangeRates } from '../services/currencyService';

export default function ConverterCard() {
  const [amount, setAmount] = useState<number>(100);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [rates, setRates] = useState<ExchangeRates>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mouse perspective animation
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-300, 300], [10, -10]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-300, 300], [-10, 10]), { stiffness: 300, damping: 30 });

  function handleMouseMove(event: MouseEvent) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  useEffect(() => {
    fetchRates();
  }, [fromCurrency]);

  const fetchRates = async () => {
    setLoading(true);
    try {
      const data = await getExchangeRates(fromCurrency);
      setRates(data.rates);
      setError(null);
    } catch (err) {
      setError('Failed to refresh rates');
    } finally {
      setLoading(false);
    }
  };

  const convertedAmount = useMemo(() => {
    if (!rates[toCurrency]) return 0;
    return amount * rates[toCurrency];
  }, [amount, toCurrency, rates]);

  const rate = rates[toCurrency] || 0;

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        perspective: 1000,
      }}
      className="relative w-full max-w-lg"
    >
      {/* Card Glow Background */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-[2.5rem] blur-2xl opacity-50" />
      
      <div className="relative glass p-8 md:p-10 rounded-[2.5rem] shadow-2xl flex flex-col gap-8">
        <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
        
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-display font-semibold tracking-tight text-white/90">Currency Converter</h1>
            <p className="text-sm text-slate-400 mt-1">Real-time global exchange rates</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={fetchRates}
            className="p-3 rounded-2xl bg-slate-950/50 hover:bg-slate-900 border border-slate-800 transition-colors group"
          >
            <RefreshCw className={`w-5 h-5 text-slate-500 group-hover:text-white transition-transform ${loading ? 'animate-spin' : ''}`} />
          </motion.button>
        </div>

        <div className="space-y-6">
          {/* Input Amount */}
          <div className="space-y-2 text-left">
            <label className="text-[10px] uppercase font-bold tracking-widest text-slate-500 ml-1">Amount to Convert</label>
            <div className="relative group">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl p-4 text-2xl font-semibold outline-none focus:border-blue-500/50 transition-all placeholder:text-slate-700 text-white"
                placeholder="0.00"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold bg-slate-800 px-3 py-1.5 rounded-lg text-sm">
                {fromCurrency}
              </div>
            </div>
          </div>

          {/* Currencies Row */}
          <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-4">
            <CurrencySelector 
              label="From" 
              value={fromCurrency} 
              onChange={setFromCurrency} 
            />
            
            <motion.button
              whileHover={{ rotate: 180, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              onClick={swapCurrencies}
              className="mt-6 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/40 text-white"
            >
              <ArrowLeftRight className="w-5 h-5" />
            </motion.button>

            <CurrencySelector 
              label="To" 
              value={toCurrency} 
              onChange={setToCurrency} 
            />
          </div>
        </div>

        {/* Result Area */}
        <div className="mt-4 pt-8 border-t border-white/5">
          <div className="flex flex-col items-center text-center">
            <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-2">
              Converted Amount
            </p>
            <div className="text-4xl md:text-5xl font-display font-bold text-blue-400 tracking-tight">
              {convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {toCurrency}
            </div>
            
            <div className="mt-8 pt-8 w-full flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/5">
              <div className="flex items-center gap-6">
                <div className="text-left">
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Current Rate</p>
                  <p className="text-lg font-medium text-white">1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}</p>
                </div>
              </div>
              <button className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl font-bold text-xs tracking-widest shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 transition-all text-white uppercase">
                Get Live Alerts
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface CurrencySelectorProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
}

function CurrencySelector({ label, value, onChange }: CurrencySelectorProps) {
  return (
    <div className="space-y-2 text-left">
      <label className="text-[10px] uppercase font-bold tracking-widest text-slate-500 ml-1">{label}</label>
      <div className="relative group">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-slate-950/50 border border-slate-800 rounded-2xl p-4 pr-10 text-sm font-bold outline-none focus:border-blue-500/50 transition-all cursor-pointer text-white"
        >
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code} className="bg-slate-950 text-white">
              {currency.code} - {currency.name}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none group-focus-within:text-blue-500 transition-colors" />
      </div>
    </div>
  );
}
