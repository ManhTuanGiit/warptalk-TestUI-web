"use client";

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export function NeedSomeSpace(props) {
  const groupRef = useRef();

  // Ensure the GLB path matches exactly what was requested and exists in the public directory
  const { nodes, materials } = useGLTF("/models/need_some_space-transformed.glb");

  // Subtle floating/orbit-like interaction and breathing motion
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Chỉ tự động quay tròn quanh trục Y, xoá bỏ các chuyển động nghiêng/lắc theo chuột
      groupRef.current.rotation.y += delta * 0.1;
      
      // Giữ một chút nhịp thở (lên xuống rất nhẹ) - nếu muốn đứng yên hoàn toàn thì có thể bỏ dòng này
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <group ref={groupRef} {...props} dispose={null}>
      {/* 
        Adjusted the initial scale based on standard gltf transformations.
        The default scale might be small, you can increase this scale value (e.g., to 0.05) if the model appears too small.
      */}
      <points
        name="Object_2"
        geometry={nodes.Object_2.geometry}
        material={materials["Scene_-_Root"]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.04}
      />
    </group>
  );
}

// Preload to ensure smooth rendering
useGLTF.preload("/models/need_some_space-transformed.glb");
