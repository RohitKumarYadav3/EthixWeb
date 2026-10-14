'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo, Suspense, useState, useEffect } from 'react';
import * as THREE from 'three';

function WebNetwork() {
  const groupRef = useRef<THREE.Group>(null);
  const rightLineRef = useRef<THREE.LineSegments>(null);
  const leftLineRef = useRef<THREE.LineSegments>(null);

  const prefersReducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const { leftLines, rightLines, nodes, hubIndices } = useMemo(() => {
    const nodeCount = 60;
    const positions: THREE.Vector3[] = [];
    const hubIdx: number[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const t = Math.random();
      const x = -7 + Math.pow(t, 0.65) * 16;
      const y = (Math.random() - 0.5) * 11;
      const z = (Math.random() - 0.5) * 4.5;
      positions.push(new THREE.Vector3(x, y, z));
      if (i % 8 === 0 && x > 0) hubIdx.push(i);
    }

    const maxDist = 2.9;
    const leftPts: number[] = [];
    const rightPts: number[] = [];

    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const dist = positions[i].distanceTo(positions[j]);
        if (dist < maxDist) {
          const p1 = positions[i];
          const p2 = positions[j];
          const mid = p1.clone().add(p2).multiplyScalar(0.5);

          const dir = p2.clone().sub(p1);
          const perp = new THREE.Vector3(-dir.y, dir.x, dir.z * 0.3).normalize();
          const curveAmount = (Math.random() - 0.5) * dist * 0.55;
          const control = mid.clone().add(perp.multiplyScalar(curveAmount));

          const curve = new THREE.QuadraticBezierCurve3(p1, control, p2);
          const pts = curve.getPoints(5);

          const avgX = (p1.x + p2.x) / 2;
          const target = avgX > 0 ? rightPts : leftPts;

          for (let k = 0; k < pts.length - 1; k++) {
            target.push(
              pts[k].x, pts[k].y, pts[k].z,
              pts[k + 1].x, pts[k + 1].y, pts[k + 1].z
            );
          }
        }
      }
    }

    return {
      leftLines: new Float32Array(leftPts),
      rightLines: new Float32Array(rightPts),
      nodes: positions,
      hubIndices: hubIdx,
    };
  }, []);

  useFrame((state) => {
    if (prefersReducedMotion) return;
    if (groupRef.current) {
      // Smooth natural rotation + subtle mouse parallax response
      const targetRotY = state.clock.elapsedTime * 0.04 + state.pointer.x * 0.18;
      const targetRotX = Math.sin(state.clock.elapsedTime * 0.02) * 0.05 - state.pointer.y * 0.12;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.12) * 0.12;
      groupRef.current.position.x = state.pointer.x * 0.15;
    }
    if (rightLineRef.current) {
      const mat = rightLineRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = 0.18 + Math.sin(state.clock.elapsedTime * 0.4) * 0.04;
    }
    if (leftLineRef.current) {
      const mat = leftLineRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = 0.05 + Math.sin(state.clock.elapsedTime * 0.3) * 0.015;
    }
  });

  const hubSet = new Set(hubIndices);

  return (
    <group ref={groupRef}>
      {/* Left-side connections — soft, behind text */}
      <lineSegments ref={leftLineRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[leftLines, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color="#E11D2E"
          transparent
          opacity={0.16}
        />
      </lineSegments>

      {/* Right-side connections — brighter, denser */}
      <lineSegments ref={rightLineRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[rightLines, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color="#FF3344"
          transparent
          opacity={0.42}
        />
      </lineSegments>

      {/* Nodes */}
      {nodes.map((pos, i) => {
        const isHub = hubSet.has(i);
        const isRight = pos.x > 0;
        return (
          <mesh key={i} position={[pos.x, pos.y, pos.z]}>
            <sphereGeometry args={[isHub ? 0.08 : 0.038, 12, 12]} />
            <meshStandardMaterial
              color={isHub ? '#FF2E44' : '#DC2626'}
              emissive={isHub ? '#FF2E44' : '#DC2626'}
              emissiveIntensity={isRight ? (isHub ? 2.2 : 1.1) : (isHub ? 1.0 : 0.5)}
              roughness={0.2}
              metalness={0.4}
              transparent
              opacity={isRight ? 0.95 : 0.5}
            />
          </mesh>
        );
      })}

      {/* Glow halos around hub nodes on the right */}
      {nodes.map((pos, i) =>
        hubSet.has(i) ? (
          <mesh key={`glow-${i}`} position={[pos.x, pos.y, pos.z]}>
            <sphereGeometry args={[0.22, 16, 16]} />
            <meshBasicMaterial
              color="#FF2E44"
              transparent
              opacity={0.18}
            />
          </mesh>
        ) : null
      )}
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[8, 3, 5]} intensity={2.2} color="#E11D2E" distance={35} />
      <pointLight position={[-6, -3, 2]} intensity={0.6} color="#FF3344" distance={25} />
      <Suspense fallback={null}>
        <WebNetwork />
      </Suspense>
    </>
  );
}

export function HeroScene() {
  const prefersReducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <Canvas
      camera={{ position: [0.5, 0, 13], fov: 50 }}
      dpr={[1, 1.5]}
      frameloop={prefersReducedMotion ? 'demand' : 'always'}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <Scene />
    </Canvas>
  );
}

