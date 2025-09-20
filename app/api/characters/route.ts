import { NextRequest, NextResponse } from 'next/server'
const HP_ENDPOINT = 'https://hp-api.onrender.com/api/characters'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const q = (searchParams.get('q') || '').toLowerCase()
  const page = Number(searchParams.get('page') || '1')
  const limit = Number(searchParams.get('limit') || '24')

  const res = await fetch(HP_ENDPOINT, { cache: 'force-cache', next: { revalidate: 60 } })
  if (!res.ok) return NextResponse.json({ items: [], hasMore: false }, { status: 200 })
  const raw = await res.json()

  const mapped = raw.map((r: any, idx: number) => ({
    id: String(r.id ?? r.name + '-' + idx),
    name: r.name, image: r.image, house: r.house, patronus: r.patronus,
    actor: r.actor, dateOfBirth: r.dateOfBirth, wand: r.wand
  }))

  const filtered = q ? mapped.filter((c: any) => c.name.toLowerCase().includes(q)) : mapped
  const start = (page - 1) * limit
  const end = start + limit
  const items = filtered.slice(start, end)
  const hasMore = end < filtered.length

  return NextResponse.json({ items, hasMore })
}
