import ScoresController from "app/controllers/ScoresController";
import { Application } from "express";

export default function scoresRouter(app: Application) {
  app
    .route("/scores")
    .get(ScoresController.index)
    .post(ScoresController.store);
}
