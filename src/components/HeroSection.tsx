'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ParticleCanvas from './ParticleCanvas';

interface PreloaderProps {
  onLoadingComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onLoadingComplete }) => {
  const [isPopped, setIsPopped] = useState(false);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPopped(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleAnimationComplete = () => {
    setIsAnimationComplete(true);
    setTimeout(() => {
      onLoadingComplete();
    }, 800);
  };

  return (
    <motion.div 
      className="fixed inset-0 z-50"
      exit={{ 
        y: '-100%',
        transition: { 
          duration: 1,
          ease: [0.43, 0.13, 0.23, 0.96]
        }
      }}
    >
      {/* White background with particles */}
      <div className="relative w-full h-full bg-white">
        <ParticleCanvas 
          isExploding={isPopped} 
          onComplete={handleAnimationComplete}
        />
      </div>

      {/* Black overlay that slides up */}
      <motion.div
        className="absolute inset-0 bg-black"
        initial={{ y: '100%' }}
        animate={isAnimationComplete ? { y: 0 } : {}}
        transition={{
          duration: 1,
          ease: [0.43, 0.13, 0.23, 0.96]
        }}
      />
    </motion.div>
  );
};

export default Preloader;
