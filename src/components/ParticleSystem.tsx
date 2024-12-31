'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useSpring } from '@react-spring/three';

interface ParticleSystemProps {
  count: number;
  isExploding: boolean;
  onComplete: () => void;
}

const ParticleSystem: React.FC<ParticleSystemProps> = ({ count, isExploding, onComplete }) => {
  const particles = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = 0;
      pos[i * 3 + 1] = 0;
      pos[i * 3 + 2] = 0;
    }
    return pos;
  }, [count]);

  const targetPositions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = Math.random() * 5;
      
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count]);

  const [spring] = useSpring(() => ({
    scale: isExploding ? 1 : 0,
    config: { mass: 1, tension: 280, friction: 60 },
    onChange: () => {
      if (particles.current) {
        const positions = particles.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < count; i++) {
          positions[i * 3] = targetPositions[i * 3] * spring.scale.get();
          positions[i * 3 + 1] = targetPositions[i * 3 + 1] * spring.scale.get();
          positions[i * 3 + 2] = targetPositions[i * 3 + 2] * spring.scale.get();
        }
        particles.current.geometry.attributes.position.needsUpdate = true;
      }
    },
    onRest: () => {
      if (isExploding) {
        setTimeout(onComplete, 1000);
      }
    },
  }), [isExploding]);

  useFrame(() => {
    if (particles.current) {
      particles.current.rotation.y += 0.001;
    }
  });

  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color={new THREE.Color("#8B5CF6")}
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default ParticleSystem;
