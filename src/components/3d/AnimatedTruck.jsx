import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, ContactShadows } from '@react-three/drei'

function MapPin(props) {
  const pinRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (pinRef.current) {
      // Float up and down
      pinRef.current.position.y = 1.8 + Math.sin(t * 3) * 0.15
      // Rotate slowly
      pinRef.current.rotation.y = t * 1.2
    }
  })

  return (
    <group ref={pinRef} {...props}>
      {/* Top Sphere */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshToonMaterial color="#ea4335" /> {/* Google Maps Red */}
      </mesh>
      
      {/* Bottom Cone (pointing down) */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI, 0, 0]} castShadow>
        <coneGeometry args={[0.3, 0.8, 32]} />
        <meshToonMaterial color="#ea4335" />
      </mesh>
      
      {/* Inner Hole (white cylinder going through Z axis) */}
      <mesh position={[0, 0.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.62, 32]} />
        <meshToonMaterial color="#ffffff" />
      </mesh>
    </group>
  )
}

function Truck(props) {
  const truckRef = useRef()
  const wheelsRef = useRef([])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    // Bounce effect
    if (truckRef.current) {
      truckRef.current.position.y = Math.sin(t * 15) * 0.03
    }
    
    // Rotate wheels
    wheelsRef.current.forEach(wheel => {
      if (wheel) wheel.rotation.x += 0.3
    })
  })

  // Toon materials
  const bodyMaterial = <meshToonMaterial color="#2563eb" />
  const cabinMaterial = <meshToonMaterial color="#1d4ed8" />
  const windowMaterial = <meshToonMaterial color="#93c5fd" />
  const wheelMaterial = <meshToonMaterial color="#1f2937" />
  const bumperMaterial = <meshToonMaterial color="#4b5563" />
  const lightMaterial = <meshToonMaterial color="#fef08a" emissive="#fef08a" emissiveIntensity={0.5} />

  return (
    <group ref={truckRef} {...props}>
      {/* Trailer/Body */}
      <mesh position={[0, 0.8, -0.8]} castShadow>
        <boxGeometry args={[1.5, 1.4, 3.2]} />
        {bodyMaterial}
      </mesh>

      {/* Cabin */}
      <mesh position={[0, 0.6, 1.2]} castShadow>
        <boxGeometry args={[1.4, 1, 1]} />
        {cabinMaterial}
      </mesh>

      {/* Windshield */}
      <mesh position={[0, 0.9, 1.71]}>
        <planeGeometry args={[1.2, 0.4]} />
        {windowMaterial}
      </mesh>

      {/* Side Windows */}
      <mesh position={[0.71, 0.9, 1.2]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[0.6, 0.4]} />
        {windowMaterial}
      </mesh>
      <mesh position={[-0.71, 0.9, 1.2]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[0.6, 0.4]} />
        {windowMaterial}
      </mesh>

      {/* Front Bumper */}
      <mesh position={[0, 0.2, 1.75]} castShadow>
        <boxGeometry args={[1.6, 0.3, 0.3]} />
        {bumperMaterial}
      </mesh>

      {/* Headlights */}
      <mesh position={[0.6, 0.3, 1.91]}>
        <planeGeometry args={[0.2, 0.15]} />
        {lightMaterial}
      </mesh>
      <mesh position={[-0.6, 0.3, 1.91]}>
        <planeGeometry args={[0.2, 0.15]} />
        {lightMaterial}
      </mesh>
      
      {/* Wheels */}
      {[
        [-0.85, 0.1, 1.0], // Front Left
        [0.85, 0.1, 1.0],  // Front Right
        [-0.85, 0.1, -0.6], // Middle Left
        [0.85, 0.1, -0.6],  // Middle Right
        [-0.85, 0.1, -1.8], // Back Left
        [0.85, 0.1, -1.8],  // Back Right
      ].map((pos, i) => (
        <group key={i} position={pos}>
          <mesh ref={el => wheelsRef.current[i] = el} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.3, 0.3, 0.25, 16]} />
            {wheelMaterial}
          </mesh>
          {/* Hubcap */}
          <mesh rotation={[0, 0, Math.PI / 2]} position={[Math.sign(pos[0]) * 0.13, 0, 0]}>
             <cylinderGeometry args={[0.15, 0.15, 0.26, 12]} />
             <meshToonMaterial color="#9ca3af" />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function OppositeCar(props) {
  const carRef = useRef()
  const wheelsRef = useRef([])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (carRef.current) {
      // Bounce
      carRef.current.position.y = Math.sin(t * 20) * 0.02
      // Move fast along -Z
      carRef.current.position.z -= 0.45
      if (carRef.current.position.z < -20) {
        carRef.current.position.z = 20
      }
    }
    
    // Rotate wheels
    wheelsRef.current.forEach(wheel => {
      if (wheel) wheel.rotation.x -= 0.45 // moving -Z, wheels rotate backwards
    })
  })

  // Toon materials
  const bodyMaterial = <meshToonMaterial color="#ef4444" /> // Red car
  const windowMaterial = <meshToonMaterial color="#93c5fd" />
  const wheelMaterial = <meshToonMaterial color="#1f2937" />

  return (
    <group ref={carRef} position={[-1.5, 0, 10]} rotation={[0, Math.PI, 0]} {...props}>
      {/* Body */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[1.2, 0.6, 2.5]} />
        {bodyMaterial}
      </mesh>
      {/* Cabin top */}
      <mesh position={[0, 0.8, -0.2]} castShadow>
        <boxGeometry args={[1, 0.5, 1.2]} />
        {bodyMaterial}
      </mesh>
      {/* Windshield */}
      <mesh position={[0, 0.8, 0.41]}>
        <planeGeometry args={[0.9, 0.4]} />
        {windowMaterial}
      </mesh>
      {/* Wheels */}
      {[
        [-0.7, 0.1, 0.8], // Front Left
        [0.7, 0.1, 0.8],  // Front Right
        [-0.7, 0.1, -0.8], // Back Left
        [0.7, 0.1, -0.8],  // Back Right
      ].map((pos, i) => (
        <group key={i} position={pos}>
          <mesh ref={el => wheelsRef.current[i] = el} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.25, 0.25, 0.2, 16]} />
            {wheelMaterial}
          </mesh>
        </group>
      ))}
    </group>
  )
}

