import express from "express";
import sequelize from "./config/database.js";
import { UserRepository } from "./repository/UserRepository.js";
import status from "./services/status.js";
import * as dotenv from "dotenv";
import { userRouter } from "./routes/userRouter.js";
import { errorHandler } from "./middlewares/error.js";
import { logger } from "./middlewares/logger.js";
import { postRouter } from "./routes/postRouter.js";
import cors from "cors";

const port = 3000;
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(logger);
app.use("/", userRouter);
app.use("/", postRouter);

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

app.get("/test/sync", async (req, res) => {
  await sequelize.sync({ force: true }).catch((error) => {
    console.error("Erro ao resetar banco de dados", error);
    res
      .status(500)
      .json({ message: "Erro ao buscar status", error: error.message });
  });
  res.status(204).json();
});

app.get("*", (req, res) => {
  res.status(505).json({ message: "Bad Request" });
});

app.use(errorHandler);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Banco de dados conectado!");
    app.listen(port, () => console.log("Servidor rodando na porta 3000"));
  })
  .catch((error) => {
    console.error("Erro ao conectar ao banco de dados", error);
  });
