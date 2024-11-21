import { Knex, knex } from "knex";


const config: Knex.Config = {
  client: "pg",
  connection: process.env.PG_CONNECTION_STRING,
};

const Database = knex(config);
export { Database };
