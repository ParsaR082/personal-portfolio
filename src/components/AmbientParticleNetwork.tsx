"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

export type CursorMode = "Repel" | "Attract" | "None";
export type ColorMode = "Single" | "Dual";

export interface AmbientParticleNetworkProps {
  /** Interaction mode with cursor: Repel, Attract, or None (default: 'Repel') */
  cursor?: CursorMode;
  /** Particle density factor (default: 3) */
  density?: number;
  /** Maximum distance in px for drawing proximity connecting lines (default: 140) */
  linkDistance?: number;
  /** Force multiplier for cursor interaction (default: 2) */
  cursorForce?: number;
  /** Primary hue in degrees (default: 200 - cyan/electric azure) */
  hue?: number;
  /** Color mode: Single or Dual (default: 'Dual') */
  color?: ColorMode;
  /** Secondary hue in degrees when color is Dual (default: 198) */
  secondHue?: number;
  /** Whether to draw fading trailing paths for particles (default: true) */
  enableTrails?: boolean;
  /** Show interactive floating control panel to adjust settings live (default: false) */
  showControls?: boolean;
  /** Additional CSS class for container */
  className?: string;
  /** Inline style overrides for container */
  style?: React.CSSProperties;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  radius: number;
  hue: number;
  baseAlpha: number;
  alpha: number;
  pulseSpeed: number;
  pulsePhase: number;
  trail: Array<{ x: number; y: number }>;
}

