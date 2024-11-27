require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import routes from "routes/index";

const app = express();
app.use(bodyParser.json());

routes(app);

app.listen(process.env.PORT ?? 3000, () => {
  console.log("Server is running on port 3000");
});
