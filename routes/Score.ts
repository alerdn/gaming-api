import Router from "utils/Router";

export default function scoresRouter(router: Router) {
  router
    .group((router) => {
      router.get("/teste", "ScoresController.index"); //.prefix("/index").prefix("/another");
      router.post("/", "ScoresController.store");
    })
    .prefix("/scores");
}
