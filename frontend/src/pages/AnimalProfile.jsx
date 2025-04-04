import React from "react";
import { useParams } from "react-router-dom";

const AnimalProfile = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Perfil do Animal {id}</h2>
      <button>Adotar</button>
    </div>
  );
};

export default AnimalProfile;
