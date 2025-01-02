"use client";

import GridBackground from "@/components/GridBackground";
import Pokedex from "@/components/Pokedex";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-background">
      <GridBackground />
      <AnimatePresence mode="wait">
        <motion.div
          key="content"
          className="fixed inset-0"
          initial={{ opacity: 0}}
          animate={{ opacity: 1}}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
            opacity: { duration: 1 },
            y: { duration: 1.2 }
          }}
        >
          <Pokedex />
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
