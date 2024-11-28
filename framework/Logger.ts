export default class Logger {
  static colors = {
    info: "color:#1296db",
    warn: "color:#e6c612",
    error: "color:#e61212",
    debug: "color:#12e6c6",
  };

  static info(message: string) {
    console.log("%c" + message, this.colors.info);
  }

  static warn(message: string) {
    console.log("%c" + message, this.colors.warn);
  }

  static error(message: string) {
    console.log("%c" + message, this.colors.error);
  }

  static debug(message: string) {
    console.log("%c" + message, this.colors.debug);
  }
}
