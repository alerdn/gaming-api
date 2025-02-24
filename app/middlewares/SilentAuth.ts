import { Request, Response, NextFunction } from "express";
import AuthContract from "framework/AuthContract";

export default class SilentAuth {
  async handle(request: Request, response: Response, next: NextFunction) {
    const auth = new AuthContract();
    request.body.auth = auth;

    next();
  }
}
