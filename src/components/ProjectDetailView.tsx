"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ProjectDetail } from "@/data/projectDetailsData";

interface ProjectDetailViewProps {
  project: ProjectDetail;
  prevProject: ProjectDetail;
  nextProject: ProjectDetail;
}

export default function ProjectDetailView({
  project,
  prevProject,
  nextProject,
}: ProjectDetailViewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // GSAP Smooth Entry & Stagger Animations
  useEffect(() => {
    const isReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isReduced || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Navigation Header
      gsap.from(".anim-header", {
        y: -25,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      });

      // 2. Category Badge
      gsap.from(".anim-hero-badge", {
        scale: 0.85,
        opacity: 0,
        duration: 0.5,
        delay: 0.1,
        ease: "back.out(1.6)",
      });

      // 3. Main Title
      gsap.from(".anim-title", {
        y: 35,
        opacity: 0,
        duration: 0.8,
        delay: 0.15,
        ease: "power3.out",
      });

      // 4. Subtitle & Summary
      gsap.from(".anim-subtitle", {
        y: 15,
        opacity: 0,
        duration: 0.6,
        delay: 0.25,
        ease: "power2.out",
      });

      gsap.from(".anim-summary", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        delay: 0.32,
        ease: "power2.out",
      });

      // 5. Metadata Grid Cards
      gsap.from(".anim-meta-card", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        delay: 0.4,
        ease: "power2.out",
      });

      // 6. Narrative Section
      gsap.from(".anim-narrative", {
        y: 35,
        opacity: 0,
        duration: 0.8,
        delay: 0.55,
        ease: "power3.out",
      });

      // 7. Technical Highlights
      gsap.from(".anim-highlight-item", {
        x: 25,
        opacity: 0,
        duration: 0.5,
        stagger: 0.07,
        delay: 0.7,
        ease: "power2.out",
      });

      // 8. Gallery Heading & Screenshots
      gsap.from(".anim-gallery-title", {
        y: 25,
        opacity: 0,
        duration: 0.6,
        delay: 0.8,
        ease: "power2.out",
      });

      gsap.from(".anim-screenshot-card", {
        y: 45,
        opacity: 0,
        scale: 0.98,
        duration: 0.85,
        stagger: 0.15,
        delay: 0.9,
        ease: "power3.out",
      });

      // 9. Footer Nav
      gsap.from(".anim-footer-nav", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        delay: 1.05,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [project.slug]);

  return (
    <div
      ref={containerRef}
      style={{
        minHeight: "100vh",
        color: "#ffffff",
        direction: "rtl",
        fontFamily: "'Dana', sans-serif",
        position: "relative",
        zIndex: 5,
      }}
    >
      {/* CSS Styles for Interactive Hover Effects */}
      <style>{`
        .interactive-card {
          transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.28s ease,
                      box-shadow 0.28s ease,
                      background-color 0.28s ease;
        }
        .interactive-card:hover {
          transform: translateY(-4px);
          border-color: rgba(56, 189, 248, 0.4) !important;
          box-shadow: 0 16px 35px rgba(0, 0, 0, 0.6), 0 0 25px rgba(56, 189, 248, 0.14) !important;
          background-color: rgba(16, 24, 42, 0.88) !important;
        }

        .interactive-tech-pill {
          transition: transform 0.2s ease, border-color 0.2s ease, color 0.2s ease, background-color 0.2s ease;
        }
        .interactive-tech-pill:hover {
          transform: translateY(-2px) scale(1.05);
          border-color: rgba(56, 189, 248, 0.6) !important;
          color: #38bdf8 !important;
          background-color: rgba(56, 189, 248, 0.14) !important;
        }

        .interactive-browser-frame {
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.35s ease,
                      box-shadow 0.35s ease;
        }
        .interactive-browser-frame:hover {
          border-color: rgba(56, 189, 248, 0.35) !important;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.8), 0 0 45px rgba(56, 189, 248, 0.12) !important;
        }

        .nav-project-card {
          transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.28s ease,
                      box-shadow 0.28s ease,
                      background-color 0.28s ease;
        }
        .nav-project-card:hover {
          transform: translateY(-4px);
          border-color: rgba(168, 85, 247, 0.45) !important;
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(168, 85, 247, 0.15) !important;
          background-color: rgba(18, 24, 45, 0.9) !important;
        }
        .nav-project-card:hover .arrow-left {
          transform: translateX(-5px);
        }
        .nav-project-card:hover .arrow-right {
          transform: translateX(5px);
        }

        .highlight-row {
          transition: transform 0.22s ease, color 0.22s ease;
        }
        .highlight-row:hover {
          transform: translateX(-4px);
          color: #f8fafc !important;
        }
        .highlight-row:hover .check-icon {
          transform: scale(1.18);
          background-color: rgba(56, 189, 248, 0.25) !important;
          border-color: #38bdf8 !important;
          box-shadow: 0 0 12px rgba(56, 189, 248, 0.4);
        }

        .interactive-btn {
          transition: transform 0.22s ease, box-shadow 0.22s ease, background-color 0.22s ease, filter 0.22s ease;
        }
        .interactive-btn:hover {
          transform: translateY(-2px);
          filter: brightness(1.12);
        }
      `}</style>

      {/* 1. Sleek Sticky Navigation Header */}
      <header
        className="anim-header"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backgroundColor: "rgba(10, 15, 28, 0.85)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          padding: "16px 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1160px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Back Button */}
          <Link
            href="/#work"
            className="interactive-btn"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#94a3b8",
              textDecoration: "none",
              fontSize: "13.5px",
              fontWeight: 600,
              padding: "8px 16px",
              borderRadius: "10px",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
            <span>بازگشت به پروژه‌ها</span>
          </Link>

          {/* Center Brand */}
          <Link
            href="/"
            style={{
              textDecoration: "none",
              fontSize: "18px",
              fontWeight: 800,
              letterSpacing: "-0.5px",
              color: "#ffffff",
              fontFamily: "monospace",
              transition: "color 0.2s ease",
            }}
          >
            NeoVoid<span style={{ color: "#38bdf8" }}>._</span>
          </Link>

          {/* Live URL Link (if available) */}
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="interactive-btn"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                color: "#38bdf8",
                backgroundColor: "rgba(56, 189, 248, 0.12)",
                border: "1px solid rgba(56, 189, 248, 0.35)",
                padding: "8px 16px",
                borderRadius: "10px",
                fontSize: "13px",
                fontWeight: 700,
                textDecoration: "none",
                boxShadow: "0 0 15px rgba(56, 189, 248, 0.1)",
              }}
            >
              <span>مشاهده آنلاین پروژه</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ transform: "rotate(45deg)" }}
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          ) : (
            <div style={{ width: "130px" }} />
          )}
        </div>
      </header>

      {/* 2. Main Content Body */}
      <main
        style={{
          maxWidth: "1080px",
          margin: "0 auto",
          padding: "48px 24px 100px 24px",
        }}
      >
        {/* Project Header */}
        <section style={{ marginBottom: "40px" }}>
          <div
            className="anim-hero-badge"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "5px 14px",
              borderRadius: "20px",
              backgroundColor: "rgba(56, 189, 248, 0.1)",
              border: "1px solid rgba(56, 189, 248, 0.25)",
              color: "#38bdf8",
              fontSize: "12.5px",
              fontWeight: 700,
              marginBottom: "16px",
              fontFamily: "monospace",
              boxShadow: "0 0 20px rgba(56, 189, 248, 0.15)",
            }}
          >
            <span>// {project.category} //</span>
            <span>•</span>
            <span>{project.year}</span>
          </div>

          <h1
            className="anim-title"
            style={{
              fontSize: "clamp(30px, 5vw, 50px)",
              fontWeight: 900,
              color: "#ffffff",
              margin: "0 0 10px 0",
              lineHeight: 1.25,
              fontFamily: "'Kalameh', 'Dana', sans-serif",
              textShadow: "0 4px 20px rgba(0,0,0,0.6)",
            }}
          >
            {project.title}
          </h1>

          <p
            className="anim-subtitle"
            style={{
              fontSize: "15px",
              color: "#94a3b8",
              margin: "0 0 20px 0",
              fontFamily: "monospace",
              direction: "ltr",
              textAlign: "right",
            }}
          >
            {project.englishTitle}
          </p>

          <p
            className="anim-summary"
            style={{
              fontSize: "17.5px",
              lineHeight: 1.85,
              color: "#e2e8f0",
              margin: "0 0 32px 0",
              maxWidth: "920px",
              fontWeight: 400,
            }}
          >
            {project.summary}
          </p>

          {/* Metadata Cards Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "16px",
              marginTop: "28px",
            }}
          >
            {/* 1. Role */}
            <div
              className="anim-meta-card interactive-card"
              style={{
                backgroundColor: "rgba(13, 18, 32, 0.75)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "14px",
                padding: "16px 20px",
              }}
            >
              <span style={{ fontSize: "12px", color: "#64748b", display: "block", marginBottom: "6px" }}>
                نقش و مسئولیت
              </span>
              <p style={{ margin: 0, fontSize: "14.5px", fontWeight: 700, color: "#f1f5f9" }}>
                {project.role}
              </p>
            </div>

            {/* 2. Client */}
            <div
              className="anim-meta-card interactive-card"
              style={{
                backgroundColor: "rgba(13, 18, 32, 0.75)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "14px",
                padding: "16px 20px",
              }}
            >
              <span style={{ fontSize: "12px", color: "#64748b", display: "block", marginBottom: "6px" }}>
                سفارش‌دهنده / کارفرما
              </span>
              <p style={{ margin: 0, fontSize: "14.5px", fontWeight: 700, color: "#f1f5f9" }}>
                {project.client}
              </p>
            </div>

            {/* 3. Tech Stack */}
            <div
              className="anim-meta-card interactive-card"
              style={{
                backgroundColor: "rgba(13, 18, 32, 0.75)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "14px",
                padding: "16px 20px",
                gridColumn: "span 2",
              }}
            >
              <span style={{ fontSize: "12px", color: "#64748b", display: "block", marginBottom: "8px" }}>
                تکنولوژی‌ها و ابزارهای به‌کاررفته
              </span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="interactive-tech-pill"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.06)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      borderRadius: "8px",
                      padding: "4px 10px",
                      fontSize: "12px",
                      color: "#cbd5e1",
                      fontFamily: "monospace",
                      cursor: "default",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Project Description & Narrative Section */}
        <section
          className="anim-narrative interactive-card"
          style={{
            backgroundColor: "rgba(11, 16, 28, 0.82)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "20px",
            padding: "32px 36px",
            marginBottom: "56px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
          }}
        >
          <h2
            style={{
              fontSize: "22px",
              fontWeight: 800,
              color: "#ffffff",
              margin: "0 0 16px 0",
              fontFamily: "'Kalameh', 'Dana', sans-serif",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span
              style={{
                width: "4px",
                height: "22px",
                backgroundColor: "#38bdf8",
                borderRadius: "2px",
                display: "inline-block",
                boxShadow: "0 0 10px #38bdf8",
              }}
            />
            شرح و اهداف پروژه
          </h2>

          <p
            style={{
              fontSize: "15.5px",
              lineHeight: 1.95,
              color: "#cbd5e1",
              margin: "0 0 28px 0",
              textAlign: "justify",
            }}
          >
            {project.description}
          </p>

          <h3
            style={{
              fontSize: "17px",
              fontWeight: 700,
              color: "#f8fafc",
              margin: "0 0 16px 0",
              fontFamily: "'Kalameh', 'Dana', sans-serif",
            }}
          >
            دستاوردهای کلیدی و ویژگی‌های فنی:
          </h3>

          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {project.highlights.map((item, idx) => (
              <li
                key={idx}
                className="anim-highlight-item highlight-row"
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  fontSize: "14.5px",
                  color: "#94a3b8",
                  lineHeight: 1.7,
                  cursor: "default",
                }}
              >
                <div
                  className="check-icon"
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(56, 189, 248, 0.15)",
                    border: "1px solid rgba(56, 189, 248, 0.4)",
                    color: "#38bdf8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: "2px",
                    fontSize: "11px",
                    fontWeight: "bold",
                    transition: "all 0.22s ease",
                  }}
                >
                  ✓
                </div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Visual Presentation / Screenshots Section */}
        <section style={{ marginBottom: "64px" }}>
          <div className="anim-gallery-title" style={{ textAlign: "center", marginBottom: "36px" }}>
            <span
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "#a855f7",
                letterSpacing: "2px",
                fontFamily: "monospace",
              }}
            >
              // پیش‌نمایش رابط کاربری و اسکرین‌شات‌ها //
            </span>
            <h2
              style={{
                fontSize: "clamp(24px, 4vw, 34px)",
                fontWeight: 800,
                color: "#ffffff",
                margin: "8px 0 0 0",
                fontFamily: "'Kalameh', 'Dana', sans-serif",
              }}
            >
              پیش‌نمایش بصری و طراحی صفحات
            </h2>
          </div>

          {/* Hero Mockup (if available and different from tall screenshot) */}
          {project.heroMockup && !project.screenshots.some((s) => s.src === project.heroMockup) && (
            <div
              className="anim-screenshot-card interactive-browser-frame"
              style={{
                borderRadius: "18px",
                overflow: "hidden",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                backgroundColor: "rgba(13, 17, 30, 0.9)",
                boxShadow: "0 20px 45px rgba(0, 0, 0, 0.6)",
                marginBottom: "36px",
              }}
            >
              <img
                src={project.heroMockup}
                alt={project.title}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
              />
            </div>
          )}

          {/* Screenshots List (Including full tall screenshots in browser mockups) */}
          <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
            {project.screenshots.map((s, idx) => (
              <div
                key={idx}
                className="anim-screenshot-card interactive-browser-frame"
                style={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  border: "1.5px solid rgba(255, 255, 255, 0.1)",
                  backgroundColor: "rgba(10, 14, 26, 0.94)",
                  boxShadow: "0 25px 60px rgba(0, 0, 0, 0.65), 0 0 30px rgba(56, 189, 248, 0.06)",
                }}
              >
                {/* Minimal Browser Window Header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 20px",
                    backgroundColor: "rgba(18, 24, 38, 0.96)",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                    direction: "ltr",
                  }}
                >
                  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <div
                      style={{
                        width: "11px",
                        height: "11px",
                        borderRadius: "50%",
                        backgroundColor: "#ef4444",
                      }}
                    />
                    <div
                      style={{
                        width: "11px",
                        height: "11px",
                        borderRadius: "50%",
                        backgroundColor: "#eab308",
                      }}
                    />
                    <div
                      style={{
                        width: "11px",
                        height: "11px",
                        borderRadius: "50%",
                        backgroundColor: "#22c55e",
                      }}
                    />
                  </div>

                  <div
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.45)",
                      border: "1px solid rgba(255, 255, 255, 0.06)",
                      padding: "4px 18px",
                      borderRadius: "6px",
                      fontSize: "12px",
                      color: "#94a3b8",
                      fontFamily: "monospace",
                      maxWidth: "360px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {project.liveUrl || `https://${project.slug}.preview.local`}
                  </div>

                  <a
                    href={s.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="مشاهده تصویر با ابعاد کامل"
                    className="interactive-btn"
                    style={{
                      fontSize: "11px",
                      color: "#38bdf8",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      fontFamily: "'Dana', sans-serif",
                    }}
                  >
                    <span>تصویر کامل</span>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="15 3 21 3 21 9" />
                      <polyline points="9 21 3 21 3 15" />
                      <line x1="21" y1="3" x2="14" y2="10" />
                      <line x1="3" y1="21" x2="10" y2="14" />
                    </svg>
                  </a>
                </div>

                {/* Screenshot Image */}
                <div style={{ width: "100%", backgroundColor: "#060911" }}>
                  <img
                    src={s.src}
                    alt={s.alt || project.title}
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                    }}
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Bottom Project Navigation (Prev / Next & CTA) */}
        <section
          className="anim-footer-nav"
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: "40px",
            display: "flex",
            flexDirection: "column",
            gap: "32px",
          }}
        >
          {/* Next / Prev Project Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px",
            }}
          >
            {/* Prev Project */}
            <Link
              href={`/project/${prevProject.slug}`}
              className="nav-project-card"
              style={{
                backgroundColor: "rgba(13, 18, 32, 0.75)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "16px",
                padding: "20px 24px",
                textDecoration: "none",
                color: "#ffffff",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <span
                className="arrow-left"
                style={{
                  fontSize: "12px",
                  color: "#64748b",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  transition: "transform 0.2s ease",
                }}
              >
                ← پروژه قبلی
              </span>
              <h4 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "#f1f5f9" }}>
                {prevProject.title}
              </h4>
              <span style={{ fontSize: "12px", color: "#38bdf8", fontFamily: "monospace" }}>
                {prevProject.category}
              </span>
            </Link>

            {/* Next Project */}
            <Link
              href={`/project/${nextProject.slug}`}
              className="nav-project-card"
              style={{
                backgroundColor: "rgba(13, 18, 32, 0.75)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "16px",
                padding: "20px 24px",
                textDecoration: "none",
                color: "#ffffff",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: "8px",
              }}
            >
              <span
                className="arrow-right"
                style={{
                  fontSize: "12px",
                  color: "#64748b",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  transition: "transform 0.2s ease",
                }}
              >
                پروژه بعدی →
              </span>
              <h4 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "#f1f5f9" }}>
                {nextProject.title}
              </h4>
              <span style={{ fontSize: "12px", color: "#38bdf8", fontFamily: "monospace" }}>
                {nextProject.category}
              </span>
            </Link>
          </div>

          {/* Contact CTA */}
          <div
            className="interactive-card"
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.65)",
              border: "1px solid rgba(56, 189, 248, 0.2)",
              borderRadius: "18px",
              padding: "28px 32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            <div>
              <h3
                style={{
                  margin: "0 0 6px 0",
                  fontSize: "19px",
                  fontWeight: 800,
                  color: "#ffffff",
                  fontFamily: "'Kalameh', 'Dana', sans-serif",
                }}
              >
                پروژه‌ای مشابه در نظر دارید؟
              </h3>
              <p style={{ margin: 0, fontSize: "13.5px", color: "#94a3b8" }}>
                آماده همکاری، مشاوره فنی و اجرای پروژه‌های وب و موبایل با بالاترین استانداردهای کیفی.
              </p>
            </div>

            <Link
              href="/#contact"
              className="interactive-btn"
              style={{
                backgroundColor: "#38bdf8",
                color: "#0f172a",
                padding: "12px 24px",
                borderRadius: "10px",
                fontSize: "14px",
                fontWeight: 800,
                textDecoration: "none",
                boxShadow: "0 4px 20px rgba(56, 189, 248, 0.35)",
              }}
            >
              ارتباط با من
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

