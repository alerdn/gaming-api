import { Application } from "express";

function router(app: Application) {
  app.get("/", (req, res) => {
    res.send("Hello World");
  });
}

export default router;
