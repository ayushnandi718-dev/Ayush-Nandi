"use client";

import React, { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { usePerfProfile } from "@/hooks/use-perf-profile";
import { useMediaQuery } from "@/hooks/use-media-query";

function AstronautModel() {
  const group = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const { scene, animations } = useGLTF("/models/tenhun_falling_spaceman_fanart.glb");
  const { actions } = useAnimations(animations, group);
  const { viewport } = useThree();
  const isMobile = useMediaQuery("(max-width: 767px)");

  useEffect(() => {
    if (!group.current) return;
    const box = new THREE.Box3().setFromObject(group.current);
    const size = box.getSize(new THREE.Vector3());

    const targetHeight = viewport.height * (isMobile ? 0.15 : 0.25);
    const scaleFactor = targetHeight / size.y;
    group.current.scale.setScalar(scaleFactor);

    const scaledBox = new THREE.Box3().setFromObject(group.current);
    const scaledSize = scaledBox.getSize(new THREE.Vector3());
    const center = scaledBox.getCenter(new THREE.Vector3());

    group.current.position.y = viewport.height / 2 - scaledSize.y / 2;
    group.current.position.x = viewport.width / 2 - scaledSize.x / 2 - 0.5;
    group.current.position.z = 1.5;
  }, [scene, viewport, isMobile]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.2;

    // Mouse parallax
    const targetRotX = mouse.current.y * 0.15;
    const targetRotZ = -mouse.current.x * 0.1 + (-0.15);
    group.current.rotation.x += (targetRotX - group.current.rotation.x) * 0.05;
    group.current.rotation.z += (targetRotZ - group.current.rotation.z) * 0.05;
  });

  useEffect(() => {
    if (!actions) return;
    const animNames = Object.keys(actions);
    if (animNames.length === 0) return;
    // play all animations (idle), looped
    animNames.forEach((name) => {
      actions[name]?.reset().play();
    });
  }, [actions]);

  return <primitive ref={group} object={scene} />;
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-3, 3, -3]} intensity={0.4} />
      <AstronautModel />
    </>
  );
}

export default function Astronaut3D() {
  const { disable3D, ready } = usePerfProfile();

  if (!ready || disable3D) return null;

  return (
    <div
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    >
      <Canvas
        gl={{ alpha: true, antialias: true, localClippingEnabled: false }}
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: "transparent", overflow: "visible", pointerEvents: "none" }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
