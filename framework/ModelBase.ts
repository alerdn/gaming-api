import { Database } from "database/index";

export default abstract class ModelBase {
  static _table: string;

  static get table() {
    return this.name.toLowerCase();
  }

  static query() {
    return Database(this.table);
  }
}
