import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database.js";
import { timeStamp } from "console";

interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
}

export class User extends Model<UserAttributes, any> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public role!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "user",
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
  }
);
