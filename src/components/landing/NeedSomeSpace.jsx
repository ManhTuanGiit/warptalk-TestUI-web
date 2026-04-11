"use client";

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export function NeedSomeSpace(props) {
  const groupRef = useRef();

  // Load the new Star Cluster model
  const { scene } = useGLTF("/models/star_cluster_-_15k_stars_model.glb");

  // Keep it spinning slowly automatically
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group ref={groupRef} {...props} dispose={null}>
      {/* 
        This is a full primitive render. 
        Adjust scale to match the new model's geometry size.
        Since we changed models, scale might need to be adjusted (e.g. 0.05 or higher).
      */}
      <primitive object={scene} scale={0.05} />
    </group>
  );
}

// Preload to ensure smooth rendering
useGLTF.preload("/models/star_cluster_-_15k_stars_model.glb");
