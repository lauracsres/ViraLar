import React, { useState } from "react";
import Select from "react-select";
import "/App.css";

const behaviorOptions = [
  { value: "pular", label: "Pular" },
  { value: "latir", label: "Latir" },
  { value: "morder", label: "Mordiscar" },
  { value: "puxar_guia", label: "Puxar na guia" },
  { value: "reativo_guia", label: "Reativo na guia" },
  { value: "ansiedade", label: "Ansiedade" },
  { value: "nenhum", label: "Não me preocupo com nenhum desses comportamentos" },
];

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "#fff", 
    border: state.isFocused ? "2px solid #6200ea" : "2px solid #ddd;", 
    boxShadow: state.isFocused ? "0 0 5px rgba(0, 123, 255, 0.5)" : "none",
    "&:hover": {
      border: "2px solid #6200ea", // Borda ao passar o mouse
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#4b2e63" : state.isFocused ? "#4b2e63" : "#fff",
    color: state.isSelected ? "#fff" : "#333",
    "&:hover": {
      backgroundColor: "#4b2e63",
      color: "#fff",
    },
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "rgba(78, 45, 105, 0.20)",
    color: "#fff",
    borderRadius: "5px",
    padding: "3px 5px",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "#fff",
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: "#fff",
    "&:hover": {
      backgroundColor: "rgba(78, 45, 105, 0.20)",
      color: "#fff",
    },
  }),
};

const AdoptionModal = ({ animal, onClose }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nome_adotante: "",
    sobrenome: "",
    email: "",
    endereco: "",
    telefone: "",
    trabalho: "",
    viagem: "",
    filhos: "",
    outros_animais: "",
    sexo_animal: "",
    castrado: "",
    dormir: "",
    outra_info: "",
    experiencia_caes: "",
    problemas_comportamento: [],
    tempo_adaptacao: "",
    acordo_familia: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBehaviorChange = (selectedOptions) => {
    setFormData({ ...formData, problemas_comportamento: selectedOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const requestData = {
      animal_id: animal.id, // Certifique-se de que está pegando o ID correto
      nome_adotante: formData.nome_adotante,
      sobrenome: formData.sobrenome,
      email: formData.email,
      endereco: formData.endereco,
      telefone: formData.telefone,
      trabalho: formData.trabalho,
      viagem: formData.viagem,
      filhos: formData.filhos,
      outros_animais: formData.outros_animais,
      sexo_animal: formData.sexo_animal,
      castrado: formData.castrado,
      dormir: formData.dormir,
      outra_info: formData.outra_info,
      experiencia_caes: formData.experiencia_caes,
      problemas_comportamento: formData.problemas_comportamento.map(p => p.value), // Corrigido para enviar apenas os valores
      tempo_adaptacao: formData.tempo_adaptacao,
      acordo_familia: formData.acordo_familia
    };
  
    console.log("📨 Dados enviados:", requestData);
  
    try {
      const response = await fetch("http://localhost:5000/api/adocao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });
  
      const data = await response.json();
      console.log("📩 Resposta do servidor:", data);
  
      if (!data.success) {
        throw new Error(data.message);
      }
  
      alert("Solicitação enviada com sucesso!");
      closeModal();
    } catch (error) {
      console.error("❌ Erro ao enviar solicitação:", error);
      alert(error.message);
    }
  };

  const [isOpen, setIsOpen] = useState(true);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content2">
        <button className="close-button" onClick={onClose}>X</button>

        {!showForm ? (
          <>
            <div className="modal-header"><h1>Perfil</h1></div>
            <div className="animal-details-container">
              <img src={`http://localhost:5000/api/uploads/${animal.imagem_url.split('/').pop()}`} className="animal-image2" />              <div className="animal-info">
                <h2>{animal.nome}</h2>
                <p>{animal.sexo}, {animal.idade} ano(s), {animal.porte}, {animal.raca}</p>
                <p>Comportamento: {animal.temperamento}</p>
                <p style={{ whiteSpace: "pre-line" }}>{animal.historico_saude}</p>

                <button className="adopt-button" onClick={() => setShowForm(true)}>
                  ADOTAR
                </button>
              </div>
            </div>
          </>
        ) : (
          <form className="adoption-form" onSubmit={handleSubmit}>
            <label>Nome</label>
            <input type="text" name="nome_adotante" required onChange={handleChange} />

            <label>Sobrenome</label>
            <input type="text" name="sobrenome" required onChange={handleChange} />

            <label>E-mail</label>
            <input type="email" name="email" required onChange={handleChange} />

            <label>Endereço</label>
            <input type="text" name="endereco" required onChange={handleChange} />

            <label>Telefone</label>
            <input type="tel" name="telefone" required onChange={handleChange} />

            <label>Você trabalha?</label>
            <input type="text" name="trabalho" required onChange={handleChange} />

            <label>Você tem alguma viagem planejada? Se sim, levou isso em consideração ao adotar seu novo pet?</label>
            <input type="text" name="viagem" required onChange={handleChange} />

            <label>Você tem filhos?</label>
            <input type="text" name="filhos" required onChange={handleChange} />

            <label>Você tem outros animais?</label>
            <input type="text" name="outros_animais" required onChange={handleChange} />

            <label>Seu animal é macho ou fêmea?</label>
            <input type="text" name="sexo_animal" required onChange={handleChange} />

            <label>Seu animal é castrado?</label>
            <input type="text" name="castrado" required onChange={handleChange} />

            <label>Onde você pretende deixar o animal dormir à noite?</label>
            <input type="text" name="dormir" required onChange={handleChange} />

            <label>Alguma outra informação para apoiar sua solicitação</label>
            <textarea name="outra_info" required onChange={handleChange}></textarea>

            <label>Você tem experiência com cães?</label>
            <select name="experiencia_caes" required onChange={handleChange}>
              <option value="">Selecione</option>
              <option value="avancado">Avançado (treinador/comportamentalista)</option>
              <option value="sempre_teve">Sim (sempre tive um cão)</option>
              <option value="cresceu_com_caes">Sim (cresci com cães)</option>
              <option value="primeira_vez">Não (primeira vez como dono de um cão)</option>
            </select>

            <label>Você teria problemas com algum dos seguintes comportamentos? (um ou mais)</label>
            <Select
              options={behaviorOptions}
              isMulti
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              onChange={handleBehaviorChange}
              value={formData.problemas_comportamento}
              placeholder="Selecione..."
              styles={customStyles} // Aplica os estilos personalizados
            />

            <label>Cães recém-recolocados podem levar até 3 meses para se adaptar. Você está disposto a dar esse tempo para o cão se ajustar?</label>
            <select name="tempo_adaptacao" required onChange={handleChange}>
              <option value="">Selecione</option>
              <option value="sim">Sim</option>
              <option value="nao">Não</option>
            </select>

            <label>Todos os membros da casa estão de acordo com esta adoção?</label>
            <select name="acordo_familia" required onChange={handleChange}>
              <option value="">Selecione</option>
              <option value="sim">Sim</option>
              <option value="nao">Não</option>
            </select>

            <div className="form-buttons">
              <button type="submit" className="adopt-btn">
                APLICAR PARA ADOÇÃO
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdoptionModal;