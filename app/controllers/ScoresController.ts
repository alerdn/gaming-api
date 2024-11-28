import { HttpContext } from "global";
import Score from "app/models/Score";
import CustomException from "app/exceptions/CustomException";

export default class ScoresController {
  async index({ request, response, auth }: HttpContext) {
    return await Score.query().select("*");
  }

  async show({ request, response, auth }: HttpContext) {
    const { id } = request.params;

    const score = await Score.query().where({ id }).first();
    if (!score) throw new CustomException("Score não encontrado", 404);

    return score;
  }

  async store({ request }: HttpContext) {
    const { usuario_id, score } = request.body;

    const scoreUsuario = await Score.query().where({ usuario_id }).first();
    if (!scoreUsuario) {
      await Score.query().insert({
        usuario_id,
        score,
      });

      return {
        mensagem: "Score cadastrado com sucesso",
      };
    } else {
      await Score.query().where({ usuario_id }).update({
        score,
      });

      return {
        mensagem: "Score atualizado com sucesso",
      };
    }
  }
}
