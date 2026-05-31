// Lightweight browser shim for node:async_hooks AsyncLocalStorage
// Provides the minimal API surface used by libraries that expect AsyncLocalStorage.
export class AsyncLocalStorage<T = unknown> {
  constructor() {}
  getStore(): T | undefined {
    return undefined;
  }
  run<R>(store: T, callback: (...args: unknown[]) => R, ...args: unknown[]): R {
    return callback(...(args as unknown[]));
  }
  enterWith(store: T): void {
    // no-op in browser shim
  }
}

export default AsyncLocalStorage;
