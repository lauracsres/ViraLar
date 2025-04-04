const express = require("express");
const db = require("./db"); // Importa a conexão com o banco
const crypto = require("crypto");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Configuração do multer para upload de imagens
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Pasta onde as imagens serão salvas
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName); // Nome único para cada imagem
  },
});
const upload = multer({ storage });


/** ===================== LOGIN DO ADMIN ===================== */
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Usuário e senha são obrigatórios" });
  }

  const hashPassword = crypto.createHash("sha256").update(password).digest("hex");
  const query = "SELECT * FROM admins WHERE username = ?";

  db.query(query, [username], (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Erro no servidor" });
    }

    if (results.length === 0 || results[0].password_hash !== hashPassword) {
      return res.status(401).json({ success: false, message: "Credenciais inválidas" });
    }

    res.json({ success: true, username: results[0].username });
  });
});

/** ===================== BUSCAR ANIMAIS ===================== */
router.get("/animais", (req, res) => {
  const especie = req.query.especie;

  let query = "SELECT * FROM animais";
  let params = [];

  if (especie) {
    query += " WHERE LOWER(especie) = LOWER(?)";
    params.push(especie);
  }

  db.query(query, params, (err, results) => {
    if (err) {
      console.error("Erro ao buscar animais:", err);
      return res.status(500).json({ success: false, message: "Erro ao buscar animais" });
    }

    res.json(results);
  });
});


/** ===================== CADASTRAR ANIMAL ===================== */
router.post("/animais", upload.single("imagem"), (req, res) => {

  const { nome, especie, raca, idade, sexo, porte, cor, temperamento, historico_saude } = req.body;
  const imagem_url = req.file ? `/api/uploads/${req.file.filename}` : null;

  if (!nome || !especie || !idade || !sexo || !porte) {
    return res.status(400).json({ success: false, message: "Preencha todos os campos obrigatórios!" });
  }

  const query = `
    INSERT INTO animais (nome, especie, raca, idade, sexo, porte, cor, temperamento, historico_saude, imagem_url, disponivel)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [nome, especie, raca, idade, sexo, porte, cor, temperamento, historico_saude, imagem_url, true], (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Erro ao cadastrar animal", error: err });
    }

    res.json({ success: true, message: "Animal cadastrado com sucesso" });
  });
});

/** ===================== SOLICITAR ADOÇÃO ===================== */
router.post("/adocao", (req, res) => {
  const { animal_id, nome_adotante, sobrenome, email, endereco, telefone, trabalho, viagem, filhos, outros_animais, sexo_animal, castrado, dormir, outra_info, experiencia_caes, problemas_comportamento, tempo_adaptacao, acordo_familia } = req.body;

  if (!animal_id || !nome_adotante || !sobrenome || !email || !endereco || !telefone || !trabalho || !viagem || !filhos || !outros_animais || !sexo_animal || !castrado || !dormir || !outra_info || !experiencia_caes || !problemas_comportamento || !tempo_adaptacao || !acordo_familia) {
    return res.status(400).json({ success: false, message: "Preencha todos os campos obrigatórios" });
  }

  const query = `INSERT INTO solicitacoes_adocao 
    (animal_id, nome_adotante, sobrenome, email, endereco, telefone, trabalho, viagem, filhos, outros_animais, sexo_animal, castrado, dormir, outra_info, experiencia_caes, problemas_comportamento, tempo_adaptacao, acordo_familia, status) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pendente')`;

  db.query(query, [animal_id, nome_adotante, sobrenome, email, endereco, telefone, trabalho, viagem, filhos, outros_animais, sexo_animal, castrado, dormir, outra_info, experiencia_caes, JSON.stringify(problemas_comportamento), tempo_adaptacao, acordo_familia], (err) => {
    if (err) {
      console.error("Erro ao enviar solicitação:", err);
      return res.status(500).json({ success: false, message: "Erro ao enviar solicitação" });
    }

    res.json({ success: true, message: "Solicitação enviada com sucesso" });
  });
});


/** ===================== LISTAR SOLICITAÇÕES DE ADOÇÃO ===================== */
router.get("/adocoes", (req, res) => {
  const query = `
    SELECT 
      sa.id,
      sa.animal_id,
      a.nome AS animal_nome,  -- Nome do animal da tabela 'animais'
      sa.nome_adotante,
      sa.sobrenome,
      sa.email,
      sa.endereco,
      sa.telefone,
      sa.trabalho,
      sa.viagem,
      sa.filhos,
      sa.outros_animais,
      sa.sexo_animal,
      sa.castrado,
      sa.dormir,
      sa.outra_info,
      sa.experiencia_caes,
      sa.problemas_comportamento,
      sa.tempo_adaptacao,
      sa.acordo_familia,
      sa.status
    FROM solicitacoes_adocao AS sa
    JOIN animais AS a ON sa.animal_id = a.id  -- Garantir que a junção é feita corretamente
    ORDER BY sa.id DESC;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Erro ao buscar solicitações:", err);
      return res.status(500).json({ success: false, message: "Erro ao buscar solicitações" });
    }

    res.json(results);
  });
});


/** ===================== APROVAR OU REJEITAR UMA ADOÇÃO ===================== */
router.put("/adocoes/:id", (req, res) => {
  const { status } = req.body; // "Aprovada" ou "Rejeitada"
  const { id } = req.params;

  if (!status || !["Aprovada", "Rejeitada"].includes(status)) {
    return res.status(400).json({ success: false, message: "Status inválido" });
  }

  const query = "UPDATE solicitacoes_adocao SET status = ? WHERE id = ?";

  db.query(query, [status, id], (err) => {
    if (err) {
      console.error("Erro ao atualizar status:", err);
      return res.status(500).json({ success: false, message: "Erro ao atualizar status" });
    }

    res.json({ success: true, message: "Status atualizado com sucesso" });
  });
});

module.exports = router;