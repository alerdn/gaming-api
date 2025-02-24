import { HttpContext } from "global";
import Cliente from "app/models/Cliente";

export default class ClienteController {
  async login({ request, response, auth }: HttpContext) {
    const { email, senha, pracaId } = request.body;

    const cliente = await Cliente.query()
      .where({ email, praca_id: pracaId })
      .first();

    return await auth.login(cliente, senha);
  }
}
