'use client';

import { shaderMaterial } from "@react-three/drei";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

// Create a custom shader material
const CustomShaderMaterial = shaderMaterial(
  // Uniforms
  {
    time: 0,
    resolution: new THREE.Vector2(),
  },
  // Vertex Shader
  `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  // Fragment Shader
  `
  uniform float time;
  uniform vec2 resolution;
  varying vec2 vUv;

  void main() {
    vec2 p = (gl_FragCoord.xy / resolution.xy) - 0.5;
    float e = 0.0;
    float R = 0.0;
    float s = 2.0;
    vec3 o = vec3(0.0);
    vec3 q = vec3(0.0);
    vec3 d = vec3(p, 0.4);

    for (float i = 0.0; i < 119.0; i++) {
      q.yz -= 1.0;
      o.rgb += vec3(0.6 - e, 0.3, min(e * s, 0.4 - e) / 25.0);
      s = 2.0;
      vec3 p = q += d * e * R * 0.3;
      p = vec3(log(R = length(p)) - time * 0.5, exp(-p.z / R + 0.5), atan(p.x, p.y));
      for (e = --p.y; s < 2000.0; s += s) {
        e += -abs(dot(cos(p.zxy * s), 0.2 - sin(p * s))) / s * 0.4;
      }
    }

    gl_FragColor = vec4(o, 1.0);
  }
  `
);

// Extend Three.js with our custom shader material
extend({ CustomShaderMaterial });

const ShaderComponent = () => {
  const materialRef = useRef<any>();
  const size = useRef({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      size.current = {
        width: window.innerWidth,
        height: window.innerHeight
      };
      if (materialRef.current) {
        materialRef.current.uniforms.resolution.value.set(
          window.innerWidth, 
          window.innerHeight
        );
      }
    };

    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = clock.getElapsedTime();
    }
  });

  return (
    <Canvas>
      <mesh>
        <planeGeometry args={[2, 2]} />
        <customShaderMaterial ref={materialRef} />
      </mesh>
    </Canvas>
  );
};

export default ShaderComponent;
