'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Float, Lightformer } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

function Sculpture({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null)
  const knot = useRef<THREE.Mesh>(null)
  const ribbon = useRef<THREE.Mesh>(null)
  const { viewport } = useThree()

  useFrame((state, delta) => {
    if (!group.current || !knot.current || !ribbon.current) return
    const scroll = typeof window !== 'undefined' ? window.scrollY / Math.max(1, window.innerHeight) : 0
    const speed = reduced ? 0 : 1
    knot.current.rotation.x += delta * 0.12 * speed
    knot.current.rotation.y += delta * 0.18 * speed
    ribbon.current.rotation.x -= delta * 0.08 * speed
    ribbon.current.rotation.z += delta * 0.14 * speed

    const desktop = viewport.width > 7
    const baseX = desktop ? viewport.width * 0.22 : 0
    const baseY = desktop ? 0 : viewport.height * 0.25
    const targetX = baseX + state.pointer.x * 0.35 - Math.min(scroll, 1.2) * (desktop ? viewport.width * 0.06 : 0)
    const targetY = baseY + state.pointer.y * 0.25 - Math.min(scroll, 1) * 0.4
    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, targetX, 3, delta)
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, targetY, 3, delta)
    group.current.rotation.z = THREE.MathUtils.damp(group.current.rotation.z, scroll * 0.9, 3, delta)
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, state.pointer.x * 0.3 + scroll * 0.6, 3, delta)
    const s = desktop ? 1 : 0.5
    group.current.scale.setScalar(THREE.MathUtils.damp(group.current.scale.x, s, 3, delta))
  })

  return (
    <group ref={group}>
      <mesh ref={knot}>
        <torusKnotGeometry args={[1.15, 0.36, 220, 40, 2, 3]} />
        <meshPhysicalMaterial
          color="#ffffff"
          metalness={0.15}
          roughness={0.08}
          transmission={0.9}
          thickness={1.2}
          ior={1.4}
          clearcoat={1}
          clearcoatRoughness={0.05}
          envMapIntensity={1.4}
        />
      </mesh>
      <mesh ref={ribbon} rotation={[0.6, 0.2, 0]}>
        <torusKnotGeometry args={[1.25, 0.07, 260, 12, 3, 5]} />
        <meshPhysicalMaterial color="#163E31" metalness={0.4} roughness={0.15} clearcoat={1} envMapIntensity={1.2} />
      </mesh>

      <Float speed={reduced ? 0 : 1.4} rotationIntensity={1} floatIntensity={1.2}>
        <mesh position={[-2.1, 1.3, -0.5]} rotation={[0.5, 0.4, 0]}>
          <boxGeometry args={[0.42, 0.42, 0.42]} />
          <meshPhysicalMaterial color="#ffffff" roughness={0.2} transmission={0.8} thickness={0.5} />
        </mesh>
      </Float>
      <Float speed={reduced ? 0 : 1.1} rotationIntensity={1.4} floatIntensity={1}>
        <mesh position={[2.0, -1.4, 0.3]} rotation={[1, 0.2, 0]}>
          <torusGeometry args={[0.32, 0.08, 24, 64]} />
          <meshPhysicalMaterial color="#ffffff" roughness={0.1} transmission={0.85} thickness={0.4} />
        </mesh>
      </Float>
      <Float speed={reduced ? 0 : 1.8} floatIntensity={1.6}>
        <mesh position={[1.8, 1.6, -0.8]}>
          <sphereGeometry args={[0.14, 32, 32]} />
          <meshStandardMaterial color="#D4F25A" emissive="#D4F25A" emissiveIntensity={0.35} roughness={0.3} />
        </mesh>
      </Float>
      <Float speed={reduced ? 0 : 1.3} floatIntensity={1.4}>
        <mesh position={[-1.7, -1.5, 0.4]}>
          <sphereGeometry args={[0.09, 32, 32]} />
          <meshStandardMaterial color="#D4F25A" emissive="#D4F25A" emissiveIntensity={0.35} roughness={0.3} />
        </mesh>
      </Float>
    </group>
  )
}

export default function KnotScene({ reduced }: { reduced: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 7], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      frameloop={reduced ? 'demand' : 'always'}
      resize={{ debounce: { resize: 150, scroll: 0 }, scroll: false }}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      eventSource={typeof document !== 'undefined' ? document.body : undefined}
      eventPrefix="client"
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 5, 3]} intensity={1.6} />
      <Sculpture reduced={reduced} />
      <Environment resolution={256}>
        <Lightformer intensity={3} position={[0, 5, -6]} scale={[10, 3, 1]} />
        <Lightformer intensity={2} position={[-5, 1, 2]} rotation-y={Math.PI / 2} scale={[8, 2, 1]} />
        <Lightformer intensity={2} position={[5, -1, 2]} rotation-y={-Math.PI / 2} scale={[8, 2, 1]} />
        <Lightformer intensity={1.5} color="#D4F25A" position={[0, -4, 3]} scale={[6, 1, 1]} />
        <Lightformer intensity={1.2} color="#163E31" position={[0, 0, 6]} scale={[4, 4, 1]} form="ring" />
      </Environment>
    </Canvas>
  )
}
