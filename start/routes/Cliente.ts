import Router from "framework/Router";

export default function clienteRouter(router: Router) {
  router.post("/login", "ClienteController.login");
}
