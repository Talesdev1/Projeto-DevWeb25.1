import { User } from "../User.js";

export class UserResponce {
  id: number;
  username: string;
  email: string;
  createdAt: any;
  updatedAt: any;

  constructor(user: any) {
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }

  toJSON() {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
    };
  }
}
