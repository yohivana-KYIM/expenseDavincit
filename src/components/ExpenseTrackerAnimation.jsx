import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'
import * as THREE from 'three'

function Coin({ position, onClick, isMoving, targetPosition }) {
  const ref = useRef()
  
  useFrame(({ clock }) => {
    if (isMoving) {
      ref.current.position.lerp(targetPosition, 0.1)
    } else {
      ref.current.rotation.z = Math.sin(clock.getElapsedTime() * 2) * 0.1
    }
  })

  return (
    <mesh ref={ref} position={position} onClick={onClick}>
      <cylinderGeometry args={[0.1, 0.1, 0.05, 32]} />
      <meshStandardMaterial color="gold" metalness={0.8} roughness={0.2} />
    </mesh>
  )
}

function Register({ amount }) {
  const registerRef = useRef()
  
  useFrame(() => {
    registerRef.current.rotation.y += 0.01
  })

  return (
    <>
      <mesh ref={registerRef} position={[1.5, 0.5, 0]}>
        <boxGeometry args={[0.5, 0.3, 0.5]} />
        <meshStandardMaterial color="darkgray" />
        <mesh position={[0, 0.2, 0]}>
          <boxGeometry args={[0.4, 0.1, 0.3]} />
          <meshStandardMaterial color="gray" />
        </mesh>
      </mesh>
      <Text
        position={[1.5, 1, 0]}
        color="white"
        fontSize={0.2}
        anchorX="center"
        anchorY="middle"
      >
        {`Dépenses: ${amount} XAF`}
      </Text>
    </>
  )
}

function Person({ position }) {
  const ref = useRef()

  useFrame(({ clock }) => {
    ref.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 2) * 0.05
  })

  return (
    <group ref={ref} position={position}>
      <mesh position={[0, 0.7, 0]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color="peachpuff" />
      </mesh>
      <mesh position={[0, 0.3, 0]}>
        <capsuleGeometry args={[0.15, 0.5, 4, 8]} />
        <meshStandardMaterial color="blue" />
      </mesh>
    </group>
  )
}

export default function ExpenseControlAnimation() {
  const [amount, setAmount] = useState(0)
  const [coins, setCoins] = useState([
    { id: 1, position: new THREE.Vector3(-0.5, 0.5, 0), isMoving: false },
    { id: 2, position: new THREE.Vector3(-0.2, 0.5, 0), isMoving: false },
    { id: 3, position: new THREE.Vector3(0.1, 0.5, 0), isMoving: false },
  ])

  const handleCoinClick = (id) => {
    setCoins(prevCoins => prevCoins.map(coin => 
      coin.id === id ? { ...coin, isMoving: true } : coin
    ))
    setAmount(prevAmount => prevAmount + 10)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setCoins(prevCoins => prevCoins.map(coin => 
        coin.isMoving ? { ...coin, isMoving: false, position: new THREE.Vector3(-0.5 + Math.random() * 0.6, 0.5, 0) } : coin
      ))
    }, 1000)
    return () => clearTimeout(timer)
  }, [coins])

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Canvas camera={{ position: [0, 2, 5] }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={1} />
        <Register amount={amount} />
        {coins.map((coin) => (
          <Coin 
            key={coin.id}
            position={coin.position}
            onClick={() => handleCoinClick(coin.id)}
            isMoving={coin.isMoving}
            targetPosition={new THREE.Vector3(1.5, 0.5, 0)}
          />
        ))}
        <Person position={[-1, 0, 0]} />
        <OrbitControls />
      </Canvas>
    </div>
  )
}