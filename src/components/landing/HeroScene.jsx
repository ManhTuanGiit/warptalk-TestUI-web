"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Center } from "@react-three/drei";
import { NeedSomeSpace } from "./NeedSomeSpace";

export function HeroScene() {
  return (
    // The canvas must be full width/height and positioned behind content.
    // pointer-events-none makes it untouchable according to user request.
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        {/* Play with light intensities to match the cinematic dark hero vibe */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#beffd2" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#78ffaa" />
        <pointLight position={[0, -2, 0]} intensity={1} color="#ffffff" />

        <Suspense fallback={null}>
          <Center>
            <NeedSomeSpace />
          </Center>
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
