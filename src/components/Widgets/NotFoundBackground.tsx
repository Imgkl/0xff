"use client";

import { motion } from "framer-motion";

export default function NotFoundBackground() {
  // Create a grid of "not found" text
  const rows = 20;
  const cols = 90;
  const texts = Array.from({ length: rows * cols }, (_, i) => (
    <div
      key={i}
      className="text-2xl pl-10 MinimalMono opacity-5 whitespace-nowrap text-textPrimary"
      style={{
        gridRow: Math.floor(i / cols) + 1,
        gridColumn: (i % cols) + 1,
      }}
    >{"404"}</div>
  ));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="fixed inset-0 grid place-items-center text-textPrimary select-none"
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        transform: "scale(1.2)",
      }}
    >
      {texts}
    </motion.div>
  );
}
