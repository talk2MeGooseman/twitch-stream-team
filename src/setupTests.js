// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

import { vi } from 'vitest'

// jsdom does not implement ResizeObserver, which react-uwp instantiates at
// runtime. Provide a no-op mock so components can render under test.
class ResizeObserverMock {
  observe() {}

  unobserve() {}

  disconnect() {}
}

globalThis.ResizeObserver = globalThis.ResizeObserver || ResizeObserverMock

// The Twitch Extension helper script (twitch-ext.min.js) is loaded from a CDN
// at runtime and is not present in the test environment. Provide a mock so
// components that reach for `window.Twitch` can render and be interacted with.
globalThis.Twitch = {
  ext: {
    onAuthorized: vi.fn(),
    actions: {
      onFollow: vi.fn(),
      followChannel: vi.fn(),
    },
  },
}
