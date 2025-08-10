import { User } from "../models/User.js";

export class UserRepository {
  async createUser(username: string, email: string, password: string) {
    return await User.create({
      username,
      email,
      password,
    });
  }

  async getAllUsers() {
    return await User.findAll();
  }

  async getUserByEmail(email: string) {
    return await User.findByPk(email);
  }

  async getUserById(id: number) {
    return await User.findOne({ where: { id: id } });
  }

  async updateUser(user: User, data: any) {
    user.set(data);
    await user.save();
    return user;
  }

  async deleteUser(user: User) {
    await user.destroy();
  }
}
