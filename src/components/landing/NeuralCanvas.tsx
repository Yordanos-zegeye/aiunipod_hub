import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  pulsePhase: number;
}

export function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number | null = null;
    let isVisible = true;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    let resizeTimeout: number | undefined;
    const handleResize = () => {
      window.clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        if (!canvas) return;
        width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
        height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      }, 100);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // Initialize nodes
    const nodeCount = Math.min(Math.floor((width * height) / 14000), 50);
    const nodes: Node[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2.2 + 1.2,
        baseAlpha: Math.random() * 0.45 + 0.25,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    canvas.parentElement?.addEventListener("mousemove", handleMouseMove, { passive: true });
    canvas.parentElement?.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    let tick = 0;

    const render = () => {
      if (!isVisible) return;

      tick += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Update positions
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0) node.x = width;
        else if (node.x > width) node.x = 0;

        if (node.y < 0) node.y = height;
        else if (node.y > height) node.y = 0;

        // Mouse interactive nudge
        const dx = node.x - mouseX;
        const dy = node.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120 && dist > 0) {
          const force = (120 - dist) / 120;
          node.x += (dx / dist) * force * 1.5;
          node.y += (dy / dist) * force * 1.5;
        }
      }

      // Draw connections
      const maxDistance = 145;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        if (!a) continue;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          if (!b) continue;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.22;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(37, 99, 235, ${alpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();

            // Synaptic signal pulse along connections (optimized vector drawing without expensive shadowBlur)
            if ((i + j + Math.floor(tick * 3)) % 17 === 0) {
              const progress = (Math.sin(tick * 2 + i) + 1) / 2;
              const px = a.x + (b.x - a.x) * progress;
              const py = a.y + (b.y - a.y) * progress;

              // Outer glow halo
              ctx.beginPath();
              ctx.arc(px, py, 3.8, 0, Math.PI * 2);
              ctx.fillStyle = "rgba(56, 189, 248, 0.22)";
              ctx.fill();

              // Inner bright core
              ctx.beginPath();
              ctx.arc(px, py, 1.8, 0, Math.PI * 2);
              ctx.fillStyle = "rgba(14, 165, 233, 0.85)";
              ctx.fill();
            }
          }
        }
      }

      // Draw nodes
      for (const node of nodes) {
        const pulse = Math.sin(tick + node.pulsePhase) * 0.2 + 0.8;
        const currentAlpha = node.baseAlpha * pulse;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(37, 99, 235, ${currentAlpha})`;
        ctx.fill();

        // Inner glowing core
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${currentAlpha * 1.5})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // IntersectionObserver to pause rendering when scrolled away from top
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        const inView = entry?.isIntersecting ?? true;
        if (inView && !isVisible) {
          isVisible = true;
          animationFrameId = requestAnimationFrame(render);
        } else if (!inView && isVisible) {
          isVisible = false;
          if (animationFrameId !== null) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
          }
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(canvas);
    render();

    return () => {
      window.clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
      canvas.parentElement?.removeEventListener("mousemove", handleMouseMove);
      canvas.parentElement?.removeEventListener("mouseleave", handleMouseLeave);
      observer.disconnect();
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full opacity-60 transition-opacity duration-500 will-change-transform"
      aria-hidden="true"
    />
  );
}
