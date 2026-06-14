"use client";

import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type Dice3DProps = {
  result: number;
  rolling: boolean;
};

/* ────────── 90 degree shortcut ────────── */
const P = Math.PI;
const H = Math.PI / 2;

/* ────────── Dice face rotation map ──────────
   এখানে সব rotation 90 degree based,
   তাই dice animation শেষ হলে সোজা হয়ে দেখাবে।

   NOTE:
   GLB model অনুযায়ী face orientation আলাদা হতে পারে।
   যদি result 1 দিলে 1 না দেখায়, নিচের value গুলো swap করতে হবে।
────────────────────────────────────────────── */
const FACE_ROTATIONS: Record<number, [number, number, number]> = {
  1: [0, -H, 0],
  2: [0, -H, 0],
  3: [H, 0, 0],
  4: [-H, 0, 0],
  5: [0, 0, H],
  6: [P, 0, 0],
};

/* ────────── Dice Model Component ────────── */
function DiceModel({ result, rolling }: Dice3DProps) {
  const { scene } = useGLTF("/models/dice.glb");

  const groupRef = useRef<THREE.Group>(null);

  /* ────────── Target rotation result অনুযায়ী ────────── */
  const targetRotation = useMemo<[number, number, number]>(() => {
    return FACE_ROTATIONS[result] ?? FACE_ROTATIONS[1];
  }, [result]);

  /* ────────── GLB clone + auto center + auto scale ────────── */
  const { clonedScene, modelScale, modelCenter } = useMemo(() => {
    const cloned = scene.clone(true);

    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        const material = mesh.material;

        if (Array.isArray(material)) {
          material.forEach((mat) => {
            mat.side = THREE.DoubleSide;
            mat.needsUpdate = true;
          });
        } else if (material) {
          material.side = THREE.DoubleSide;
          material.needsUpdate = true;
        }
      }
    });

    const box = new THREE.Box3().setFromObject(cloned);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();

    box.getSize(size);
    box.getCenter(center);

    const maxSize = Math.max(size.x, size.y, size.z);
    const scale = maxSize > 0 ? 2.35 / maxSize : 1;

    return {
      clonedScene: cloned,
      modelScale: scale,
      modelCenter: center,
    };
  }, [scene]);

  /* ────────── First load rotation set ────────── */
  useEffect(() => {
    if (!groupRef.current) return;

    groupRef.current.rotation.set(
      targetRotation[0],
      targetRotation[1],
      targetRotation[2],
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ────────── Rolling + Smooth Stop Animation ────────── */
  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const dice = groupRef.current;

    if (rolling) {
      dice.rotation.x += delta * 10;
      dice.rotation.y += delta * 13;
      dice.rotation.z += delta * 8;
      return;
    }

    /* ────────── Stop হলে target rotation-এ smooth যাবে ────────── */
    dice.rotation.x = THREE.MathUtils.lerp(
      dice.rotation.x,
      targetRotation[0],
      0.16,
    );

    dice.rotation.y = THREE.MathUtils.lerp(
      dice.rotation.y,
      targetRotation[1],
      0.16,
    );

    dice.rotation.z = THREE.MathUtils.lerp(
      dice.rotation.z,
      targetRotation[2],
      0.16,
    );

    /* ────────── কাছাকাছি গেলে একদম exact snap করে দেবে ────────── */
    const dx = Math.abs(dice.rotation.x - targetRotation[0]);
    const dy = Math.abs(dice.rotation.y - targetRotation[1]);
    const dz = Math.abs(dice.rotation.z - targetRotation[2]);

    if (dx < 0.01 && dy < 0.01 && dz < 0.01) {
      dice.rotation.set(
        targetRotation[0],
        targetRotation[1],
        targetRotation[2],
      );
    }
  });

  return (
    <group ref={groupRef} scale={modelScale}>
      <primitive
        object={clonedScene}
        position={[-modelCenter.x, -modelCenter.y, -modelCenter.z]}
      />
    </group>
  );
}

/* ────────── Ground Shadow ────────── */
function Ground() {
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -1.35, 0]}
      receiveShadow
    >
      <planeGeometry args={[8, 8]} />
      <shadowMaterial transparent opacity={0.25} />
    </mesh>
  );
}

/* ────────── Loading fallback cube ────────── */
function LoadingDice() {
  return (
    <mesh rotation={[0, 0, 0]}>
      <boxGeometry args={[1.4, 1.4, 1.4]} />
      <meshStandardMaterial color="#facc15" />
    </mesh>
  );
}

/* ────────── Main 3D Dice Canvas ────────── */
export default function Dice3D({ result, rolling }: Dice3DProps) {
  return (
    <div className="h-[280px] w-full overflow-hidden rounded-[28px] border border-white/10 bg-black/20 shadow-2xl">
      <Canvas
        shadows
        camera={{
          position: [0, 0.45, 5],
          fov: 45,
          near: 0.1,
          far: 100,
        }}
      >
        <Suspense fallback={<LoadingDice />}>
          {/* ────────── Lights ────────── */}
          <ambientLight intensity={2} />

          <directionalLight
            position={[4, 6, 5]}
            intensity={3}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />

          <pointLight position={[-4, 3, 5]} intensity={2} />

          {/* ────────── Dice Model ────────── */}
          <DiceModel result={result} rolling={rolling} />

          {/* ────────── Shadow ────────── */}
          <Ground />

          {/* 
            Rotate বন্ধ রাখা হলো।
            কারণ user mouse দিয়ে dice ঘুরালে result আর face mismatch হবে।
          */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/dice.glb");
