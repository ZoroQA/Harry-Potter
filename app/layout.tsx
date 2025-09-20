import './globals.css'
import Link from 'next/link'
import { Wand2 } from 'lucide-react'
import Providers from './providers'   // <— ВАЖНО: есть импорт!

export const metadata = {
  title: 'Harry Potter Explorer',
  description: 'Explore Hogwarts houses, characters, spells and artifacts.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="min-h-screen bg-black text-slate-100">
        <header className="border-b border-white/10 sticky top-0 backdrop-blur bg-black/40 z-50">
          <nav className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Wand2 className="size-5" /> Harry Potter Explorer
            </Link>
            <div className="text-sm flex gap-4">
              <Link href="/houses" className="hover:underline">Факультеты</Link>
              <Link href="/characters" className="hover:underline">Персонажи</Link>
              <Link href="/favorites" className="hover:underline">Избранное</Link>
            </div>
          </nav>
        </header>

        <main className="max-w-5xl mx-auto px-4 py-8">
          <Providers>{children}</Providers> {/* ← ВАЖНО: обёртка */}
        </main>

        <footer className="max-w-5xl mx-auto px-4 py-10 text-xs text-slate-400/80">
          Данные проксируются через серверные API-роуты Next.js.
        </footer>
      </body>
    </html>
  )
}
