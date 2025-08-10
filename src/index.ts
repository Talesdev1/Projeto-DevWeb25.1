import express from "express";
import sequelize from "./config/database.js";
import { UserRepository } from "./repository/UserRepository.js";
import status from "./services/status.js";
import * as dotenv from "dotenv";
import { userRouter } from "./routes/userRouter.js";
import { errorHandler } from "./middlewares/error.js";
import { logger } from "./middlewares/logger.js";

const port = 3000;
const app = express();
app.use(express.json());
app.use(logger);
app.use(errorHandler);
app.use("/", userRouter);

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

app.get("*", (req, res) => {
  res.status(505).json({ message: "Bad Request" });
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
