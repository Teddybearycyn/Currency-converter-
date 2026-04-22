/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-mesh opacity-50" />
      
      {/* Animated Orbs */}
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-600/10 blur-[120px]"
      />
      
      <motion.div
        animate={{
          x: [0, -50, 0],
          y: [0, 60, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-600/15 blur-[120px]"
      />

      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, -100, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-[20%] right-[10%] w-[25vw] h-[25vw] rounded-full bg-emerald-500/5 blur-[80px]"
      />

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{ 
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }} 
      />
    </div>
  );
}
