import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Sparkles, Float, MeshDistortMaterial, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';

// --- STAGE DATA ---
const STAGES = {
    LAUNCH: 0,
    COUNTDOWN: 1,
    EARTH: 2,
    BLACK_HOLE: 3,
    GALAXY: 4
};

// Travel Locations
const LOCATIONS = {
    [STAGES.EARTH]: { pos: [120, 20, -150], cam: [120, 25, -130], lookAt: [120, 20, -150] },
    [STAGES.BLACK_HOLE]: { pos: [-150, -50, -400], cam: [-150, -40, -360], lookAt: [-150, -50, -400] },
    [STAGES.GALAXY]: { pos: [0, 100, -800], cam: [0, 150, -600], lookAt: [0, 100, -800] }
};

// --- CUSTOM SHADER / COMPONENT VISUALS ---

const GalaxyBackground = () => {
    const nebulaRef = useRef();

    useFrame(({ clock }) => {
        if (nebulaRef.current) {
            nebulaRef.current.rotation.y = clock.getElapsedTime() * 0.05;
        }
    });

    return (
        <group>
            <color attach="background" args={['#000000']} />

            {/* Deep Space Background Sphere with Noise/Gradient */}
            <mesh scale={2000}>
                <sphereGeometry args={[1, 64, 64]} />
                <meshBasicMaterial color="#020205" side={THREE.BackSide} />
            </mesh>

            {/* Distant background stars - denser */}
            <Stars radius={500} depth={200} count={50000} factor={6} saturation={0} fade speed={0.5} />

            {/* Dynamic Volumetric Nebula Sphere (The "Universe" feel) */}
            <mesh ref={nebulaRef} scale={800}>
                <sphereGeometry args={[1, 64, 64]} />
                <MeshDistortMaterial
                    color="#1a0033"
                    transparent
                    opacity={0.15}
                    roughness={1}
                    metalness={0}
                    distort={0.4}
                    speed={1}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Nebula Clusters */}
            <group rotation={[0, 0, Math.PI / 6]}>
                <Sparkles count={3000} scale={[1200, 600, 1200]} size={25} speed={0.2} opacity={0.2} color="#4400cc" noise={40} />
                <Sparkles count={3000} scale={[1000, 500, 1000]} size={20} speed={0.3} opacity={0.2} color="#aa0044" noise={30} />
            </group>
        </group>
    );
};



const Earth = () => {
    // Load Earth textures
    const [colorMap, specularMap, cloudMap] = useTexture([
        'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg',
        'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg',
        'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png'
    ]);
    const moonMap = useTexture('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/moon_1024.jpg');

    const earthRef = useRef();
    const cloudsRef = useRef();
    const moonGroupRef = useRef();
    const moonMeshRef = useRef();

    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime();

        // Earth Rotation (Day Cycle)
        if (earthRef.current) {
            earthRef.current.rotation.y = elapsedTime * 0.05;
        }
        // Cloud Rotation (Independent)
        if (cloudsRef.current) {
            cloudsRef.current.rotation.y = elapsedTime * 0.07;
        }

        // Moon Orbit Rotation (Around Earth)
        if (moonGroupRef.current) {
            moonGroupRef.current.rotation.y = elapsedTime * 0.2; // Orbit Speed
        }
        // Moon Spin (Self Rotation)
        if (moonMeshRef.current) {
            moonMeshRef.current.rotation.y = elapsedTime * 0.01;
        }
    });

    return (
        <group position={LOCATIONS[STAGES.EARTH].pos}>
            <group rotation={[0, 0, 23.5 * Math.PI / 180]}> {/* Axial Tilt */}
                {/* Earth Sphere */}
                <mesh ref={earthRef} scale={4}>
                    <sphereGeometry args={[1, 64, 64]} />
                    <meshPhongMaterial
                        map={colorMap}
                        specularMap={specularMap}
                        specular={new THREE.Color('grey')}
                        shininess={10}
                    />
                </mesh>
                {/* Clouds Mesh (Slightly larger) */}
                <mesh ref={cloudsRef} scale={4.05}>
                    <sphereGeometry args={[1, 64, 64]} />
                    <meshStandardMaterial
                        map={cloudMap}
                        transparent
                        opacity={0.4}
                        blending={THREE.AdditiveBlending}
                        side={THREE.DoubleSide}
                        depthWrite={false}
                    />
                </mesh>
                {/* Atmosphere Halo */}
                <mesh scale={4.2}>
                    <sphereGeometry args={[1, 32, 32]} />
                    <meshBasicMaterial
                        color="#44aaff"
                        transparent
                        opacity={0.1}
                        side={THREE.BackSide}
                        blending={THREE.AdditiveBlending}
                    />
                </mesh>
            </group>

            {/* Moon System */}
            <group ref={moonGroupRef} rotation={[0.1, 0, 0]}> {/* Slight orbital inclination */}
                <group position={[10, 0, 0]}> {/* Orbit Distance */}
                    <mesh ref={moonMeshRef} scale={1.2}> {/* Moon Scale */}
                        <sphereGeometry args={[1, 32, 32]} />
                        <meshStandardMaterial map={moonMap} roughness={0.8} />
                    </mesh>
                </group>
            </group>
        </group>
    );
};

