import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthContext"; // ajuste o caminho conforme a estrutura do seu projeto
import "/App.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // ⬅ usa o contexto

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        username,
        password,
      });

      if (response.data.success) {
        login(response.data.username);      
        navigate("/admin/dashboard", { replace: true });
      } else {
        setError("Credenciais inválidas");
      }
    } catch (err) {
      setError("Erro ao tentar fazer login");
    }
  };

  return (
    <div className="login-box">
      <h1>Login do administrador</h1>
      <form onSubmit={handleLogin}>
        <label>Usuário:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label>Senha:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;