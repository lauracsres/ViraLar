require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./routes"); // Importa as rotas
const path = require("path");

const app = express();

app.use(cors({
  origin: '*',  // Permite qualquer origem (você pode restringir isso conforme necessário)
}));
app.use(express.json()); // Permite envio de JSON

const uploadsPath = path.join(__dirname, "uploads");

app.use("/api/uploads", express.static(uploadsPath));  // Servir imagens

// Usa as rotas criadas
app.use("/api", routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
});