const BlackHole = () => {
    const diskRef = useRef();
    const jetRef = useRef();

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        if (diskRef.current) {
            diskRef.current.rotation.z = -t * 0.3;
            // Pulsating effect
            const scale = 1 + Math.sin(t * 2) * 0.02;
            diskRef.current.scale.set(scale, scale, 1);
        }
    });

    return (
        <group position={LOCATIONS[STAGES.BLACK_HOLE].pos}>
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
                {/* Event Horizon */}
                <mesh scale={9}>
                    <sphereGeometry args={[1, 64, 64]} />
                    <meshBasicMaterial color="#000000" />
                </mesh>

                {/* Main Accretion Disk (The swirling plasma) */}
                <group rotation={[Math.PI / 2.3, 0, 0]}> {/* Tilted */}
                    <mesh ref={diskRef}>
                        <torusGeometry args={[16, 6, 2, 128]} /> {/* Flat torus */}
                        <MeshDistortMaterial
                            color="#ff4400"
                            emissive="#ff2200"
                            emissiveIntensity={2}
                            roughness={0.2}
                            metalness={1}
                            distort={0.4}
                            speed={3}
                            transparent
                            opacity={0.9}
                        />
                    </mesh>

                    {/* Inner Photon Ring (Brightest) */}
                    <mesh position={[0, 0, 0]}>
                        <torusGeometry args={[10, 0.5, 16, 128]} />
                        <meshBasicMaterial color="#ffffff" toneMapped={false} />
                    </mesh>

                    {/* Outer Dust Haze */}
                    <mesh scale={[1.5, 1.5, 0.5]}>
                        <torusGeometry args={[18, 8, 2, 64]} />
                        <meshBasicMaterial color="#880000" transparent opacity={0.3} blending={THREE.AdditiveBlending} />
                    </mesh>
                </group>

                {/* Relativistic Jets (Energy Beams) */}
                <group ref={jetRef}>
                    <Sparkles count={500} scale={[2, 200, 2]} position={[0, 100, 0]} size={20} speed={5} opacity={0.5} color="#aaaaff" noise={10} />
                    <Sparkles count={500} scale={[2, 200, 2]} position={[0, -100, 0]} size={20} speed={5} opacity={0.5} color="#aaaaff" noise={10} />

                    {/* Jet Cone Glow */}
                    <mesh position={[0, 60, 0]}>
                        <cylinderGeometry args={[0.1, 5, 120, 32, 1, true]} />
                        <meshBasicMaterial color="#4444ff" transparent opacity={0.2} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
                    </mesh>
                    <mesh position={[0, -60, 0]} rotation={[Math.PI, 0, 0]}>
                        <cylinderGeometry args={[0.1, 5, 120, 32, 1, true]} />
                        <meshBasicMaterial color="#4444ff" transparent opacity={0.2} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
                    </mesh>
                </group>

                {/* Gravitational Lensing Sphere (Distortion) */}
                <mesh scale={25}>
                    <sphereGeometry args={[1, 64, 64]} />
                    <MeshDistortMaterial
                        color="#ffffff"
                        transparent
                        opacity={0.05}
                        roughness={0}
                        metalness={1}
                        distort={0.3}
                        speed={1}
                        side={THREE.DoubleSide}
                    />
                </mesh>
            </Float>
            <pointLight intensity={5} distance={500} decay={2} color="#ffaa00" />
        </group>
    );
};

