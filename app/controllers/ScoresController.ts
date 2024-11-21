import { Request, Response } from "express";
import Score from "app/models/Score";

export default class ScoresController {
  static async index(request: Request, response: Response) {
    try {
      const scores = await Score.query().select("*");
      response.send(scores);
    } catch (error: any) {
      response.status(400).send(error.message);
    }
  }

  static async store(request: Request, response: Response) {
    try {
      const { usuario_id, score } = request.body;

      const scoreUsuario = await Score.query().where({ usuario_id }).first();
      if (!scoreUsuario) {
        await Score.query().insert({
          usuario_id,
          score,
        });

        response.json({
          mensagem: "Score cadastrado com sucesso",
        });
      } else {
        await Score.query().where({ usuario_id }).update({
          score,
        });

        response.json({
          mensagem: "Score atualizado com sucesso",
        });
      }
    } catch (error: any) {
      response.status(400).send(error.message);
    }
  }
}
