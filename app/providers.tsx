'use client'
import { FavoritesProvider } from '../components/favorites'

export default function Providers({ children }: { children: React.ReactNode }) {
  return <FavoritesProvider>{children}</FavoritesProvider>
}
