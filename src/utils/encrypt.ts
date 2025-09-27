import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
dotenv.config({
  path: `/workspaces/Projeto-DevWeb25.1/.env.${process.env.NODE_ENV}`,
});

const JWT_SECRET: string = process.env.JWT_SECRET || "f69b87680a219d";

export class encrypt {
  static async encryptpass(password: string) {
    return bcrypt.hashSync(password, 12);
  }

  static comparepassword(password: string, hashPassword: string) {
    return bcrypt.compareSync(password, hashPassword);
  }

  static generateToken(payload: any) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
  }
}