export default function AmbientParticleNetwork({
  cursor: initialCursor = "Repel",
  density: initialDensity = 3,
  linkDistance: initialLinkDistance = 140,
  cursorForce: initialCursorForce = 2,
  hue: initialHue = 200,
  color: initialColor = "Dual",
  secondHue: initialSecondHue = 198,
  enableTrails = true,
  showControls = false,
  className = "",
  style = {},
}: AmbientParticleNetworkProps) {
  // State for live controls
  const [cursor, setCursor] = useState<CursorMode>(initialCursor);
  const [density, setDensity] = useState<number>(initialDensity);
  const [linkDistance, setLinkDistance] = useState<number>(initialLinkDistance);
  const [cursorForce, setCursorForce] = useState<number>(initialCursorForce);
  const [hue, setHue] = useState<number>(initialHue);
  const [colorMode, setColorMode] = useState<ColorMode>(initialColor);
  const [secondHue, setSecondHue] = useState<number>(initialSecondHue);
  const [controlsOpen, setControlsOpen] = useState<boolean>(false);

  // Canvas and RAF refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const isPausedRef = useRef<boolean>(false);

  // Cursor tracking ref (pointer coordinates relative to viewport)
  const cursorRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });

  // Settings ref for synchronous access in RAF loop
  const settingsRef = useRef({
    cursor,
    density,
    linkDistance,
    cursorForce,
    hue,
    colorMode,
    secondHue,
    enableTrails,
  });

  useEffect(() => {
    settingsRef.current = {
      cursor,
      density,
      linkDistance,
      cursorForce,
      hue,
      colorMode,
      secondHue,
      enableTrails,
    };
  }, [cursor, density, linkDistance, cursorForce, hue, colorMode, secondHue, enableTrails]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    // Object Pool for particles
    const MAX_POOL_SIZE = 600;
    const particlePool: Particle[] = new Array(MAX_POOL_SIZE);
    let activeCount = 0;

    for (let i = 0; i < MAX_POOL_SIZE; i++) {
      particlePool[i] = {
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        baseVx: 0,
        baseVy: 0,
        radius: 2,
        hue: 200,
        baseAlpha: 0.6,
        alpha: 0.6,
        pulseSpeed: 1,
        pulsePhase: 0,
        trail: [],
      };
    }

    // Function to calculate target particle count based on density and viewport size
    const calculateTargetCount = (w: number, h: number, dens: number) => {
      const area = w * h;
      const base = area / 24000;
      const count = Math.round(base * (dens / 2.5));
      const maxCap = w < 768 ? 35 : 85;
      return Math.min(Math.max(count, 18), maxCap);
    };

    // Initialize or resize active particles
    const initParticles = () => {
      const targetCount = calculateTargetCount(width, height, settingsRef.current.density);
      activeCount = targetCount;

      for (let i = 0; i < targetCount; i++) {
        const p = particlePool[i];
        p.x = Math.random() * width;
        p.y = Math.random() * height;

        // Subtle ambient drifting velocity
        const angle = Math.random() * Math.PI * 2;
        const speed = 12 + Math.random() * 18; // px per second
        p.baseVx = Math.cos(angle) * speed;
        p.baseVy = Math.sin(angle) * speed;
        p.vx = p.baseVx;
        p.vy = p.baseVy;

        p.radius = 1.8 + Math.random() * 1.5;
        p.pulseSpeed = 0.8 + Math.random() * 1.2;
        p.pulsePhase = Math.random() * Math.PI * 2;
        p.baseAlpha = 0.45 + Math.random() * 0.45;
        p.alpha = p.baseAlpha;

        // Assign Hue: alternating or dual when colorMode is 'Dual'
        if (settingsRef.current.colorMode === "Dual") {
          p.hue = i % 2 === 0 ? settingsRef.current.hue : settingsRef.current.secondHue;
        } else {
          p.hue = settingsRef.current.hue;
        }

        p.trail = [];
      }
    };

    // Handle high DPI backing store and resize
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      initParticles();
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });

    // Pointer listeners on window so interaction works across the entire webpage
    const onPointerMove = (e: PointerEvent) => {
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;
      cursorRef.current.active = true;
    };

    const onPointerLeave = () => {
      cursorRef.current.active = false;
      cursorRef.current.x = -9999;
      cursorRef.current.y = -9999;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });
    window.addEventListener("blur", onPointerLeave, { passive: true });

    // Tab visibility handling (pause on hidden tab, reset timer on resume)
    let lastTime = performance.now();
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isPausedRef.current = true;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      } else {
        isPausedRef.current = false;
        lastTime = performance.now();
        rafRef.current = requestAnimationFrame(loop);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Canvas off-screen observer
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          if (!entry.isIntersecting) {
            isPausedRef.current = true;
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
          } else if (isPausedRef.current && !document.hidden) {
            isPausedRef.current = false;
            lastTime = performance.now();
            rafRef.current = requestAnimationFrame(loop);
          }
        }
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    // Check prefers-reduced-motion
    const motionMediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Animation & Physics Update Loop
    let totalTime = 0;
    const TRAIL_MAX_POINTS = 5;

    const renderStaticFrame = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < activeCount; i++) {
        const p = particlePool[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 90%, 70%, ${p.alpha})`;
        ctx.fill();
      }
    };

    const loop = (currentTime: number) => {
      if (isPausedRef.current) return;

      // Delta time in seconds, clamped to max 0.1s to avoid jump on tab switches
      const rawDt = (currentTime - lastTime) / 1000;
      const dt = Math.min(Math.max(rawDt, 0), 0.1);
      lastTime = currentTime;
      totalTime += dt;

      const { cursor: cursorMode, linkDistance: maxLinkDist, cursorForce: forceMult, enableTrails: trailsOn } =
        settingsRef.current;

      const cursorState = cursorRef.current;
      const cursorActive = cursorState.active;
      const cx = cursorState.x;
      const cy = cursorState.y;
      const cursorRadius = 170; // Influence zone of cursor in px

      // 1. UPDATE PARTICLES
      for (let i = 0; i < activeCount; i++) {
        const p = particlePool[i];

        // Pulsing luminescence
        p.alpha = p.baseAlpha + Math.sin(totalTime * p.pulseSpeed + p.pulsePhase) * 0.25;

        // Cursor Physics: Repel or Attract
        if (cursorActive && cursorMode !== "None") {
          const dx = p.x - cx;
          const dy = p.y - cy;
          const distSq = dx * dx + dy * dy;

          if (distSq < cursorRadius * cursorRadius && distSq > 1) {
            const dist = Math.sqrt(distSq);
            const normX = dx / dist;
            const normY = dy / dist;
            const factor = (1 - dist / cursorRadius) * forceMult * 450;

            if (cursorMode === "Repel") {
              p.vx += normX * factor * dt;
              p.vy += normY * factor * dt;
            } else if (cursorMode === "Attract") {
              p.vx -= normX * factor * dt;
              p.vy -= normY * factor * dt;
            }
          }
        }

        // Velocity damping back towards base ambient drift
        const damping = Math.pow(0.92, dt * 60);
        p.vx = p.vx * damping + p.baseVx * (1 - damping);
        p.vy = p.vy * damping + p.baseVy * (1 - damping);

        // Position update
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        // Smooth viewport wrap-around with padding
        const margin = 20;
        if (p.x < -margin) p.x = width + margin;
        else if (p.x > width + margin) p.x = -margin;
        if (p.y < -margin) p.y = height + margin;
        else if (p.y > height + margin) p.y = -margin;

        // Update trail history (explicit queue without array reallocations)
        if (trailsOn) {
          p.trail.unshift({ x: p.x, y: p.y });
          if (p.trail.length > TRAIL_MAX_POINTS) {
            p.trail.pop();
          }
        }
      }

      // 2. RENDER (Fully clear canvas every frame - zero ghost burn-in)
      ctx.clearRect(0, 0, width, height);

      // A. Draw Proximity Lines (Batched single stroke for maximum 120 FPS performance)
      const maxDistSq = maxLinkDist * maxLinkDist;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i < activeCount; i++) {
        const p1 = particlePool[i];
        for (let j = i + 1; j < activeCount; j++) {
          const p2 = particlePool[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistSq) {
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
          }
        }
      }
      ctx.strokeStyle = `hsla(${settingsRef.current.hue}, 85%, 65%, 0.16)`;
      ctx.stroke();

      // B. Draw Fading Trails (Batched single stroke)
      if (trailsOn) {
        ctx.beginPath();
        for (let i = 0; i < activeCount; i++) {
          const p = particlePool[i];
          const trailLen = p.trail.length;
          if (trailLen > 1) {
            ctx.moveTo(p.trail[0].x, p.trail[0].y);
            for (let k = 1; k < trailLen; k++) {
              ctx.lineTo(p.trail[k].x, p.trail[k].y);
            }
          }
        }
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = `hsla(${settingsRef.current.hue}, 85%, 65%, 0.14)`;
        ctx.stroke();
      }

      // C. Draw Glowing Nodes (2-pass fill, zero expensive shadowBlur)
      // Pass 1: Outer soft glow halo
      ctx.beginPath();
      for (let i = 0; i < activeCount; i++) {
        const p = particlePool[i];
        ctx.moveTo(p.x + p.radius * 2.2, p.y);
        ctx.arc(p.x, p.y, p.radius * 2.2, 0, Math.PI * 2);
      }
      ctx.fillStyle = `hsla(${settingsRef.current.hue}, 90%, 65%, 0.18)`;
      ctx.fill();

      // Pass 2: Bright solid core
      ctx.beginPath();
      for (let i = 0; i < activeCount; i++) {
        const p = particlePool[i];
        ctx.moveTo(p.x + p.radius, p.y);
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      }
      ctx.fillStyle = `hsla(${settingsRef.current.hue}, 95%, 80%, 0.85)`;
      ctx.fill();

      rafRef.current = requestAnimationFrame(loop);
    };

    // If user prefers reduced motion, render single static constellation frame
    if (motionMediaQuery.matches) {
      renderStaticFrame();
    } else {
      rafRef.current = requestAnimationFrame(loop);
    }

    const onMotionPreferenceChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        renderStaticFrame();
      } else {
        lastTime = performance.now();
        rafRef.current = requestAnimationFrame(loop);
      }
    };
    motionMediaQuery.addEventListener("change", onMotionPreferenceChange);

    // Cleanup
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("blur", onPointerLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      motionMediaQuery.removeEventListener("change", onMotionPreferenceChange);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`ambient-particle-network-container ${className}`}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
        backgroundColor: "#08090e",
        ...style,
      }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="ambient-particle-network-canvas"
        style={{
          display: "block",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />

      {/* Optional live controls widget to adjust settings in real time */}
      {showControls && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 99999,
            pointerEvents: "auto",
            direction: "ltr",
          }}
        >
          {!controlsOpen ? (
            <button
              onClick={() => setControlsOpen(true)}
              style={{
                backgroundColor: "rgba(15, 23, 42, 0.85)",
                color: "#67e8f9",
                border: "1px solid rgba(103, 232, 249, 0.3)",
                borderRadius: "50%",
                width: "42px",
                height: "42px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
                backdropFilter: "blur(10px)",
              }}
              title="Adjust Ambient Particle Network"
            >
              ⚙
            </button>
          ) : (
            <div
              style={{
                backgroundColor: "rgba(10, 15, 28, 0.92)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(103, 232, 249, 0.25)",
                borderRadius: "12px",
                padding: "16px",
                width: "270px",
                color: "#f1f5f9",
                fontSize: "12px",
                fontFamily: "monospace",
                boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "12px",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                  paddingBottom: "8px",
                }}
              >
                <span style={{ fontWeight: "bold", color: "#67e8f9" }}>Particle Network</span>
                <button
                  onClick={() => setControlsOpen(false)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#94a3b8",
                    cursor: "pointer",
                    fontSize: "14px",
                  }}
                >
                  ✕
                </button>
              </div>

              {/* Cursor Mode */}
              <div style={{ marginBottom: "10px" }}>
                <label style={{ display: "block", marginBottom: "4px" }}>Cursor: {cursor}</label>
                <div style={{ display: "flex", gap: "6px" }}>
                  {(["Repel", "Attract", "None"] as CursorMode[]).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setCursor(mode)}
                      style={{
                        flex: 1,
                        padding: "4px 6px",
                        fontSize: "11px",
                        borderRadius: "4px",
                        border: "1px solid",
                        borderColor: cursor === mode ? "#67e8f9" : "rgba(255,255,255,0.15)",
                        backgroundColor: cursor === mode ? "rgba(103, 232, 249, 0.2)" : "transparent",
                        color: cursor === mode ? "#67e8f9" : "#cbd5e1",
                        cursor: "pointer",
                      }}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Density */}
              <div style={{ marginBottom: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Density:</span>
                  <span>{density}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="6"
                  step="0.5"
                  value={density}
                  onChange={(e) => setDensity(parseFloat(e.target.value))}
                  style={{ width: "100%", accentColor: "#67e8f9" }}
                />
              </div>

              {/* Link Distance */}
              <div style={{ marginBottom: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Link Distance:</span>
                  <span>{linkDistance}px</span>
                </div>
                <input
                  type="range"
                  min="80"
                  max="220"
                  step="5"
                  value={linkDistance}
                  onChange={(e) => setLinkDistance(parseInt(e.target.value))}
                  style={{ width: "100%", accentColor: "#67e8f9" }}
                />
              </div>

              {/* Cursor Force */}
              <div style={{ marginBottom: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Cursor Force:</span>
                  <span>{cursorForce}</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="5"
                  step="0.5"
                  value={cursorForce}
                  onChange={(e) => setCursorForce(parseFloat(e.target.value))}
                  style={{ width: "100%", accentColor: "#67e8f9" }}
                />
              </div>

              {/* Hue */}
              <div style={{ marginBottom: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Primary Hue:</span>
                  <span>{hue}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  step="2"
                  value={hue}
                  onChange={(e) => setHue(parseInt(e.target.value))}
                  style={{ width: "100%", accentColor: `hsl(${hue}, 90%, 60%)` }}
                />
              </div>

              {/* Color Mode */}
              <div style={{ marginBottom: "4px" }}>
                <label style={{ display: "block", marginBottom: "4px" }}>Color Mode</label>
                <div style={{ display: "flex", gap: "6px" }}>
                  {(["Single", "Dual"] as ColorMode[]).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setColorMode(mode)}
                      style={{
                        flex: 1,
                        padding: "4px 6px",
                        fontSize: "11px",
                        borderRadius: "4px",
                        border: "1px solid",
                        borderColor: colorMode === mode ? "#67e8f9" : "rgba(255,255,255,0.15)",
                        backgroundColor: colorMode === mode ? "rgba(103, 232, 249, 0.2)" : "transparent",
                        color: colorMode === mode ? "#67e8f9" : "#cbd5e1",
                        cursor: "pointer",
                      }}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

