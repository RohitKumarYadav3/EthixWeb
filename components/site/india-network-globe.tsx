'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Convert lat/long on a sphere of radius R to Vector3
function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

// Key Hub Locations
interface Hub {
  id: string;
  name: string;
  lat: number;
  lng: number;
  isIndia?: boolean;
  color: string;
}

const HUBS: Hub[] = [
  { id: 'india-main', name: 'India Hub', lat: 21.0, lng: 78.5, isIndia: true, color: '#E11D2E' },
  { id: 'delhi', name: 'Delhi NCR', lat: 28.6, lng: 77.2, isIndia: true, color: '#FF4D5A' },
  { id: 'bengaluru', name: 'Bengaluru', lat: 12.97, lng: 77.59, isIndia: true, color: '#FF4D5A' },
  { id: 'mumbai', name: 'Mumbai', lat: 19.07, lng: 72.87, isIndia: true, color: '#FF4D5A' },
  { id: 'seattle', name: 'Seattle', lat: 47.6, lng: -122.3, color: '#4ADE80' },
  { id: 'utah', name: 'Utah', lat: 40.7, lng: -111.9, color: '#FACC15' },
  { id: 'new-york', name: 'New York', lat: 40.7, lng: -74.0, color: '#60A5FA' },
  { id: 'canada', name: 'Canada', lat: 45.4, lng: -75.7, color: '#F472B6' },
  { id: 'uk', name: 'UK', lat: 51.5, lng: -0.12, color: '#A78BFA' },
];

const CONNECTIONS = [
  { from: 'india-main', to: 'seattle' },
  { from: 'india-main', to: 'utah' },
  { from: 'india-main', to: 'new-york' },
  { from: 'india-main', to: 'canada' },
  { from: 'india-main', to: 'uk' },
  { from: 'bengaluru', to: 'seattle' },
  { from: 'delhi', to: 'uk' },
  { from: 'mumbai', to: 'new-york' },
  { from: 'seattle', to: 'utah' },
  { from: 'utah', to: 'new-york' },
];

const RADIUS = 2.45;

interface SharedRotation {
  rotX: number;
  rotY: number;
  velX: number;
  velY: number;
  isDragging: boolean;
  prevX: number;
  prevY: number;
}

