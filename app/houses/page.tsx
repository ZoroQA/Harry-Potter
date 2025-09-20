import { HouseCard } from '../../components/house-card'

const HOUSES = [
  { name: 'Гриффиндор', colors: 'алый и золото', symbol: 'Лев', color: 'gryffindor',
    description: 'Храбрость, доблесть и честь. Основан Годриком Гриффиндором.' },
  { name: 'Слизерин', colors: 'зелёный и серебро', symbol: 'Змея', color: 'slytherin',
    description: 'Хитрость, амбиции и решительность. Основан Салазаром Слизерином.' },
  { name: 'Хаффлпафф', colors: 'жёлтый и чёрный', symbol: 'Барсук', color: 'hufflepuff',
    description: 'Трудолюбие, верность и терпение. Основан Пенелопой Пуффендуй.' },
  { name: 'Когтевран', colors: 'синий и бронза', symbol: 'Орел', color: 'ravenclaw',
    description: 'Мудрость, остроумие и творчество. Основан Ровеной Когтевран.' },
]

export default function HousesPage() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {HOUSES.map(h => (<HouseCard key={h.name} {...h} />))}
    </div>
  )
}