const MilkyWay = () => {
    const galaxyRef = useRef();

    useFrame(({ clock }) => {
        if (galaxyRef.current) {
            galaxyRef.current.rotation.y = clock.getElapsedTime() * 0.02;
        }
    });

    return (
        <group ref={galaxyRef} position={LOCATIONS[STAGES.GALAXY].pos} rotation={[Math.PI / 6, 0, 0]}>
            {/* Core */}
            <pointLight position={[0, 0, 0]} intensity={8} color="#ffddee" distance={500} />
            <mesh scale={8}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.6} blending={THREE.AdditiveBlending} />
            </mesh>
            <mesh scale={15}>
                <sphereGeometry args={[1, 32, 32]} />
                <MeshDistortMaterial
                    color="#ffccff"
                    transparent
                    opacity={0.05}
                    distort={0.3}
                    speed={2}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* Spiral Arms - Multiple Layers for Depth */}
            <Sparkles count={15000} scale={[300, 40, 300]} size={6} speed={0.2} opacity={0.6} color="#ff00aa" noise={20} />
            <Sparkles count={15000} scale={[300, 40, 300]} size={4} speed={0.4} opacity={0.4} color="#00aaff" noise={30} />
            <Sparkles count={5000} scale={[400, 100, 400]} size={12} speed={0.1} opacity={0.2} color="#ffffff" noise={10} />

            {/* Core Dust */}
            <Sparkles count={3000} scale={[100, 50, 100]} size={8} speed={0.5} opacity={0.5} color="#ffddee" />
        </group>
    );
};

const HyperSpace = () => {
    // Intense Warp Stars
    const warpStars = useMemo(() => {
        return (
            <group rotation={[0, 0, Math.PI / 2]}>
                {/* Long streaks */}
                <Sparkles count={10000} scale={[100, 100, 2000]} size={20} speed={10} opacity={0.8} color="#00ffff" />
                <Sparkles count={10000} scale={[100, 100, 2000]} size={25} speed={15} opacity={1} color="white" />
            </group>
        )
    }, []);

    // Passing Objects (Asteroids, Planets, debris)
    const objects = useMemo(() => {
        return new Array(40).fill(0).map((_, i) => ({
            pos: [
                (Math.random() - 0.5) * 300,
                (Math.random() - 0.5) * 300,
                -Math.random() * 2000 - 100 // Start very far away
            ],
            scale: Math.random() * 5 + 1,
            speed: Math.random() * 10 + 20, // Very fast
            type: Math.random() > 0.8 ? 'planet' : 'asteroid',
            color: Math.random() > 0.5 ? '#555555' : '#884400'
        }));
    }, []);

    const objectRefs = useRef([]);

    useFrame((state, delta) => {
        objectRefs.current.forEach((ref, i) => {
            if (ref) {
                ref.position.z += objects[i].speed * 50 * delta; // Extreme speed
                ref.rotation.x += delta * 2;
                ref.rotation.y += delta * 2;

                // Reset if passed camera behind
                if (ref.position.z > 100) {
                    ref.position.z = -2000; // Reset far back
                    ref.position.x = (Math.random() - 0.5) * 300;
                    ref.position.y = (Math.random() - 0.5) * 300;
                }
            }
        });
    });

    return (
        <group>
            {warpStars}
            {objects.map((data, i) => (
                <mesh key={i} ref={el => objectRefs.current[i] = el} position={data.pos} scale={data.scale}>
                    {data.type === 'planet' ? <sphereGeometry args={[2, 16, 16]} /> : <dodecahedronGeometry args={[1, 0]} />}
                    <meshStandardMaterial color={data.color} emissive={data.type === 'planet' ? data.color : 'black'} emissiveIntensity={0.2} />
                </mesh>
            ))}
            {/* Dynamic Light flashes */}
            <pointLight intensity={2} distance={100} decay={2} color="#00ffff" position={[0, 0, -50]} />
        </group>
    );
};



