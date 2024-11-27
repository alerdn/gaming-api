import { HttpContext } from "global";
import { Application, Router as ERouter } from "express";

type RouteCallback = ({ request, response }: HttpContext) => Promise<any>;
type Route = {
  path?: string;
  method: "get" | "post" | "router";
  handler?: string;
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
    return this;
  }
}

export default class Router {
  _routes: Route[] = [];

  constructor(private app: Application) {}

  group(callback: (route: Router) => void) {
    const router: Route = { method: "router", subRoutes: [] };
    this._routes.push(router);

    callback(this);

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
          `${route.method.toUpperCase()} ${route.path!.padStart(40, ".")}`,
          "\x1b[0m"
        );

        this.app[route.method](route.path!, async (request, response) => {
          const handlerResolved = this.#resolveHandler(route.handler!);
          await this.#resolveRoute(handlerResolved, { request, response });
        });
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

  #resolveHandler(handler: string) {
    const [controller, method] = handler.split(".");

    const module = require("app/controllers/" + controller);
    const lazyClass = new module.default();

    return <RouteCallback>lazyClass[method];
  }

  async #resolveRoute(
    handlerResolved: RouteCallback,
    { request, response }: HttpContext
  ) {
    try {
      const resposta = await handlerResolved({ request, response });
      response.send(resposta);
    } catch (error: any) {
      response.status(error.status ?? 500).send(error.message);
    }
  }
}
