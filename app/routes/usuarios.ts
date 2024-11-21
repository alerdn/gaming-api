import { Application } from "express";
import UsuariosController from "app/controllers/UsuariosController";

export default function usuariosRouter(app: Application) {
  app
    .route("/usuarios")
    .get(UsuariosController.index)
    .post(UsuariosController.store);
}
