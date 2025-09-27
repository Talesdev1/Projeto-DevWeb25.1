import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { User } from "./User.js";

interface PostAttributes {
  id: number;
  ownerId: number;
  title: string;
  body: string;
  status: string;
  type: string;
  parentId: number;
  ownerUsername: string;
  deleted: boolean;
}

export class Post extends Model<PostAttributes, any> implements PostAttributes {
  public id!: number;
  public ownerId!: number;
  public title!: string;
  public body!: string;
  public status!: string;
  public type!: string;
  public parentId!: number;
  public ownerUsername!: string;
  public deleted!: boolean;
}

Post.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: User, key: "id" },
    },
    title: { type: DataTypes.STRING, allowNull: false },
    body: { type: DataTypes.TEXT, allowNull: false },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "published",
    },
    type: { type: DataTypes.STRING, allowNull: false, defaultValue: "content" },
    parentId: {
      type: DataTypes.INTEGER,
      references: { model: Post, key: "id" },
    },
    ownerUsername: {
      type: DataTypes.STRING,
      references: { model: User, key: "username" },
    },
    deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  { sequelize, tableName: "posts", timestamps: true }
);
