"use client";

import Preloader from "@/components/HeroSection";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-background">
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
            <div className="flex flex-col items-center justify-center w-full gap-10">
              <h1 className="desktop:text-7xl mobile:text-5xl text-black tracking-[-0.1em] MinimalMono font-bold">
                0xff
              </h1>
              <p className="desktop:text-4xl mobile:text-2xl text-center  text-black InstrumentSerif tracking-wide font-bold">
                <span className="cmd-key">⌘</span> + C and{" "}
                <span className="cmd-key ml-2">⌘</span> + V your next
                components.
              </p>
              <p className="desktop:text-2xl mobile:text-2xl text-black MinimalMono">
                Coming soon
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
