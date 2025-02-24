import Router from "framework/Router";
import clienteRouter from "./Cliente";

export const routesConfig = () => {
  const router = Router.Instance;

  router.get("/", async () => {
    return { hello: "world" };
  });

  router.post("/ping", async () => {
    return { pong: "pong" };
  });

  clienteRouter(router);
};
