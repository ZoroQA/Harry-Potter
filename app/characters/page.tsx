"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import CharacterCard from "@/components/character-card";
import { Search } from "lucide-react";
import { useFavorites } from "@/components/favorites";

export type Character = {
  id: string;
  name: string;
  image: string;
  house?: string;
  patronus?: string;
};

export default function CharactersPage() {
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const favorites = useFavorites();

  const params = useMemo(
    () =>
      new URLSearchParams({
        q,
        page: String(page),
        limit: "24",
      }).toString(),
    [q, page]
  );

  // при изменении поискового запроса обнуляем
  useEffect(() => {
    setItems([]);
    setPage(1);
    setHasMore(true);
  }, [q]);

  // подгрузка данных
  useEffect(() => {
    let cancel = false;

    const run = async () => {
      if (!hasMore || loading) return;
      setLoading(true);
      const res = await fetch(`/api/characters?${params}`);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      const data = await res.json();

      if (!cancel) {
        setItems((prev) => [...prev, ...data]);
        setHasMore(data.length > 0);
        setLoading(false);
      }
    };

    run();
    return () => {
      cancel = true;
    };
  }, [params, hasMore, loading]);

  // наблюдатель за скроллом (lazy-loading)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [loaderRef, hasMore, loading]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Персонажи</h1>
      <div className="mb-4 flex items-center gap-2">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Поиск по имени..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        />
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((c) => (
          <CharacterCard
            key={c.id}
            {...c}
            isFav={favorites.isFav(c.id)}
            toggle={() => favorites.toggle(c)}
          />
        ))}
      </div>

      {loading && <p className="mt-4 text-gray-400">Загрузка...</p>}
      <div ref={loaderRef} className="h-10"></div>
    </div>
  );
}
