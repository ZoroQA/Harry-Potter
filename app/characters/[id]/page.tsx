'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { CharacterCard } from '../../../components/character-card'
import { Search } from 'lucide-react'
import { useFavorites } from '../../../components/favorites'

export type Character = {
  id: string; name: string; image: string; house?: string; patronus?: string;
}

export default function CharactersPage() {
  const [q, setQ] = useState('')
  const [page, setPage] = useState(1)
  const [items, setItems] = useState<Character[]>([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const loaderRef = useRef<HTMLDivElement | null>(null)
  const { favorites } = useFavorites()

  const params = useMemo(() =>
    new URLSearchParams({ q, page: String(page), limit: '24' }).toString(),
  [q, page])

  useEffect(() => { setItems([]); setPage(1); setHasMore(true) }, [q])

  useEffect(() => {
    let cancel = false
    const run = async () => {
      if (!hasMore || loading) return
      setLoading(true)
      const res = await fetch(`/api/characters?${params}`)
      if (!res.ok) { setLoading(false); return }
      const data = await res.json()
      if (cancel) return
      setItems(prev => [...prev, ...data.items])
      setHasMore(data.hasMore)
      setLoading(false)
    }
    run()
    return () => { cancel = true }
  }, [params])

  useEffect(() => {
    if (!loaderRef.current) return
    const io = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && !loading) setPage(p => p + 1)
    }, { rootMargin: '200px' })
    io.observe(loaderRef.current)
    return () => io.disconnect()
  }, [loaderRef.current, hasMore, loading])

  return (
    <section className="grid gap-6">
      <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
        <Search className="size-4" />
        <input
          value={q} onChange={e => setQ(e.target.value)} placeholder="Поиск по имени…"
          className="bg-transparent outline-none w-full placeholder:text-slate-400"
        />
      </div>

      <div className="text-sm text-slate-400">
        Избранных: <b>{favorites.size}</b>
      </div>

      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
        {items.map(ch => (<CharacterCard key={ch.id} character={ch} />))}
      </div>

      {loading && <div className="text-center text-slate-400">Загрузка…</div>}
      <div ref={loaderRef} />
    </section>
  )
}
