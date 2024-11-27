import usuariosRouter from "./Usuarios";
import scoresRouter from "./Scores";
import Router from "utils/Router";

export const routesConfig = () => {
  const router = Router.Instance;
  usuariosRouter(router);
  scoresRouter(router);
};
