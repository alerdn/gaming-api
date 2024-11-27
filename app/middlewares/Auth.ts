import CustomException from "app/exceptions/CustomException";
import Usuario from "app/models/Usuario";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
const APP_KEY = process.env.APP_KEY;

export default class Auth {
  async handle(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
      throw new CustomException("Token não informado", 403, "E_MISSING_TOKEN");

    const decoded = jwt.verify(token, APP_KEY!);
    const { id } = decoded as { id: number };

    const usuario = await Usuario.query().where({ id }).first();
    if (!usuario)
      throw new CustomException(
        "Usuário não encontrado",
        404,
        "E_USER_NOT_FOUND"
      );

    req.body.auth.user = usuario;

    next();
  }
}
