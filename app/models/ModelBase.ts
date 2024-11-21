import { Database } from "database/index";

export default abstract class ModelBase {
  static table: string;

  static query() {
    return Database(this.table);
  }
}
