import "@testing-library/jest-dom";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  value: class MockIntersectionObserver {
    observe = () => {};
    unobserve = () => {};
    disconnect = () => {};
  },
});

Object.defineProperty(window, "ResizeObserver", {
  writable: true,
  value: class MockResizeObserver {
    observe = () => {};
    unobserve = () => {};
    disconnect = () => {};
  },
});

window.requestAnimationFrame = ((cb: FrameRequestCallback) => {
  setTimeout(() => cb(performance.now()), 0);
  return 0;
}) as typeof window.requestAnimationFrame;

window.scrollTo = () => {};
