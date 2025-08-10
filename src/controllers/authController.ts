import { Request, Response } from "express";
import { encrypt } from "../utils/encrypt.js";
import { UserResponce } from "../models/dto/user.dto.js";
import { UserRepository } from "../repository/UserRepository.js";

const userRepo = new UserRepository();

export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(500)
          .json({ message: " email and password required" });
      }

      const user = await userRepo.getUserByEmail(email);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const isPasswordValid = encrypt.comparepassword(user.password, password);
      if (!isPasswordValid) {
        return res.status(404).json({ message: "User not found" });
      }
      const token = encrypt.generateToken({ id: user.id });

      return res.status(200).json({ message: "Login successful", user, token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getProfile(req: any, res: Response) {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await userRepo.getUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userResponce = new UserResponce(user);
    return res.status(200).json(userResponce.toJSON());
  }
}
