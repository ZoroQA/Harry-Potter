'use client'
import { useFavorites } from '../../components/favorites'
import { CharacterCard } from '../../components/character-card'

export default function FavoritesPage() {
  const { favoritesList } = useFavorites()
  return (
    <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
      {favoritesList.map(c => (<CharacterCard key={c.id} character={c} />))}
      {favoritesList.length === 0 && (
        <div className="text-slate-400">Пока нет избранных персонажей.</div>
      )}
    </div>
  )
}
