import Server from "utils/Server";
import bodyParser from "body-parser";

export const kernelConfig = async () => {
  // Middlewares Globais
  Server.Instance.registerGlobalMiddleware([bodyParser.json()]);

  // Middlewares Nomeados
  await Server.Instance.registerNamedMiddlewares(
    new Map([
      ["log", () => import("app/middlewares/Logger")],
      ["auth", () => import("app/middlewares/Auth")],
    ])
  );
};
