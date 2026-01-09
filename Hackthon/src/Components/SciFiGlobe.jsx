import React, { useEffect, useRef } from "react";

const SciFiGlobe = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        let animationFrameId;

        // Configuration
        const particleCount = 250;
        const connectionRadius = 100;
        const sphereRadius = 250;
        const rotationSpeed = 0.002;

        let particles = [];
        let angleY = 0;
        let angleX = 0;

        // Resize handling
        const resizeCanvas = () => {
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
        };
        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        class Particle {
            constructor() {
                this.theta = Math.random() * Math.PI * 2;
                this.phi = Math.acos(Math.random() * 2 - 1);
                this.x = 0;
                this.y = 0;
                this.z = 0;
                this.size = Math.random() * 2 + 1;
            }

            update(rotationY, rotationX) {
                // Rotate the sphere
                this.theta += rotationSpeed;

                // Convert spherical to cartesian
                this.x = sphereRadius * Math.sin(this.phi) * Math.cos(this.theta);
                this.y = sphereRadius * Math.sin(this.phi) * Math.sin(this.theta);
                this.z = sphereRadius * Math.cos(this.phi);

                // 3D rotation logic (Project 3D to 2D)
                // Here we just use the raw coordinates for simple rotation, 
                // but adding real 3D rotation matrix makes it smoother.
                // For this simple "Globe", rotating theta is enough for Y-axis spin.

                // Tilt slightly
                const tiltedY = this.y * Math.cos(0.5) - this.z * Math.sin(0.5);
                const tiltedZ = this.y * Math.sin(0.5) + this.z * Math.cos(0.5);
                this.y = tiltedY;
                this.z = tiltedZ;
            }

            draw(context, centerX, centerY) {
                // Perspective projection
                const scale = 300 / (300 + this.z); // Depth factor
                const screenX = centerX + this.x * scale;
                const screenY = centerY + this.y * scale;
                const alpha = (this.z + sphereRadius) / (2 * sphereRadius); // Fade back particles

                context.beginPath();
                context.arc(screenX, screenY, this.size * scale, 0, Math.PI * 2);
                context.fillStyle = `rgba(139, 92, 246, ${alpha})`; // Violet/Purple
                context.fill();

                return { x: screenX, y: screenY, z: this.z };
            }
        }

        // Initialize particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            // Draw and update particles
            const activeParticles = particles.map(p => {
                p.update(angleY, angleX);
                return p.draw(ctx, centerX, centerY);
            });

            // Draw connections
            ctx.strokeStyle = "rgba(59, 130, 246, 0.15)"; // Blue low opacity
            ctx.lineWidth = 1;

            for (let i = 0; i < activeParticles.length; i++) {
                for (let j = i + 1; j < activeParticles.length; j++) {
                    const dx = activeParticles[i].x - activeParticles[j].x;
                    const dy = activeParticles[i].y - activeParticles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    // Only connect if close and in front
                    if (dist < connectionRadius && activeParticles[i].z > -50 && activeParticles[j].z > -50) {
                        ctx.beginPath();
                        ctx.moveTo(activeParticles[i].x, activeParticles[i].y);
                        ctx.lineTo(activeParticles[j].x, activeParticles[j].y);
                        ctx.stroke();
                    }
                }
            }

            angleY += rotationSpeed;
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />;
};

export default SciFiGlobe;
