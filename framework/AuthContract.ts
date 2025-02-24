import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Env from "./Env";
import Cliente from "app/models/Cliente";
import CustomException from "app/exceptions/CustomException";

const APP_KEY = Env.get("APP_KEY");

export default class AuthContract {
  user: Cliente | null = null;

  async attemptLogin(email: string, password: string) {
    const user: Cliente = await Cliente.query().where({ email }).first();
    if (!user) throw new CustomException("Usuário não encontrado", 404);

    const isValid = await bcrypt.compare(password, user.senhaV2);
    if (!isValid) throw new CustomException("Senha inválida", 401);

    const token = jwt.sign({ id: user.id }, APP_KEY!, {
      expiresIn: "1h",
    });

    return { token, expiresAt: new Date(Date.now() + 3600000) };
  }

  async login(user: Cliente, password: string) {
    const isValid = await bcrypt.compare(password, user.senhaV2);
    if (!isValid) throw new Error("Senha inválida");

    const token = jwt.sign({ id: user.id }, APP_KEY!, {
      expiresIn: "1h",
    });

    return { token, expiresAt: new Date(Date.now() + 3600000) };
  }
}