function Road() {
  const roadRef = useRef()

  useFrame(() => {
    if (roadRef.current) {
      roadRef.current.position.z -= 0.3
      if (roadRef.current.position.z < -4) {
        roadRef.current.position.z += 4
      }
    }
  })

  return (
    <group>
      {/* Asphalt */}
      <mesh position={[0, -0.2, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 150]} />
        <meshStandardMaterial color="#374151" />
      </mesh>
      
      {/* Moving lines */}
      <group ref={roadRef}>
        {Array.from({ length: 15 }).map((_, i) => (
          <mesh key={i} position={[0, -0.19, -25 + i * 4]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.2, 2]} />
            <meshStandardMaterial color="#fcd34d" emissive="#fcd34d" emissiveIntensity={0.2} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

export default function AnimatedTruck() {
  return (
    <div className="w-full h-full min-h-[200px] lg:min-h-screen bg-[var(--bg-primary)] relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Canvas shadows camera={{ position: [6, 4, 8], fov: 40 }}>
          <fog attach="fog" args={['var(--bg-primary)', 10, 30]} />
          
          <ambientLight intensity={0.6} />
          <directionalLight 
            position={[10, 15, 10]} 
            intensity={1.2} 
            castShadow 
            shadow-mapSize={[1024, 1024]}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />
          <hemisphereLight intensity={0.3} groundColor="#000000" />
          
          <MapPin position={[1.5, 0, 0]} />
          <Truck position={[1.5, 0, 0]} scale={0.75} />
          <OppositeCar scale={0.75} />
          <Road />
          
          <ContactShadows position={[0, -0.19, 0]} opacity={0.7} scale={15} blur={1.5} far={4} color="#000000" />
          
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            autoRotate 
            autoRotateSpeed={0.5} 
            maxPolarAngle={Math.PI / 2 - 0.1} 
            minPolarAngle={Math.PI / 3} 
          />
        </Canvas>
      </div>
      
      {/* Overlay gradient to blend with the page */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 0%, var(--bg-primary) 75%)' }} />
      <div className="hidden lg:block absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-[var(--bg-primary)] via-[var(--bg-primary)]/50 to-transparent pointer-events-none" />
      <div className="hidden lg:block absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/50 to-transparent pointer-events-none" />
      <div className="hidden lg:block absolute top-0 bottom-0 left-0 w-64 bg-gradient-to-r from-[var(--bg-primary)] via-[var(--bg-primary)]/50 to-transparent pointer-events-none" />
      <div className="hidden lg:block absolute top-0 bottom-0 right-0 w-64 bg-gradient-to-l from-[var(--bg-primary)] via-[var(--bg-primary)]/50 to-transparent pointer-events-none" />
      
      <div className="absolute bottom-8 left-8 right-8 text-center pointer-events-none z-10 hidden lg:block">
        <h2 className="text-3xl font-display font-bold text-[var(--text)] mb-2 tracking-tight">Fuel Monitoring System</h2>
        <p className="text-[var(--muted)] text-sm max-w-md mx-auto">Monitor real-time telemetry, analyze fuel consumption, and optimize your entire operation from a single pane of glass.</p>
      </div>
    </div>
  )
}
