import { NextRequest, NextResponse } from 'next/server'
const HP_ENDPOINT = 'https://hp-api.onrender.com/api/characters'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const res = await fetch(HP_ENDPOINT, { next: { revalidate: 60 } })
  if (!res.ok) return NextResponse.json({ error: 'not found' }, { status: 404 })
  const all = await res.json()
  const idx = Number(params.id)

  let found = all.find((r: any) => String(r.id) === params.id)
  if (!found && !Number.isNaN(idx)) found = all[idx]
  if (!found) found = all.find((r: any) => (r.name + '-' + idx) === params.id)
  if (!found) return NextResponse.json({ error: 'not found' }, { status: 404 })

  return NextResponse.json({
    id: String(found.id ?? params.id),
    name: found.name, image: found.image, house: found.house, patronus: found.patronus,
    dateOfBirth: found.dateOfBirth, actor: found.actor, wand: found.wand
  })
}
