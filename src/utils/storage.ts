export const storage = {
  getItem<T = string>(key: string): T | null {
    const value = localStorage.getItem(key)

    if (!value) return null

    try {
      return JSON.parse(value) as T
    } catch {
      return value as T
    }
  },

  setItem(key: string, value: unknown) {
    if (typeof value === 'string') {
      localStorage.setItem(key, value)
      return
    }

    localStorage.setItem(key, JSON.stringify(value))
  },

  removeItem(key: string) {
    localStorage.removeItem(key)
  },

  clear() {
    localStorage.clear()
  },
}
