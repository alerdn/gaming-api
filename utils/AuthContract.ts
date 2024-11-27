import bcrypt from "bcrypt";
import Usuario from "app/models/Usuario";
import jwt from "jsonwebtoken";

const APP_KEY = process.env.APP_KEY;

export default class AuthContract {
  user: Usuario | null = null;

  async login(email: string, password: string) {
    const user: Usuario = await Usuario.query().where({ email }).first();
    if (!user) throw new Error("Usuário não encontrado");

    const isValid = await bcrypt.compare(password, user.senha);
    if (!isValid) throw new Error("Senha inválida");

    const token = jwt.sign({ id: user.id }, APP_KEY!, {
      expiresIn: "1h",
    });

    return { token, expiresAt: new Date(Date.now() + 3600000) };
  }
}
