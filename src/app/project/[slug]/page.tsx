import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PROJECT_DETAILS_DATA, ALL_PROJECT_SLUGS } from "@/data/projectDetailsData";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return ALL_PROJECT_SLUGS.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECT_DETAILS_DATA[slug];
  if (!project) return { title: "پروژه یافت نشد - تامال سن" };
  return {
    title: `${project.title} | تامال سن`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = PROJECT_DETAILS_DATA[slug];

  if (!project) {
    notFound();
  }

  // Circular navigation for previous and next projects
  const currentIndex = ALL_PROJECT_SLUGS.indexOf(slug);
  const prevSlug =
    currentIndex > 0
      ? ALL_PROJECT_SLUGS[currentIndex - 1]
      : ALL_PROJECT_SLUGS[ALL_PROJECT_SLUGS.length - 1];
  const nextSlug =
    currentIndex < ALL_PROJECT_SLUGS.length - 1
      ? ALL_PROJECT_SLUGS[currentIndex + 1]
      : ALL_PROJECT_SLUGS[0];

  const prevProject = PROJECT_DETAILS_DATA[prevSlug];
  const nextProject = PROJECT_DETAILS_DATA[nextSlug];

  return (
    <div
      style={{
        minHeight: "100vh",
        color: "#ffffff",
        direction: "rtl",
        fontFamily: "'Dana', sans-serif",
        position: "relative",
        zIndex: 5,
      }}
    >
      {/* 1. Sleek Sticky Navigation Header */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backgroundColor: "rgba(10, 15, 28, 0.82)",
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
              transition: "all 0.2s ease",
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
            }}
          >
            TamalSen<span style={{ color: "#38bdf8" }}>._</span>
          </Link>

          {/* Live URL Link (if available) */}
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
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
                transition: "all 0.2s ease",
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
            }}
          >
            <span>// {project.category} //</span>
            <span>•</span>
            <span>{project.year}</span>
          </div>

          <h1
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
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.06)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      borderRadius: "8px",
                      padding: "4px 10px",
                      fontSize: "12px",
                      color: "#cbd5e1",
                      fontFamily: "monospace",
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
          style={{
            backgroundColor: "rgba(11, 16, 28, 0.8)",
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
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  fontSize: "14.5px",
                  color: "#94a3b8",
                  lineHeight: 1.7,
                }}
              >
                <div
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
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
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
                style={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  border: "1.5px solid rgba(255, 255, 255, 0.1)",
                  backgroundColor: "rgba(10, 14, 26, 0.92)",
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
                    backgroundColor: "rgba(18, 24, 38, 0.95)",
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
                transition: "all 0.25s ease",
              }}
            >
              <span style={{ fontSize: "12px", color: "#64748b" }}>← پروژه قبلی</span>
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
                transition: "all 0.25s ease",
              }}
            >
              <span style={{ fontSize: "12px", color: "#64748b" }}>پروژه بعدی →</span>
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
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.6)",
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
              style={{
                backgroundColor: "#38bdf8",
                color: "#0f172a",
                padding: "12px 24px",
                borderRadius: "10px",
                fontSize: "14px",
                fontWeight: 800,
                textDecoration: "none",
                boxShadow: "0 4px 20px rgba(56, 189, 248, 0.35)",
                transition: "all 0.2s ease",
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
