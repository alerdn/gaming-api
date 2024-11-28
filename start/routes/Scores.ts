import Router from "framework/Router";

export default function scoresRouter(router: Router) {
  router
    .group(() => {
      router
        .group(() => {
          router.get("/", "ScoresController.index");
          router.post("/", "ScoresController.store");
        })
        .prefix("/scores");

        router.get("/:id", "ScoresController.show");
    })
    .prefix("/api");

    router.get("/ablu/:id", "ScoresController.show");
}
