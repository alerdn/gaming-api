require("dotenv").config();
import Env from "framework/Env";
import Server from "framework/Server";

const PORT = Env.get("PORT") ?? 3000;

Server.Instance.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
