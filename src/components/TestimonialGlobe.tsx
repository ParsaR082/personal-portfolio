"use client";

import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";

export type SpinDirection = "Forward" | "Reverse";
export type ColorMode = "Single" | "Dual";

export interface TestimonialCardData {
  id: number | string;
  name: string;
  role: string;
  company?: string;
  avatar?: string;
  rating?: number;
  text: string;
}

export interface TestimonialGlobeProps {
  /** Number of cards (default: 5) */
  cardsCount?: number;
  /** Custom cards data (defaults to 5 sample cards) */
  cards?: TestimonialCardData[];
  /** Sphere spin speed in degrees per second (default: 12) */
  spinSpeed?: number;
  /** Spin direction (default: 'Forward') */
  spinDirection?: SpinDirection;
  /** Sphere radius in pixels (default: 280) */
  radius?: number;
  /** Whether the globe automatically spins when not being dragged (default: true) */
  autoSpin?: boolean;
  /** Whether faint nexus links connect neighboring cards (default: false) */
  nexusLinks?: boolean;
  /** Color mode: Single or Dual (default: 'Dual') */
  color?: ColorMode;
  /** Primary hue in degrees (default: 200 - cyan) */
  hue?: number;
  /** Secondary hue in degrees (default: 280 - magenta/violet) */
  secondHue?: number;
  /** Show live control panel to adjust settings (default: true) */
  showControls?: boolean;
  /** Additional CSS class */
  className?: string;
  /** Style overrides for the outer container */
  style?: React.CSSProperties;
}

const DEFAULT_CARDS: TestimonialCardData[] = [
  {
    id: 1,
    name: "مارک رابینسون",
    role: "مدیر ارشد محصول",
    company: "TechNova Global",
    rating: 5,
    text: "همکاری فوق‌العاده با خروجی دقیق و فراتر از انتظار. تسلط عمیق بر فرانت‌اند، معماری مدرن و انیمیشن‌های روان واقعاً کم‌نظیر است.",
  },
  {
    id: 2,
    name: "سارا چن",
    role: "بنیان‌گذار و مدیرعامل",
    company: "VentureLab",
    rating: 5,
    text: "سرعت عمل، دقت در جزئیات بصری و اجرای چشم‌نواز رابط کاربری وب و اپلیکیشن. تجربه‌ای بی‌نقص از ارتباط حرفه‌ای و مهندسی نرم‌افزار.",
  },
  {
    id: 3,
    name: "الکساندر دوپونت",
    role: "معمار نرم‌افزار",
    company: "CloudScale Systems",
    rating: 5,
    text: "کدنویسی تمیز، ساختاریافته و با بالاترین استانداردهای کارایی. پیاده‌سازی پروژه‌های پیچیده ری‌اکت و فلاتر با نهایت ظرافت و پایداری.",
  },
  {
    id: 4,
    name: "مایا استوانوویچ",
    role: "طراح ارشد رابط و تجربه کاربری (UI/UX)",
    company: "DesignPulse",
    rating: 5,
    text: "تبدیل ایده‌ها و طرح‌های گرافیکی به کدهای تعاملی و پرفورمنس‌بالا، با درک فوق‌العاده از اصول انیمیشن‌های سه‌بعدی و مدرن وب.",
  },
  {
    id: 5,
    name: "دیوید کلاین",
    role: "مدیر مهندسی",
    company: "Apex Digital Solutions",
    rating: 5,
    text: "یکی از بااستعدادترین و متعهدترین توسعه‌دهندگانی که با آن‌ها کار کرده‌ایم. تحویل به موقع، ارتباط عالی و نتایجی در سطح استانداردهای جهانی.",
  },
];

interface CoreParticle {
  angle: number;
  elevation: number;
  speed: number;
  radius: number;
  size: number;
  hue: number;
  alpha: number;
}

