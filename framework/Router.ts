import Server from "framework/Server";
import { HttpContext, RouteCallback } from "global";
import { Application, Request, Response } from "express";
import AuthContract from "./AuthContract";
import Logger from "./Logger";
import CustomException from "app/exceptions/CustomException";

type Route = {
  path?: string;
  method: "get" | "post" | "router";
  handler?: string | RouteCallback;
  middleware?: string[];
  subRoutes?: Route[];
};

class RouterGroup {
  constructor(private routes: Route[]) {}

  prefix(path: string) {
    this.routes.forEach((route) => {
      route.path = path + route.path;
    });
    return this;
  }

  middleware(names: string[]) {
    this.routes.forEach((route) => {
      if (!route.middleware) route.middleware = [];

      route.middleware.push(...names);
    });
    return this;
  }
}

export default class Router {
  static _instance: Router;

  _app: Application;
  _routes: Route[] = [];
  _isConfiguringGroup = false;

  constructor() {
    this._app = Server.Instance.app;
  }

  static get Instance() {
    if (!this._instance) this._instance = new this();

    return this._instance;
  }

  group(configure: () => void) {
    let lastRoute = this._routes[this._routes.length - 1];

    if (this._isConfiguringGroup) {
      configure();
      return new RouterGroup(lastRoute.subRoutes!);
    } else {
      this._isConfiguringGroup = true;

      lastRoute = { method: "router", subRoutes: [] };
      this._routes.push(lastRoute);

      configure();

      this._isConfiguringGroup = false;
      return new RouterGroup(lastRoute.subRoutes!);
    }
  }

  prefix(path: string) {
    let lastRoute = this._routes[this._routes.length - 1];

    if (lastRoute.method === "router") {
      lastRoute = lastRoute.subRoutes![lastRoute.subRoutes!.length - 1];
    }

    lastRoute.path = path + lastRoute.path;
    return new RouterGroup([lastRoute]);
  }

  middleware(names: string[]) {
    let lastRoute = this._routes[this._routes.length - 1];

    if (lastRoute.method === "router") {
      lastRoute = lastRoute.subRoutes![lastRoute.subRoutes!.length - 1];
    }

    if (!lastRoute.middleware) lastRoute.middleware = [];

    lastRoute.middleware.push(...names);
    return new RouterGroup([lastRoute]);
  }

  get(path: string, handler: string | RouteCallback) {
    this.#configureRoute("get", path, handler);
    return this;
  }

  post(path: string, handler: string | RouteCallback) {
    this.#configureRoute("post", path, handler);
    return this;
  }

  registerRoutes(routes?: Route[]) {
    if (!routes) routes = this._routes;

    routes.forEach((route) => {
      if (route.method === "router") {
        if (!route.subRoutes) return;

        this.registerRoutes(route.subRoutes);
      } else {
        Logger.info(
          `${route.method.toUpperCase().padEnd(5, " ")} ${route.path?.padEnd(
            40,
            "."
          )} ${typeof route.handler === "string" ? route.handler : "Func"} ${
            route.middleware ? `[${route.middleware.join(", ")}]` : ""
          }`
        );

        const resolvedMiddlwares =
          route.middleware
            ?.map((middleware) => this.#resolveMiddleware(middleware))
            .filter((mid) => mid != undefined) ?? [];

        this._app[route.method](
          route.path!,
          resolvedMiddlwares,
          async (request: Request, response: Response) => {
            const auth: AuthContract = request.body.auth;
            delete request.body.auth;

            const handlerResolved = await this.#resolveHandler(route.handler!);
            await this.#resolveRoute(handlerResolved, {
              request,
              response,
              auth,
            });
          }
        );
      }
    });
  }

  #configureRoute(
    method: "get" | "post" | "router",
    path: string,
    handler: string | RouteCallback
  ) {
    const lastRoute = this._routes[this._routes.length - 1];

    if (lastRoute?.method === "router" && this._isConfiguringGroup) {
      lastRoute.subRoutes!.push({ path, method, handler });
    } else {
      this._routes.push({ path, method, handler });
    }
  }

  async #resolveHandler(handler: string | RouteCallback) {
    if (typeof handler === "function") return handler;

    const [controller, method] = handler.split(".");

    const module = await import("app/controllers/" + controller);
    const lazyClass = new module.default();

    return <RouteCallback>lazyClass[method];
  }

  async #resolveRoute(
    handlerResolved: RouteCallback,
    { request, response, auth }: HttpContext
  ) {
    try {
      if(!handlerResolved) throw new CustomException("Rota não encontrada", 404, "E_ROUTE_NOT_FOUND");
      
      const resposta = await handlerResolved({ request, response, auth });
      response.send(resposta);
    } catch (error: any) {
      response.status(error.status ?? 400).send({
        error: { message: error.message, status: error.status ?? 400 },
      });
    }
  }

  #resolveMiddleware(middleware: string) {
    return Server.Instance.namedMiddlewares.get(middleware);
  }
}
