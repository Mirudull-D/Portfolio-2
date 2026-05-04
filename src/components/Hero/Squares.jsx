import { useRef, useEffect, useState } from 'react';
import styles from './Squares.module.css';

export default function Squares({ 
  direction = 'right', 
  speed = 1, 
  borderColor = 'rgba(255, 255, 255, 0.05)', 
  squareSize = 40,
  hoverFillColor = 'rgba(255, 255, 255, 0.03)'
}) {
  const canvasRef = useRef(null);
  const [hoveredSquare, setHoveredSquare] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    let offset = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const numCols = Math.ceil(canvas.width / squareSize) + 1;
      const numRows = Math.ceil(canvas.height / squareSize) + 1;

      offset = (offset + speed) % squareSize;

      for (let i = 0; i < numCols; i++) {
        for (let j = 0; j < numRows; j++) {
          const x = i * squareSize;
          const y = j * squareSize;

          ctx.strokeStyle = borderColor;
          ctx.strokeRect(x, y, squareSize, squareSize);

          if (hoveredSquare && hoveredSquare.x === i && hoveredSquare.y === j) {
            ctx.fillStyle = hoverFillColor;
            ctx.fillRect(x, y, squareSize, squareSize);
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [speed, borderColor, squareSize, hoveredSquare, hoverFillColor]);

  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const col = Math.floor(x / squareSize);
    const row = Math.floor(y / squareSize);
    setHoveredSquare({ x: col, y: row });
  };

  const handleMouseLeave = () => {
    setHoveredSquare(null);
  };

  return (
    <canvas 
      ref={canvasRef} 
      className={styles.squares} 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    />
  );
}