// --- CAMERA & CONTROLS ---

const CameraController = ({ currentStage, isWarping }) => {
    const { camera, pointer } = useThree();
    const vec = new THREE.Vector3();
    const lookAtVec = new THREE.Vector3();

    useFrame((state, delta) => {
        if (isWarping) {
            // Intense Camera Shake for Warp
            camera.position.x += (Math.random() - 0.5) * 0.5;
            camera.position.y += (Math.random() - 0.5) * 0.5;
            camera.fov = THREE.MathUtils.lerp(camera.fov, 120, delta * 3); // Wider FOV for speed
            camera.updateProjectionMatrix();
            return;
        } else {
            camera.fov = THREE.MathUtils.lerp(camera.fov, 60, delta * 2); // Reset FOV
            camera.updateProjectionMatrix();
        }

        if (currentStage >= STAGES.EARTH) {
            const target = LOCATIONS[currentStage];

            // "Orbit-like" Mouse Interaction (User Friendly 3D feel)
            // Instead of just panning, we orbit slightly around the target

            // Calculate a target camera position that is offset by mouse
            const orbitRadius = 10; // How much we can "orbit"
            const mouseX = pointer.x * orbitRadius;
            const mouseY = pointer.y * orbitRadius;

            const basePos = new THREE.Vector3(...target.cam);

            // Apply mouse offset to perpendicular vectors to simulate orbiting
            // Simplified: Just adjusting x/y relative to camera is often good enough for "parallax"
            // But let's do adjustments relative to the 'target point' for a true 3D look

            const finalPos = basePos.clone();
            finalPos.x += mouseX * 2;
            finalPos.y += mouseY * 2;

            camera.position.lerp(finalPos, 2 * delta); // Responsive feel

            // LookAt shouldn't be static, it should also drift slightly to follow mouse focus
            lookAtVec.set(...target.lookAt);
            lookAtVec.x += mouseX * 0.5;
            lookAtVec.y += mouseY * 0.5;

            camera.lookAt(lookAtVec);
        }
    });
    return null;
};

