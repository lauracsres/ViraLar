import React, { useState, useEffect } from "react";
import axios from "axios";
import "/App.css";

const AdoptionTracking = () => {
  const [adoptions, setAdoptions] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/adoptions")
      .then((response) => setAdoptions(response.data))
      .catch((error) => console.error("Erro ao buscar adoções finalizadas:", error));
  }, []);

  return (
    <div className="tracking-container">
      <h1>Acompanhamento de Adoções</h1>
      
      <div className="adoptions-list">
        {adoptions.length > 0 ? (
          adoptions.map((adoption) => (
            <div key={adoption.id} className="adoption-card">
              <h3>{adoption.pet_name}</h3>
              <p><strong>Adotante:</strong> {adoption.adopter_name}</p>
              <p><strong>Data da Adoção:</strong> {new Date(adoption.adoption_date).toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          <p>Nenhuma adoção finalizada encontrada.</p>
        )}
      </div>
    </div>
  );
};

export default AdoptionTracking;