import { Application } from "express";
import UsuariosController from "app/controllers/UsuariosController";

function usuariosRouter(app: Application) {
  app
    .route("/usuarios")
    .get(UsuariosController.index)
    .post(UsuariosController.store);
}

export default usuariosRouter;
