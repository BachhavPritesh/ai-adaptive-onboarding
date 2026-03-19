import React from 'react';
import { motion } from 'framer-motion';

const BackgroundEffects = () => {
  return (
    <div className="global-bg-effects">
      {/* Animated Gradient Orbs */}
      <motion.div
        className="bg-glow orb-1"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="bg-glow orb-2"
        animate={{
          x: [0, -150, 0],
          y: [0, 100, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="bg-glow orb-3"
        animate={{
          x: [0, 80, 0],
          y: [0, -60, 0],
          scale: [1, 1.15, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Noise Texture Overlay */}
      <div className="noise-overlay"></div>

      {/* Grid Pattern */}
      <div className="grid-bg"></div>
    </div>
  );
};

export default BackgroundEffects;
