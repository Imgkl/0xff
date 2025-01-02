"use client";

import { LayoutGroup, motion } from 'framer-motion';
import { useState } from 'react';
import { Introduction } from './pages/introduction';

interface MenuItem {
  id: string;
  title: string;
  component: React.ReactNode;
}


const menuItems: MenuItem[] = [
  {
    id: "1",
    title: "Home",
    component: <Introduction />,
  },
  {
    id: "2",
    title: "Questions?",
    component: (
      <div className="text-5xl text-textPrimary center flex items-center justify-center h-full w-full relative">
        I&apos;m still cooking.
      </div>
    ),
  },
  {
    id: "3",
    title: "Thoughts?",
    component: (
      <div className="text-5xl text-textPrimary center flex items-center justify-center h-full w-full relative">
        Let me know.
      </div>
    ),
  },
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
        style={{ height: "85vh" }}
      >
        {/* Left Panel - Menu */}
        <div className="w-[15%] min-w-[200px] bg-primary bg-opacity-90 border-r border-red">
          <div className="p-6">
            <h2 className="text-3xl font-bold MinimalMono mb-6 text-textPrimary">
              0xFF
            </h2>
            <nav className="relative">
              <LayoutGroup>
                <motion.div
                  layout
                  className="absolute -inset-3 bg-textPrimary rounded-xl"
                  initial={{
                    top: `calc(${parseInt(selectedItem.id) - 1} * (3rem + 0.5rem))`,
                    height: "3rem",
                    width: "100%"
                  }}
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
                    stiffness: 600,
                    damping: 20,
                  }}
                />
                <div className="flex flex-col gap-2 relative" style={{ zIndex: 2 }}>
                  {menuItems.map((item) => (
                    <motion.button
                      layout
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      className={`w-full h-12 flex items-center ${item.id === selectedItem.id ? "pl-1" : "pl-1"} rounded-3xl ${
                        selectedItem.id === item.id
                          ? "text-white"
                          : "text-textPrimary hover:text-white/80"
                      }`}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="font-[family-name:var(--font-geist-mono)] w-full text-left tracking-wider">
                        {item.title}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </LayoutGroup>
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
