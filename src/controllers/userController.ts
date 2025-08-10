import { Request, Response } from "express";
import { encrypt } from "../utils/encrypt.js";
import { UserResponce } from "../models/dto/user.dto.js";
import { UserRepository } from "../repository/UserRepository.js";

const userRepo = new UserRepository();

export class UserController {
  static async signup(req: Request, res: Response) {
    const { username, email, password } = req.body;
    const encryptedPassword = await encrypt.encryptpass(password);
    const user = await userRepo.createUser(username, email, encryptedPassword);
    const userResponce = new UserResponce(user.toJSON());

    const token = encrypt.generateToken({ id: user.id });

    return res.status(201).json({ token, ...userResponce.toJSON() });
  }

  static async getUsers(req: Request, res: Response) {
    let users = (await userRepo.getAllUsers()).map(
      (user) => new UserResponce(user.toJSON())
    );
    return res.status(200).json({ users });
  }

  static async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const { username, email } = req.body;

    let user = await userRepo.getUserById(+id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user = await userRepo.updateUser(user, { username, email });
    const userResponse = new UserResponce(user.toJSON());
    res.status(200).json(userResponse.toJSON());
  }

  static async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    let user = await userRepo.getUserById(+id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await userRepo.deleteUser(user);
    res.status(200).end();
  }
}
