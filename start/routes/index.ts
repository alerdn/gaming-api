import usuariosRouter from "./Usuarios";
import scoresRouter from "./Scores";
import Router from "framework/Router";

export const routesConfig = () => {
  const router = Router.Instance;
  usuariosRouter(router);

  router
    .group(() => {
      scoresRouter(router);
    })
    .middleware(["auth"]);
};
