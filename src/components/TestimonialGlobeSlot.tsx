"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import TestimonialGlobe from "./TestimonialGlobe";

export default function TestimonialGlobeSlot() {
  const [slot, setSlot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const el = document.getElementById("testimonial-globe-slot");
    if (el) {
      setSlot(el);
    }
  }, []);

  if (!slot) return null;
  return createPortal(<TestimonialGlobe />, slot);
}

