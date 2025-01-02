"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Introduction } from './pages/introduction';

interface MenuItem {
  id: string;
  title: string;
  component: React.ReactNode;
}


const menuItems: MenuItem[] = [
  {
    id: '1',
    title: 'Home',
    component: <Introduction />
  }
];

const Pokedex = () => {
  const [selectedItem, setSelectedItem] = useState<MenuItem>(menuItems[0]);

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-2xl flex w-full max-w-8xl overflow-hidden border-8 border-primary border-opacity-90"
        style={{ height: "80vh" }}
      >
        {/* Left Panel - Menu */}
        <div className="w-[20%] min-w-[200px] bg-primary bg-opacity-90 border-r border-red">
          <div className="p-6">
            <h2 className="text-3xl font-bold MinimalMono mb-6 text-textPrimary pl-2">
              0xff
            </h2>
            <nav className="relative">
              <motion.div
                className="absolute inset-0 bg-textPrimary rounded-xl"
                animate={{
                  top: `calc(${parseInt(selectedItem.id) - 1} * (3rem + 0.5rem))`,
                  height: "3rem",
                  width: "100%"
                }}
                style={{
                  zIndex: 1
                }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                }}
              />
              <div className="flex flex-col gap-2 relative" style={{ zIndex: 2 }}>
                {menuItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className={`w-full h-12 flex items-center px-4 rounded-xl ${
                      selectedItem.id === item.id
                        ? "text-white"
                        : "text-textPrimary hover:text-textPrimary/70"
                    }`}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="font-[family-name:var(--font-geist-mono)] w-full text-left tracking-wider">
                      {item.title}
                    </span>
                  </motion.button>
                ))}
              </div>
            </nav>
          </div>
        </div>

        {/* Right Panel - Content */}
        <div className="flex-1">
          <motion.div
            key={selectedItem.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {selectedItem.component}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Pokedex;
