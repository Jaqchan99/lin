'use client'

import { useMemo, useSyncExternalStore } from 'react'
import {
  cocktailActions,
  getServerSnapshot,
  getSnapshot,
  subscribe,
} from '@/lib/cocktail-store'
import { getPublished } from '@/lib/cocktails'

export function useCocktails() {
  const all = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const published = useMemo(() => getPublished(all), [all])
  return { all, published, actions: cocktailActions }
}

const noopSubscribe = () => () => {}

/** False during server render and hydration, true afterwards. */
export function useHydrated() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  )
}
