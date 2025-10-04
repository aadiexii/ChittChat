import { useEffect, useRef } from "react";

const MagicCursorTrail = () => {
  const dotsRef = useRef([]);
  const positionsRef = useRef({ x: 0, y: 0 });
  const trailPositionsRef = useRef([]);
  const animationFrameRef = useRef();

  useEffect(() => {
    const trailCount = 8;
    const dots = [];
    const trailPositions = Array(trailCount).fill({ x: 0, y: 0 });

    // Initialize positions to center
    positionsRef.current = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    };
    trailPositions.fill({ x: positionsRef.current.x, y: positionsRef.current.y });

    // Create trailing dots
    for (let i = 0; i < trailCount; i++) {
      const dot = document.createElement("div");
      dot.className = `magic-cursor-dot fixed w-2 h-2 bg-pink-500 rounded-full pointer-events-none opacity-80 z-50 transition-transform duration-75`;
      dot.style.transform = `translate3d(${positionsRef.current.x}px, ${positionsRef.current.y}px, 0)`;
      document.body.appendChild(dot);
      dots.push(dot);
    }

    dotsRef.current = dots;
    trailPositionsRef.current = trailPositions;

    const handleMouseMove = (e) => {
      positionsRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      const { x: mouseX, y: mouseY } = positionsRef.current;
      const trailPositions = trailPositionsRef.current;
      const dots = dotsRef.current;

      // Update first dot position
      trailPositions[0] = {
        x: trailPositions[0].x + (mouseX - trailPositions[0].x) * 0.3,
        y: trailPositions[0].y + (mouseY - trailPositions[0].y) * 0.3
      };

      dots[0].style.transform = `translate3d(${trailPositions[0].x}px, ${trailPositions[0].y}px, 0)`;

      // Update subsequent dots
      for (let i = 1; i < trailCount; i++) {
        trailPositions[i] = {
          x: trailPositions[i].x + (trailPositions[i - 1].x - trailPositions[i].x) * 0.3,
          y: trailPositions[i].y + (trailPositions[i - 1].y - trailPositions[i].y) * 0.3
        };
        dots[i].style.transform = `translate3d(${trailPositions[i].x}px, ${trailPositions[i].y}px, 0)`;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const handleClick = (e) => {
      const colors = ["#ec4899", "#6366f1", "#22c55e", "#f97316", "#eab308"];
      
      for (let i = 0; i < 10; i++) {
        const burst = document.createElement("div");
        burst.className = "fixed w-2 h-2 rounded-full pointer-events-none z-50 opacity-80";
        burst.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        burst.style.left = `${e.clientX}px`;
        burst.style.top = `${e.clientY}px`;
        document.body.appendChild(burst);

        const angle = Math.random() * 2 * Math.PI;
        const distance = 30 + Math.random() * 50;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        burst.animate(
          [
            { transform: "translate(0, 0) scale(1)", opacity: 1 },
            { transform: `translate(${x}px, ${y}px) scale(0.5)`, opacity: 0 }
          ],
          {
            duration: 600 + Math.random() * 400,
            easing: "ease-out",
            fill: "forwards"
          }
        );

        setTimeout(() => {
          if (burst.parentNode) {
            burst.parentNode.removeChild(burst);
          }
        }, 1000);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      dots.forEach(dot => {
        if (dot.parentNode) {
          dot.parentNode.removeChild(dot);
        }
      });
    };
  }, []);

  return null;
};

export default MagicCursorTrail;