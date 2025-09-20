import clsx from 'clsx'

type Props = {
  name: string; colors: string; symbol: string;
  color: 'gryffindor' | 'slytherin' | 'hufflepuff' | 'ravenclaw';
  description: string;
}

export function HouseCard({ name, colors, symbol, color, description }: Props) {
  return (
    <div className={clsx(
      'rounded-2xl p-5 ring-1 ring-white/10 shadow-lg bg-white/5',
      {
        'border-t-4 border-gryffindor': color === 'gryffindor',
        'border-t-4 border-slytherin': color === 'slytherin',
        'border-t-4 border-hufflepuff': color === 'hufflepuff',
        'border-t-4 border-ravenclaw': color === 'ravenclaw',
      }
    )}>
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="text-slate-300/90 mt-1">Цвета: {colors}</p>
      <p className="text-slate-300/90">Символ: {symbol}</p>
      <p className="text-slate-200 mt-3">{description}</p>
    </div>
  )
}
