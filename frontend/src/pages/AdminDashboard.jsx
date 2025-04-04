import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "/App.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    const storedAdmin = localStorage.getItem("adminName");
    if (storedAdmin) {
      setAdminName(storedAdmin);
    } else {
      navigate("/login");
    }
  }, [navigate]);
  

  const handleLogout = () => {
    localStorage.removeItem("adminName");
    setAdminName("");
    navigate("/login");
  };

  return (
    <div className="containers-admin">
      <button type="button" className="back-btn" onClick={() => navigate("/")}>
            Voltar
          </button>     
      <h2>Painel do Administrador</h2>
      {adminName ? (
        <>
          <div className="dashboard-buttons">
            <button className="dashboard-button" onClick={() => navigate("/admin/animal-form")}>Cadastrar Animal</button>
            <button className="dashboard-button" onClick={() => navigate("/admin/adoption-requests")}>Solicitações de Adoção</button>
          </div>
        </>
      ) : (
        <p>Redirecionando para login...</p>
      )}
    </div>
  );
};

export default AdminDashboard;
