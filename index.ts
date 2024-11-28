require("dotenv").config();
import Server from "framework/Server";
import Env from "framework/Env";

const PORT = Env.get("PORT") ?? 3000;

Server.Instance.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
