import { cocktailRepository, type WriteResult } from '@/lib/cocktail-repository'
import type { Cocktail, CocktailStatus } from '@/lib/cocktails'
import { seedCocktails } from '@/lib/mock-data'

/**
 * External store consumed with useSyncExternalStore. Until the creator makes
 * a change nothing is written, so the seed data stays in sync with the code.
 */
const listeners = new Set<() => void>()

let cache: { raw: string | null; list: Cocktail[] } | null = null

function parse(raw: string | null): Cocktail[] {
  if (raw === null) return seedCocktails
  try {
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as Cocktail[]) : seedCocktails
  } catch {
    return seedCocktails
  }
}

export function getSnapshot(): Cocktail[] {
  const raw = cocktailRepository.read()
  if (cache && cache.raw === raw) return cache.list
  cache = { raw, list: parse(raw) }
  return cache.list
}

export function getServerSnapshot(): Cocktail[] {
  return seedCocktails
}

const notify = () => listeners.forEach((listener) => listener())

export function subscribe(listener: () => void) {
  listeners.add(listener)
  const unsubscribeStorage = cocktailRepository.subscribe(notify)
  return () => {
    listeners.delete(listener)
    unsubscribeStorage()
  }
}

function commit(next: Cocktail[]): WriteResult {
  const result = cocktailRepository.write(next)
  if (result.ok) notify()
  return result
}

export const cocktailActions = {
  /** Inserts a new entry at the end, or replaces the one with the same id. */
  upsert(cocktail: Cocktail): WriteResult {
    const current = getSnapshot()
    const exists = current.some((item) => item.id === cocktail.id)
    return commit(
      exists
        ? current.map((item) => (item.id === cocktail.id ? cocktail : item))
        : [...current, cocktail],
    )
  },

  remove(id: string): WriteResult {
    return commit(getSnapshot().filter((item) => item.id !== id))
  },

  setStatus(id: string, status: CocktailStatus): WriteResult {
    return commit(
      getSnapshot().map((item) =>
        item.id === id
          ? { ...item, status, updatedAt: new Date().toISOString() }
          : item,
      ),
    )
  },

  reset() {
    cocktailRepository.clear()
    notify()
  },
}
