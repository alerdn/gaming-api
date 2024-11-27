import e, { Application, Router as ERouter } from "express";
import usuariosRouter from "./Usuarios";
import scoresRouter from "./Score";
import Router from "utils/Router";

function routes(app: Application) {
  const router = new Router(app);

  usuariosRouter(router);
  scoresRouter(router);

  router.registerRoutes();
}

export default routes;
