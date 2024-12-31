'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

interface MagneticBlobProps {
  onPop: () => void;
}

const MagneticBlob: React.FC<MagneticBlobProps> = ({ onPop }) => {
  const blobRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hasClicked, setHasClicked] = useState(false);

  const handleClick = useCallback(() => {
    if (!hasClicked) {
      console.log('Blob clicked');
      setHasClicked(true);
      onPop();
    }
  }, [hasClicked, onPop]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (blobRef.current && !hasClicked) {
        const { clientX, clientY } = e;
        const { left, top, width, height } = blobRef.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        
        const deltaX = clientX - centerX;
        const deltaY = clientY - centerY;
        
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const maxDistance = 150;
        
        if (distance < maxDistance) {
          const scale = 1 - distance / maxDistance;
          const moveX = deltaX * scale * 0.3;
          const moveY = deltaY * scale * 0.3;
          
          setMousePosition({ x: moveX, y: moveY });
        } else {
          setMousePosition({ x: 0, y: 0 });
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [hasClicked]);

  return (
    <motion.div
      ref={blobRef}
      className="relative w-64 h-64 rounded-full cursor-pointer"
      animate={{
        x: mousePosition.x,
        y: mousePosition.y,
        scale: isHovered ? 1.2 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
      }}
      onHoverStart={() => !hasClicked && setIsHovered(true)}
      onHoverEnd={() => !hasClicked && setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-800 via-gray-900 to-black opacity-75 blur-lg" />
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-800 via-gray-900 to-black" />
      
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={false}
        animate={{ scale: isHovered ? 1.1 : 1, opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <span className="text-white font-bold text-2xl tracking-wider">Pop it!</span>
      </motion.div>
    </motion.div>
  );
};

export default MagneticBlob;
