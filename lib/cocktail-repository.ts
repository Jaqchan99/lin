import type { Cocktail } from '@/lib/cocktails'

/**
 * Persistence boundary. The prototype keeps everything in localStorage; a
 * backend later only needs to replace this module's implementation.
 */
const STORAGE_KEY = 'lin.cocktails.v1'

export type WriteResult = { ok: true } | { ok: false; error: string }

export const cocktailRepository = {
  read(): string | null {
    try {
      return window.localStorage.getItem(STORAGE_KEY)
    } catch {
      return null
    }
  },

  write(list: Cocktail[]): WriteResult {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
      return { ok: true }
    } catch {
      return {
        ok: false,
        error: '瀏覽器的本機儲存空間不足，請移除部分圖片或刪除不需要的草稿後再試。',
      }
    }
  },

  clear() {
    try {
      window.localStorage.removeItem(STORAGE_KEY)
    } catch {
      // storage unavailable; nothing to clear
    }
  },

  /** Notifies when another tab changes the stored data. */
  subscribe(onChange: () => void) {
    const handler = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY || event.key === null) onChange()
    }
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  },
}
