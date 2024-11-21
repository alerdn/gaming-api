import { Knex, knex } from "knex";

const config: Knex.Config = {
  client: "pg",
  connection: {
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    port: parseInt(process.env.PG_PORT!),
    ssl: true,
  },
};

const Database = knex(config);
export { Database };
