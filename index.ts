require("dotenv").config();
import Server from "framework/Server";

const PORT = process.env.PORT ?? 3000;

Server.Instance.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
