import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";

function SurfSpots({ user }) {
  const [spots, setSpots] = useState([]);
  const [form, setForm] = useState({
    spot_name: "",
    difficulty: "",
    type: "",
    location: "",
  });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const loadSpots = async () => {
    const res = await axios.get(`http://localhost:5000/spots/${user.id}`);
    setSpots(res.data);
  };

  useEffect(() => {
    loadSpots();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleSubmit = async () => {
    setError("");

    // make sure all fields have something
    if (!form.spot_name || !form.difficulty || !form.type || !form.location) {
      setError("⚠️ You cannot leave any fields empty!");
      return;
    }

    if (editId) {
      await axios.put(`http://localhost:5000/spots/${editId}/${user.id}`, form);
    } else {
      await axios.post("http://localhost:5000/spots", {
        ...form,
        user_id: user.id,
      });
    }

    setForm({ spot_name: "", difficulty: "", type: "", location: "" });
    setEditId(null);
    setError("");
    loadSpots();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/spots/${id}/${user.id}`);
    loadSpots();
  };

  const handleEdit = (spot) => {
    setForm({
      spot_name: spot.spot_name,
      difficulty: spot.difficulty,
      type: spot.type,
      location: spot.location,
    });
    setEditId(spot.id);
  };

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
            maxWidth: "1000px",
            margin: "30px auto",
            padding: "35px",
            background: "white",
            borderRadius: "12px",
            boxShadow: "0 12px 40px rgba(10, 61, 98, 0.15)",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "30px",
            }}
          >
            <h2
              style={{
                color: "#0a3d62",
                fontSize: "28px",
                fontWeight: "700",
                margin: "0",
              }}
            >
              🌊 {user.username}'s Surf Spots
            </h2>
            <button
              onClick={() => {
                localStorage.removeItem("user");
                window.location.reload();
              }}
              style={{
                padding: "10px 20px",
                background: "#f0f0f0",
                color: "#d32f2f",
                border: "2px solid #d32f2f",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "700",
                fontSize: "14px",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.target.style.background = "#d32f2f";
                e.target.style.color = "white";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "#f0f0f0";
                e.target.style.color = "#d32f2f";
                e.target.style.transform = "translateY(0)";
              }}
            >
              Logout
            </button>
          </div>

          {error && (
            <div
              style={{
                padding: "14px 18px",
                background: "#ffebee",
                border: "2px solid #d32f2f",
                borderRadius: "8px",
                color: "#d32f2f",
                marginBottom: "24px",
                fontWeight: "600",
                textAlign: "center",
                fontSize: "15px",
              }}
            >
              {error}
            </div>
          )}

          <div
            style={{
              marginBottom: "28px",
              padding: "20px",
              background: "#f8f9fa",
              borderRadius: "8px",
              border: "1px solid #e0e0e0",
            }}
          >
            <p
              style={{
                margin: "0 0 16px 0",
                fontSize: "13px",
                color: "#666",
                fontWeight: "600",
                textTransform: "uppercase",
              }}
            >
              Add New Surf Spot
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                gap: "12px",
              }}
            >
              <input
                placeholder="Spot name"
                style={{
                  padding: "12px 14px",
                  borderRadius: "6px",
                  border: "2px solid #e0e0e0",
                  fontSize: "14px",
                  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                  transition: "border-color 0.3s ease",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#0084b4")}
                onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
                value={form.spot_name}
                onChange={(e) =>
                  setForm({ ...form, spot_name: e.target.value })
                }
              />
              <input
                placeholder="Difficulty"
                style={{
                  padding: "12px 14px",
                  borderRadius: "6px",
                  border: "2px solid #e0e0e0",
                  fontSize: "14px",
                  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                  transition: "border-color 0.3s ease",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#0084b4")}
                onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
                value={form.difficulty}
                onChange={(e) =>
                  setForm({ ...form, difficulty: e.target.value })
                }
              />
              <input
                placeholder="Type"
                style={{
                  padding: "12px 14px",
                  borderRadius: "6px",
                  border: "2px solid #e0e0e0",
                  fontSize: "14px",
                  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                  transition: "border-color 0.3s ease",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#0084b4")}
                onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              />
              <input
                placeholder="Location"
                style={{
                  padding: "12px 14px",
                  borderRadius: "6px",
                  border: "2px solid #e0e0e0",
                  fontSize: "14px",
                  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                  transition: "border-color 0.3s ease",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#0084b4")}
                onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
              <button
                onClick={handleSubmit}
                style={{
                  padding: "12px 24px",
                  background:
                    "linear-gradient(135deg, #0084b4 0%, #00a8e8 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "700",
                  fontSize: "14px",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow =
                    "0 6px 16px rgba(0, 132, 180, 0.3)";
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "none";
                }}
              >
                {editId ? "Update" : "Add"}
              </button>
            </div>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "14px",
              }}
            >
              <thead>
                <tr
                  style={{
                    background:
                      "linear-gradient(135deg, #0a3d62 0%, #0084b4 100%)",
                    color: "white",
                  }}
                >
                  <th
                    style={{
                      padding: "16px",
                      textAlign: "left",
                      fontWeight: "700",
                      fontSize: "15px",
                    }}
                  >
                    Spot Name
                  </th>
                  <th
                    style={{
                      padding: "16px",
                      textAlign: "left",
                      fontWeight: "700",
                      fontSize: "15px",
                    }}
                  >
                    Difficulty
                  </th>
                  <th
                    style={{
                      padding: "16px",
                      textAlign: "left",
                      fontWeight: "700",
                      fontSize: "15px",
                    }}
                  >
                    Type
                  </th>
                  <th
                    style={{
                      padding: "16px",
                      textAlign: "left",
                      fontWeight: "700",
                      fontSize: "15px",
                    }}
                  >
                    Location
                  </th>
                  <th
                    style={{
                      padding: "16px",
                      textAlign: "center",
                      fontWeight: "700",
                      fontSize: "15px",
                    }}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {spots.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      style={{
                        padding: "30px",
                        textAlign: "center",
                        color: "#999",
                      }}
                    >
                      No surf spots yet. Add one to get started! 🏄
                    </td>
                  </tr>
                ) : (
                  spots.map((spot, index) => (
                    <tr
                      key={spot.id}
                      style={{
                        background: index % 2 === 0 ? "#f8f9fa" : "#ffffff",
                        borderBottom: "1px solid #e0e0e0",
                        transition: "background-color 0.3s ease",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor = "#e3f2fd")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          index % 2 === 0 ? "#f8f9fa" : "#ffffff")
                      }
                    >
                      <td
                        style={{
                          padding: "14px 16px",
                          color: "#0a3d62",
                          fontWeight: "600",
                        }}
                      >
                        {spot.spot_name}
                      </td>
                      <td style={{ padding: "14px 16px", color: "#1e3a5a" }}>
                        {spot.difficulty}
                      </td>
                      <td style={{ padding: "14px 16px", color: "#1e3a5a" }}>
                        {spot.type}
                      </td>
                      <td style={{ padding: "14px 16px", color: "#1e3a5a" }}>
                        {spot.location}
                      </td>
                      <td style={{ padding: "14px 16px", textAlign: "center" }}>
                        <button
                          onClick={() => handleEdit(spot)}
                          style={{
                            padding: "8px 14px",
                            background: "#ffc107",
                            color: "#000000",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            marginRight: "8px",
                            fontWeight: "600",
                            fontSize: "13px",
                            transition: "all 0.3s ease",
                          }}
                          onMouseOver={(e) => {
                            e.target.style.background = "#ffb300";
                            e.target.style.transform = "scale(1.05)";
                          }}
                          onMouseOut={(e) => {
                            e.target.style.background = "#ffc107";
                            e.target.style.transform = "scale(1)";
                          }}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDelete(spot.id)}
                          style={{
                            padding: "8px 14px",
                            background: "#d32f2f",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            color: "white",
                            fontWeight: "600",
                            fontSize: "13px",
                            transition: "all 0.3s ease",
                          }}
                          onMouseOver={(e) => {
                            e.target.style.background = "#b71c1c";
                            e.target.style.transform = "scale(1.05)";
                          }}
                          onMouseOut={(e) => {
                            e.target.style.background = "#d32f2f";
                            e.target.style.transform = "scale(1)";
                          }}
                        >
                          🗑️ Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SurfSpots;
