function createStorage () {
  let store = new Map()

  return {
    getItem: (key) => (store.has(String(key)) ? store.get(String(key)) : null),
    setItem: (key, value) => { store.set(String(key), String(value)) },
    removeItem: (key) => { store.delete(String(key)) },
    clear: () => { store = new Map() },
    key: (index) => Array.from(store.keys())[index] ?? null,
    get length () { return store.size },
  }
}

let usable = false

try {
  window.localStorage.setItem('__probe__', '1')
  window.localStorage.removeItem('__probe__')
  usable = true
} catch {}

if (!usable) {
  Object.defineProperty(window, 'localStorage', {
    value: createStorage(),
    configurable: true,
    writable: true,
  })
}
