"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Center, OrbitControls } from "@react-three/drei";
import { NeedSomeSpace } from "./NeedSomeSpace";

export function HeroScene() {
  return (
    // The canvas must be full width/height and positioned behind content
    <div className="absolute inset-0 z-0 pointer-events-auto">
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

        {/* OrbitControls configured for gentle gentle drag/orbit interaction */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
          maxAzimuthAngle={Math.PI / 4}
          minAzimuthAngle={-Math.PI / 4}
          makeDefault
        />
      </Canvas>
    </div>
  );
}
