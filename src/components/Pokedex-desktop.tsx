import { LayoutGroup, motion } from "framer-motion";
import GridBackground from "./GridBackground";
import { MenuItem } from "./Pokedex";

interface PokedexDesktopProps {
  selectedItem: MenuItem;
  menuItems: MenuItem[];
  setSelectedItem: (item: MenuItem) => void;
}

export const PokedexDesktop = ({ selectedItem, menuItems, setSelectedItem }: PokedexDesktopProps) => {
    return (
      <div className="hidden laptop:flex h-screen relative">
        <GridBackground />
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-2xl flex w-full max-w-8xl m-10 overflow-hidden border-2 border-primary border-opacity-90 z-10"
        >
          {/* Left Panel - Menu */}
          <div className="w-[15%] min-w-[200px] bg-primary bg-opacity-90">
            <div className="p-6">
              <h2 className="text-3xl font-bold MinimalMono mb-6 text-textPrimary">
                0xFF
              </h2>
              <nav className="relative">
                <LayoutGroup>
                  <motion.div
                    layout
                    className="absolute -inset-3 bg-textPrimary rounded"
                    initial={{
                      top: `calc(${
                        parseInt(selectedItem.id) - 1
                      } * (3rem + 0.5rem))`,
                      height: "3rem",
                      width: "calc(100% + 1.5rem)",
                    }}
                    animate={{
                      top: `calc(${
                        parseInt(selectedItem.id) - 1
                      } * (3rem + 0.5rem))`,
                      height: "3rem",
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
                  <div
                    className="flex flex-col gap-2 relative pr-6"
                    style={{ zIndex: 2 }}
                  >
                    {menuItems.map((item) => (
                      <motion.button
                        layout
                        key={item.id}
                        onClick={() => setSelectedItem(item)}
                        className={`w-full h-12 flex items-center pl-1 ${
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
}
