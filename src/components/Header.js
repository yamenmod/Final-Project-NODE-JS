import React from "react";

function Header({ setPage, user }) {
  return (
    <header
      style={{
        background: "linear-gradient(135deg, #0a3d62 0%, #0084b4 100%)",
        color: "white",
        padding: "20px",
        boxShadow: "0 4px 12px rgba(10, 61, 98, 0.2)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h2
          style={{ margin: "0 0 10px 0", fontSize: "28px", fontWeight: "700" }}
        >
          🌊 Surf Spot Tracker
        </h2>
        <p style={{ margin: "0 0 15px 0", fontSize: "16px", opacity: "0.9" }}>
          Welcome, {user}
        </p>
        <nav style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={() => setPage("home")}
            style={{
              padding: "8px 16px",
              background: "rgba(255,255,255,0.2)",
              color: "white",
              border: "2px solid rgba(255,255,255,0.5)",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "600",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.background = "rgba(255,255,255,0.3)";
              e.target.style.borderColor = "white";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "rgba(255,255,255,0.2)";
              e.target.style.borderColor = "rgba(255,255,255,0.5)";
            }}
          >
            Home
          </button>
          <button
            onClick={() => setPage("spots")}
            style={{
              padding: "8px 16px",
              background: "rgba(255,255,255,0.2)",
              color: "white",
              border: "2px solid rgba(255,255,255,0.5)",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "600",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.background = "rgba(255,255,255,0.3)";
              e.target.style.borderColor = "white";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "rgba(255,255,255,0.2)";
              e.target.style.borderColor = "rgba(255,255,255,0.5)";
            }}
          >
            Surf Spots
          </button>
          <button
            onClick={() => setPage("login")}
            style={{
              padding: "8px 16px",
              background: "#d32f2f",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "600",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.background = "#b71c1c";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "#d32f2f";
              e.target.style.transform = "translateY(0)";
            }}
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
