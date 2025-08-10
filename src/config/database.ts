import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";

dotenv.config({
  path: [".env.development"],
});

const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT as "postgres" | "mysql",
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  logging: false,
});

export default sequelize;
