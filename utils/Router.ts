import { HttpContext } from "global";
import { Application, Router as ERouter } from "express";

type RouteCallback = ({ request, response }: HttpContext) => Promise<any>;

class RouterGroup {
  constructor(private app: Application, private router: ERouter) {}

  prefix(path: string) {
    this.app.use(path, this.router);
    return this;
  }
  middleware(names: string[]) {
    return this;
  }
}

export default class Router {
  constructor(private app: Application, private router?: ERouter) {}

  group(callback: (route: Router) => void) {
    const eRouter = ERouter();
    const customRouter = new Router(this.app, eRouter);
    callback(customRouter);
    return new RouterGroup(this.app, eRouter);
  }

  prefix(path: string) {
    this.app.use(path, this.router!);
  }

  get(path: string, callbackString: string) {
    this.router ??= ERouter();

    this.router.get(path, async (request, response) => {
      const callback = this.#resolveCallback(callbackString);
      await this.#resolveRoute(callback, { request, response });
    });

    this.app.use(this.router);
    return this;
  }

  post(path: string, callbackString: string) {
    this.router ??= ERouter();

    this.app.post(path, async (request, response) => {
      const callback = this.#resolveCallback(callbackString);
      await this.#resolveRoute(callback, { request, response });
    });

    this.app.use(this.router);
    return this;
  }

  #resolveCallback(callbackString: string) {
    const [controller, method] = callbackString.split(".");

    const module = require("app/controllers/" + controller);
    const lazyClass = new module.default();

    return <RouteCallback>lazyClass[method];
  }

  async #resolveRoute(
    callback: RouteCallback,
    { request, response }: HttpContext
  ) {
    try {
      const resposta = await callback({ request, response });
      response.send(resposta);
    } catch (error: any) {
      response.status(error.status ?? 500).send(error.message);
    }
  }
}
