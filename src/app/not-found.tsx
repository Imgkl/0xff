"use client";

import NotFoundBackground from "@/components/Widgets/NotFoundBackground";
import UnderlineToBackground from "@/components/Widgets/UnderlineToBackground";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath !== "/404") {
      router.replace("/404");
    }
  }, [router]);
  return (
    <div className="h-screen bg-background flex items-center justify-center flex-col relative overflow-hidden">
      <NotFoundBackground />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-start text-9xl font-bold MinimalMono gap-4 z-10 desktop:text-[15rem]"
      >
        <span className="text-textPrimary">4</span>
        <UnderlineToBackground
          label="0xFF"
          targetTextColor="#1C1D21"
          onClick={() => router.push("/")}
          className="mb-8"
          underlineHeightRatio={0.05}
          underlinePaddingRatio={0.01}
        />
        <span className="text-textPrimary">4</span>
      </motion.div>
    </div>
  );
}
