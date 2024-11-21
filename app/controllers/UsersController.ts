import { Database } from "database/index";
import { Request, Response } from "express";

export default class UsersController {
  static async index(request: Request, response: Response) {
    try {
      const users = await Database("users").select("*");

      const novoUser = await Database.insert({
        nome: "Alexandre",
        email: "alexandre@gmail.com",
        senha: "12345678",
      }).into("users");

      response.send(novoUser);
    } catch (error: any) {
      response.status(500).send(error.message);
    }
  }
}
