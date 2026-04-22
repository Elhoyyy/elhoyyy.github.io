import { useEffect, useRef } from "react";

/**
 * Interactive 3D wireframe sphere — pure canvas, no deps.
 * Rotates on its own and reacts to mouse position.
 * Vibe: radar / network globe / signal scanner.
 */
export function WireframeSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // Build sphere points (lat/lon grid)
    const LAT = 18;
    const LON = 28;
    type Pt = { x: number; y: number; z: number };
    const points: Pt[] = [];
    for (let i = 0; i <= LAT; i++) {
      const lat = (Math.PI * i) / LAT - Math.PI / 2;
      for (let j = 0; j < LON; j++) {
        const lon = (2 * Math.PI * j) / LON;
        points.push({
          x: Math.cos(lat) * Math.cos(lon),
          y: Math.sin(lat),
          z: Math.cos(lat) * Math.sin(lon),
        });
      }
    }

    // Random "node" highlights
    const nodes = Array.from({ length: 14 }, () => Math.floor(Math.random() * points.length));

    // Read accent color from CSS var
    const getAccent = () => {
      const root = getComputedStyle(document.documentElement);
      return root.getPropertyValue("--accent").trim() || "oklch(0.82 0.19 130)";
    };

    let rotY = 0;
    let rotX = -0.25;
    let targetRotY = 0;
    let targetRotX = -0.25;

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const cx = (e.clientX - rect.left) / rect.width - 0.5;
      const cy = (e.clientY - rect.top) / rect.height - 0.5;
      mouse.current.x = cx;
      mouse.current.y = cy;
      mouse.current.active = true;
      targetRotY = cx * 1.2;
      targetRotX = -0.25 + cy * 0.8;
    };
    const handleLeave = () => {
      mouse.current.active = false;
    };
    window.addEventListener("mousemove", handleMouse);
    canvas.addEventListener("mouseleave", handleLeave);

    const project = (p: Pt) => {
      // rotate Y
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const x1 = p.x * cosY - p.z * sinY;
      const z1 = p.x * sinY + p.z * cosY;
      // rotate X
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const y2 = p.y * cosX - z1 * sinX;
      const z2 = p.y * sinX + z1 * cosX;
      // perspective
      const fov = 380;
      const dist = 3;
      const scale = fov / (dist + z2);
      const radius = Math.min(w, h) * 0.36;
      return {
        sx: w / 2 + x1 * scale * (radius / 180),
        sy: h / 2 + y2 * scale * (radius / 180),
        depth: z2,
      };
    };

    const draw = () => {
      // ease toward target
      rotY += (targetRotY - rotY) * 0.06;
      rotX += (targetRotX - rotX) * 0.06;
      // idle auto-rotation when no mouse interaction
      if (!mouse.current.active) {
        targetRotY += 0.004;
      }

      ctx.clearRect(0, 0, w, h);
      const accent = getAccent();

      // soft glow background
      const grad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.min(w, h) * 0.5);
      grad.addColorStop(0, `color-mix(in oklab, ${accent} 14%, transparent)`);
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      const projected = points.map(project);

      // Draw latitude rings
      for (let i = 0; i <= LAT; i++) {
        ctx.beginPath();
        for (let j = 0; j <= LON; j++) {
          const p = projected[i * LON + (j % LON)];
          const alpha = Math.max(0.05, (p.depth + 1.6) / 3.2) * 0.55;
          ctx.strokeStyle = `color-mix(in oklab, ${accent} ${Math.floor(alpha * 100)}%, transparent)`;
          if (j === 0) ctx.moveTo(p.sx, p.sy);
          else ctx.lineTo(p.sx, p.sy);
        }
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // Draw longitude lines
      for (let j = 0; j < LON; j += 2) {
        ctx.beginPath();
        for (let i = 0; i <= LAT; i++) {
          const p = projected[i * LON + j];
          if (i === 0) ctx.moveTo(p.sx, p.sy);
          else ctx.lineTo(p.sx, p.sy);
        }
        ctx.strokeStyle = `color-mix(in oklab, ${accent} 22%, transparent)`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }

      // Highlight nodes
      nodes.forEach((idx) => {
        const p = projected[idx];
        if (p.depth < -0.6) return;
        const r = 2 + (p.depth + 1) * 1.2;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2);
        ctx.fillStyle = accent;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, r * 3, 0, Math.PI * 2);
        ctx.strokeStyle = `color-mix(in oklab, ${accent} 30%, transparent)`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      });

      // Outer ring + crosshair
      const cx = w / 2;
      const cy = h / 2;
      const R = Math.min(w, h) * 0.42;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = `color-mix(in oklab, ${accent} 25%, transparent)`;
      ctx.setLineDash([4, 6]);
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);

      // tick marks
      for (let a = 0; a < 360; a += 15) {
        const rad = (a * Math.PI) / 180;
        const inner = a % 90 === 0 ? R - 10 : R - 5;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(rad) * inner, cy + Math.sin(rad) * inner);
        ctx.lineTo(cx + Math.cos(rad) * R, cy + Math.sin(rad) * R);
        ctx.strokeStyle = `color-mix(in oklab, ${accent} 35%, transparent)`;
        ctx.lineWidth = a % 90 === 0 ? 1.2 : 0.6;
        ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
      canvas.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <section className="relative border-b border-border/60 py-24 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs text-accent">// signal_scanner.exe</p>
            <h2 className="mt-2 font-mono text-2xl font-semibold tracking-tight md:text-3xl">
              Scanning the airwaves<span className="text-accent">_</span>
            </h2>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground">
              Mueve el ratón. 
            </p>
          </div>
          <div className="hidden font-mono text-[10px] uppercase tracking-widest text-muted-foreground md:block">
            <div>lat: 42.88°N</div>
            <div>lon: 8.54°W</div>
            <div className="text-accent">status: live</div>
          </div>
        </div>

        <div className="relative h-[460px] w-full overflow-hidden rounded-lg border border-border bg-surface/40 md:h-[560px]">
          <canvas ref={canvasRef} className="h-full w-full" />

          {/* corner brackets */}
          <CornerBracket className="left-3 top-3" />
          <CornerBracket className="right-3 top-3 rotate-90" />
          <CornerBracket className="bottom-3 right-3 rotate-180" />
          <CornerBracket className="bottom-3 left-3 -rotate-90" />

          {/* HUD overlays */}
          <div className="pointer-events-none absolute left-4 bottom-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            <div>nodes: <span className="text-accent">412</span></div>
            <div>scan rate: 2.4ghz / 5ghz / ble</div>
          </div>
          <div className="pointer-events-none absolute right-4 top-4 hidden font-mono text-[10px] uppercase tracking-widest text-accent md:block">
            ◉ rec
          </div>
        </div>
      </div>
    </section>
  );
}

function CornerBracket({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute h-5 w-5 border-l-2 border-t-2 border-accent/60 ${className}`}
    />
  );
}
