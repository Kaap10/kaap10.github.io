import React, { useEffect, useRef } from 'react';
import styles from './styles.module.css';

export default function ParticleCanvas({
  maxParticles = 60,
  particleDensityArea = 26000,
  maxLinkDist = 125,
  maxMouseDist = 145,
  className = '',
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Limit DPR to 2 to avoid extreme multi-million pixel calculations on 4K/retina
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const mouse = {
      x: -2000,
      y: -2000,
      radius: maxMouseDist,
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    };

    const handleMouseLeave = () => {
      mouse.x = -2000;
      mouse.y = -2000;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    window.addEventListener('touchend', handleMouseLeave, { passive: true });

    const handleResize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', handleResize);

    // Balanced particle count: spacious, clean, not overcrowded
    const particleCount = Math.min(
      maxParticles,
      Math.max(25, Math.floor((width * height) / particleDensityArea))
    );
    const particles = [];

    const colors = [
      'rgba(255, 77, 79, 0.70)',
      'rgba(255, 120, 117, 0.60)',
      'rgba(255, 204, 199, 0.50)',
      'rgba(255, 255, 255, 0.40)',
      'rgba(255, 77, 79, 0.30)'
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        // Calm, elegant float speed (not fast or erratic)
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        radius: Math.random() * 1.5 + 1.0,
        color: colors[Math.floor(Math.random() * colors.length)],
        baseAlpha: Math.random() * 0.4 + 0.3
      });
    }

    let isVisible = true;
    let lastTime = performance.now();

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(animate);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const maxLinkDistSq = maxLinkDist * maxLinkDist;
    const maxMouseDistSq = maxMouseDist * maxMouseDist;

    const animate = (currentTime) => {
      if (!isVisible) return;
      // Delta time normalized to 60fps standard for identical smooth physics on 60/120/144Hz
      const dt = Math.min(32, currentTime - lastTime) / 16;
      lastTime = currentTime;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        // Screen boundary wrapping
        if (p.x < -12) p.x = width + 12;
        else if (p.x > width + 12) p.x = -12;
        if (p.y < -12) p.y = height + 12;
        else if (p.y > height + 12) p.y = -12;

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Connect nearby particles using fast squared-distance checks
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxLinkDistSq) {
            const dist = Math.sqrt(distSq);
            const alpha = Math.pow(1 - dist / maxLinkDist, 1.3) * 0.16;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 77, 79, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }

        // Mouse interaction: dynamic linkage and soft spring repulsion
        if (mouse.x > -1000 && mouse.y > -1000) {
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;
          const mDistSq = mdx * mdx + mdy * mdy;

          if (mDistSq < maxMouseDistSq) {
            const mDist = Math.sqrt(mDistSq);
            const mAlpha = (1 - mDist / maxMouseDist) * 0.32;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(255, 120, 117, ${mAlpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();

            // Gentle repulsion
            const force = (1 - mDist / maxMouseDist) * 0.18;
            p.x += (mdx / mDist) * force;
            p.y += (mdy / mDist) * force;
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchend', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [maxParticles, particleDensityArea, maxLinkDist, maxMouseDist]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`${styles.particleCanvas} ${className}`} 
      aria-hidden="true" 
    />
  );
}
