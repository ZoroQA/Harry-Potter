'use client'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

type Fav = { id: string, name: string, image?: string, house?: string, patronus?: string }

type Ctx = {
  favorites: Set<string>
  favoritesList: Fav[]
  isFav: (c: Fav) => boolean
  toggle: (c: Fav) => void
}

const Ctx = createContext<Ctx | null>(null)

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [list, setList] = useState<Fav[]>([])

  useEffect(() => {
    const raw = localStorage.getItem('hp-favorites')
    if (raw) setList(JSON.parse(raw))
  }, [])

  useEffect(() => {
    localStorage.setItem('hp-favorites', JSON.stringify(list))
  }, [list])

  const set = useMemo(() => new Set(list.map(i => i.id)), [list])

  const api: Ctx = {
    favorites: set,
    favoritesList: list,
    isFav: (c) => set.has(c.id),
    toggle: (c) => setList(prev => (set.has(c.id) ? prev.filter(p => p.id !== c.id) : [...prev, c]))
  }

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>
}

export function useFavorites() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider')
  return ctx
}
