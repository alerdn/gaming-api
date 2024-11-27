import Server from "utils/Server";
import bodyParser from "body-parser";

export const kernelConfig = async () => {
  Server.Instance.app.use(bodyParser.json());

  // Middlewares Globais
  Server.Instance.registerGlobalMiddleware([
    () => import("app/middlewares/SilentAuth"),
  ]);

  // Middlewares Nomeados
  await Server.Instance.registerNamedMiddlewares(
    new Map([
      ["log", () => import("app/middlewares/Logger")],
      ["auth", () => import("app/middlewares/Auth")],
    ])
  );
};
