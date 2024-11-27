import { Request, Response, NextFunction } from "express";

export default class Auth {
  async handle(req: Request, res: Response, next: NextFunction) {
    console.log("Auth middleware");
    next();
  }
}
