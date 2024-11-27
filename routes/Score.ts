import Router from "utils/Router";

export default function scoresRouter(router: Router) {
  router
    .group((router) => {
      router.get("/buscar", "ScoresController.index")//.prefix("/index");
      router.post("/salvar", "ScoresController.store")//.prefix("/store");
    })
    .prefix("/scores");
}
