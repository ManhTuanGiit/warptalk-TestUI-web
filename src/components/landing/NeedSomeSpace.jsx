"use client";

import React, { useRef, useEffect, useMemo } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export function NeedSomeSpace(props) {
  // 1. PIVOT: This group acts as the true center (core) of the galaxy.
  // We apply rotation and scaling here.
  const pivotRef = useRef();

  const { scene } = useGLTF("/models/need_some_space-transformed.glb");

  // 2. CENTER OFFSET & MATERIAL OVERRIDE: 
  // Calculate bounding box and force Additive Blending.
  const centerOffset = useMemo(() => {
    if (!scene) return [0, 0, 0];
    
    // Phase 1: Ghi đè vật liệu để phục hồi hiệu ứng phát sáng
    scene.traverse((node) => {
      if (node.isMesh || node.isPoints) {
        if (node.material) {
          node.material.transparent = true;
          // Loại bỏ hiện tượng các hạt bụi cắt xén/che khuất lẫn nhau
          node.material.depthWrite = false;
          // Cộng dồn độ sáng lên nền tối, tạo cảm giác rực lửa
          node.material.blending = THREE.AdditiveBlending;
          node.material.needsUpdate = true;
        }
      }
    });
    
    // Compute bounding box
    const box = new THREE.Box3().setFromObject(scene);
    const center = new THREE.Vector3();
    box.getCenter(center);
    
    // Return the inverted center to act as our correction offset
    return [-center.x, -center.y, -center.z];
  }, [scene]);

  // INITIAL SCALE: Where to tweak base/initial scale (1.5)
  const targetScale = useRef(1.5);

  useEffect(() => {
    const handleScroll = () => {
      // Zoom factor: tweak 0.002 if you want to scale faster/slower while scrolling
      targetScale.current = 1.5 + window.scrollY * 0.002;
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame((state, delta) => {
    if (pivotRef.current) {
      // 3. ROTATION: Rotate the outer pivot group instead of the model.
      // Since the model inside is offset to be perfectly centered, 
      // this rotation happens exactly around the galaxy's core.
      // Tweak rotation speed here (0.05):
      pivotRef.current.rotation.y -= delta * 0.05;

      // Smooth scroll-based zoom (lerp)
      const currentScale = pivotRef.current.scale.x;
      const nextScale = currentScale + (targetScale.current - currentScale) * 0.1;
      pivotRef.current.scale.set(nextScale, nextScale, nextScale);
    }
  });

  return (
    <group ref={pivotRef} {...props} dispose={null}>
      {/* 
        OFFSET GROUP: We shift the model geometry by the negative center.
        This forces the model's visual center to lie perfectly at (0,0,0) 
        of the parent pivotRef.
      */}
      <group position={centerOffset}>
        <primitive object={scene} />
      </group>
    </group>
  );
}

// Preload to ensure smooth rendering
useGLTF.preload("/models/need_some_space-transformed.glb");
