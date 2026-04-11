"use client";

import React, { Suspense } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { NeedSomeSpace } from "./NeedSomeSpace";

export function HeroScene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 3.2], fov: 42 }}
        dpr={[1, 1.75]}
        gl={{ alpha: true, antialias: true }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.NoToneMapping;
          gl.outputColorSpace = THREE.SRGBColorSpace;
        }}
      >
        <Suspense fallback={null}>
          <NeedSomeSpace />
        </Suspense>
      </Canvas>
    </div>
  );
}