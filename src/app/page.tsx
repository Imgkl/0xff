"use client";

import Preloader from '@/components/HeroSection';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-white">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="preloader"
            className="absolute inset-0 z-50 bg-white"
            exit={{
              y: "-100%",
              transition: {
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1],
              },
            }}
          >
            <Preloader onLoadingComplete={() => setIsLoading(false)} />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            className="w-full h-full flex justify-center items-start px-6 flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            <div className="flex flex-col items-center justify-center w-full gap-5">
              <h1 className="text-5xl text-black tracking-[-0.1em] MinimalMono font-bold">
                0xff
              </h1>
              <p className="text-xl  text-black InstrumentSerif tracking-wide">
                <span className="cmd-key">⌘</span> + C and{" "}
                <span className="cmd-key ml-2">⌘</span> + V your next
                components.
              </p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                style={{ 
                  perspective: '1000px',
                  transformStyle: 'preserve-3d'
                }}
              >
                <motion.p 
                  className="text-xl text-black MinimalMono italic"
                  initial={{ rotateX: 0, rotateY: 0 }}
                  whileHover={{ scale: 1.02 }}
                  onMouseMove={(e) => {
                    const { currentTarget: target } = e;
                    const rect = target.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const rotateX = ((y - centerY) / centerY) * 10;
                    const rotateY = ((x - centerX) / centerX) * 10;
                    
                    target.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
                  }}
                  style={{
                    display: 'inline-block',
                    transition: 'transform 0.3s cubic-bezier(0.76, 0, 0.24, 1)'
                  }}
                >
                  Coming soon
                </motion.p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