const Cosmos = () => {
    const navigate = useNavigate();
    const [stage, setStage] = useState(STAGES.LAUNCH);
    const [isWarping, setIsWarping] = useState(false);
    const [countdown, setCountdown] = useState(5);
    const audioRef = useRef(new Audio('/assets/cosmos_bgm.mp3')); // Ensure path is correct
    const [infoUnlocked, setInfoUnlocked] = useState(false);

    // Mobile Check
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const startSequence = () => {
        setStage(STAGES.COUNTDOWN);
        // Play Audio
        audioRef.current.loop = true;
        audioRef.current.volume = 0.5;
        // audioRef.current.play().catch(e => console.log("Audio requires interaction"));

        let count = 5;
        const interval = setInterval(() => {
            count--;
            setCountdown(count);
            if (count === 0) {
                clearInterval(interval);
                setIsWarping(true);
                setTimeout(() => {
                    setStage(STAGES.EARTH);
                    setIsWarping(false);
                }, 4000); // 4 Seconds warp
            }
        }, 1000);
    };

    const next = () => {
        setInfoUnlocked(false);
        if (stage < STAGES.GALAXY) {
            setIsWarping(true);
            setTimeout(() => {
                setStage(s => s + 1);
                setIsWarping(false);
            }, 4000); // 4 Seconds Warp Travel
        }
        else navigate('/');
    };

    const warpTo = (path) => {
        setInfoUnlocked(false);
        setIsWarping(true);
        // Play warp sound or visual cue if needed
        setTimeout(() => {
            navigate(path);
        }, 3000); // 3 Seconds Warp Transition
    };

    // Styling constants
    const HUD_FONT = "'Orbitron', sans-serif"; // You'll need to rely on system fonts or imported ones.

    // RENDER
    if (isMobile) {
        return (
            <div style={{ width: '100vw', height: '100vh', background: 'black', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#ff3333', textAlign: 'center', padding: '20px', fontFamily: "'Orbitron', sans-serif" }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '20px', borderBottom: '2px solid red', paddingBottom: '10px' }}>ACCESS DENIED</h1>
                <p style={{ color: '#ccc', marginBottom: '40px', maxWidth: '300px', lineHeight: '1.6' }}>
                    This interstellar simulation requires advanced rendering capabilities available only on desktop terminals.
                </p>
                <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '40px' }}>
                    ERROR CODE: M0B-1L3_V13W_T00_SM4LL
                </div>
                <button
                    onClick={() => navigate('/')}
                    style={{
                        background: 'transparent',
                        border: '1px solid #ff3333',
                        color: '#ff3333',
                        padding: '15px 30px',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        fontFamily: 'monospace',
                        letterSpacing: '2px'
                    }}
                >
                    &lt;&lt; RETURN TO BASE
                </button>
            </div>
        );
    }

    return (
        <div style={{ width: '100vw', height: '100vh', background: 'black', overflow: 'hidden', color: 'white', fontFamily: 'monospace' }}>

            {/* LAUNCH SCREEN */}
            {stage === STAGES.LAUNCH && (
                <div style={fullScreenCenter}>
                    <h1 style={{ fontSize: '4vw', letterSpacing: '10px', textShadow: '0 0 20px red', color: '#ff3333' }}>
                        CRITICAL ALERT
                    </h1>
                    <p style={{ fontSize: '1.2vw', color: '#aaaaaa', maxWidth: '600px', textAlign: 'center', marginBottom: '40px' }}>
                        INTERSTELLAR TRAVEL SEQUENCE INITIATED. BRACE FOR G-FORCE.
                    </p>
                    <button onClick={startSequence} style={sciFiButton}>
                        INITIATE LAUNCH
                    </button>
                    <button onClick={() => navigate('/')} style={{ ...sciFiButton, borderColor: '#555', color: '#555', marginTop: '20px' }}>
                        ABORT MISSION
                    </button>
                </div>
            )}

            {/* COUNTDOWN */}
            {stage === STAGES.COUNTDOWN && (
                <div style={fullScreenCenter}>
                    <h1 style={{ fontSize: '15vw', fontWeight: 'bold' }}>{countdown > 0 ? countdown : "IGNITION"}</h1>
                </div>
            )}

            {/* TRANSMISSION DECODER (HUD) - Hide during warp */}
            {!isWarping && stage >= STAGES.EARTH && (
                <>
                    {/* Top HUD Bar */}
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', zIndex: 10 }}>
                        <div style={{ fontSize: '0.8rem', color: '#00ffcc' }}>SYS: ONLINE // TRJ: {Object.keys(STAGES).find(key => STAGES[key] === stage)}</div>
                        <div style={{ fontSize: '0.8rem', color: '#00ffcc' }}>FUEL: 98% // VEL: 25,000 KM/S</div>
                    </div>

                    {/* Left Side Planetary Data (EARTH) */}
                    {stage === STAGES.EARTH && (
                        <div style={leftHUDPanel}>
                            <h3 style={{ borderBottom: '2px solid #00ffcc', paddingBottom: '10px', marginBottom: '20px', color: '#00ffcc', letterSpacing: '2px' }}>
                                TARGET: EARTH
                            </h3>

                            <div style={dataRow}><span>CLASS:</span> <span style={{ color: 'white' }}>TERRESTRIAL PLANET</span></div>
                            <div style={dataRow}><span>EQUATORIAL RADIUS:</span> <span style={{ color: 'white' }}>6,378.1 KM</span></div>
                            <div style={dataRow}><span>MASS:</span> <span style={{ color: 'white' }}>5.972 × 10^24 KG</span></div>
                            <div style={dataRow}><span>SURFACE GRAVITY:</span> <span style={{ color: 'white' }}>9.80665 M/S²</span></div>
                            <div style={dataRow}><span>ROTATION PERIOD:</span> <span style={{ color: 'white' }}>23H 56M 4S</span></div>
                            <div style={dataRow}><span>ORBITAL PERIOD:</span> <span style={{ color: 'white' }}>365.256 DAYS</span></div>
                            <div style={dataRow}><span>ATMOSPHERE:</span> <span style={{ color: 'white' }}>78% N2, 21% O2</span></div>
                            <div style={dataRow}><span>MEAN TEMP:</span> <span style={{ color: 'white' }}>14°C (57°F)</span></div>
                            <div style={dataRow}><span>SATELLITES:</span> <span style={{ color: 'white' }}>1 (MOON)</span></div>
                            <div style={dataRow}><span>LIFEFORMS:</span> <span style={{ color: '#00ff00' }}>DETECTED (Type 0.7 Civil.)</span></div>

                            <div style={{ marginTop: '20px', fontSize: '0.7rem', color: '#00ffcc', borderTop: '1px solid rgba(0,255,204,0.3)', paddingTop: '10px' }}>
                                /// SCANNERS INDICATE HIGH LEVELS OF WATER AND BIOLOGICAL ACTIVITY.
                            </div>
                        </div>
                    )}

                    {/* Left Side Black Hole Data */}
                    {stage === STAGES.BLACK_HOLE && (
                        <div style={{ ...leftHUDPanel, borderLeft: '4px solid #ff8800', borderTop: '1px solid rgba(255, 136, 0, 0.3)', borderBottom: '1px solid rgba(255, 136, 0, 0.3)', color: '#ffaa00', boxShadow: '0 0 30px rgba(255, 136, 0, 0.1)' }}>
                            <h3 style={{ borderBottom: '2px solid #ff8800', paddingBottom: '10px', marginBottom: '20px', color: '#ff8800', letterSpacing: '2px' }}>
                                TARGET: GARGANTUA
                            </h3>

                            <div style={dataRow}><span>CLASS:</span> <span style={{ color: 'white' }}>SUPERMASSIVE BLACK HOLE</span></div>
                            <div style={dataRow}><span>MASS:</span> <span style={{ color: 'white' }}>100 MILLION SUNS</span></div>
                            <div style={dataRow}><span>EVENT HORIZON:</span> <span style={{ color: 'white' }}>300 MILLION KM</span></div>
                            <div style={dataRow}><span>SPIN RATE:</span> <span style={{ color: 'white' }}>0.99c (Kerr Metric)</span></div>
                            <div style={dataRow}><span>ACCRETION TEMP:</span> <span style={{ color: 'white' }}>10 TRILLION K</span></div>
                            <div style={dataRow}><span>TIME DILATION:</span> <span style={{ color: 'red' }}>EXTREME (1 hr = 7 yrs)</span></div>
                            <div style={dataRow}><span>HAWKING RAD:</span> <span style={{ color: 'white' }}>NEGLIGIBLE</span></div>
                            <div style={dataRow}><span>SINGULARITY:</span> <span style={{ color: 'white' }}>UNKNOWN</span></div>

                            <div style={{ marginTop: '20px', fontSize: '0.7rem', color: '#ff8800', borderTop: '1px solid rgba(255,136,0,0.3)', paddingTop: '10px' }}>
                                /// WARNING: GRAVITATIONAL SHEAR EXCEEDS SAFETY LIMITS. DO NOT APPROACH HORIZON.
                            </div>
                        </div>
                    )}

                    {/* Left Side Galaxy Data */}
                    {stage === STAGES.GALAXY && (
                        <div style={{ ...leftHUDPanel, borderLeft: '4px solid #ff00aa', borderTop: '1px solid rgba(255, 0, 170, 0.3)', borderBottom: '1px solid rgba(255, 0, 170, 0.3)', color: '#ff00aa', boxShadow: '0 0 30px rgba(255, 0, 170, 0.1)' }}>
                            <h3 style={{ borderBottom: '2px solid #ff00aa', paddingBottom: '10px', marginBottom: '20px', color: '#ff00aa', letterSpacing: '2px' }}>
                                TARGET: MILKY WAY
                            </h3>

                            <div style={dataRow}><span>CLASS:</span> <span style={{ color: 'white' }}>BARRED SPIRAL (SBbc)</span></div>
                            <div style={dataRow}><span>DIAMETER:</span> <span style={{ color: 'white' }}>105,700 LIGHT YEARS</span></div>
                            <div style={dataRow}><span>STARS:</span> <span style={{ color: 'white' }}>100-400 BILLION</span></div>
                            <div style={dataRow}><span>MASS:</span> <span style={{ color: 'white' }}>1.5 TRILLION SUNS</span></div>
                            <div style={dataRow}><span>AGE:</span> <span style={{ color: 'white' }}>13.61 BILLION YEARS</span></div>
                            <div style={dataRow}><span>SOLAR ORBIT:</span> <span style={{ color: 'white' }}>230 MILLION YEARS</span></div>
                            <div style={dataRow}><span>DARK MATTER:</span> <span style={{ color: 'white' }}>95% OF MASS</span></div>
                            <div style={dataRow}><span>SUPERMASSIVE BH:</span> <span style={{ color: 'white' }}>SAGITTARIUS A*</span></div>

                            <div style={{ marginTop: '20px', fontSize: '0.7rem', color: '#ff00aa', borderTop: '1px solid rgba(255,0,170,0.3)', paddingTop: '10px' }}>
                                /// SCANNING GALACTIC ARMS... LIFE SIGNALS DETECTED IN ORION ARM.
                            </div>
                        </div>
                    )}

                    {/* Right Side Interaction */}
                    {!infoUnlocked ? (
                        <div onClick={() => setInfoUnlocked(true)} style={decoderButtonContainer}>
                            <div className="pulse" style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'red', boxShadow: '0 0 20px red', marginBottom: '10px' }}></div>
                            <div style={{ letterSpacing: '2px', fontWeight: 'bold', textShadow: '0 0 5px white' }}>INCOMING SIGNAL</div>
                            <div style={{ fontSize: '0.7rem', color: '#888' }}>CLICK TO DECRYPT</div>
                        </div>
                    ) : (
                        /* Info Panel (Unlocked) */
                        <div style={infoPanel}>
                            <div style={{ borderLeft: '3px solid #00ffcc', paddingLeft: '20px' }}>
                                <h1 style={{ fontSize: '3rem', margin: '0 0 10px 0', textTransform: 'uppercase' }}>
                                    {stage === STAGES.EARTH && "TERRA"}
                                    {stage === STAGES.BLACK_HOLE && "GARGANTUA"}
                                    {stage === STAGES.GALAXY && "THE MILKY WAY"}
                                </h1>
                                <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#ddd', marginBottom: '20px' }}>
                                    {stage === STAGES.EARTH && "Orbit No. 3. The Cradle of Humanity. The only known celestial body capable of sustaining complex biological lifeforms. Contains surface water and a nitrogen-oxygen atmosphere."}
                                    {stage === STAGES.BLACK_HOLE && "A region of spacetime exhibiting gravitational acceleration so strong that nothing—no particles or even electromagnetic radiation—can escape from it. The event horizon marks the point of no return."}
                                    {stage === STAGES.GALAXY && "Our home galaxy. A barred spiral galaxy containing 100–400 billion stars. We reside in the Orion Arm, 26,000 light-years from the galactic center."}
                                </p>
                                <button onClick={next} style={nextButton}>
                                    {stage === STAGES.GALAXY ? "RETURN TO BASE" : "WARP TO NEXT SECTOR >>"}
                                </button>
                            </div>
                        </div>
                    )}
                    {/* Navigation Systems Panel (Bottom Right) */}
                    <div style={navPanel}>
                        <h3 style={{ borderBottom: '1px solid #00ffcc', paddingBottom: '5px', marginBottom: '15px', color: '#00ffcc', fontSize: '0.9rem', letterSpacing: '2px' }}>
                            NAVIGATION SYSTEMS
                        </h3>
                        <button onClick={() => warpTo('/hackathon')} style={navButton}>
                            <span style={{ color: '#00ffcc' }}>&gt; </span> ABOUT HACKATHON
                        </button>
                        <button onClick={() => warpTo('/projectexpo')} style={navButton}>
                            <span style={{ color: '#00ffcc' }}>&gt; </span> NAT. PROJECT EXPO
                        </button>
                        <button onClick={() => warpTo('/conference')} style={navButton}>
                            <span style={{ color: '#00ffcc' }}>&gt; </span> NAT. CONFERENCE
                        </button>
                        <button onClick={() => warpTo('/accommodation')} style={navButton}>
                            <span style={{ color: '#00ffcc' }}>&gt; </span> ACCOMMODATION
                        </button>
                    </div>
                </>
            )}

            {/* 3D CANVAS */}
            <Canvas
                camera={{ position: [0, 0, 10], fov: 60, near: 0.1, far: 5000 }}
                gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, outputColorSpace: THREE.SRGBColorSpace }}
            >
                <CameraController currentStage={stage} isWarping={isWarping} />

                {isWarping ? (
                    <HyperSpace />
                ) : (
                    <>
                        <GalaxyBackground />
                        <ambientLight intensity={0.2} />
                        <directionalLight position={[100, 50, 50]} intensity={1} color="#ffffff" />
                        <Earth />
                        <BlackHole />
                        <MilkyWay />
                    </>
                )}

                {/* Post-Processing effects are heavy, using standard effects via materials for now */}

            </Canvas>

            <style>{`
                @keyframes pulse { 0% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.1); } 100% { opacity: 1; transform: scale(1); } }
                .pulse { animation: pulse 1.5s infinite; }
            `}</style>
        </div>
    );
};

