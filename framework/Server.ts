import express, { Application, Request, Response, NextFunction } from "express";
import { routesConfig } from "start/routes";
import { kernelConfig } from "start/Kernel";
import { MiddlewareHandler } from "global";
import Router from "./Router";
import IMiddleware from "./interfaces/IMiddleware";

export default class Server {
  static _instance: Server;
  app: Application = express();
  namedMiddlewares: Map<string, MiddlewareHandler> = new Map();

  static get Instance() {
    if (!this._instance) this._instance = new this();

    return this._instance;
  }

  async listen(port: number | string, callback: () => void) {
    await kernelConfig();

    routesConfig();
    Router.Instance.registerRoutes();

    this.app.listen(port, callback);
  }

  async registerGlobalMiddleware(middlewares: (() => Promise<any>)[]) {
    for (const middleware of middlewares) {
      const middlewareResolved: IMiddleware = new (
        await middleware()
      ).default();

      this.app.use(middlewareResolved.handle);
    }
  }

  async registerNamedMiddlewares(
    middlewareMap: Map<string, () => Promise<any>>
  ) {
    for (const [name, middleware] of middlewareMap) {
      const middlewareResolved: IMiddleware = new (
        await middleware()
      ).default();

      this.namedMiddlewares.set(
        name,
        async (req: Request, res: Response, next: NextFunction) => {
          try {
            await middlewareResolved.handle(req, res, next);
          } catch (error: any) {
            res.status(error.status ?? 400).send({
              error: { message: error.message, status: error.status ?? 400 },
            });
          }
        }
      );
    }
  }
}
