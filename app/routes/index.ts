import UsersController from "app/controllers/UsersController";
import { Application } from "express";

function router(app: Application) {
  app.get("/", (req, res) => {
    res.send("Hello World");
  });

  app.get("/users", UsersController.index);
}

export default router;
