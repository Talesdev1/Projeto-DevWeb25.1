import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
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
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = header.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const decode = jwt.verify(token, process.env.JWT_SECRET || "");
  if (!decode) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  req["user"] = decode;
  next();
};

export const authorization = (roles: string[]) => {
  return async (req: any, res: Response, next: NextFunction) => {
    const user = await User.findOne({
      where: { id: req["user"].id },
    });
    console.log(user);
    if (!user || !roles.includes(user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};
