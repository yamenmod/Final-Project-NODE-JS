import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

function Home({ user }) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(135deg, #e3f2fd 0%, #b3e5fc 100%)",
      }}
    >
      <div style={{ flex: 1, padding: "20px" }}>
        <div
          style={{
            maxWidth: "600px",
            margin: "60px auto",
            padding: "40px",
            background: "white",
            borderRadius: "12px",
            boxShadow: "0 12px 40px rgba(10, 61, 98, 0.15)",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "48px", marginBottom: "20px" }}>🏄</div>
          <h2
            style={{
              color: "#0a3d62",
              fontSize: "28px",
              fontWeight: "700",
              marginBottom: "10px",
            }}
          >
            Welcome, {user.username}!
          </h2>
          <p
            style={{ color: "#1e3a5a", fontSize: "16px", marginBottom: "30px" }}
          >
            Ready to catch some waves?
          </p>

          <button
            onClick={() => navigate("/spots")}
            style={{
              padding: "14px 32px",
              marginBottom: "15px",
              background: "linear-gradient(135deg, #0084b4 0%, #00a8e8 100%)",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "700",
              fontSize: "15px",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              width: "100%",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 8px 20px rgba(0, 132, 180, 0.3)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "none";
            }}
          >
            🌊 View My Surf Spots
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("user");
              window.location.reload();
            }}
            style={{
              padding: "14px 32px",
              background: "#f0f0f0",
              color: "#d32f2f",
              border: "2px solid #d32f2f",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "700",
              fontSize: "15px",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              width: "100%",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.background = "#d32f2f";
              e.target.style.color = "white";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "#f0f0f0";
              e.target.style.color = "#d32f2f";
            }}
          >
            Logout
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
