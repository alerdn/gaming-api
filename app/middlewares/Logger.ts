import { Request, Response, NextFunction } from "express";

export default class Logger {
  async handle(req: Request, res: Response, next: NextFunction) {
    console.log("Loggerrrr!!!");
    next();
  }
}