export default function TestimonialGlobe({
  cardsCount: initialCardsCount = 5,
  cards: customCards,
  spinSpeed: initialSpinSpeed = 12,
  spinDirection: initialSpinDirection = "Forward",
  radius: initialRadius = 280,
  autoSpin: initialAutoSpin = true,
  nexusLinks: initialNexusLinks = false,
  color: initialColor = "Dual",
  hue: initialHue = 200,
  secondHue: initialSecondHue = 280,
  showControls = true,
  className = "",
  style = {},
}: TestimonialGlobeProps) {
  // Live state controls
  const [cardsCount, setCardsCount] = useState<number>(initialCardsCount);
  const [spinSpeed, setSpinSpeed] = useState<number>(initialSpinSpeed);
  const [spinDirection, setSpinDirection] = useState<SpinDirection>(initialSpinDirection);
  const [radius, setRadius] = useState<number>(initialRadius);
  const [autoSpin, setAutoSpin] = useState<boolean>(initialAutoSpin);
  const [nexusLinks, setNexusLinks] = useState<boolean>(initialNexusLinks);
  const [colorMode, setColorMode] = useState<ColorMode>(initialColor);
  const [hue, setHue] = useState<number>(initialHue);
  const [secondHue, setSecondHue] = useState<number>(initialSecondHue);
  const [activeCardId, setActiveCardId] = useState<number | string | null>(null);
  const [controlsOpen, setControlsOpen] = useState<boolean>(false);

  // References
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const isPausedRef = useRef<boolean>(false);

  // Responsive radius adjustment
  const [currentRadius, setCurrentRadius] = useState<number>(initialRadius);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 480) {
        setCurrentRadius(Math.min(radius, 175));
      } else if (w < 768) {
        setCurrentRadius(Math.min(radius, 220));
      } else {
        setCurrentRadius(radius);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [radius]);

  // Spherical Coordinates for cards (evenly distributed with natural elevation variations)
  const cardList = useMemo(() => {
    const source = customCards && customCards.length > 0 ? customCards : DEFAULT_CARDS;
    return source.slice(0, cardsCount);
  }, [customCards, cardsCount]);

  // Sphere base positions for N cards
  const cardBaseAngles = useMemo(() => {
    const N = cardList.length;
    const angles: Array<{ phi: number; theta: number }> = [];

    // Distribute around the sphere with balanced latitude and longitude
    const elevationOffsets = [0, 0.38, -0.32, 0.28, -0.4, 0.35, -0.25, 0.2];
    for (let i = 0; i < N; i++) {
      const theta = (i * 2 * Math.PI) / N;
      const phi = elevationOffsets[i % elevationOffsets.length];
      angles.push({ phi, theta });
    }
    return angles;
  }, [cardList.length]);

  // Current Globe 3D orientation
  const rotYRef = useRef<number>(0); // Yaw
  const rotXRef = useRef<number>(0.15); // Pitch (slight tilt)
  const velYRef = useRef<number>(0);
  const velXRef = useRef<number>(0);

  // Target rotation when a card is clicked to bring to front
  const targetRotationRef = useRef<{ active: boolean; targetY: number; targetX: number } | null>(null);

  // Drag interaction refs
  const isDraggingRef = useRef<boolean>(false);
  const lastPointerRef = useRef<{ x: number; y: number; time: number }>({ x: 0, y: 0, time: 0 });

  // Projected card screen positions state (for rendering DOM cards)
  const [projectedCards, setProjectedCards] = useState<
    Array<{
      card: TestimonialCardData;
      x: number;
      y: number;
      z: number;
      depth: number;
      scale: number;
      opacity: number;
      blur: number;
      zIndex: number;
      isFront: boolean;
    }>
  >([]);

  // Synchronous settings ref for animation loop
  const settingsRef = useRef({
    spinSpeed,
    spinDirection,
    radius: currentRadius,
    autoSpin,
    nexusLinks,
    colorMode,
    hue,
    secondHue,
  });

  useEffect(() => {
    settingsRef.current = {
      spinSpeed,
      spinDirection,
      radius: currentRadius,
      autoSpin,
      nexusLinks,
      colorMode,
      hue,
      secondHue,
    };
  }, [spinSpeed, spinDirection, currentRadius, autoSpin, nexusLinks, colorMode, hue, secondHue]);

  // Click card to bring to front
  const bringCardToFront = useCallback(
    (index: number, cardId: number | string) => {
      setActiveCardId(cardId);
      const angle = cardBaseAngles[index];
      if (!angle) return;

      // We want this card's normal (phi, theta + rotY) to point directly at the camera (x=0, y=0, z=+R)
      // That means: rotY = -theta, rotX = -phi
      let targetY = -angle.theta;
      let targetX = -angle.phi;

      // Wrap targetY to shortest angular path from current rotY
      const currentY = rotYRef.current;
      const twoPi = Math.PI * 2;
      while (targetY - currentY > Math.PI) targetY -= twoPi;
      while (targetY - currentY < -Math.PI) targetY += twoPi;

      targetRotationRef.current = {
        active: true,
        targetY,
        targetX,
      };
      velYRef.current = 0;
      velXRef.current = 0;
    },
    [cardBaseAngles]
  );

  // Pointer drag handlers
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    isDraggingRef.current = true;
    targetRotationRef.current = null; // cancel bring-to-front animation if user drags
    lastPointerRef.current = {
      x: e.clientX,
      y: e.clientY,
      time: performance.now(),
    };
    velYRef.current = 0;
    velXRef.current = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const now = performance.now();
    const dt = Math.max((now - lastPointerRef.current.time) / 1000, 0.008);
    const dx = e.clientX - lastPointerRef.current.x;
    const dy = e.clientY - lastPointerRef.current.y;

    const sensitivity = 0.0055;
    rotYRef.current += dx * sensitivity;
    rotXRef.current = Math.max(-0.65, Math.min(0.65, rotXRef.current - dy * sensitivity));

    velYRef.current = (dx * sensitivity) / dt;
    velXRef.current = -(dy * sensitivity) / dt;

    lastPointerRef.current = { x: e.clientX, y: e.clientY, time: now };
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    isDraggingRef.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  }, []);

  // Main Canvas & 3D Math RAF Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    // Object Pool for glowing core orbit particles
    const CORE_PARTICLE_COUNT = 50;
    const coreParticles: CoreParticle[] = new Array(CORE_PARTICLE_COUNT);

    for (let i = 0; i < CORE_PARTICLE_COUNT; i++) {
      coreParticles[i] = {
        angle: Math.random() * Math.PI * 2,
        elevation: (Math.random() - 0.5) * Math.PI,
        speed: (Math.random() * 0.4 + 0.2) * (Math.random() > 0.5 ? 1 : -1),
        radius: Math.random() * 80 + 30,
        size: Math.random() * 2 + 1,
        hue: i % 2 === 0 ? settingsRef.current.hue : settingsRef.current.secondHue,
        alpha: Math.random() * 0.6 + 0.3,
      };
    }

    const handleResize = () => {
      if (!containerRef.current || !canvas) return;
      const rect = containerRef.current.getBoundingClientRect();
      width = rect.width || window.innerWidth;
      height = rect.height || 700;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });

    // Tab visibility & off-screen observers
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
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    let corePulseTime = 0;

    // Render loop
    const loop = (currentTime: number) => {
      if (isPausedRef.current) return;

      const rawDt = (currentTime - lastTime) / 1000;
      const dt = Math.min(Math.max(rawDt, 0), 0.1); // clamped dt
      lastTime = currentTime;
      corePulseTime += dt;

      const {
        spinSpeed: speed,
        spinDirection: dir,
        radius: R,
        autoSpin: spinning,
        nexusLinks: showLinks,
        hue: primaryHue,
        secondHue: altHue,
        colorMode: mode,
      } = settingsRef.current;

      // 1. UPDATE SPHERE ROTATION
      if (targetRotationRef.current && targetRotationRef.current.active) {
        // Bring to front interpolation
        const { targetY, targetX } = targetRotationRef.current;
        const lerpFactor = 1 - Math.pow(0.001, dt); // smooth exponential ease-out
        rotYRef.current += (targetY - rotYRef.current) * lerpFactor;
        rotXRef.current += (targetX - rotXRef.current) * lerpFactor;

        if (Math.abs(targetY - rotYRef.current) < 0.005 && Math.abs(targetX - rotXRef.current) < 0.005) {
          rotYRef.current = targetY;
          rotXRef.current = targetX;
          targetRotationRef.current.active = false;
        }
      } else if (!isDraggingRef.current) {
        // Momentum coasting
        if (Math.abs(velYRef.current) > 0.01 || Math.abs(velXRef.current) > 0.01) {
          const friction = Math.pow(0.92, dt * 60);
          velYRef.current *= friction;
          velXRef.current *= friction;
          rotYRef.current += velYRef.current * dt;
          rotXRef.current = Math.max(-0.65, Math.min(0.65, rotXRef.current + velXRef.current * dt));
        } else if (spinning && !motionQuery.matches) {
          // Regular auto-spin
          const dirSign = dir === "Forward" ? 1 : -1;
          const radPerSec = (speed * Math.PI) / 180;
          rotYRef.current += radPerSec * dirSign * dt;
        }
      }

      const rotY = rotYRef.current;
      const rotX = rotXRef.current;
      const centerX = width / 2;
      const centerY = height / 2;
      const cameraDistance = 750;

      // 2. PROJECT CARDS TO 3D & COMPUTE DEPTH
      const N = cardList.length;
      const projected = new Array(N);
      let maxZ = -Infinity;
      let frontIndex = 0;

      for (let i = 0; i < N; i++) {
        const { phi, theta } = cardBaseAngles[i] || { phi: 0, theta: 0 };

        // Point on unit sphere
        const cosPhi = Math.cos(phi);
        const sinPhi = Math.sin(phi);
        const cosTheta = Math.cos(theta);
        const sinTheta = Math.sin(theta);

        const x0 = R * cosPhi * sinTheta;
        const y0 = -R * sinPhi;
        const z0 = R * cosPhi * cosTheta;

        // Rotate around X (pitch)
        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);
        const y1 = y0 * cosX - z0 * sinX;
        const z1 = y0 * sinX + z0 * cosX;

        // Rotate around Y (yaw)
        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);
        const x2 = x0 * cosY + z1 * sinY;
        const z2 = -x0 * sinY + z1 * cosY;
        const y2 = y1;

        // Perspective projection
        const scale = cameraDistance / (cameraDistance - z2);
        const screenX = centerX + x2 * scale;
        const screenY = centerY + y2 * scale;

        const normalizedDepth = (z2 + R) / (2 * R); // 0 (back) to 1 (front)
        const clampedDepth = Math.max(0, Math.min(1, normalizedDepth));

        if (z2 > maxZ) {
          maxZ = z2;
          frontIndex = i;
        }

        projected[i] = {
          card: cardList[i],
          x: screenX,
          y: screenY,
          z: z2,
          depth: clampedDepth,
          scale: scale * (0.65 + 0.35 * clampedDepth),
          opacity: 0.22 + 0.78 * Math.pow(clampedDepth, 1.3),
          blur: Math.max(0, (1 - clampedDepth) * 5),
          zIndex: Math.round(clampedDepth * 1000),
          isFront: false,
        };
      }

      if (projected[frontIndex]) {
        projected[frontIndex].isFront = true;
      }

      setProjectedCards(projected);

      // 3. CANVAS 2D RENDER (Clear fully every frame - no ghost burn-in)
      ctx.clearRect(0, 0, width, height);

      // A. Draw Nexus Links (between neighboring cards on virtual sphere)
      if (showLinks) {
        ctx.lineWidth = 1;
        for (let i = 0; i < N; i++) {
          const nextIdx = (i + 1) % N;
          const p1 = projected[i];
          const p2 = projected[nextIdx];
          if (!p1 || !p2) continue;

          const avgDepth = (p1.depth + p2.depth) / 2;
          const linkAlpha = 0.12 + 0.35 * avgDepth;
          const linkHue = mode === "Dual" ? (i % 2 === 0 ? primaryHue : altHue) : primaryHue;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `hsla(${linkHue}, 85%, 65%, ${linkAlpha})`;
          ctx.stroke();
        }
      }

      // B. Draw Orbiting Core Stardust (Object Pool, zero GC)
      for (let i = 0; i < CORE_PARTICLE_COUNT; i++) {
        const cp = coreParticles[i];
        cp.angle += cp.speed * dt;

        // Position on small core sphere
        const px0 = cp.radius * Math.cos(cp.elevation) * Math.sin(cp.angle);
        const py0 = cp.radius * Math.sin(cp.elevation);
        const pz0 = cp.radius * Math.cos(cp.elevation) * Math.cos(cp.angle);

        // Rotate with globe
        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);
        const py1 = py0 * cosX - pz0 * sinX;
        const pz1 = py0 * sinX + pz0 * cosX;

        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);
        const px2 = px0 * cosY + pz1 * sinY;
        const pz2 = -px0 * sinY + pz1 * cosY;

        const scale = cameraDistance / (cameraDistance - pz2);
        const sx = centerX + px2 * scale;
        const sy = centerY + py1 * scale;
        const particleDepth = (pz2 + R) / (2 * R);

        const pHue = mode === "Dual" ? (i % 2 === 0 ? primaryHue : altHue) : primaryHue;
        const pAlpha = (0.2 + 0.6 * Math.max(0, Math.min(1, particleDepth))) * cp.alpha;

        ctx.beginPath();
        ctx.arc(sx, sy, cp.size * scale, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${pHue}, 95%, 75%, ${pAlpha})`;
        ctx.fill();
      }

      // C. Draw Central Glowing Core
      const corePulse = Math.sin(corePulseTime * 2.2);
      const coreRadius = (45 + corePulse * 6) * (width < 768 ? 0.75 : 1);
      const outerGlowRadius = coreRadius * 2.8;

      const radialGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        coreRadius * 0.15,
        centerX,
        centerY,
        outerGlowRadius
      );

      radialGrad.addColorStop(0, `hsla(${primaryHue}, 95%, 85%, 0.85)`);
      radialGrad.addColorStop(0.35, `hsla(${primaryHue}, 90%, 65%, 0.45)`);
      radialGrad.addColorStop(0.7, `hsla(${mode === "Dual" ? altHue : primaryHue}, 85%, 55%, 0.15)`);
      radialGrad.addColorStop(1, `hsla(${mode === "Dual" ? altHue : primaryHue}, 80%, 45%, 0)`);

      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, outerGlowRadius, 0, Math.PI * 2);
      ctx.fillStyle = radialGrad;
      ctx.fill();
      ctx.restore();

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      observer.disconnect();
    };
  }, [cardBaseAngles, cardList]);

  return (
    <div
      ref={containerRef}
      className={`testimonial-globe-wrapper ${className}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      style={{
        position: "relative",
        width: "100%",
        minHeight: "720px",
        height: "85vh",
        maxHeight: "900px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        cursor: isDraggingRef.current ? "grabbing" : "grab",
        userSelect: "none",
        touchAction: "none",
        direction: "rtl",
        ...style,
      }}
    >
      {/* 1. Canvas 2D Layer (Central Glowing Core, Orbiting Stardust & Nexus Links) */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* 2. Section Heading Overlay */}
      <div
        style={{
          position: "absolute",
          top: "30px",
          width: "100%",
          textAlign: "center",
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            display: "inline-block",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "2px",
            color: `hsl(${hue}, 90%, 65%)`,
            marginBottom: "8px",
            textTransform: "uppercase",
            fontFamily: "monospace",
          }}
        >
          // نظرات کارفرمایان و همکاران //
        </span>
        <h2
          style={{
            fontSize: "clamp(26px, 4vw, 42px)",
            fontWeight: 800,
            margin: "0 0 8px 0",
            color: "#ffffff",
            fontFamily: "'Kalameh', 'Dana', sans-serif",
            textShadow: "0 2px 15px rgba(0,0,0,0.6)",
          }}
        >
          کره تعاملی رضایت مشتریان
        </h2>
        <p
          style={{
            fontSize: "13px",
            color: "#94a3b8",
            margin: 0,
            fontFamily: "'Dana', sans-serif",
          }}
        >
          کره را بچرخانید یا برای مشاهده نزدیک روی هر کارت کلیک کنید
        </p>
      </div>

      {/* 3. CSS 3D Depth-Projected Testimonial Cards */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 2,
        }}
      >
        {projectedCards.map((item, idx) => {
          const { card, x, y, scale, opacity, blur, zIndex, isFront } = item;
          const isActive = card.id === activeCardId || (isFront && activeCardId === null);
          const cardHue = colorMode === "Dual" ? (idx % 2 === 0 ? hue : secondHue) : hue;

          return (
            <div
              key={card.id}
              onClick={(e) => {
                e.stopPropagation();
                bringCardToFront(idx, card.id);
              }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "290px",
                transform: `translate3d(${x - 145}px, ${y - 100}px, 0) scale(${scale})`,
                opacity: opacity,
                filter: blur > 0.3 ? `blur(${blur}px)` : "none",
                zIndex: zIndex,
                pointerEvents: isDraggingRef.current ? "none" : "auto",
                cursor: "pointer",
                transition: "box-shadow 0.3s ease, border-color 0.3s ease",
              }}
            >
              <div
                style={{
                  backgroundColor: "rgba(13, 17, 28, 0.82)",
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                  border: `1.5px solid ${
                    isActive ? `hsl(${cardHue}, 90%, 65%)` : `hsla(${cardHue}, 75%, 55%, 0.25)`
                  }`,
                  borderRadius: "18px",
                  padding: "20px 22px",
                  color: "#ffffff",
                  boxShadow: isActive
                    ? `0 14px 40px rgba(0,0,0,0.7), 0 0 25px hsla(${cardHue}, 90%, 60%, 0.45)`
                    : "0 10px 30px rgba(0,0,0,0.5)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Top Subtle Glow Line */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "20px",
                    right: "20px",
                    height: "2px",
                    background: `linear-gradient(90deg, transparent, hsl(${cardHue}, 90%, 65%), transparent)`,
                  }}
                />

                {/* Rating Stars & Quote Icon */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "12px",
                  }}
                >
                  <div style={{ color: "#facc15", fontSize: "14px", letterSpacing: "2px" }}>
                    {"★".repeat(card.rating || 5)}
                  </div>
                  <span
                    style={{
                      fontSize: "22px",
                      lineHeight: 1,
                      color: `hsl(${cardHue}, 90%, 65%)`,
                      fontFamily: "serif",
                      opacity: 0.8,
                    }}
                  >
                    “
                  </span>
                </div>

                {/* Testimonial Quote Text */}
                <p
                  style={{
                    fontSize: "13.5px",
                    lineHeight: 1.75,
                    color: "#e2e8f0",
                    margin: "0 0 16px 0",
                    fontFamily: "'Dana', sans-serif",
                    fontWeight: 400,
                  }}
                >
                  {card.text}
                </p>

                {/* Author Info */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    borderTop: "1px solid rgba(255,255,255,0.08)",
                    paddingTop: "12px",
                  }}
                >
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "50%",
                      backgroundColor: `hsla(${cardHue}, 80%, 45%, 0.3)`,
                      border: `1px solid hsl(${cardHue}, 85%, 65%)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "15px",
                      fontWeight: 700,
                      color: "#ffffff",
                      flexShrink: 0,
                    }}
                  >
                    {card.name.charAt(0)}
                  </div>
                  <div style={{ overflow: "hidden" }}>
                    <h4
                      style={{
                        margin: 0,
                        fontSize: "14px",
                        fontWeight: 700,
                        color: "#ffffff",
                        fontFamily: "'Dana', sans-serif",
                      }}
                    >
                      {card.name}
                    </h4>
                    <span
                      style={{
                        fontSize: "11.5px",
                        color: "#94a3b8",
                        display: "block",
                        fontFamily: "'Dana', sans-serif",
                      }}
                    >
                      {card.role} {card.company ? `• ${card.company}` : ""}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Live Control Panel Widget */}
      {showControls && (
        <div
          style={{
            position: "absolute",
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
                color: `hsl(${hue}, 90%, 65%)`,
                border: `1px solid hsla(${hue}, 80%, 65%, 0.35)`,
                borderRadius: "50%",
                width: "42px",
                height: "42px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
                backdropFilter: "blur(10px)",
              }}
              title="Globe Settings"
            >
              ⚙
            </button>
          ) : (
            <div
              style={{
                backgroundColor: "rgba(10, 15, 28, 0.94)",
                backdropFilter: "blur(16px)",
                border: `1px solid hsla(${hue}, 80%, 65%, 0.3)`,
                borderRadius: "14px",
                padding: "16px",
                width: "270px",
                color: "#f1f5f9",
                fontSize: "12px",
                fontFamily: "monospace",
                boxShadow: "0 10px 30px rgba(0,0,0,0.7)",
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
                <span style={{ fontWeight: "bold", color: `hsl(${hue}, 90%, 65%)` }}>Testimonial Globe</span>
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

              {/* Cards Count */}
              <div style={{ marginBottom: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Cards:</span>
                  <span>{cardsCount}</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="5"
                  value={cardsCount}
                  onChange={(e) => setCardsCount(parseInt(e.target.value))}
                  style={{ width: "100%", accentColor: `hsl(${hue}, 90%, 60%)` }}
                />
              </div>

              {/* Spin Speed */}
              <div style={{ marginBottom: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Spin Speed:</span>
                  <span>{spinSpeed}°/s</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="30"
                  step="2"
                  value={spinSpeed}
                  onChange={(e) => setSpinSpeed(parseInt(e.target.value))}
                  style={{ width: "100%", accentColor: `hsl(${hue}, 90%, 60%)` }}
                />
              </div>

              {/* Spin Direction */}
              <div style={{ marginBottom: "10px" }}>
                <div style={{ display: "flex", gap: "6px" }}>
                  {(["Forward", "Reverse"] as SpinDirection[]).map((dir) => (
                    <button
                      key={dir}
                      onClick={() => setSpinDirection(dir)}
                      style={{
                        flex: 1,
                        padding: "4px",
                        fontSize: "11px",
                        borderRadius: "4px",
                        border: "1px solid",
                        borderColor: spinDirection === dir ? `hsl(${hue}, 90%, 65%)` : "rgba(255,255,255,0.15)",
                        backgroundColor:
                          spinDirection === dir ? `hsla(${hue}, 90%, 65%, 0.2)` : "transparent",
                        color: spinDirection === dir ? `hsl(${hue}, 90%, 65%)` : "#cbd5e1",
                        cursor: "pointer",
                      }}
                    >
                      {dir}
                    </button>
                  ))}
                </div>
              </div>

              {/* Radius */}
              <div style={{ marginBottom: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Radius:</span>
                  <span>{radius}px</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="380"
                  step="10"
                  value={radius}
                  onChange={(e) => setRadius(parseInt(e.target.value))}
                  style={{ width: "100%", accentColor: `hsl(${hue}, 90%, 60%)` }}
                />
              </div>

              {/* Auto Spin & Nexus Links Toggles */}
              <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
                <button
                  onClick={() => setAutoSpin((prev) => !prev)}
                  style={{
                    flex: 1,
                    padding: "5px",
                    borderRadius: "4px",
                    border: "1px solid",
                    borderColor: autoSpin ? `hsl(${hue}, 90%, 65%)` : "rgba(255,255,255,0.2)",
                    backgroundColor: autoSpin ? `hsla(${hue}, 90%, 65%, 0.2)` : "transparent",
                    color: autoSpin ? `hsl(${hue}, 90%, 65%)` : "#cbd5e1",
                    cursor: "pointer",
                  }}
                >
                  Auto Spin: {autoSpin ? "ON" : "OFF"}
                </button>
                <button
                  onClick={() => setNexusLinks((prev) => !prev)}
                  style={{
                    flex: 1,
                    padding: "5px",
                    borderRadius: "4px",
                    border: "1px solid",
                    borderColor: nexusLinks ? `hsl(${hue}, 90%, 65%)` : "rgba(255,255,255,0.2)",
                    backgroundColor: nexusLinks ? `hsla(${hue}, 90%, 65%, 0.2)` : "transparent",
                    color: nexusLinks ? `hsl(${hue}, 90%, 65%)` : "#cbd5e1",
                    cursor: "pointer",
                  }}
                >
                  Nexus Links: {nexusLinks ? "ON" : "OFF"}
                </button>
              </div>

              {/* Color Mode */}
              <div>
                <label style={{ display: "block", marginBottom: "4px" }}>Color Mode</label>
                <div style={{ display: "flex", gap: "6px" }}>
                  {(["Single", "Dual"] as ColorMode[]).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setColorMode(mode)}
                      style={{
                        flex: 1,
                        padding: "4px",
                        fontSize: "11px",
                        borderRadius: "4px",
                        border: "1px solid",
                        borderColor: colorMode === mode ? `hsl(${hue}, 90%, 65%)` : "rgba(255,255,255,0.15)",
                        backgroundColor:
                          colorMode === mode ? `hsla(${hue}, 90%, 65%, 0.2)` : "transparent",
                        color: colorMode === mode ? `hsl(${hue}, 90%, 65%)` : "#cbd5e1",
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