// --- CSS-IN-JS STYLES ---

const fullScreenCenter = {
    position: 'absolute', inset: 0, zIndex: 100,
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    background: 'radial-gradient(circle, #1a0000 0%, #000000 100%)'
};

const sciFiButton = {
    background: 'transparent', border: '2px solid #ff3333', color: '#ff3333',
    padding: '20px 50px', fontSize: '1.2rem', letterSpacing: '5px',
    cursor: 'pointer', textTransform: 'uppercase', fontFamily: 'inherit',
    transition: '0.3s', boxShadow: '0 0 15px rgba(255, 50, 50, 0.3)'
};

const decoderButtonContainer = {
    position: 'absolute', top: '50%', right: '10%', transform: 'translateY(-50%)',
    display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer',
    zIndex: 50, padding: '30px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(5px)'
};

const infoPanel = {
    position: 'absolute', top: '50%', right: '10%', transform: 'translateY(-50%)',
    width: '400px', background: 'rgba(0,0,0,0.8)', padding: '40px',
    backdropFilter: 'blur(20px)', borderTop: '1px solid #00ffcc',
    zIndex: 50, boxShadow: '0 0 50px rgba(0,0,0,0.8)'
};

const leftHUDPanel = {
    position: 'absolute', top: '50%', left: '5%', transform: 'translateY(-50%)',
    width: '350px',
    background: 'rgba(10, 20, 30, 0.7)',
    padding: '30px',
    backdropFilter: 'blur(15px)',
    borderLeft: '4px solid #00ffcc',
    borderTop: '1px solid rgba(0, 255, 204, 0.3)',
    borderBottom: '1px solid rgba(0, 255, 204, 0.3)',
    color: '#00aaff',
    fontFamily: "'Orbitron', monospace",
    fontSize: '0.85rem',
    zIndex: 50,
    boxShadow: '0 0 30px rgba(0, 255, 204, 0.1)'
};

const navPanel = {
    position: 'absolute', bottom: '30px', right: '30px',
    width: '300px',
    background: 'rgba(0, 10, 20, 0.8)',
    padding: '20px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(0, 255, 204, 0.3)',
    borderRight: '4px solid #00ffcc',
    zIndex: 60,
    display: 'flex', flexDirection: 'column', gap: '10px'
};

const navButton = {
    background: 'transparent',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#ddd',
    padding: '10px 15px',
    textAlign: 'left',
    fontFamily: "'Orbitron', monospace",
    fontSize: '0.8rem',
    cursor: 'pointer',
    transition: '0.3s',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    display: 'flex', alignItems: 'center', gap: '8px'
};

const dataRow = {
    display: 'flex', justifyContent: 'space-between', marginBottom: '8px', borderBottom: '1px dotted rgba(255,255,255,0.1)', paddingBottom: '4px'
};

const nextButton = {
    background: '#00ffcc', color: 'black', border: 'none',
    padding: '15px 30px', fontSize: '1rem', fontWeight: 'bold',
    cursor: 'pointer', marginTop: '20px', display: 'block', width: '100%',
    textTransform: 'uppercase', letterSpacing: '2px'
};

export default Cosmos;
