export default class Env {
  static get(key: string): string {
    return process.env[key] as string;
  }
}
