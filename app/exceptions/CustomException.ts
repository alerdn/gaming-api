export default class CustomException extends Error {
  constructor(message: string, status: number, code?: string) {
    super(message);

    Object.defineProperty(this, "message", {
      configurable: true,
      enumerable: false,
      value: code ? `${code}: ${message}` : message,
      writable: true,
    });

    Object.defineProperty(this, "name", {
      configurable: true,
      enumerable: false,
      value: this.constructor.name,
      writable: true,
    });

    Object.defineProperty(this, "status", {
      configurable: true,
      enumerable: false,
      value: status || 500,
      writable: true,
    });

    Object.defineProperty(this, "code", {
      configurable: true,
      enumerable: false,
      value: code,
      writable: true,
    });
  }
}
