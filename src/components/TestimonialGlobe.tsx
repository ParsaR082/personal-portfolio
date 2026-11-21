"use client";

import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";

export type SpinDirection = "Forward" | "Reverse";
export type ColorMode = "Single" | "Dual";

export interface ContactCardData {
  id: string;
  type: "phone" | "email" | "telegram" | "whatsapp" | "github";
  badge: string;
  title: string;
  subtitle: string;
  value: string;
  copyValue: string;
  link: string;
  actionText: string;
  description: string;
  accentColor: string;
}

export interface TestimonialGlobeProps {
  /** Number of cards (default: 5) */
  cardsCount?: number;
  /** Custom cards data */
  cards?: ContactCardData[];
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

const DEFAULT_CONTACT_CARDS: ContactCardData[] = [
  {
    id: "phone",
    type: "phone",
    badge: "۰۱ // تماس صوتی",
    title: "شماره تماس",
    subtitle: "پاسخگویی مستقیم",
    value: "+98 914 512 0736",
    copyValue: "+989145120736",
    link: "tel:+989145120736",
    actionText: "برقراری تماس مستقیم",
    description: "پاسخگویی سریع جهت هماهنگی پروژه‌ها، مشاوره فنی و گفت‌وگو.",
    accentColor: "#38bdf8",
  },
  {
    id: "email",
    type: "email",
    badge: "۰۲ // پست الکترونیکی",
    title: "ایمیل",
    subtitle: "مکاتبات رسمی",
    value: "neovoid.team@gmail.com",
    copyValue: "neovoid.team@gmail.com",
    link: "mailto:neovoid.team@gmail.com",
    actionText: "ارسال ایمیل مستقیم",
    description: "ارسال مستندات پروژه، فایل‌های نیازمندی و دعوت به همکاری رسمی.",
    accentColor: "#06b6d4",
  },
  {
    id: "telegram",
    type: "telegram",
    badge: "۰۳ // پیام‌رسان سریع",
    title: "تلگرام",
    subtitle: "@Parsa_R082",
    value: "t.me/Parsa_R082",
    copyValue: "https://t.me/Parsa_R082",
    link: "https://t.me/Parsa_R082",
    actionText: "ارسال پیام در تلگرام",
    description: "سریع‌ترین روش چت مستقیم، انتقال فایل و هماهنگی لحظه‌ای.",
    accentColor: "#229ED9",
  },
  {
    id: "whatsapp",
    type: "whatsapp",
    badge: "۰۴ // پیام‌رسان",
    title: "واتس‌اپ",
    subtitle: "چت و پیام فوری",
    value: "+98 914 512 0736",
    copyValue: "+989145120736",
    link: "https://wa.me/989145120736",
    actionText: "شروع گفتگو در واتس‌اپ",
    description: "امکان ارسال پیام متنی، هماهنگی اولیه و پیگیری در واتس‌اپ.",
    accentColor: "#25D366",
  },
  {
    id: "github",
    type: "github",
    badge: "۰۵ // گیت‌هاب",
    title: "گیت‌هاب",
    subtitle: "ParsaR082",
    value: "github.com/ParsaR082",
    copyValue: "https://github.com/ParsaR082",
    link: "https://github.com/ParsaR082",
    actionText: "مشاهده پروفایل گیت‌هاب",
    description: "مشاهده ریپازیتوری‌ها، پروژه‌های متن‌باز و سوابق کدهای من.",
    accentColor: "#a855f7",
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

function renderCardIcon(type: ContactCardData["type"], color: string) {
  switch (type) {
    case "phone":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      );
    case "email":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      );
    case "telegram":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill={color}>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill={color}>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      );
    case "github":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill={color}>
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      );
  }
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
  const [controlsOpen, setControlsOpen] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // References
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const isPausedRef = useRef<boolean>(false);

  // DOM Card Element Refs for direct zero-rerender GPU transform updates
  const cardElementsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Responsive radius adjustment
  const [currentRadius, setCurrentRadius] = useState<number>(initialRadius);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 480) {
        setCurrentRadius(Math.min(radius, 175));
      } else if (w < 768) {
        setCurrentRadius(Math.min(radius, 225));
      } else {
        setCurrentRadius(radius);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [radius]);

  // Card list
  const cardList = useMemo(() => {
    const source = customCards && customCards.length > 0 ? customCards : DEFAULT_CONTACT_CARDS;
    return source.slice(0, cardsCount);
  }, [customCards, cardsCount]);

  // Spherical Coordinates
  const cardBaseAngles = useMemo(() => {
    const N = cardList.length;
    const angles: Array<{ phi: number; theta: number }> = [];
    const elevationOffsets = [0, 0.36, -0.32, 0.28, -0.38, 0.32, -0.26];
    for (let i = 0; i < N; i++) {
      const theta = (i * 2 * Math.PI) / N;
      const phi = elevationOffsets[i % elevationOffsets.length];
      angles.push({ phi, theta });
    }
    return angles;
  }, [cardList.length]);

  // Rotation state
  const rotYRef = useRef<number>(0); // Yaw
  const rotXRef = useRef<number>(0.12); // Pitch
  const velYRef = useRef<number>(0);
  const velXRef = useRef<number>(0);

  // Bring to front target
  const targetRotationRef = useRef<{ active: boolean; targetY: number; targetX: number } | null>(null);

  // Drag interaction refs
  const isDraggingRef = useRef<boolean>(false);
  const lastPointerRef = useRef<{ x: number; y: number; time: number }>({ x: 0, y: 0, time: 0 });

  // Settings ref for synchronous access in RAF loop
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
    (index: number) => {
      const angle = cardBaseAngles[index];
      if (!angle) return;

      let targetY = -angle.theta;
      let targetX = -angle.phi;

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

  // Copy to clipboard handler
  const handleCopy = (e: React.MouseEvent, id: string, textToCopy: string) => {
    e.stopPropagation();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy);
      setCopiedId(id);
      setTimeout(() => {
        setCopiedId((curr) => (curr === id ? null : curr));
      }, 2000);
    }
  };

  // Pointer drag handlers
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    isDraggingRef.current = true;
    targetRotationRef.current = null;
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

    const sensitivity = 0.005;
    rotYRef.current += dx * sensitivity;
    rotXRef.current = Math.max(-0.6, Math.min(0.6, rotXRef.current - dy * sensitivity));

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

  // Main Canvas & 3D Math RAF Loop (Direct DOM Transform - Zero React Re-renders!)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    // Object Pool for glowing core orbit particles
    const CORE_PARTICLE_COUNT = 36;
    const coreParticles: CoreParticle[] = new Array(CORE_PARTICLE_COUNT);

    for (let i = 0; i < CORE_PARTICLE_COUNT; i++) {
      coreParticles[i] = {
        angle: Math.random() * Math.PI * 2,
        elevation: (Math.random() - 0.5) * Math.PI,
        speed: (Math.random() * 0.35 + 0.15) * (Math.random() > 0.5 ? 1 : -1),
        radius: Math.random() * 70 + 25,
        size: Math.random() * 2 + 1,
        hue: i % 2 === 0 ? settingsRef.current.hue : settingsRef.current.secondHue,
        alpha: Math.random() * 0.5 + 0.3,
      };
    }

    const handleResize = () => {
      if (!containerRef.current || !canvas) return;
      const rect = containerRef.current.getBoundingClientRect();
      width = rect.width || window.innerWidth;
      height = rect.height || 680;
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

    // Projected point coordinates for nexus links
    const projectedCoords: Array<{ x: number; y: number; depth: number }> = [];

    // The high-performance render loop
    const loop = (currentTime: number) => {
      if (isPausedRef.current) return;

      const rawDt = (currentTime - lastTime) / 1000;
      const dt = Math.min(Math.max(rawDt, 0), 0.1);
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
        const { targetY, targetX } = targetRotationRef.current;
        const lerpFactor = 1 - Math.pow(0.001, dt);
        rotYRef.current += (targetY - rotYRef.current) * lerpFactor;
        rotXRef.current += (targetX - rotXRef.current) * lerpFactor;

        if (Math.abs(targetY - rotYRef.current) < 0.004 && Math.abs(targetX - rotXRef.current) < 0.004) {
          rotYRef.current = targetY;
          rotXRef.current = targetX;
          targetRotationRef.current.active = false;
        }
      } else if (!isDraggingRef.current) {
        if (Math.abs(velYRef.current) > 0.01 || Math.abs(velXRef.current) > 0.01) {
          const friction = Math.pow(0.92, dt * 60);
          velYRef.current *= friction;
          velXRef.current *= friction;
          rotYRef.current += velYRef.current * dt;
          rotXRef.current = Math.max(-0.6, Math.min(0.6, rotXRef.current + velXRef.current * dt));
        } else if (spinning && !motionQuery.matches) {
          const dirSign = dir === "Forward" ? 1 : -1;
          const radPerSec = (speed * Math.PI) / 180;
          rotYRef.current += radPerSec * dirSign * dt;
        }
      }

      const rotY = rotYRef.current;
      const rotX = rotXRef.current;
      const centerX = width / 2;
      const centerY = height / 2 + 10;
      const cameraDistance = 750;

      // 2. PROJECT CARDS TO 3D AND DIRECTLY UPDATE DOM STYLES (NO REACT RE-RENDERS!)
      const N = cardList.length;
      projectedCoords.length = 0;

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      for (let i = 0; i < N; i++) {
        const angle = cardBaseAngles[i] || { phi: 0, theta: 0 };
        const cosPhi = Math.cos(angle.phi);
        const sinPhi = Math.sin(angle.phi);
        const cosTheta = Math.cos(angle.theta);
        const sinTheta = Math.sin(angle.theta);

        const x0 = R * cosPhi * sinTheta;
        const y0 = -R * sinPhi;
        const z0 = R * cosPhi * cosTheta;

        const y1 = y0 * cosX - z0 * sinX;
        const z1 = y0 * sinX + z0 * cosX;

        const x2 = x0 * cosY + z1 * sinY;
        const z2 = -x0 * sinY + z1 * cosY;

        const scale = cameraDistance / (cameraDistance - z2);
        const screenX = centerX + x2 * scale;
        const screenY = centerY + y1 * scale;

        const normalizedDepth = Math.max(0, Math.min(1, (z2 + R) / (2 * R)));
        const cardScale = scale * (0.68 + 0.32 * normalizedDepth);
        const opacity = 0.28 + 0.72 * Math.pow(normalizedDepth, 1.25);
        const blur = Math.max(0, (1 - normalizedDepth) * 4.5);
        const zIndex = Math.round(normalizedDepth * 1000);

        projectedCoords.push({ x: screenX, y: screenY, depth: normalizedDepth });

        // Direct DOM update (blistering fast 60/120 FPS)
        const el = cardElementsRef.current[i];
        if (el) {
          el.style.transform = `translate3d(${screenX - 150}px, ${screenY - 110}px, 0) scale(${cardScale})`;
          el.style.opacity = `${opacity}`;
          el.style.filter = blur > 0.4 ? `blur(${blur.toFixed(1)}px)` : "none";
          el.style.zIndex = `${zIndex}`;
          el.style.pointerEvents = isDraggingRef.current ? "none" : "auto";
        }
      }

      // 3. CANVAS 2D RENDER (Crisp clearRect every frame)
      ctx.clearRect(0, 0, width, height);

      // A. Draw Nexus Links (Single batched path)
      if (showLinks && projectedCoords.length > 1) {
        ctx.beginPath();
        for (let i = 0; i < N; i++) {
          const nextIdx = (i + 1) % N;
          const p1 = projectedCoords[i];
          const p2 = projectedCoords[nextIdx];
          if (p1 && p2) {
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
          }
        }
        ctx.lineWidth = 1;
        ctx.strokeStyle = `hsla(${primaryHue}, 85%, 65%, 0.25)`;
        ctx.stroke();
      }

      // B. Draw Orbiting Core Stardust (Object Pool, zero GC)
      for (let i = 0; i < CORE_PARTICLE_COUNT; i++) {
        const cp = coreParticles[i];
        cp.angle += cp.speed * dt;

        const px0 = cp.radius * Math.cos(cp.elevation) * Math.sin(cp.angle);
        const py0 = cp.radius * Math.sin(cp.elevation);
        const pz0 = cp.radius * Math.cos(cp.elevation) * Math.cos(cp.angle);

        const py1 = py0 * cosX - pz0 * sinX;
        const pz1 = py0 * sinX + pz0 * cosX;

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

      // C. Draw Central Glowing Core (Clean 2-stop gradient, no heavy shadowBlur)
      const corePulse = Math.sin(corePulseTime * 2.2);
      const coreRadius = (45 + corePulse * 5) * (width < 768 ? 0.75 : 1);
      const outerGlowRadius = coreRadius * 2.5;

      const radialGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        coreRadius * 0.1,
        centerX,
        centerY,
        outerGlowRadius
      );

      radialGrad.addColorStop(0, `hsla(${primaryHue}, 95%, 85%, 0.8)`);
      radialGrad.addColorStop(0.35, `hsla(${primaryHue}, 90%, 65%, 0.35)`);
      radialGrad.addColorStop(0.7, `hsla(${mode === "Dual" ? altHue : primaryHue}, 85%, 55%, 0.12)`);
      radialGrad.addColorStop(1, `hsla(${mode === "Dual" ? altHue : primaryHue}, 80%, 45%, 0)`);

      ctx.beginPath();
      ctx.arc(centerX, centerY, outerGlowRadius, 0, Math.PI * 2);
      ctx.fillStyle = radialGrad;
      ctx.fill();

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
        maxHeight: "920px",
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
      {/* 1. Canvas 2D Layer */}
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
          top: "24px",
          width: "100%",
          textAlign: "center",
          zIndex: 10,
          pointerEvents: "none",
          padding: "0 16px",
        }}
      >
        <span
          style={{
            display: "inline-block",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "2px",
            color: `hsl(${hue}, 90%, 65%)`,
            marginBottom: "8px",
            textTransform: "uppercase",
            fontFamily: "monospace",
          }}
        >
          // ۰۵ // راه‌های ارتباطی //
        </span>
        <h2
          style={{
            fontSize: "clamp(24px, 4vw, 38px)",
            fontWeight: 800,
            margin: "0 0 8px 0",
            color: "#ffffff",
            fontFamily: "'Kalameh', 'Dana', sans-serif",
            textShadow: "0 2px 20px rgba(0,0,0,0.8)",
          }}
        >
          پل‌های ارتباطی و تماس با من
        </h2>
        <p
          style={{
            fontSize: "13.5px",
            color: "#94a3b8",
            margin: 0,
            fontFamily: "'Dana', sans-serif",
            maxWidth: "520px",
            display: "inline-block",
          }}
        >
          کره تعاملی را بچرخانید یا برای مشاهده مستقیم، روی هر کارت کلیک کنید
        </p>
      </div>

      {/* 3. CSS 3D Depth-Projected Contact Cards (Rendered Once, Transformed by RAF!) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 2,
        }}
      >
        {cardList.map((card, idx) => {
          const cardHue = colorMode === "Dual" ? (idx % 2 === 0 ? hue : secondHue) : hue;

          return (
            <div
              key={card.id}
              ref={(el) => {
                cardElementsRef.current[idx] = el;
              }}
              onClick={(e) => {
                e.stopPropagation();
                bringCardToFront(idx);
              }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "300px",
                transform: "translate3d(-9999px, -9999px, 0)",
                pointerEvents: "auto",
                cursor: "pointer",
                willChange: "transform, opacity, filter",
              }}
            >
              <div
                style={{
                  backgroundColor: "rgba(11, 15, 26, 0.88)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: `1.5px solid ${card.accentColor}55`,
                  borderRadius: "20px",
                  padding: "20px 22px",
                  color: "#ffffff",
                  boxShadow: `0 15px 35px rgba(0,0,0,0.6), 0 0 20px ${card.accentColor}15`,
                  position: "relative",
                  overflow: "hidden",
                  transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                }}
              >
                {/* Top Glowing Accent Line */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "20px",
                    right: "20px",
                    height: "2px",
                    background: `linear-gradient(90deg, transparent, ${card.accentColor}, transparent)`,
                  }}
                />

                {/* Header: Icon + Titles + Badge */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "14px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div
                      style={{
                        width: "42px",
                        height: "42px",
                        borderRadius: "12px",
                        backgroundColor: `${card.accentColor}18`,
                        border: `1px solid ${card.accentColor}44`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {renderCardIcon(card.type, card.accentColor)}
                    </div>
                    <div>
                      <h4
                        style={{
                          margin: 0,
                          fontSize: "16px",
                          fontWeight: 800,
                          color: "#ffffff",
                          fontFamily: "'Kalameh', 'Dana', sans-serif",
                        }}
                      >
                        {card.title}
                      </h4>
                      <span
                        style={{
                          fontSize: "11.5px",
                          color: "#94a3b8",
                          display: "block",
                          fontFamily: "'Dana', sans-serif",
                          marginTop: "2px",
                        }}
                      >
                        {card.subtitle}
                      </span>
                    </div>
                  </div>

                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      color: card.accentColor,
                      fontFamily: "monospace",
                      opacity: 0.9,
                    }}
                  >
                    {card.badge.split("//")[0]}
                  </span>
                </div>

                {/* Value Pill + Copy Button */}
                <div
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.45)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "10px",
                    padding: "7px 12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "12px",
                  }}
                >
                  <span
                    style={{
                      direction: "ltr",
                      fontFamily: "monospace, 'Dana', sans-serif",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#f8fafc",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      maxWidth: "190px",
                    }}
                  >
                    {card.value}
                  </span>

                  <button
                    type="button"
                    onClick={(e) => handleCopy(e, card.id, card.copyValue)}
                    title="کپی کردن"
                    style={{
                      background: copiedId === card.id ? "rgba(34, 197, 94, 0.25)" : "rgba(255, 255, 255, 0.08)",
                      border: `1px solid ${copiedId === card.id ? "#22c55e" : "rgba(255, 255, 255, 0.15)"}`,
                      borderRadius: "6px",
                      padding: "4px 8px",
                      fontSize: "11px",
                      color: copiedId === card.id ? "#4ade80" : "#94a3b8",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      transition: "all 0.2s ease",
                      fontFamily: "'Dana', sans-serif",
                    }}
                  >
                    {copiedId === card.id ? (
                      <>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>کپی شد</span>
                      </>
                    ) : (
                      <>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                        </svg>
                        <span>کپی</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Description */}
                <p
                  style={{
                    fontSize: "12.5px",
                    lineHeight: 1.65,
                    color: "#cbd5e1",
                    margin: "0 0 16px 0",
                    fontFamily: "'Dana', sans-serif",
                    minHeight: "40px",
                  }}
                >
                  {card.description}
                </p>

                {/* Action Link Button */}
                <a
                  href={card.link}
                  target={card.link.startsWith("http") ? "_blank" : undefined}
                  rel={card.link.startsWith("http") ? "noopener noreferrer" : undefined}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    width: "100%",
                    padding: "9px 16px",
                    borderRadius: "10px",
                    background: `linear-gradient(135deg, ${card.accentColor}25, ${card.accentColor}50)`,
                    border: `1px solid ${card.accentColor}77`,
                    color: "#ffffff",
                    fontSize: "12.5px",
                    fontWeight: 700,
                    textDecoration: "none",
                    boxShadow: `0 4px 15px ${card.accentColor}22`,
                    transition: "all 0.25s ease",
                    fontFamily: "'Dana', sans-serif",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `linear-gradient(135deg, ${card.accentColor}45, ${card.accentColor}85)`;
                    e.currentTarget.style.boxShadow = `0 6px 20px ${card.accentColor}45`;
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = `linear-gradient(135deg, ${card.accentColor}25, ${card.accentColor}50)`;
                    e.currentTarget.style.boxShadow = `0 4px 15px ${card.accentColor}22`;
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <span>{card.actionText}</span>
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ transform: "rotate(180deg)" }}
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </a>
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
              title="تنظیمات کره"
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
                <span style={{ fontWeight: "bold", color: `hsl(${hue}, 90%, 65%)` }}>Contact Globe</span>
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
