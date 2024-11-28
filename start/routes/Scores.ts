import Router from "framework/Router";

export default function scoresRouter(router: Router) {
  router
    .group(() => {
      router.get("/", "ScoresController.index");
      router.post("/", "ScoresController.store");
      router.get("/:id", "ScoresController.show");
    })
    .prefix("/scores");
}
