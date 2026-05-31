// Lightweight browser shim for node:async_hooks AsyncLocalStorage
// Provides the minimal API surface used by libraries that expect AsyncLocalStorage.
export class AsyncLocalStorage<T = any> {
  constructor() {}
  getStore(): T | undefined {
    return undefined;
  }
  run<R>(store: T, callback: (...args: any[]) => R, ...args: any[]): R {
    return callback(...args);
  }
  enterWith(store: T): void {
    // no-op in browser shim
  }
}

export default AsyncLocalStorage;
