import { Request, Response } from "express";
import bcrypt from "bcrypt";
import Usuario from "app/models/usuario";

export default class UsuariosController {
  static async index(request: Request, response: Response) {
    try {
      const usuarios = await Usuario.query().select("*");

      response.send(usuarios);
    } catch (error: any) {
      response.status(500).send(error.message);
    }
  }

  static async store(request: Request, response: Response) {
    try {
      const { nome, email, senha } = request.body;

      const hasSenha = await bcrypt.hash(senha, 10);
      const usuario = await Usuario.query().insert({
        nome,
        email,
        senha: hasSenha,
      });

      response.send(usuario);
    } catch (error: any) {
      response.status(500).send(error.message);
    }
  }
}
