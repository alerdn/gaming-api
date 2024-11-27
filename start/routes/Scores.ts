import Router from "utils/Router";

export default function scoresRouter(router: Router) {
  router
    .group(() => {
      router.get("/", "ScoresController.index").middleware(["auth"]);
      router.post("/", "ScoresController.store");
    })
    .prefix("/scores");
}
