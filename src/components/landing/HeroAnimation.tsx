import React, { useEffect, useRef } from 'react';
const HeroAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    // Set canvas dimensions to match parent
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    // City map grid
    const drawCityMap = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Background color with opacity
      ctx.fillStyle = 'rgba(244, 247, 250, 0.85)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // Draw grid lines
      ctx.strokeStyle = 'rgba(0, 73, 118, 0.1)';
      ctx.lineWidth = 1;
      // Horizontal grid lines
      const gridSize = 50;
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      // Vertical grid lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      // Draw some larger roads
      ctx.strokeStyle = 'rgba(0, 73, 118, 0.2)';
      ctx.lineWidth = 5;
      // Horizontal main roads
      for (let y = gridSize * 3; y < canvas.height; y += gridSize * 5) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      // Vertical main roads
      for (let x = gridSize * 3; x < canvas.width; x += gridSize * 5) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      // Draw some buildings
      ctx.fillStyle = 'rgba(0, 73, 118, 0.1)';
      for (let i = 0; i < 30; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = 20 + Math.random() * 40;
        ctx.fillRect(x, y, size, size);
      }
    };
    // Draw delivery person
    let x = -50;
    let y = canvas.height / 2;
    let lastTimestamp = 0;
    const drawDeliveryPerson = (timestamp: number) => {
      if (!ctx) return;
      // Calculate delta time for smooth animation
      const deltaTime = timestamp - lastTimestamp;
      lastTimestamp = timestamp;
      // Clear previous frame
      drawCityMap();
      // Draw the delivery truck
      ctx.fillStyle = '#004976'; // congress-blue-700
      ctx.beginPath();
      ctx.rect(x, y - 15, 40, 25);
      ctx.fill();
      // Draw truck cab
      ctx.fillStyle = '#004976'; // congress-blue-700
      ctx.beginPath();
      ctx.rect(x - 15, y - 10, 20, 20);
      ctx.fill();
      // Draw wheels
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(x - 5, y + 15, 5, 0, Math.PI * 2);
      ctx.arc(x + 30, y + 15, 5, 0, Math.PI * 2);
      ctx.fill();
      // Move the delivery person
      x += deltaTime / 16 * 2; // Speed factor
      // Reset position when off screen
      if (x > canvas.width + 50) {
        x = -50;
        y = 100 + Math.random() * (canvas.height - 200); // Random y position within bounds
      }
      requestAnimationFrame(drawDeliveryPerson);
    };
    // Start the animation
    requestAnimationFrame(drawDeliveryPerson);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  return <canvas ref={canvasRef} className="w-full h-full object-cover" style={{
    opacity: 0.8
  }} />;
};
export default HeroAnimation;