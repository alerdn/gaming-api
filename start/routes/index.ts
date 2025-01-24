import usuariosRouter from "./Usuarios";
import scoresRouter from "./Scores";
import Router from "framework/Router";

export const routesConfig = () => {
  const router = Router.Instance;

  router.get("/", async () => {
    return { hello: "world" };
  });

  usuariosRouter(router);

  router
    .group(() => {
      scoresRouter(router);
    })
    .middleware(["auth"]);
};
