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
              y: '-100%',
              transition: {
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1]
              }
            }}
          >
            <Preloader onLoadingComplete={() => setIsLoading(false)} />
          </motion.div>
        ) : (
          <motion.div 
            key="content"
            className="w-full h-full flex justify-center items-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1]
            }}
          >
            <h1 className="text-2xl mobile:text-3xl tablet:text-4xl laptop:text-5xl font-bold text-center text-black">
              Hello World
            </h1>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
