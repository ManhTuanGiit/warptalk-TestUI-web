"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Center } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
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
        {/* Galaxies are emissive. Turning off heavy city env-maps and directional 
            lights ensures dark space feels dark, preventing washed-out colors. */}
        <ambientLight intensity={0.05} />

        <Suspense fallback={null}>
          <Center>
            <NeedSomeSpace />
          </Center>
          
          {/* Phase 2: Post-processing Bloom để làm dải ngân hà rực sáng */}
          <EffectComposer disableNormalPass>
            <Bloom 
              luminanceThreshold={0} 
              mipmapBlur={true} 
              luminanceSmoothing={0.9} 
              intensity={1.5} 
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
