"use client";

import { useEffect, useState } from "react";
import { CopySnippetPage } from "./pages/CopySnippetPage";
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
    id: "section-1",
    title: "Library",
    type: "heading",
  },
  {
    id: "2",
    title: "Copy Snippet",
    component: <CopySnippetPage />,
    type: "item",
  }
];

const Pokedex = () => {
  const [activeComponent, setActiveComponent] = useState("1");

  const handleComponentChange = (id: string) => {
    setActiveComponent(id);
    const item = menuItems.find(c => c.id === id);
    if (item?.title) {
      window.location.hash = item.title.toLowerCase().replace(/\s+/g, '-');
    }
  };

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (!hash) {
      const homeItem = menuItems.find(item => item.title === "Home");
      if (homeItem) {
        setActiveComponent(homeItem.id);
      }
      return;
    }
    
    const matchingItem = menuItems.find(
      item => item.title?.toLowerCase().replace(/\s+/g, '-') === hash
    );
    if (matchingItem) {
      setActiveComponent(matchingItem.id);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="laptop:hidden">
        <PokedexMobile
          menuItems={menuItems}
          activeComponent={activeComponent}
          onComponentChange={handleComponentChange}
        />
      </div>
      <div className="hidden laptop:block">
        <PokedexDesktop
          menuItems={menuItems}
          activeComponent={activeComponent}
          onComponentChange={handleComponentChange}
        />
      </div>
    </div>
  );
};

export default Pokedex;
