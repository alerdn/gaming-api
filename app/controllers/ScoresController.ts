import { HttpContext } from "global";
import Score from "app/models/Score";

export default class ScoresController {
  async index({ request, response }: HttpContext) {
    return await Score.query().select("*");
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
