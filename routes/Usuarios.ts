import Router from "utils/Router";

export default function usuariosRouter(router: Router) {
  router
    .group((router) => {
      router.get("/", "UsuariosController.index");
      router.post("/", "UsuariosController.store");
    })
    .prefix("/usuarios")
    .middleware(["auth"]);
}
