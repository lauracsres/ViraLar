import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redireciona para a página de login
  };

  return (
    <nav>
      <header className="header" style={{ border: "1px solid #eee" }}>
        <a href="/">
          <div className="logo"></div>
        </a>
      </header>

      <header className="headerLinks">
        {isAuthenticated ? (
          <>
            <button className="adminBtn" onClick={() => navigate("/admin/dashboard")}>
              Painel do administrador
            </button>

            <button className="loginBtn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <button className="loginBtn">
            <a href="/login" className="cadastro">Login</a>
          </button>
        )}
      </header>
    </nav>
  );
}