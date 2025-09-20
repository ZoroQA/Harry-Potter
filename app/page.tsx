import Link from 'next/link'

export default function HomePage() {
  return (
    <section className="grid gap-8">
      <div className="hero rounded-2xl p-10 min-h-[280px] flex flex-col justify-end shadow-2xl ring-1 ring-white/10">
        <h1 className="text-3xl md:text-4xl font-bold drop-shadow">
          Добро пожаловать в волшебный мир Хогвартса
        </h1>
        <p className="mt-2 max-w-2xl text-slate-200/90">
          Изучайте факультеты, открывайте каталог персонажей и находите любимых героев.
        </p>
        <div className="mt-4 flex gap-3">
          <Link className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/15" href="/houses">
            Факультеты
          </Link>
          <Link className="px-4 py-2 bg-white text-black rounded-lg" href="/characters">
            Каталог персонажей
          </Link>
        </div>
      </div>
    </section>
  )
}
