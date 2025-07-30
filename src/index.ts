import express from "express";
import sequelize from "./config/database.js";
import { UserRepository } from "./repository/UserRepository.js";
import status from "./services/status.js";

const port = 3000;
const app = express();
app.use(express.json());

const userRepo = new UserRepository();

app.post("/users", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await userRepo.createUser(name, email, password);
    res.json(user);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Erro ao criar o usuário", error: error.message });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await userRepo.getAllUsers();
    res.json(users);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Erro ao buscar usuários", error: error.message });
  }
});

app.get("/status", async (req, res) => {
  try {
    let response = await status();
    res.status(200).json(response);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Erro ao buscar status", error: error.message });
  }
});

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Banco de dados conectado!");
    app.listen(port, () => console.log("Servidor rodando na porta 3000"));
  })
  .catch((error) => {
    console.error("Erro ao conectar ao banco de dados", error);
  });
