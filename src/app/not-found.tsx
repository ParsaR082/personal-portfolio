import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#ffffff",
        textAlign: "center",
        direction: "rtl",
        fontFamily: "'Dana', sans-serif",
        padding: "40px 20px",
      }}
    >
      <h1
        style={{
          fontSize: "80px",
          fontWeight: 900,
          margin: "0 0 16px 0",
          color: "#67e8f9",
          fontFamily: "'Kalameh', sans-serif",
        }}
      >
        ۴۰۴
      </h1>
      <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>
        صفحه مورد نظر یافت نشد
      </h2>
      <p style={{ color: "#94a3b8", marginBottom: "32px", maxWidth: "400px" }}>
        متأسفانه صفحه‌ای که به دنبال آن بودید وجود ندارد یا منتقل شده است.
      </p>
      <Link
        href="/"
        style={{
          padding: "12px 28px",
          backgroundColor: "#9b37ff",
          color: "#ffffff",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: 600,
          boxShadow: "0 4px 15px rgba(155, 55, 255, 0.4)",
        }}
      >
        بازگشت به صفحه اصلی
      </Link>
    </div>
  );
}

