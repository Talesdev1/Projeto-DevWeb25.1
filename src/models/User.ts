import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";
import { timeStamp } from "console";

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
}
export class User extends Model<UserAttributes, any> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
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
  },
  {
    sequelize,
    tableName: "users",
    timestamps: false,
  }
);
