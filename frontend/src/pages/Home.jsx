import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [showChecklistPopup, setShowChecklistPopup] = useState(false);
  const [showFaqPopup, setShowFaqPopup] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    console.log("Buscando por:", searchTerm, "em", location);
  };

  const handleFilter = async (species) => {
    console.log("🔍 Filtrando por espécie:", species); // <- ADICIONE ISSO
    try {
      const response = await fetch(`http://localhost:5000/api/animais?especie=${species}`);
      const data = await response.json();
      navigate("/animals", { state: { animals: data } });
    } catch (error) {
      console.error("Erro ao buscar animais:", error);
    }
  };
  

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowChecklistPopup(false);
        setShowFaqPopup(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="container text-center">
      <div className="search-buttons">
        <button className="search-button" onClick={() => handleFilter("cachorro")}> 
          <img src="../src/assets/cachorro.png" width="70%" alt="Cachorros" />
          <span className="search-label" style={{ color: "#4e2d69" }}> Cachorros </span>
        </button>
        <button className="search-button" onClick={() => handleFilter("gato")}> 
          <img src="../src/assets/gato.png" width="70%" alt="Gatos" />
          <span className="search-label" style={{ color: "#4e2d69" }}> Gatos </span>
        </button>
        <button className="search-button" onClick={() => handleFilter("")}> 
          <img src="../src/assets/todos.png" width="70%" alt="Todos" />
          <span className="search-label" style={{ color: "#4e2d69" }}> Todos </span>
        </button>
      </div>
      
      <h2>Encontre seu novo melhor amigo!</h2>

      <div className="info-container">
        <div className="info-box">
          <img src="../src/assets/checklist.png" alt="Checklist" width="50%" />
          <h3>CHECKLIST PARA ADOÇÃO</h3>
          <p>Tudo que você precisa para adotar um pet.</p><br></br>
          <button className="info-button" onClick={() => setShowChecklistPopup(true)}>SAIBA MAIS!</button>
          </div>
        
        <div className="info-box">
          <img src="../src/assets/faq.png" alt="FAQ" width="50%" />
          <h3>FAQ ADOÇÃO DE PETS</h3>
          <p>Todos os quesitos que você não pensou antes de adotar um pet.</p><br></br>
          <button className="info-button" onClick={() => setShowFaqPopup(true)}>SAIBA MAIS!</button>
        </div>
      </div>

      {showChecklistPopup && (
        <div className="popup-overlay" onClick={() => setShowChecklistPopup(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setShowChecklistPopup(false)}>
              X
            </button>
            <h2>Checklist para adoção de pets</h2>
            <ul>
            <li>
            <strong>Compromisso a longo prazo: </strong>
               Cães e gatos podem viver entre 10 e 20 anos. Você está preparado para cuidar dele durante 
               toda a sua vida?
               </li>

            <li>
            <strong>Espaço adequado: </strong>
             Verifique se sua casa tem espaço suficiente para o 
            pet. Se for apartamento, consulte as regras do condomínio sobre a convivência com animais.
            </li>
            
            <li>
            <strong>Condições financeiras: </strong>
            É necessário apresentar comprovante de renda para garantir que o adotante tenha condições de arcar 
            com os custos de alimentação e cuidados médicos do pet.
             </li> 
            
            <li>
            <strong>Tempo e dedicação: </strong>
             Você tem tempo suficiente para passeios, brincadeiras e cuidados diários com o pet?
            </li> 
            
            <li>
            <strong>Segurança do ambiente: </strong>
            Sua casa é segura para um pet? Verifique se há janelas teladas, fios protegidos e produtos 
            tóxicos fora do alcance.
            </li> 
            
            <li>
            <strong>Adaptação com outros animais: </strong>
             Se já tiver um pet, considere como será a adaptação do novo animal ao ambiente. 
             Planeje uma introdução gradual.
             </li>
            
            <li>
            <strong>Castração: </strong> 
            A ONG exige que todos os pets sejam castrados após a adoção, caso ainda não o sejam, como 
            forma de garantir o controle populacional e a saúde do animal.
            </li>
            
            <li>
            <strong>Planos para viagens: </strong>
             Quem cuidará do seu pet quando você viajar ou se precisar se mudar? Planeje com antecedência.
             </li>
            
            <li>
            <strong>Paciência e treinamento: </strong>
             O animal precisará de educação e paciência para se adaptar à nova rotina. Você está disposto a 
             investir nesse processo?
            </li> 
            
            <li>
              <strong>Amor e respeito: </strong>
             Ter um pet é um compromisso de amor incondicional. Você está pronto para assumir esse compromisso?
            </li>

            <li>
            <strong>Visita domiciliar: </strong>
            A ONG pode realizar uma visita ao seu lar para verificar se o ambiente é adequado para o pet, 
            considerando segurança e espaço.
            </li>

            <li>
            <strong>Vacinas e vermífugos em dia: </strong>
            Os animais adotados da ONG já vêm com as vacinas e vermífugos atualizados. O adotante se 
            compromete a manter o cartão de vacinas em dia e consultar um veterinário regularmente.
            </li>

            <li>
            <strong>Contrato de adoção: </strong>
            O adotante deve assinar um contrato de adoção, que inclui termos sobre a responsabilidade do 
            cuidado, a devolução do animal caso não possa mais cuidar dele e a proibição de vender o pet.
            </li>

            <li>
            <strong>Acompanhamento pós-adoção: 	</strong>
            A ONG realiza um acompanhamento pós-adoção, com verificações periódicas para garantir que o pet 
            está se adaptando bem e sendo bem tratado.
            </li>

            </ul>
          </div>
        </div>
      )}

      {/* Popup FAQ Adoção de Pets */}
      {showFaqPopup && (
        <div className="popup-overlay" onClick={() => setShowFaqPopup(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setShowFaqPopup(false)}>
              X
            </button>
            <h2>Perguntas frequentes</h2>
            <ul>
              <li>
                <strong>Por que devo adotar ao invés de comprar? </strong> 
                A adoção salva vidas e diminui o número de animais abandonados. Muitos pets de abrigos 
                já são vacinados, castrados e vermifugados, prontos para um novo lar.
               </li>
               
              <li>
                <strong>Quais são os requisitos para adotar? </strong>
                É necessário apresentar documentos pessoais (RG, CPF e comprovante de residência), passar 
                por uma visita domiciliar e assinar um contrato de adoção.
                </li>
               
              <li>
                <strong>Como escolher o pet ideal para mim? </strong>
                Considere seu estilo de vida, o tempo que você pode dedicar ao animal e o espaço 
                disponível. Fale com a equipe do abrigo para entender o temperamento de cada pet.
                </li>
                
              <li>
                <strong>O que fazer se meu pet não se adaptar? </strong>
                A adaptação pode levar de dias a semanas. Seja paciente e, se necessário, busque a ajuda 
                de um adestrador ou veterinário comportamental.
                </li>
                 
              <li><strong>O que fazer caso eu precise me mudar </strong> 
                Certifique-se de que sua nova residência permite animais. Planeje a mudança levando em 
                consideração o bem-estar do seu pet.</li>
                 
              <li><strong>Meu pet precisa de vacinas e vermífugos? </strong> 
                Sim, é fundamental manter o cartão de vacinação atualizado. Consulte um veterinário 
                regularmente para garantir a saúde do seu animal.</li>
                 
              <li><strong>E se meu pet ficar doente? </strong>
              Tenha sempre um veterinário de confiança. Também é importante ter uma reserva financeira 
              para emergências veterinárias.</li>
                  
              <li><strong>Qual a alimentação adequada para o pet? </strong> Rações de boa qualidade
                são essenciais. Evite oferecer alimentos caseiros sem a orientação de um veterinário, 
                pois podem não ser adequados para o animal.</li>
                   
              <li><strong>Posso adotar se já tenho outros animais? </strong> Sim, mas é importante 
                fazer uma adaptação gradual entre os animais. Tenha paciência e supervise os primeiros
                encontros para garantir que todos se sintam confortáveis.</li>
                  
              <li>
              <strong>Quais cuidados são exigidos após a adoção? </strong>
              O adotante deve manter o pet com alimentação adequada, levar ao veterinário para exames regulares, e garantir um ambiente seguro. Além disso, a castração deve ser feita, caso o animal não tenha sido castrado previamente.
              </li>

              <li>
              <strong>É possível devolver o pet após a adoção? </strong>
              O contrato de adoção prevê a devolução do animal à ONG se o adotante não puder mais cuidar dele. No entanto, a devolução deve ser feita dentro das condições estabelecidas no contrato.
              </li>

              <li>
              <strong>Como faço para agendar uma visita à ONG? </strong>
              Para agendar uma visita, basta entrar em contato pelo nosso telefone ou site. Durante a visita, você poderá conhecer os animais disponíveis e receber orientação sobre o processo de adoção.
              </li>

              <li>
              <strong>O que acontece se eu não conseguir cuidar do pet? </strong>
              Caso você enfrente dificuldades para cuidar do pet, entre em contato com a ONG. Se necessário, buscaremos uma solução, que pode incluir a devolução do animal ou a indicação de ajuda profissional.
              </li> 

              <li>
              <strong>Posso adotar um pet mesmo morando em apartamento? </strong>
              Sim, mas é necessário verificar com a ONG o perfil do pet. Alguns animais se adaptam melhor a espaços pequenos, enquanto outros exigem mais espaço e atividades físicas. Verifique também as regras do seu condomínio.
              </li>

              <li>
              <strong>Como saber se o pet é adequado para minha rotina? </strong>
              Durante a visita à ONG, nossa equipe ajudará a identificar o animal mais adequado ao seu estilo de vida, considerando fatores como atividade, temperamento e necessidades especiais do pet.
              </li>
            </ul>
          </div>
        </div>
      )}
      </div>
  );
};

export default Home;