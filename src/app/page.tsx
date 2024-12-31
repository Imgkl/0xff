"use client";

import Preloader from '@/components/HeroSection';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Preloader onLoadingComplete={() => setIsLoading(false)} />
        ) : (
          <motion.div 
            className="w-full h-full flex justify-center items-center p-4 bg-white"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
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
