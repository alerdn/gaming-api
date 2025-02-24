import Env from "framework/Env";
import { Knex, knex } from "knex";

const mysqlConfig: Knex.Config = {
  client: "mysql2",
  connection: {
    user: Env.get("MYSQL_USER"),
    password: Env.get("MYSQL_PASSWORD"),
    host: Env.get("MYSQL_HOST"),
    database: Env.get("MYSQL_DB_NAME"),
    port: parseInt(Env.get("MYSQL_PORT")),
  },
};

const pgConfig: Knex.Config = {
  client: "pg",
  connection: {
    user: Env.get("PG_USER"),
    password: Env.get("PG_PASSWORD"),
    host: Env.get("PG_HOST"),
    database: Env.get("PG_DATABASE"),
    port: parseInt(Env.get("PG_PORT")),
    ssl: true,
  },
};

const Database = knex(mysqlConfig);
export { Database };
