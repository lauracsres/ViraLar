import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "/App.css";

const AnimalForm = () => {
  const navigate = useNavigate(); // Hook para navegação

  const [formData, setFormData] = useState({
    nome: "",
    especie: "cachorro",
    raca: "",
    idade: "",
    sexo: "Macho",
    porte: "Pequeno",
    cor: "",
    temperamento: "",
    historico_saude: "",
    imagem: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, imagem: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const dataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      dataToSend.append(key, value);
    });
  
    try {
      const response = await axios.post("http://localhost:5000/api/animais", dataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      alert("Animal cadastrado com sucesso!");
  
      setFormData({
        nome: "",
        especie: "cachorro",
        raca: "",
        idade: "",
        sexo: "Macho",
        porte: "Pequeno",
        cor: "",
        temperamento: "",
        historico_saude: "",
        imagem: null,
      });
    } catch (error) {
      alert("Erro ao cadastrar o animal.");
    }
  };

  return (
    <div className="containers-admin">
      <button type="button" className="back-btn" onClick={() => navigate("/admin/dashboard")}>
            Voltar
          </button>
      <h2>Cadastro de animal</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-column">
            <label>Nome do animal</label>
            <input type="text" name="nome" value={formData.nome} onChange={handleChange} placeholder="Insira o nome do animal" required />

            <label>Espécie</label>
            <select name="especie" value={formData.especie} onChange={handleChange}>
              <option value="cachorro">Cachorro</option>
              <option value="gato">Gato</option>
            </select>

            <label>Raça</label>
            <input type="text" name="raca" value={formData.raca} onChange={handleChange} placeholder="SRD, Poodle..." />

            <label>Idade</label>
            <input type="number" name="idade" value={formData.idade} onChange={handleChange} placeholder="Em anos" />

            <label>Sexo</label>
            <select name="sexo" value={formData.sexo} onChange={handleChange}>
              <option value="Macho">Macho</option>
              <option value="Fêmea">Fêmea</option>
            </select>

            <label>Porte</label>
            <select name="porte" value={formData.porte} onChange={handleChange}>
              <option value="Pequeno">Pequeno</option>
              <option value="Médio">Médio</option>
              <option value="Grande">Grande</option>
            </select>
          </div>

          <div className="form-column">
            <label>Cor</label>
            <input type="text" name="cor" value={formData.cor} onChange={handleChange} placeholder="Branco, preto, bicolor..." />

            <label>Temperamento</label>
            <input type="text" name="temperamento" value={formData.temperamento} onChange={handleChange} placeholder="Dócil, brincalhão, tímido..." />

            <label>Histórico de saúde</label>
            <textarea name="historico_saude" value={formData.historico_saude} onChange={handleChange} placeholder="Vacinas, castração, doenças..."></textarea>

            <label>Imagens do animal</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </div>
        </div>

        <div className="btn-container">
          <button type="submit" className="submit-btn">Cadastrar</button>
        </div>
      </form>
    </div>
  );
};

export default AnimalForm;