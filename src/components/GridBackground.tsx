"use client";

import { useEffect, useRef } from 'react';

const GridBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const updateSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      // Set actual size in memory (scaled for DPI)
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      // Set display size
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      
      // Scale all drawing operations by the dpr
      ctx.scale(dpr, dpr);
      
      // Reset the canvas dimensions for drawing calculations
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    // Grid properties
    const dotSpacing = 25; // Spacing between dots
    const dotSize = 1.5; // Size of each dot
    const mouseRadius = 100; // Reduced radius of mouse influence
    
    let time = 0;
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;
    let targetMouseX = canvas.width / 2;
    let targetMouseY = canvas.height / 2;

    // Track mouse movement with smooth transition
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      time += 0.016;

      // Smooth mouse movement
      mouseX += (targetMouseX - mouseX) * 0.1;
      mouseY += (targetMouseY - mouseY) * 0.1;
      
      // Clear canvas with white background
      ctx.fillStyle = '#fcfcfc';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw dots with enhanced pulsing effect
      const numDotsX = Math.ceil(canvas.width / dotSpacing);
      const numDotsY = Math.ceil(canvas.height / dotSpacing);

      for (let x = 0; x <= numDotsX; x++) {
        for (let y = 0; y <= numDotsY; y++) {
          const dotX = x * dotSpacing;
          const dotY = y * dotSpacing;
          
          const distanceFromMouse = Math.sqrt(
            Math.pow(dotX - mouseX, 2) +
            Math.pow(dotY - mouseY, 2)
          );
          
          const distanceFromCenter = Math.sqrt(
            Math.pow(dotX - canvas.width / 2, 2) +
            Math.pow(dotY - canvas.height / 2, 2)
          );
          
          // Enhanced mouse influence calculation
          const mouseInfluence = Math.pow(Math.max(0, 1 - distanceFromMouse / mouseRadius), 1.5);
          
          // Calculate dot displacement
          const angle = Math.atan2(dotY - mouseY, dotX - mouseX);
          const displacement = mouseInfluence * 8;
          const displacedX = dotX + Math.cos(angle) * displacement;
          const displacedY = dotY + Math.sin(angle) * displacement;
          
          const currentDotSize = dotSize * (1 + mouseInfluence * 1);
          const baseOpacity = 0.15 + 
            Math.sin(time + distanceFromCenter * 0.005) * 0.03;
          
          // Increase darkness with mouse influence
          const mouseOpacity = mouseInfluence * 0.4;
          const opacity = Math.min(0.8, baseOpacity + mouseOpacity);
          
          ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
          ctx.beginPath();
          ctx.arc(displacedX, displacedY, currentDotSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateSize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
};

export default GridBackground;
