import express from "express";
const app = express();

import router from "app/routes";

router(app);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
