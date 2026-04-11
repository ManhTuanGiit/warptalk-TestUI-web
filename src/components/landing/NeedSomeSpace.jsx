"use client";

import React, { useRef, useEffect, useMemo } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

function createCircularSpriteTexture() {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext("2d");
  const center = size / 2;
  const radius = size * 0.28;

  const gradient = ctx.createRadialGradient(
    center,
    center,
    0,
    center,
    center,
    radius
  );

  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.45, "rgba(255,255,255,0.95)");
  gradient.addColorStop(0.75, "rgba(255,255,255,0.45)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");

  ctx.clearRect(0, 0, size, size);
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(center, center, radius, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  texture.colorSpace = THREE.SRGBColorSpace;

  return texture;
}

export function NeedSomeSpace(props) {
  const pivotRef = useRef();
  const { scene } = useGLTF("/models/need_some_space.glb");

  const pointSprite = useMemo(() => {
    if (typeof window === "undefined") return null;
    return createCircularSpriteTexture();
  }, []);

  const centerOffset = useMemo(() => {
    if (!scene) return [0, 0, 0];

    scene.traverse((node) => {
      if (node.isPoints && node.material) {
        node.material.vertexColors = true;

        // Dùng sprite tròn để point không còn là ô vuông
        if (pointSprite) {
          node.material.map = pointSprite;
          node.material.alphaMap = pointSprite;
        }

        node.material.transparent = true;
        node.material.alphaTest = 0.001;
        node.material.depthWrite = false;
        node.material.blending = THREE.NormalBlending;
        node.material.toneMapped = false;

        // Giữ point đủ nhỏ để đẹp hơn
        node.material.size = 0.018;
        node.material.sizeAttenuation = true;

        node.material.needsUpdate = true;
      }
    });

    const box = new THREE.Box3().setFromObject(scene);
    const center = new THREE.Vector3();
    box.getCenter(center);

    return [-center.x, -center.y, -center.z];
  }, [scene, pointSprite]);

  const targetScale = useRef(1.35);

  useEffect(() => {
    const handleScroll = () => {
      targetScale.current = 1.35 + window.scrollY * 0.0012;
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame((_, delta) => {
    if (pivotRef.current) {
      pivotRef.current.rotation.y -= delta * 0.035;

      const currentScale = pivotRef.current.scale.x;
      const nextScale =
        currentScale + (targetScale.current - currentScale) * 0.08;

      pivotRef.current.scale.set(nextScale, nextScale, nextScale);
    }
  });

  return (
    <group ref={pivotRef} {...props} dispose={null}>
      <group position={centerOffset}>
        <primitive object={scene} />
      </group>
    </group>
  );
}

useGLTF.preload("/models/need_some_space.glb");