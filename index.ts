require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import router from "app/routes";

const app = express();
app.use(bodyParser.json());

router(app);

app.listen(process.env.PORT ?? 3000, () => {
  console.log("Server is running on port 3000");
});
