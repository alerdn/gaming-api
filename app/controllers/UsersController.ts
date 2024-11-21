import { Database } from "database";
import { Request, Response } from "express";

export default class UsersController {
  static async index(request: Request, response: Response) {
    try {
      const users = await Database("users").select("*");
      response.send(users);
    } catch (error: any) {
      response.status(500).send(error.message);
    }
  }
}
