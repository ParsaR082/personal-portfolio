"use client";

import { useEffect, useRef } from "react";

interface HtmlRendererProps {
  html: string;
  className?: string;
  styles?: string[];
}

export default function HtmlRenderer({
  html,
  className,
  styles,
}: HtmlRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Find and execute script tags sequentially
    const scripts = Array.from(containerRef.current.querySelectorAll("script"));
    if (scripts.length === 0) return;

    let isCancelled = false;

    const runScripts = async () => {
      for (const oldScript of scripts) {
        if (isCancelled) break;
        await new Promise<void>((resolve) => {
          const newScript = document.createElement("script");
          Array.from(oldScript.attributes).forEach((attr) => {
            newScript.setAttribute(attr.name, attr.value);
          });

          if (oldScript.src) {
            newScript.onload = () => resolve();
            newScript.onerror = () => resolve();
            // Timeout fallback so script execution does not hang
            const timer = setTimeout(resolve, 800);
            document.body.appendChild(newScript);
            newScript.onload = () => {
              clearTimeout(timer);
              resolve();
            };
          } else {
            newScript.textContent = oldScript.textContent;
            document.body.appendChild(newScript);
            resolve();
          }
        });
      }
    };

    runScripts();

    return () => {
      isCancelled = true;
    };
  }, [html]);

  return (
    <>
      {styles?.map((s, idx) => (
        <div key={idx} dangerouslySetInnerHTML={{ __html: s }} />
      ))}
      <div
        ref={containerRef}
        className={className}
        dangerouslySetInnerHTML={{ __html: html }}
        suppressHydrationWarning
      />
    </>
  );
}

