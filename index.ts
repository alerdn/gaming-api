require("dotenv").config();
import express from "express";
import router from "app/routes";

const app = express();
router(app);

app.listen(process.env.PORT ?? 3000, () => {
  console.log("Server is running on port 3000");
});
