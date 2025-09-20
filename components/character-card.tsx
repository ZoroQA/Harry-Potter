'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useFavorites } from './favorites'

export function CharacterCard({ character }: { character: any }) {
  const { isFav, toggle } = useFavorites()
  const fav = isFav(character)
  return (
    <div className="rounded-2xl overflow-hidden ring-1 ring-white/10 bg-white/5">
      <div className="relative aspect-[3/4]">
        {character.image ? (
          <Image src={character.image} alt={character.name} fill className="object-cover" />
        ) : (
          <div className="w-full h-full grid place-items-center text-slate-400">Нет изображения</div>
        )}
        <button
          onClick={() => toggle(character)}
          className="absolute top-2 right-2 bg-black/60 px-2 py-1 rounded text-xs"
          aria-label="В избранное"
        >{fav ? '★' : '☆'}</button>
      </div>
      <div className="p-3">
        <Link href={`/characters/${character.id}`} className="font-semibold hover:underline">
          {character.name}
        </Link>
        <div className="text-sm text-slate-400">
          Дом: {character.house || '—'} | Патронус: {character.patronus || '—'}
        </div>
      </div>
    </div>
  )
}
