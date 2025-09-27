import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config({
  path: `/workspaces/Projeto-DevWeb25.1/.env.${process.env.NODE_ENV}`,
});
import { User } from "../models/User.js";

export const authentification = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  console.log(process.env.JWT_SECRET);
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = header.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  console.log(token);
  const decode = jwt.verify(token, process.env.JWT_SECRET || "");
  if (!decode) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  console.log("decode", decode);
  req["user"] = decode;
  next();
};

export const authorization = (roles: string[]) => {
  return async (req: any, res: Response, next: NextFunction) => {
    if (!req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }
    const user = await User.findOne({
      where: { id: req["user"].id },
    });
    if (!user || !roles.includes(user.getDataValue("role"))) {
      return res.status(403).json({ message: "Forbidden" });
    }
    req.user.username = user.getDataValue("username");
    next();
  };
};
