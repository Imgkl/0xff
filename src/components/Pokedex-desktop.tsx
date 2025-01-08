import { LayoutGroup, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import GridBackground from "./GridBackground";
import { MenuItem } from "./Pokedex";

interface Props {
  menuItems: MenuItem[];
  activeComponent: string;
  onComponentChange: (id: string) => void;
}

export const PokedexDesktop = ({
  menuItems,
  activeComponent,
  onComponentChange,
}: Props) => {
  const [selectedTop, setSelectedTop] = useState<number | null>(null);
  const menuRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<ResizeObserver | null>(null);

  const updateSelectedPosition = () => {
    const selectedRef = menuRefs.current[activeComponent];
    const container = containerRef.current;
    if (selectedRef && container) {
      const containerTop = container.getBoundingClientRect().top;
      const buttonTop = selectedRef.getBoundingClientRect().top;
      setSelectedTop(buttonTop - containerTop);
    }
  };

  useEffect(() => {
    // Set up ResizeObserver
    observerRef.current = new ResizeObserver(() => {
      requestAnimationFrame(updateSelectedPosition);
    });

    // Observe the container
    if (containerRef.current) {
      observerRef.current.observe(containerRef.current);
    }

    // Initial position update
    requestAnimationFrame(() => {
      setTimeout(updateSelectedPosition, 100); // Small delay to ensure animations complete
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    updateSelectedPosition();
  }, [activeComponent]);

  return (
    <div className="hidden laptop:flex h-screen relative">
      <GridBackground />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        onAnimationComplete={updateSelectedPosition}
        className="bg-white rounded-3xl shadow-2xl flex w-full max-w-8xl m-10 overflow-hidden border-2 border-primary border-opacity-90 z-10"
      >
        <div className="w-[15%] min-w-[200px] bg-primary bg-opacity-90">
          <div className="p-6">
            <h2 className="text-3xl font-bold MinimalMono mb-6 text-textPrimary">
              0xFF
            </h2>
            <nav className="relative">
              <LayoutGroup>
                {selectedTop !== null && (
                  <motion.div
                    layout
                    className="absolute -inset-3 bg-textPrimary rounded"
                    initial={false}
                    animate={{
                      top: selectedTop,
                      height: "48px",
                      width: "calc(100% + 1.5rem)",
                    }}
                    style={{
                      zIndex: 1,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 20,
                    }}
                  />
                )}
                <div
                  ref={containerRef}
                  data-menu-container
                  className={`flex flex-col relative`}
                  style={{ zIndex: 2 }}
                >
                  {menuItems.map((item) => {
                    if (item.type === 'divider') {
                      return (
                        <div
                          key={item.id}
                          className="h-[1px] bg-textPrimary/20"
                        />
                      );
                    }
                    
                    if (item.type === 'heading') {
                      return (
                        <div
                          key={item.id}
                          className="text-textPrimary/50 text-xs font-bold tracking-widest uppercase mt-4 mb-3 font-geist"
                        >
                          {item.title}
                        </div>
                      );
                    }

                    return (
                      <motion.button
                        ref={el => { menuRefs.current[item.id] = el}}
                        key={item.id}
                        onClick={() => onComponentChange(item.id)}
                        className={`w-full h-12 flex items-center pl-1 mb-2 ${
                          activeComponent === item.id
                            ? "text-white"
                            : "text-textPrimary hover:text-white/80"
                        }`}
                      >
                        <span className="font-geistMono w-full text-left tracking-wider">
                          {item.title}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </LayoutGroup>
            </nav>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          <motion.div
            key={activeComponent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={activeComponent === "1" ? "h-full" : "h-full overflow-auto"}
          >
            <div className={activeComponent === "1" ? "w-full h-full" : "max-w-[calc(100%-5rem)] mx-auto"}>
              {menuItems.find((item) => item.id === activeComponent)?.component}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
