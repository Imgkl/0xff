"use client";

import { List, X } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { MenuItem } from "./Pokedex";

interface PokedexMobileProps {
  selectedItem: MenuItem;
  menuItems: MenuItem[];
  setSelectedItem: (item: MenuItem) => void;
}

export function PokedexMobile({
  selectedItem,
  menuItems,
  setSelectedItem,
}: PokedexMobileProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      {/* Content Area */}
      <div className="flex-1 overflow-auto">
        <motion.div
          key={selectedItem.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="h-screen"
        >
          {selectedItem.component}
        </motion.div>
      </div>

      {/* Bottom Navigation */}
      <motion.div
        className="fixed inset-x-0 bottom-0 z-10 bg-primary"
        animate={{
          height: isOpen ? "100vh" : "72px",
        }}
        transition={{
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        {/* Menu Items */}
        <motion.div
          className="absolute bottom-[72px] left-0 right-0 overflow-auto"
          style={{ maxHeight: "calc(100vh - 72px)" }}
          animate={{
            opacity: isOpen ? 1 : 0,
            display: isOpen ? "block" : "none",
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="max-w-md mx-auto space-y-2 p-2 w-full">
            {menuItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => {
                  setSelectedItem(item);
                  setIsOpen(false);
                }}
                className={`w-full text-left py-4 px-4 transition-colors rounded ${
                  selectedItem.id === item.id
                    ? "bg-[#2C2C2C] text-white"
                    : "text-textPrimary hover:bg-[#2C2C2C]/10"
                }`}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-lg font-[family-name:var(--font-geist-mono)] w-full text-left tracking-wider">
                  {item.title}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center px-4 py-4">
          <div className="text-2xl mt-2 font-bold MinimalMono text-textPrimary">
            0xFF
          </div>
          <motion.button
            id="dropdown-button"
            className="flex items-center ml-auto"
            onClick={() => setIsOpen(!isOpen)}
            animate={{
              width: isOpen ? "40px" : "200px",
            }}
            transition={{
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            <motion.div
              className={`flex items-center justify-between bg-[#2C2C2C] w-full`}
              animate={{
                padding: isOpen ? "10px" : "12px 16px",
                borderRadius: "0.25rem",
                height: "40px",
              }}
            >
              <motion.span
                animate={{
                  opacity: isOpen ? 0 : 1,
                  width: isOpen ? 0 : "auto",
                }}
                transition={{ duration: 0.2 }}
                className="text-white font-[family-name:var(--font-geist-mono)] text-left tracking-wider overflow-hidden whitespace-nowrap"
              >
                {selectedItem.title}
              </motion.span>
              <div className="text-white min-w-[20px] text-center flex items-center justify-center">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={isOpen ? "close" : "list"}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{
                      duration: 0.2,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                  >
                    {isOpen ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
