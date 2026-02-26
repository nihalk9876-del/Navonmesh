import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

const UFOModel = ({ position, rotationSpeed, scale, speed, pathType }) => {
    const meshRef = useRef();
    const timeRef = useRef(Math.random() * 100);

    useFrame((state, delta) => {
        if (!meshRef.current) return;

        // Rotate the UFO on its own axis (Spinning)
        meshRef.current.rotation.y += delta * rotationSpeed;
        meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.1; // Slight tilt

        // Update time
        timeRef.current += delta * speed;

        // Calculate Movement Paths
        if (pathType === 'circle') {
            // Path 1: Wide Circular Path
            meshRef.current.position.x = Math.sin(timeRef.current * 0.5) * 8;
            meshRef.current.position.y = Math.cos(timeRef.current * 0.3) * 4 + position[1]; // Bobbing up/down
            meshRef.current.position.z = Math.cos(timeRef.current * 0.5) * 5;
        } else if (pathType === 'figure8') {
            // Path 2: Figure 8
            meshRef.current.position.x = Math.sin(timeRef.current * 0.4) * 10;
            meshRef.current.position.y = Math.sin(timeRef.current * 0.8) * 3 + position[1];
            meshRef.current.position.z = Math.cos(timeRef.current * 0.4) * 2;
        } else {
            // Path 3: Diagonal Sweep
            meshRef.current.position.x = (timeRef.current % 30) - 15; // Moves left to right
            meshRef.current.position.y = Math.sin(timeRef.current) * 2 + position[1];
            meshRef.current.position.z = Math.cos(timeRef.current * 0.5) * 5;
        }
    });

    return (
        <group ref={meshRef} position={position} scale={scale}>
            {/* UFO Body - Disc Shape */}
            <mesh>
                <cylinderGeometry args={[1, 2.5, 0.5, 32]} />
                <meshStandardMaterial color="#444" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* UFO Top Dome */}
            <mesh position={[0, 0.4, 0]}>
                <sphereGeometry args={[1.2, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
                <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.5} transparent opacity={0.6} />
            </mesh>

            {/* Glowing Ring Lights */}
            <mesh position={[0, -0.2, 0]}>
                <torusGeometry args={[2.6, 0.1, 16, 100]} />
                <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={2} />
            </mesh>

            {/* Bottom Thruster */}
            <mesh position={[0, -0.5, 0]}>
                <coneGeometry args={[0.5, 1, 32]} />
                <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={1} />
            </mesh>
        </group>
    );
};


const FloatingUFO = () => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 0 // Behind everything but visible
        }}>
            <Canvas camera={{ position: [0, 0, 15], fov: 45 }} gl={{ alpha: true }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <Environment preset="city" />

                <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                    {/* UFO 1: Left-Right Sweep */}
                    <UFOModel position={[-5, 2, 0]} rotationSpeed={1} scale={0.4} speed={0.8} pathType="diagonal" />

                    {/* UFO 2: Figure 8 Loop */}
                    <UFOModel position={[5, -2, -2]} rotationSpeed={1.5} scale={0.3} speed={0.5} pathType="figure8" />

                    {/* UFO 3: Circular Orbit */}
                    <UFOModel position={[0, 4, -5]} rotationSpeed={0.8} scale={0.5} speed={0.3} pathType="circle" />
                </Float>
            </Canvas>
        </div>
    );
};

export default FloatingUFO;
