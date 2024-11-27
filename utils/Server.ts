import express, { Application } from "express";
import { routesConfig } from "start/routes";
import { kernelConfig } from "start/kernel";
import { MiddlewareHandler } from "global";
import Router from "./Router";
import IMiddleware from "./IMiddleware";

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

  registerGlobalMiddleware(middlewares: MiddlewareHandler[]) {
    this.app.use(middlewares);
  }

  async registerNamedMiddlewares(
    middlewareMap: Map<string, () => Promise<any>>
  ) {
    for (const [name, middleware] of middlewareMap) {
      const middlewareResolved: IMiddleware = new (
        await middleware()
      ).default();
      this.namedMiddlewares.set(name, middlewareResolved.handle);
    }
  }
}
