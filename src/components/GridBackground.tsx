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
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    // Grid properties
    const gridSize = 50;
    const beams: {
      x: number;
      y: number;
      angle: number;
      speed: number;
      width: number;
    }[] = [];
    const numBeams = 3;

    // Create initial beams
    for (let i = 0; i < numBeams; i++) {
      beams.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        angle: Math.random() * Math.PI * 2,
        speed: 1 + Math.random() * 2,
        width: 200 + Math.random() * 200,
      });
    }

    const animate = () => {
      // Clear canvas with white background
      ctx.fillStyle = '#fcfcfc';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.lineWidth = 1;

      // Vertical lines
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Update and draw beams
      beams.forEach(beam => {
        // Move beam
        beam.x += Math.cos(beam.angle) * beam.speed;
        beam.y += Math.sin(beam.angle) * beam.speed;

        // Reset beam position when it goes off screen
        if (beam.x < -beam.width) beam.x = canvas.width + beam.width;
        if (beam.x > canvas.width + beam.width) beam.x = -beam.width;
        if (beam.y < -beam.width) beam.y = canvas.height + beam.width;
        if (beam.y > canvas.height + beam.width) beam.y = -beam.width;

        // Draw beam
        const gradient = ctx.createRadialGradient(
          beam.x, beam.y, 0,
          beam.x, beam.y, beam.width
        );
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0.2)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(beam.x, beam.y, beam.width, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-screen h-screen pointer-events-none"
      style={{ backgroundColor: '#fcfcfc' }}
    />
  );
};

export default GridBackground;
