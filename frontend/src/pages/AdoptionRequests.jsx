import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "/App.css";

const AdoptionRequests = () => {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("Todas"); // Inicia com "Todas"
  const [selectedRequest, setSelectedRequest] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/adocoes")
      .then((response) => {
        console.log(response.data);  // Adicione este log para verificar a resposta
        setRequests(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar solicitações:", error);
      });
  }, []);
  

  // Filtra as solicitações de acordo com o status
  const filteredRequests = requests.filter((request) => 
    filter === "Todas" || request.status === filter
  );

  // Funções de aprovação e rejeição
  const handleApprove = (id) => {
    axios.put(`http://localhost:5000/api/adocoes/${id}`, { status: "Aprovada" })
      .then(() => {
        setRequests(prevRequests => prevRequests.map(request =>
          request.id === id ? { ...request, status: "Aprovada" } : request
        ));
      })
      .catch((error) => console.error("Erro ao aprovar solicitação:", error));
  };

  const handleReject = (id) => {
    axios.put(`http://localhost:5000/api/adocoes/${id}`, { status: "Rejeitada" })
      .then(() => {
        setRequests(prevRequests => prevRequests.map(request =>
          request.id === id ? { ...request, status: "Rejeitada" } : request
        ));
      })
      .catch((error) => console.error("Erro ao reprovar solicitação:", error));
  };

  return (
    <div className="containers-admin">
      <button type="button" className="back-btn" onClick={() => navigate("/admin/dashboard")}>
        Voltar
      </button>      
      <h2>Solicitações de Adoção</h2>
      
      {/* Filtro de Status */}
      <div className="filter-container">
        {["Todas", "Pendente", "Nova", "Aprovada", "Rejeitada"].map((status) => (
          <button
            key={status}
            className={filter === status ? "active" : ""}
            onClick={() => setFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>
      
      {/* Lista de Solicitações */}
      <div className="requests-container">
        {filteredRequests.length > 0 ? (
          filteredRequests.map((request) => (
            <div key={request.id} className="request-card">
              <h3>{request.animal_nome}</h3>
              <p><strong>Adotante:</strong> {request.nome_adotante} {request.sobrenome}</p>
              <p><strong>Status:</strong> {request.status}</p>
              
              {/* Botão para ver detalhes */}
              <button className="adopt-button" onClick={() => setSelectedRequest(request)}>Ver Detalhes</button>

              {/* Exibe os botões de Aprovar/Rejeitar apenas se o status não for "Aprovada" ou "Rejeitada" */}
              {request.status !== "Aprovada" && request.status !== "Rejeitada" && (
                <>
                  <button className="approve-btn" onClick={() => handleApprove(request.id)}>Aprovar</button>
                  <button className="reject-btn" onClick={() => handleReject(request.id)}>Reprovar</button>
                </>
              )}
            </div>
          ))
        ) : (
          <p>Nenhuma solicitação encontrada.</p>
        )}
      </div>

      {/* Modal de Detalhes */}
      {selectedRequest && (
        <div className="modal">
          <div className="modal-content">
            <h3>Detalhes da Solicitação</h3>
            <button type="button" className="back-bttn" onClick={() => setSelectedRequest(null)}>
              Voltar
            </button> 
            <p><strong>Nome do Animal:</strong> {selectedRequest.animal_nome}</p>
            <p><strong>Adotante:</strong> {selectedRequest.nome_adotante} {selectedRequest.sobrenome}</p>
            <p><strong>Email:</strong> {selectedRequest.email}</p>
            <p><strong>Endereço:</strong> {selectedRequest.endereco}</p>
            <p><strong>Telefone:</strong> {selectedRequest.telefone}</p>
            <p><strong>Trabalho:</strong> {selectedRequest.trabalho}</p>
            <p><strong>Viagem:</strong> {selectedRequest.viagem}</p>
            <p><strong>Filhos:</strong> {selectedRequest.filhos}</p>
            <p><strong>Tem outros animais?</strong> {selectedRequest.outros_animais}</p>
            <p><strong>Sexo do animal:</strong> {selectedRequest.sexo_animal}</p>
            <p><strong>É castrado?</strong> {selectedRequest.castrado}</p>
            <p><strong>Onde o animal irá dormir?</strong> {selectedRequest.dormir}</p>
            <p><strong>Outras informações:</strong> {selectedRequest.outra_info}</p>
            <p><strong>Experiência com cães:</strong> {selectedRequest.experiencia_caes}</p>
            <p><strong>Problemas de comportamento:</strong> {selectedRequest.problemas_comportamento}</p>
            <p><strong>Está de acordo com o tempo de adaptação do animal?</strong> {selectedRequest.tempo_adaptacao}</p>
            <p><strong>A família está de acordo com a adoção?</strong> {selectedRequest.acordo_familia}</p>
            <p><strong>Status:</strong> {selectedRequest.status}</p>

            {/* Exibe os botões de Aprovar/Rejeitar apenas se o status não for "Aprovada" ou "Rejeitada" */}
            {selectedRequest.status !== "Aprovada" && selectedRequest.status !== "Rejeitada" && (
              <>
                <button className="approve-btn" onClick={() => handleApprove(selectedRequest.id)}>Aprovar</button>
                <button className="reject-btn" onClick={() => handleReject(selectedRequest.id)}>Reprovar</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdoptionRequests;