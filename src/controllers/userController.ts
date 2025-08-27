import { NextFunction, Request, Response } from "express";
import { encrypt } from "../utils/encrypt.js";
import { UserResponce } from "../models/dto/user.dto.js";
import { UserRepository } from "../repository/UserRepository.js";
import BaseError from "../errors/index.js";

const userRepo = new UserRepository();

export class UserController {
  static async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, email, password, confirm_password } = req.body;
      console.log(email);
      if (!password) {
        throw new BaseError({ type: "is_null", path: "senha" });
      }
      if (password !== confirm_password) {
        throw new BaseError({ type: "confirm_password" });
      }
      if (password.length < 8) {
        throw new BaseError({ type: "password_length" });
      }
      const encryptedPassword = await encrypt.encryptpass(password);

      const user = await userRepo.createUser(
        username,
        email,
        encryptedPassword
      );
      const userResponce = new UserResponce(user.toJSON());

      const token = encrypt.generateToken({ id: user.id });

      return res.status(201).json({ token, ...userResponce.toJSON() });
    } catch (error) {
      next(error);
    }
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
