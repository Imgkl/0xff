"use client";

import { ReactNode } from "react";

interface LivePreviewProps {
  children: ReactNode;
  className?: string;
}

export const LivePreview = ({
  children,
}: LivePreviewProps) => {
  return (
    <div className="flex flex-col gap-8 mt-10">
      <div>
        <h2 className="text-xl font-geistMono text-textPrimary mb-2 tracking-wide">
          Preview
        </h2>
        <div className="rounded-2xl border-2 border-primary overflow-hidden">
          <div
            className="bg-grid-pattern bg-grid bg-[#FAFAFA] p-14 flex items-center justify-center"
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
