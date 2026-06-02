import React, { useEffect, useRef } from 'react';

const CanvasRays = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    let time = 0;

    const render = () => {
      time += 0.005;
      ctx.clearRect(0, 0, width, height);

      // Deep dark overlay
      ctx.fillStyle = 'rgba(7, 10, 11, 0.4)';
      ctx.fillRect(0, 0, width, height);

      // Light rays configuration
      const originX = width / 2;
      const originY = -50;
      const numRays = 12;
      const maxRayLength = Math.max(width, height) * 1.5;

      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      for (let i = 0; i < numRays; i++) {
        // Subtle offset and sine wave rotation for each ray
        const baseAngle = (i / numRays) * Math.PI + Math.PI * 0.1;
        const angleVar = Math.sin(time + i * 2) * 0.05;
        const angle = baseAngle + angleVar;

        // Pulse ray width
        const pulse = 0.5 + 0.5 * Math.sin(time * 2 + i);
        const rayWidth = (0.04 + pulse * 0.03) * Math.PI;

        const startAngle = angle - rayWidth / 2;
        const endAngle = angle + rayWidth / 2;

        const grad = ctx.createRadialGradient(
          originX, originY, 10,
          originX, originY, maxRayLength
        );
        
        // Match FinEquity colors (Teal/Emerald/Green)
        grad.addColorStop(0, 'rgba(134, 239, 172, 0.12)');
        grad.addColorStop(0.3, 'rgba(74, 222, 128, 0.05)');
        grad.addColorStop(0.7, 'rgba(34, 197, 94, 0.02)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(originX, originY);
        ctx.arc(originX, originY, maxRayLength, startAngle, endAngle);
        ctx.closePath();
        ctx.fill();
      }

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
    />
  );
};

export default CanvasRays;
