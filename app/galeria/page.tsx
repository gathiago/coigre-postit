'use client';

import { useEffect, useState } from 'react';
import PostItPreview from '@/components/PostItPreview';
import type { PostIt } from '@/types/postit';

interface Group {
  grupo_id: string;
  notes: PostIt[];
  created_at: string;
}

export default function GaleriaPage() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sessionId = localStorage.getItem('coigre-session-id');
    if (!sessionId) {
      setLoading(false);
      return;
    }

    fetch(`/api/postits?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((rows: PostIt[]) => {
        if (!Array.isArray(rows)) {
          setLoading(false);
          return;
        }

        const map = new Map<string, Group>();
        for (const row of rows) {
          const gid = row.grupo_id!;
          if (!map.has(gid)) {
            map.set(gid, {
              grupo_id: gid,
              notes: [],
              created_at: row.created_at || '',
            });
          }
          map.get(gid)!.notes.push(row);
        }

        setGroups(Array.from(map.values()));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleDelete = async (grupoId: string) => {
    const group = groups.find((g) => g.grupo_id === grupoId);
    if (!group) return;

    await Promise.all(
      group.notes.map((n) =>
        fetch(`/api/postits/${n.id}`, { method: 'DELETE' })
      )
    );

    setGroups((prev) => prev.filter((g) => g.grupo_id !== grupoId));
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center gap-6 mt-8">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-full max-w-[320px] h-48 rounded bg-coigre-burgundy/5 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (groups.length === 0) {
    return (
      <div className="text-center mt-16">
        <p className="font-heading text-2xl text-coigre-burgundy/40 mb-4">
          Nenhum post-it salvo ainda
        </p>
        <a
          href="/"
          className="inline-block bg-coigre-burgundy text-white rounded-full
                     px-6 py-3 font-heading font-bold text-sm
                     hover:-translate-y-0.5 transition-all"
        >
          Criar meu primeiro post-it
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 mt-4">
      {groups.map((group) => (
        <div key={group.grupo_id} className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            <p className="font-patrick text-xs text-coigre-burgundy/40">
              {group.created_at
                ? new Date(group.created_at).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : ''}
            </p>
            <button
              type="button"
              onClick={() => handleDelete(group.grupo_id)}
              className="text-xs text-red-400 hover:text-red-600 font-heading
                         transition-colors cursor-pointer"
            >
              Excluir
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {group.notes.map((note, i) => (
              <PostItPreview key={note.id} postit={note} index={i} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
