import Server from "utils/Server";
import { HttpContext, MiddlewareHandler } from "global";
import { Application, Request, Response } from "express";
import AuthContract from "./AuthContract";

type RouteCallback = ({ request, response }: HttpContext) => Promise<any>;
type Route = {
  path?: string;
  method: "get" | "post" | "router";
  handler?: string;
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

  constructor() {
    this._app = Server.Instance.app;
  }

  static get Instance() {
    if (!this._instance) this._instance = new this();

    return this._instance;
  }

  group(configure: () => void) {
    const router: Route = { method: "router", subRoutes: [] };
    this._routes.push(router);

    configure();

    return new RouterGroup(router.subRoutes!);
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

  get(path: string, handler: string) {
    this.#configureRoute("get", path, handler);
    return this;
  }

  post(path: string, handler: string) {
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
        console.log(
          "\x1b[34m",
          `${route.method.toUpperCase().padEnd(5, " ")} ${
            route.path
          } ${route.handler?.padStart(40, ".")} ${
            route.middleware ? `[${route.middleware.join(", ")}]` : ""
          }`,
          "\x1b[0m"
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
    handler: string
  ) {
    const lastRoute = this._routes[this._routes.length - 1];

    if (!lastRoute) {
      this._routes.push({ path, method, handler });
    } else if (lastRoute.method === "router") {
      lastRoute.subRoutes!.push({ path, method, handler });
    }
  }

  async #resolveHandler(handler: string) {
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
