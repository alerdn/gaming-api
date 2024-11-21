import { Database } from "database/index";

export default class Usuario {
  static query() {
    return Database("usuarios");
  }
}
