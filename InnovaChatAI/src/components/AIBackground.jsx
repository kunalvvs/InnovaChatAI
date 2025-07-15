import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const AIBackground = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const canvasRef = useRef(null);
  const animationRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let connections = [];
    let time = 0;

    // Resize canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * 1000;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.vz = (Math.random() - 0.5) * 2;
        this.size = Math.random() * 3 + 1;
        this.opacity = Math.random() * 0.8 + 0.2;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.pulsePhase = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.z += this.vz;

        // Wrap around edges
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
        if (this.z < 0) this.z = 1000;
        if (this.z > 1000) this.z = 0;

        // Pulsing effect
        this.pulsePhase += this.pulseSpeed;
        this.currentOpacity = this.opacity * (0.5 + 0.5 * Math.sin(this.pulsePhase));
      }

      draw() {
        const perspective = 800 / (800 + this.z);
        const projectedX = this.x * perspective + canvas.width / 2 * (1 - perspective);
        const projectedY = this.y * perspective + canvas.height / 2 * (1 - perspective);
        const projectedSize = this.size * perspective;

        if (projectedSize > 0.1) {
          ctx.save();
          ctx.globalAlpha = this.currentOpacity * perspective;
          
          // Gradient for particles
          const gradient = ctx.createRadialGradient(
            projectedX, projectedY, 0,
            projectedX, projectedY, projectedSize * 2
          );
          
          if (isDark) {
            gradient.addColorStop(0, '#00ff95');
            gradient.addColorStop(0.5, '#00ff9550');
            gradient.addColorStop(1, '#00ff9500');
          } else {
            gradient.addColorStop(0, '#059669');
            gradient.addColorStop(0.5, '#05966950');
            gradient.addColorStop(1, '#05966900');
          }

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(projectedX, projectedY, projectedSize, 0, Math.PI * 2);
          ctx.fill();

          // Add glow effect
          ctx.shadowBlur = 20;
          ctx.shadowColor = isDark ? '#00ff95' : '#059669';
          ctx.beginPath();
          ctx.arc(projectedX, projectedY, projectedSize * 0.3, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        }
      }
    }

    // Neural network connections
    const drawConnections = () => {
      ctx.save();
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dz = particles[i].z - particles[j].z;
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (distance < 150) {
            const opacity = (1 - distance / 150) * 0.3;
            
            ctx.globalAlpha = opacity;
            ctx.strokeStyle = isDark ? '#00ff95' : '#059669';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();

            // Add animated pulse along connections
            const pulsePosition = (Math.sin(time * 0.005 + distance * 0.01) + 1) / 2;
            const pulseX = particles[i].x + (particles[j].x - particles[i].x) * pulsePosition;
            const pulseY = particles[i].y + (particles[j].y - particles[i].y) * pulsePosition;

            ctx.globalAlpha = opacity * 2;
            ctx.fillStyle = isDark ? '#00ff95' : '#059669';
            ctx.beginPath();
            ctx.arc(pulseX, pulseY, 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      
      ctx.restore();
    };

    // Floating geometric shapes
    const drawGeometry = () => {
      ctx.save();
      
      // Rotating hexagons
      const hexCount = 5;
      for (let i = 0; i < hexCount; i++) {
        const x = (canvas.width / hexCount) * i + canvas.width / hexCount / 2;
        const y = canvas.height / 2 + Math.sin(time * 0.001 + i) * 100;
        const size = 30 + Math.sin(time * 0.002 + i) * 10;
        const rotation = time * 0.002 + i;

        ctx.globalAlpha = 0.1;
        ctx.strokeStyle = isDark ? '#00ff95' : '#059669';
        ctx.lineWidth = 2;
        
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        
        ctx.beginPath();
        for (let j = 0; j < 6; j++) {
          const angle = (j * Math.PI) / 3;
          const px = Math.cos(angle) * size;
          const py = Math.sin(angle) * size;
          if (j === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();
        
        ctx.restore();
      }
      
      ctx.restore();
    };

    // Initialize particles
    const particleCount = window.innerWidth < 768 ? 30 : 60;
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    const animate = () => {
      time++;
      
      // Clear canvas with fade effect
      ctx.fillStyle = isDark ? 'rgba(10, 12, 16, 0.1)' : 'rgba(249, 250, 251, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw connections
      drawConnections();

      // Draw geometric shapes
      drawGeometry();

      // Brain wave animation at bottom
      ctx.save();
      ctx.globalAlpha = 0.2;
      ctx.strokeStyle = isDark ? '#00ff95' : '#059669';
      ctx.lineWidth = 3;
      ctx.beginPath();
      
      for (let x = 0; x < canvas.width; x += 5) {
        const y = canvas.height - 50 + Math.sin(x * 0.01 + time * 0.02) * 20 + 
                 Math.sin(x * 0.005 + time * 0.01) * 10;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.restore();

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ 
        zIndex: 1,
        background: isDark 
          ? 'linear-gradient(135deg, #0a0c10 0%, #0f1318 50%, #0a0c10 100%)'
          : 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 50%, #f9fafb 100%)'
      }}
    />
  );
};

export default AIBackground;
