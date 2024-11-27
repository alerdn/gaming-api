import { HttpContext } from "global";
import bcrypt from "bcrypt";
import Usuario from "app/models/Usuario";

export default class UsuariosController {
  async login({ request, response, auth }: HttpContext) {
    const { email, senha } = request.body;

    return await auth.login(email, senha);
  }

  async index({ request, response }: HttpContext) {
    return await Usuario.query().select("*");
  }

  async store({ request, response }: HttpContext) {
    const { nome, email, senha } = request.body;

    const hasSenha = await bcrypt.hash(senha, 10);
    const usuario = await Usuario.query().insert({
      nome,
      email,
      senha: hasSenha,
    });

    return { usuario };
  }
}
