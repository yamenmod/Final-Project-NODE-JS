import React from "react";

function Welcome({ onGetStarted }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0a3d62 0%, #0084b4 50%, #00bfff 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: "20px",
      }}
    >
      <div
        style={{
          textAlign: "center",
          maxWidth: "600px",
        }}
      >
        <div
          style={{
            fontSize: "80px",
            marginBottom: "30px",
            animation: "wave 1s ease-in-out infinite",
          }}
        >
          🌊
        </div>

        <h1
          style={{
            fontSize: "48px",
            fontWeight: "900",
            color: "white",
            margin: "0 0 20px 0",
            textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
          }}
        >
          Welcome to Surf Spots
        </h1>

        <p
          style={{
            fontSize: "24px",
            color: "rgba(255,255,255,0.9)",
            margin: "0 0 40px 0",
            fontWeight: "300",
            lineHeight: "1.6",
          }}
        >
          Discover and track your favorite surf spots around the world
        </p>

        <button
          onClick={onGetStarted}
          style={{
            padding: "16px 48px",
            fontSize: "18px",
            fontWeight: "700",
            background: "white",
            color: "#0084b4",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            transition: "all 0.3s ease",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
          onMouseOver={(e) => {
            e.target.style.transform = "translateY(-3px)";
            e.target.style.boxShadow = "0 12px 32px rgba(0,0,0,0.3)";
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 8px 24px rgba(0,0,0,0.2)";
          }}
        >
          Get Started 🏄
        </button>

        <style>{`
          @keyframes wave {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }
        `}</style>
      </div>
    </div>
  );
}

export default Welcome;
