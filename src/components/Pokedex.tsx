"use client";

import { useState } from "react";
import { Introduction } from "./pages/introduction";
import { PokedexDesktop } from "./Pokedex-desktop";
import { PokedexMobile } from "./Pokedex-mobile";

export interface MenuItem {
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
    title: "Installation",
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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <div className="laptop:hidden">
        <PokedexMobile
          selectedItem={selectedItem}
          menuItems={menuItems}
          setSelectedItem={setSelectedItem}
        />
      </div>
      <div className="hidden laptop:block">
        <PokedexDesktop
          selectedItem={selectedItem}
          menuItems={menuItems}
          setSelectedItem={setSelectedItem}
        />
      </div>
    </div>
  );
};

export default Pokedex;