function GlobeScene({ shared }: { shared: React.MutableRefObject<SharedRotation> }) {
  const groupRef = useRef<THREE.Group>(null);

  // 1. Generate dot matrix representing Earth with dense points over India
  const { dotPositions, dotColors } = useMemo(() => {
    const coords: number[] = [];
    const colors: number[] = [];
    const colorCrimson = new THREE.Color('#E11D2E');
    const colorIndiaBright = new THREE.Color('#FF4A55');
    const colorDim = new THREE.Color('#3A3A44');
    const colorLand = new THREE.Color('#6E6E7A');

    // Landmass approximation boxes [minLat, maxLat, minLng, maxLng, densityMultiplier]
    const landAreas: [number, number, number, number, number][] = [
      // India (Extra dense & prominent)
      [8, 36, 68, 92, 12],
      // South Asia
      [5, 38, 60, 100, 3],
      // East Asia
      [18, 50, 100, 142, 3],
      // Southeast Asia
      [-10, 20, 95, 140, 2],
      // Middle East
      [12, 40, 35, 60, 2.5],
      // Europe
      [35, 68, -10, 40, 3],
      // North America
      [24, 65, -130, -65, 3.5],
      // South America
      [-55, 12, -80, -35, 1.8],
      // Africa
      [-35, 35, -18, 52, 2],
      // Australia
      [-42, -10, 112, 154, 2],
    ];

    // Sample points on sphere
    const totalSamples = 3200;
    for (let i = 0; i < totalSamples; i++) {
      const lat = Math.asin(2 * Math.random() - 1) * (180 / Math.PI);
      const lng = Math.random() * 360 - 180;

      // Check if inside any land box
      let isLand = false;
      let isIndia = false;
      for (const [minLat, maxLat, minLng, maxLng, mult] of landAreas) {
        if (lat >= minLat && lat <= maxLat && lng >= minLng && lng <= maxLng) {
          if (Math.random() < 0.28 * mult) {
            isLand = true;
            if (minLat === 8 && minLng === 68) {
              isIndia = true;
            }
            break;
          }
        }
      }

      if (isLand) {
        const v = latLngToVector3(lat, lng, RADIUS);
        coords.push(v.x, v.y, v.z);
        if (isIndia) {
          colors.push(colorIndiaBright.r, colorIndiaBright.g, colorIndiaBright.b);
        } else if (Math.random() < 0.1) {
          colors.push(colorCrimson.r, colorCrimson.g, colorCrimson.b);
        } else {
          colors.push(colorLand.r, colorLand.g, colorLand.b);
        }
      } else if (Math.random() < 0.03) {
        // very sparse ocean dots for spherical outline
        const v = latLngToVector3(lat, lng, RADIUS);
        coords.push(v.x, v.y, v.z);
        colors.push(colorDim.r, colorDim.g, colorDim.b);
      }
    }

    return {
      dotPositions: new Float32Array(coords),
      dotColors: new Float32Array(colors),
    };
  }, []);

  // 2. Compute 3D curves between hubs and prepare animated moving dots
  const hubMap = useMemo(() => {
    const map = new Map<string, THREE.Vector3>();
    HUBS.forEach((h) => {
      map.set(h.id, latLngToVector3(h.lat, h.lng, RADIUS));
    });
    return map;
  }, []);

  const curves = useMemo(() => {
    return CONNECTIONS.map((c) => {
      const p1 = hubMap.get(c.from)!;
      const p2 = hubMap.get(c.to)!;
      const distance = p1.distanceTo(p2);

      // elevate midpoint above the sphere surface
      const mid = p1.clone().add(p2).multiplyScalar(0.5);
      const elevation = Math.min(1.1, 0.25 + distance * 0.22);
      mid.normalize().multiplyScalar(RADIUS + elevation);

      const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
      return {
        curve,
        points: curve.getPoints(40),
        from: c.from,
        to: c.to,
      };
    });
  }, [hubMap]);

  // Moving packets ref
  const movingPacketsRef = useRef<THREE.InstancedMesh>(null);
  const packetCount = curves.length * 3;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Animation frame
  useFrame((state) => {
    if (!groupRef.current) return;

    // Apply shared rotation
    if (!shared.current.isDragging) {
      shared.current.rotY += shared.current.velY;
      shared.current.rotX += shared.current.velX;
      shared.current.velY = THREE.MathUtils.lerp(shared.current.velY, 0.002, 0.04);
      shared.current.velX = THREE.MathUtils.lerp(shared.current.velX, 0, 0.04);
    }

    groupRef.current.rotation.y = shared.current.rotY;
    groupRef.current.rotation.x = shared.current.rotX;

    // Animate moving data packet dots along each arc curve
    if (movingPacketsRef.current) {
      let idx = 0;
      const time = state.clock.elapsedTime * 0.45;

      curves.forEach((c, cIdx) => {
        for (let p = 0; p < 3; p++) {
          const t = (time + (cIdx * 0.23) + (p * 0.33)) % 1;
          const pos = c.curve.getPoint(t);
          dummy.position.copy(pos);
          const scale = 0.045 + Math.sin(t * Math.PI) * 0.025;
          dummy.scale.set(scale, scale, scale);
          dummy.updateMatrix();
          movingPacketsRef.current!.setMatrixAt(idx++, dummy.matrix);
        }
      });
      movingPacketsRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Dark Core Sphere with slight crimson sheen */}
      <mesh>
        <sphereGeometry args={[RADIUS - 0.02, 48, 48]} />
        <meshStandardMaterial
          color="#0B0B11"
          roughness={0.6}
          metalness={0.2}
        />
      </mesh>

      {/* Outer glowing atmospheric halo ring */}
      <mesh>
        <sphereGeometry args={[RADIUS + 0.04, 32, 32]} />
        <meshBasicMaterial
          color="#E11D2E"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Subtle Equator and Latitude Wireframe Rings */}
      <lineSegments>
        <ringGeometry args={[RADIUS + 0.01, RADIUS + 0.015, 64]} />
        <lineBasicMaterial color="#E11D2E" transparent opacity={0.15} />
      </lineSegments>

      {/* Dot Matrix Continents (Highlighting India) */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[dotPositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[dotColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.038}
          vertexColors
          transparent
          opacity={0.88}
          sizeAttenuation
        />
      </points>

      {/* Curved Connection Arcs */}
      {curves.map((c, i) => {
        const linePositions = new Float32Array(c.points.flatMap((p) => [p.x, p.y, p.z]));
        return (
          <line key={`arc-${i}`}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[linePositions, 3]}
              />
            </bufferGeometry>
            <lineBasicMaterial
              color="#E11D2E"
              transparent
              opacity={0.35}
              blending={THREE.AdditiveBlending}
            />
          </line>
        );
      })}

      {/* Animated Moving Data Packets (Dots) Traversing the Arcs */}
      <instancedMesh
        ref={movingPacketsRef}
        args={[undefined, undefined, packetCount]}
      >
        <sphereGeometry args={[1, 10, 10]} />
        <meshBasicMaterial color="#FF4D5A" />
      </instancedMesh>

      {/* Hub Markers (India & International Cities) */}
      {HUBS.map((hub) => {
        const pos = hubMap.get(hub.id)!;
        return (
          <group key={hub.id} position={[pos.x, pos.y, pos.z]}>
            {/* Outer pulsing ring for India Hub */}
            {hub.isIndia && (
              <mesh>
                <sphereGeometry args={[0.09, 16, 16]} />
                <meshBasicMaterial
                  color="#E11D2E"
                  transparent
                  opacity={0.25}
                  blending={THREE.AdditiveBlending}
                />
              </mesh>
            )}

            {/* Core Hub Dot */}
            <mesh>
              <sphereGeometry args={[hub.isIndia ? 0.055 : 0.04, 16, 16]} />
              <meshStandardMaterial
                color={hub.isIndia ? '#FF4D5A' : '#F5F0E6'}
                emissive={hub.isIndia ? '#E11D2E' : '#F5F0E6'}
                emissiveIntensity={hub.isIndia ? 2.5 : 1.2}
                roughness={0.2}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

export function IndiaNetworkGlobe() {
  const sharedRotation = useRef<SharedRotation>({
    rotX: 0.25,
    rotY: -1.45,
    velX: 0,
    velY: 0.002,
    isDragging: false,
    prevX: 0,
    prevY: 0,
  });

  const handlePointerDown = (e: React.PointerEvent) => {
    sharedRotation.current.isDragging = true;
    sharedRotation.current.prevX = e.clientX;
    sharedRotation.current.prevY = e.clientY;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!sharedRotation.current.isDragging) return;
    const deltaX = e.clientX - sharedRotation.current.prevX;
    const deltaY = e.clientY - sharedRotation.current.prevY;

    sharedRotation.current.velY = deltaX * 0.004;
    sharedRotation.current.velX = deltaY * 0.0035;

    sharedRotation.current.rotY += sharedRotation.current.velY;
    sharedRotation.current.rotX = Math.max(
      -0.6,
      Math.min(0.6, sharedRotation.current.rotX + sharedRotation.current.velX)
    );

    sharedRotation.current.prevX = e.clientX;
    sharedRotation.current.prevY = e.clientY;
  };

  const handlePointerUp = () => {
    sharedRotation.current.isDragging = false;
  };

  return (
    <div
      className="relative mx-auto flex h-[520px] w-full max-w-[620px] select-none items-center justify-center cursor-grab active:cursor-grabbing"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 5.8], fov: 42 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          style={{ width: '100%', height: '100%' }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[6, 4, 6]} intensity={1.8} color="#FF3B4A" />
          <pointLight position={[-6, -3, 3]} intensity={0.5} color="#F5F0E6" />
          <GlobeScene shared={sharedRotation} />
        </Canvas>
      </div>

      {/* Floating City Labels Overlay on Globe */}
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-6">
        {/* Top Floating Badge: India Hub Center */}
        <div className="flex justify-start">
          <div className="inline-flex items-center gap-2 rounded-full border border-crimson/40 bg-surface/80 px-3.5 py-1.5 backdrop-blur-md shadow-lg shadow-crimson/10 animate-pulse">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-crimson opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-crimson" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-content">
              India Ops Hub
            </span>
            <span className="text-[11px] font-mono text-crimson">24/7 Active</span>
          </div>
        </div>

        {/* Bottom subtle drag guide */}
        <div className="flex justify-center pb-2">
          <span className="rounded-full border border-line-subtle bg-surface/60 px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-content-faint backdrop-blur-sm">
            Drag to rotate · Auto-spins when idle
          </span>
        </div>
      </div>
    </div>
  );
}
