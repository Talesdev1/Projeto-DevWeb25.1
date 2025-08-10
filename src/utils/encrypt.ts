import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import * as dotenv from "dotenv";

const { JWT_SECRET = "" }: any = process.env;

export class encrypt {
  static async encryptpass(password: string) {
    return bcrypt.hashSync(password, 12);
  }

  static comparepassword(hashPassword: string, password: string) {
    return bcrypt.compareSync(password, hashPassword);
  }

  static generateToken(payload: any) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
  }
}
