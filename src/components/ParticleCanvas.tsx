'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  radius: number;
  inText: boolean;
  originalX: number;
  originalY: number;
  initialRadius: number;
  spreadX: number;
  spreadY: number;
}

interface ParticleCanvasProps {
  isExploding: boolean;
  onComplete: () => void;
}

const ParticleCanvas: React.FC<ParticleCanvasProps> = ({ isExploding, onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const phaseRef = useRef<'spread' | 'morph' | 'fade'>('spread');
  const startTimeRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const isTextFormedRef = useRef(false);
  const fontSizeRef = useRef<number>(0);
  const textOpacityRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isExploding) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Ensure font is loaded before starting animation
    const loadAndStartAnimation = async () => {
      try {
        // Wait for font to load
        await document.fonts.load('400 10px "Minimal Mono"');
        
        const updateCanvasSize = () => {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          
          if (fontSizeRef.current === 0) {
            const baseSize = Math.min(canvas.width, canvas.height);
            fontSizeRef.current = Math.min(
              baseSize * (canvas.width < 640 ? 0.2: 1.5),
              300
            );
          }
        };

        updateCanvasSize();
        window.addEventListener('resize', updateCanvasSize);

        // Create text points for morphing
        const createTextPoints = () => {
          ctx.save();
          
          const fontSize = fontSizeRef.current;
          
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          
          const text = '0xff';
          ctx.font = `400 ${fontSize}px "Minimal Mono"`;
          ctx.fillStyle = 'black';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          // Draw text with reduced spacing
          const letterSpacing = -fontSize * 0.1; // Tighter spacing
          const chars = text.split('');
          const totalWidth = ctx.measureText(text).width + (letterSpacing * (chars.length - 1));
          // Center in the remaining space after left panel
          const leftPanelWidth = canvas.width * 0.2;
          const remainingWidth = canvas.width - leftPanelWidth;
          const startX = leftPanelWidth + (remainingWidth / 2) - (totalWidth / 2) - (leftPanelWidth * 0.25); // Move left by quarter of panel width
          
          let currentX = startX;
          chars.forEach((char) => {
            const width = ctx.measureText(char).width;
            ctx.fillText(char, currentX + width/2, canvas.height / 2);
            currentX += width + letterSpacing;
          });
          
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const points: { x: number; y: number }[] = [];
          
          // Adjust sampling rate for mobile
          const sampleRate = Math.max(
            1, 
            Math.floor(canvas.width < 640 ? canvas.width / 500 : canvas.width / 1000)
          );
          const threshold = 50;
          
          for (let y = 0; y < canvas.height; y += sampleRate) {
            for (let x = 0; x < canvas.width; x += sampleRate) {
              const i = (y * canvas.width + x) * 4;
              const alpha = imageData.data[i + 3];
              
              if (alpha > threshold) {
                const offsetX = (Math.random() - 0.5) * sampleRate * 0.5;
                const offsetY = (Math.random() - 0.5) * sampleRate * 0.5;
                points.push({ x: x + offsetX, y: y + offsetY });
              }
            }
          }
          
          ctx.restore();
          return points;
        };

        const textPoints = createTextPoints();
        const numParticles = Math.max(3000, textPoints.length);
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        const createParticle = (index: number): Particle => {
          const inText = index < textPoints.length;
          const targetPoint = inText ? textPoints[index] : {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height
          };
          
          const isMobile = canvas.width < 640;
          const particleScale = isMobile ? 0.75 : 1; // Scale down particles on mobile
          
          return {
            x: centerX + (Math.random() - 0.5) * 10,
            y: centerY + (Math.random() - 0.5) * 10,
            vx: (Math.random() - 0.5) * (isMobile ? 10 : 15),
            vy: (Math.random() - 0.5) * (isMobile ? 10 : 15),
            targetX: targetPoint.x,
            targetY: targetPoint.y,
            originalX: targetPoint.x,
            originalY: targetPoint.y,
            radius: (inText ? 2 : Math.random() * 2 + 1) * particleScale,
            initialRadius: (inText ? 2 : Math.random() * 2 + 1) * particleScale,
            inText,
            spreadX: Math.random() * canvas.width,
            spreadY: Math.random() * canvas.height
          };
        };

        particlesRef.current = Array.from({ length: numParticles }, (_, i) => createParticle(i));

        const handleMouseMove = (e: MouseEvent) => {
          const rect = canvas.getBoundingClientRect();
          mouseRef.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
          };
        };

        canvas.addEventListener('mousemove', handleMouseMove);
        startTimeRef.current = Date.now();

        // Draw the scene
        const animate = () => {
          const now = Date.now();
          const elapsed = now - startTimeRef.current;
          const particles = particlesRef.current;

          // Smoother clearing with higher opacity for less flashing
          ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          switch (phaseRef.current) {
            case 'spread':
              let maxDistance = 0;
              particles.forEach((particle) => {
                const dx = particle.spreadX - particle.x;
                const dy = particle.spreadY - particle.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                maxDistance = Math.max(maxDistance, dist);
                
                // More energetic initial spread with higher velocity
                particle.vx += (dx / dist) * 0.6 + (Math.random() - 0.5) * 0.4;
                particle.vy += (dy / dist) * 0.6 + (Math.random() - 0.5) * 0.4;
                
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                // Slightly more random movement for visual interest
                particle.vx += (Math.random() - 0.5) * 0.15;
                particle.vy += (Math.random() - 0.5) * 0.15;
                
                // Less friction for faster spread
                particle.vx *= 0.95;
                particle.vy *= 0.95;
              });

              // Much shorter spread phase with distance check
              if (elapsed > 1200 && maxDistance < 8 || elapsed > 1500) {
                phaseRef.current = 'morph';
                // Reset velocities for clean morph phase
                particles.forEach(particle => {
                  particle.vx = 0;
                  particle.vy = 0;
                });
              }
              break;

            case 'morph':
              let inPositionCount = 0;
              
              // Draw all non-text particles first
              particles.forEach((particle) => {
                if (!particle.inText && particle.radius > 0.1) {
                  ctx.beginPath();
                  ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                  ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
                  ctx.fill();
                }
              });

              // Then draw text particles
              particles.forEach((particle) => {
                if (particle.inText) {
                  const dx = particle.targetX - particle.x;
                  const dy = particle.targetY - particle.y;
                  
                  // Even faster morphing
                  const progress = Math.min(1, elapsed / 2000);
                  const easeSpeed = 0.1 * (1 - Math.pow(progress - 1, 2));
                  
                  particle.x += dx * easeSpeed;
                  particle.y += dy * easeSpeed;
                  
                  ctx.beginPath();
                  ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                  ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
                  ctx.fill();

                  if (Math.abs(dx) < 0.3 && Math.abs(dy) < 0.3) {
                    particle.x = particle.targetX;
                    particle.y = particle.targetY;
                    inPositionCount++;
                  }
                } else {
                  // Smoother fade out for non-text particles
                  particle.radius *= 0.94;
                }
              });

              if (inPositionCount >= particles.filter(p => p.inText).length * 0.98) {
                phaseRef.current = 'fade';
                isTextFormedRef.current = true;
              }
              break;

            case 'fade':
              // Smooth easing for the fade transition
              const fadeProgress = textOpacityRef.current;
              // Smoother easing curve (cubic)
              const easedFade = 1 - Math.pow(1 - fadeProgress, 3);

              // Draw the final text with reduced spacing
              ctx.globalAlpha = easedFade;
              ctx.font = `400 ${fontSizeRef.current}px "Minimal Mono"`;
              ctx.fillStyle = 'black';
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              
              const letterSpacing = -fontSizeRef.current * 0.1;
              const chars = '0xff'.split('');
              const totalWidth = ctx.measureText('0xff').width + (letterSpacing * (chars.length - 1));
              // Center in the remaining space after left panel
              const leftPanelWidth = canvas.width * 0.2;
              const remainingWidth = canvas.width - leftPanelWidth;
              const startX = leftPanelWidth + (remainingWidth / 2) - (totalWidth / 2) - (leftPanelWidth * 0.25); // Move left by quarter of panel width
              
              let currentX = startX;
              chars.forEach((char) => {
                const width = ctx.measureText(char).width;
                ctx.fillText(char, currentX + width/2, canvas.height / 2);
                currentX += width + letterSpacing;
              });
              ctx.globalAlpha = 1;

              // Draw particles with eased fade out
              particles.forEach(particle => {
                if (particle.radius > 0.1) {
                  ctx.beginPath();
                  ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                  // Slower, smoother particle fade
                  const particleOpacity = Math.pow(1 - fadeProgress, 1.5) * 0.8;
                  ctx.fillStyle = `rgba(0, 0, 0, ${particleOpacity})`;
                  ctx.fill();
                }
              });

              // Slower, smoother transition
              textOpacityRef.current += 0.035;

              if (textOpacityRef.current >= 1) {
                // Final render without flash
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                // Render text immediately with reduced spacing
                ctx.font = `400 ${fontSizeRef.current}px "Minimal Mono"`;
                ctx.fillStyle = 'black';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                
                const letterSpacing = -fontSizeRef.current * 0.1;
                const chars = '0xff'.split('');
                const totalWidth = ctx.measureText('0xff').width + (letterSpacing * (chars.length - 1));
                // Center in the remaining space after left panel
                const leftPanelWidth = canvas.width * 0.2;
                const remainingWidth = canvas.width - leftPanelWidth;
                const startX = leftPanelWidth + (remainingWidth / 2) - (totalWidth / 2) - (leftPanelWidth * 0.25); // Move left by quarter of panel width
                
                let currentX = startX;
                chars.forEach((char) => {
                  const width = ctx.measureText(char).width;
                  ctx.fillText(char, currentX + width/2, canvas.height / 2);
                  currentX += width + letterSpacing;
                });
                
                // Add delay before completing
                setTimeout(() => {
                  cancelAnimationFrame(animationFrameRef.current!);
                  onComplete();
                }, 800);
                return;
              }
              break;
          }

          // Draw particles for other phases
          if (phaseRef.current !== 'fade') {
            particles.forEach(particle => {
              if (particle.radius > 0.1) {
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = particle.inText ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.6)';
                ctx.fill();
              }
            });
          }

          animationFrameRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
          if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
          }
          canvas.removeEventListener('mousemove', handleMouseMove);
          window.removeEventListener('resize', updateCanvasSize);
        };
      } catch (error) {
        console.error('Error loading font:', error);
      }
    };

    loadAndStartAnimation();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isExploding, onComplete]);

  return (
    <div className="relative w-full h-full bg-white">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          opacity: isExploding ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
        }}
      />
    </div>
  );
};

export default ParticleCanvas;
