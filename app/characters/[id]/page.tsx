import Image from 'next/image'
import Link from 'next/link'
import { headers } from 'next/headers'

async function fetchCharacter(id: string) {
  // Абсолютный URL, чтобы работало и локально и на Vercel
  const h = headers()
  const host = h.get('host')
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
  const base = `${protocol}://${host}`
  const res = await fetch(`${base}/api/character/${id}`, { cache: 'no-store' })
  if (!res.ok) throw new Error('failed')
  return res.json()
}

export default async function CharacterPage({ params }: { params: { id: string }}) {
  const ch = await fetchCharacter(params.id)
  return (
    <article className="grid md:grid-cols-2 gap-8">
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl ring-1 ring-white/10">
        {ch.image ? (
          <Image src={ch.image} alt={ch.name} fill className="object-cover" />
        ) : (
          <div className="w-full h-full grid place-items-center text-slate-400">Нет изображения</div>
        )}
      </div>
      <div>
        <h1 className="text-3xl font-bold">{ch.name}</h1>
        <p className="text-slate-300/90 mt-2">Дом: {ch.house || '—'}</p>
        <p className="text-slate-300/90">Патронус: {ch.patronus || '—'}</p>
        <p className="text-slate-300/90">Дата рождения: {ch.dateOfBirth || '—'}</p>
        <p className="text-slate-300/90">Актёр: {ch.actor || '—'}</p>
        <p className="text-slate-300/90">
          Палочка: {ch.wand?.wood || '—'}{ch.wand?.core ? ` / ${ch.wand.core}` : ''}
        </p>
        <Link href="/characters" className="inline-block mt-6 px-4 py-2 bg-white text-black rounded-lg">
          ← К каталогу
        </Link>
      </div>
    </article>
  )
}
