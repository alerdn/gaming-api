import Router from "framework/Router";

export default function usuariosRouter(router: Router) {
  router
    .group(() => {
      router.post("/login", "UsuariosController.login");

      router.get("/", "UsuariosController.index");
      router.post("/", "UsuariosController.store");
    })
    .prefix("/usuarios")
    .middleware(["log"]);
}
