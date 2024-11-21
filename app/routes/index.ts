import { Application } from "express";
import usuariosRouter from "./usuarios";

function router(app: Application) {
  app.get("/", (req, res) => {
    res.send("Hello World");
  });

  usuariosRouter(app);
}

export default router;
