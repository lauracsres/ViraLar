import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AdoptionModal from "../components/AdoptionModal";
import "/App.css";

const AnimalList = () => {
  const location = useLocation();
  const [animals, setAnimals] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Se vieram animais filtrados via navigate
    if (location.state && location.state.animals) {
      setAnimals(location.state.animals);
    } else {
      // Senão, carrega todos do back-end
      const fetchAnimals = async () => {
        try {
          const response = await fetch("http://localhost:5000/api/animais");
          if (!response.ok) {
            throw new Error("Erro ao buscar os animais");
          }
          const data = await response.json();
          setAnimals(data);
        } catch (error) {
          console.error("Erro:", error);
        }
      };

      fetchAnimals();
    }
  }, [location]);

  const navigate = useNavigate();

  const openModal = (animal) => {
    setSelectedAnimal(animal);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedAnimal(null);
  };

  return (
    <div className="box-pages">
      <button type="button" className="backbtn" onClick={() => navigate(-1)}>
        Voltar
      </button>   
      <h1>Listagem de Animais</h1>

      <div className="animal-grid">
        {animals.map((animal) => (
          <div key={animal.id} className="animal-card">
            <img
              src={`http://localhost:5000/api/uploads/${animal.imagem_url.split("/").pop()}`}
              className="animal-image"
              alt={animal.nome}
            />
            <div className="animal-info">
              <h2>{animal.nome}</h2>
              <p>
                {animal.sexo}, {animal.idade} ano(s), porte {animal.porte},{" "}
                {animal.temperamento}
              </p>
              <button className="adopt-button" onClick={() => openModal(animal)}>
                MAIS INFORMAÇÕES!
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && selectedAnimal && (
        <AdoptionModal animal={selectedAnimal} onClose={closeModal} />
      )}
    </div>
  );
};

export default AnimalList;
