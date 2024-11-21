import { Application } from "express";
import usuariosRouter from "./usuarios";
import scoresRouter from "./score";

function router(app: Application) {
  app.get("/", (req, res) => {
    res.send("Hello World");
  });

  usuariosRouter(app);
  scoresRouter(app);
}

export default router;
