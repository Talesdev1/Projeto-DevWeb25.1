import { NextFunction, Request, Response } from "express";

export const logger = (req: Request, res: Response, next: NextFunction) => {
  const { method, originalUrl } = req;
  const startTime = Date.now();

  res.on("finish", () => {
    const responseTime = Date.now() - startTime;
    console.log(
      `- [${method}] ${originalUrl} -> ${res.statusCode} (${responseTime}ms)`
    );
  });

  next();
};
