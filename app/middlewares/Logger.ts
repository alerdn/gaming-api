import { Request, Response, NextFunction } from "express";
import Log from "framework/Logger";
export default class Logger {
  async handle(req: Request, res: Response, next: NextFunction) {
    Log.debug("Loggerrrr!!!");
    next();
  }
}
