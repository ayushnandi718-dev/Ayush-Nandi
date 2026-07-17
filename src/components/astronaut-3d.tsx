"use client";

import React, { Suspense, useEffect, useLayoutEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { usePerfProfile } from "@/hooks/use-perf-profile";
import { useMediaQuery } from "@/hooks/use-media-query";

function AstronautModel() {
  const group = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const positioned = useRef(false);
  const { scene, animations } = useGLTF("/models/tenhun_falling_spaceman_fanart.glb");
  const { actions } = useAnimations(animations, group);
  const { viewport } = useThree();
  const { width, height } = viewport;
  const isMobile = useMediaQuery("(max-width: 767px)");

  useLayoutEffect(() => {
    if (!group.current) return;

    const scale = isMobile ? 1.1 : 1.8;
    group.current.scale.setScalar(scale);

    group.current.position.set(
      width * 0.38,
      height * 0.30,
      1.5
    );
    positioned.current = true;
  }, [width, height, isMobile]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    if (!positioned.current || !actions) return;
    const animNames = Object.keys(actions);
    if (animNames.length === 0) return;
    animNames.forEach((name) => {
      actions[name]?.reset().play();
    });
  }, [actions]);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.updateMatrixWorld();
    group.current.rotation.y += delta * 0.2;

    const targetRotX = mouse.current.y * 0.15;
    const targetRotZ = -mouse.current.x * 0.1 + (-0.15);
    group.current.rotation.x += (targetRotX - group.current.rotation.x) * 0.05;
    group.current.rotation.z += (targetRotZ - group.current.rotation.z) * 0.05;
  });

  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  );
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

interface Astronaut3DState {
  hasError: boolean;
}

class Astronaut3DErrorBoundary extends React.Component<
  { children: React.ReactNode },
  Astronaut3DState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): Astronaut3DState {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn("Astronaut3D failed to render:", error.message);
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

export default function Astronaut3D() {
  const { ready, disable3D } = usePerfProfile();
  if (!ready || disable3D) return null;

  return (
    <Astronaut3DErrorBoundary>
      <div
        className="fixed top-0 left-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <Canvas
          gl={{ alpha: true, antialias: true, localClippingEnabled: false }}
          camera={{
            position: [0, 0, 5],
            fov: 45,
            near: 0.1,
            far: 100,
          }}
          style={{ background: "transparent", overflow: "visible", pointerEvents: "none" }}
          dpr={[1, 2]}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>
    </Astronaut3DErrorBoundary>
  );
}
