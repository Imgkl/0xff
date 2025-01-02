"use client";

import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-6xl font-bold MinimalMono mb-4">404</h1>
        <p className="text-xl">Page not found</p>
        <p className="text-xl mt-4">How did you even get here?</p>
      </motion.div>
    </div>
  );
}
