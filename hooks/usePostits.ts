'use client';

import { useState, useCallback, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import type { PostIt, PostItColor, PostItFont, Template } from '@/types/postit';

let _nextId = 1;

function makeNote(posicao: number = 0): PostIt {
  return {
    id: _nextId++,
    cor: 'amarelo',
    fonte: 'caveat',
    tamanho: 18,
    texto: '',
    posicao,
  };
}

const STORAGE_KEY = 'coigre-postits';
const SESSION_KEY = 'coigre-session-id';

export function usePostits() {
  const [notes, setNotes] = useState<PostIt[]>(() => [makeNote(0)]);
  const [sessionId, setSessionId] = useState('');
  const [grupoId, setGrupoId] = useState(() => uuid());
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let id = localStorage.getItem(SESSION_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(SESSION_KEY, id);
    }
    setSessionId(id);
  }, []);

  const updateNote = useCallback(
    (index: number, changes: Partial<PostIt>) => {
      setNotes((prev) =>
        prev.map((n, i) => (i === index ? { ...n, ...changes } : n))
      );
    },
    []
  );

  const addNote = useCallback(() => {
    setNotes((prev) => {
      if (prev.length >= 5) return prev;
      return [...prev, makeNote(prev.length)];
    });
  }, []);

  const removeNote = useCallback((index: number) => {
    setNotes((prev) => {
      if (prev.length <= 1) return prev;
      return prev.filter((_, i) => i !== index).map((n, i) => ({ ...n, posicao: i }));
    });
  }, []);

  const applyTemplate = useCallback((index: number, template: Template) => {
    setNotes((prev) =>
      prev.map((n, i) => (i === index ? { ...n, texto: template.texto } : n))
    );
  }, []);

  const saveToServer = useCallback(async () => {
    if (!sessionId) return;
    setSaving(true);
    try {
      const res = await fetch('/api/postits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          notes: notes.map((n) => ({
            texto: n.texto,
            cor: n.cor,
            fonte: n.fonte,
            tamanho: n.tamanho,
          })),
        }),
      });
      return await res.json();
    } finally {
      setSaving(false);
    }
  }, [notes, sessionId]);

  const saveToLocal = useCallback(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    saved.push({
      grupo_id: grupoId,
      notes: JSON.parse(JSON.stringify(notes)),
      savedAt: new Date().toISOString(),
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  }, [notes, grupoId]);

  const resetAll = useCallback(() => {
    _nextId = 1;
    setNotes([makeNote(0)]);
    setGrupoId(uuid());
  }, []);

  return {
    notes,
    sessionId,
    grupoId,
    saving,
    updateNote,
    addNote,
    removeNote,
    applyTemplate,
    saveToServer,
    saveToLocal,
    resetAll,
  };
}
