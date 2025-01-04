"use client";

import { useState } from "react";
import { Introduction } from "./pages/introduction";
import { PokedexDesktop } from "./Pokedex-desktop";
import { PokedexMobile } from "./Pokedex-mobile";

export interface MenuItem {
  id: string;
  title: string;
  component?: React.ReactNode;
  type?: 'item' | 'divider' | 'heading';
}

const menuItems: MenuItem[] = [
  {
    id: "section-1",
    title: "GETTING STARTED",
    type: "heading",
  },
  {
    id: "1",
    title: "Home",
    component: <Introduction />,
    type: "item",
  },
  {
    id: "divider-1",
    title: "",
    type: "divider",
  },
  {
    id: "section-2",
    title: "Component Library",
    type: "heading",
  },
  {
    id: "2",
    title: "Install command",
    component: (
      <div className="text-5xl text-textPrimary center flex items-center justify-center h-full w-full relative">
        Let me know.
      </div>
    ),
    type: "item",
  },
  {
    id: "divider-2",
    title: "",
    type: "divider",
  },
  {
    id: "section-3",
    title: "FEEDBACK",
    type: "heading",
  },
  {
    id: "3",
    title: "Thoughts?",
    component: (
      <div className="text-5xl text-textPrimary center flex items-center justify-center h-full w-full relative">
        Let me know.
      </div>
    ),
    type: "item",
  },
];

const Pokedex = () => {
  const [selectedItem, setSelectedItem] = useState<MenuItem>(menuItems[1]);

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
