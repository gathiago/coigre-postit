'use client';

import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { usePostits } from '@/hooks/usePostits';
import PostItCard from '@/components/PostItCard';
import PostItPreview from '@/components/PostItPreview';
import TemplateMenu from '@/components/TemplateMenu';
import { downloadPng } from '@/utils/exportImage';
import type { Template } from '@/types/postit';

export default function HomePage() {
  const {
    notes,
    saving,
    updateNote,
    addNote,
    removeNote,
    applyTemplate,
    saveToServer,
    saveToLocal,
    resetAll,
  } = usePostits();

  const exportRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTemplate = (template: Template) => {
    const idx = Math.min(activeIndex, notes.length - 1);
    applyTemplate(idx, template);
  };

  const handleDownload = async () => {
    if (!exportRef.current) return;
    setExporting(true);
    try {
      await downloadPng(exportRef.current);
      toast.success('Imagem baixada!');
    } catch {
      toast.error('Erro ao gerar imagem. Tente novamente.');
    } finally {
      setExporting(false);
    }
  };

  const handleSave = async () => {
    saveToLocal();
    try {
      await saveToServer();
      toast.success('Salvo com sucesso!');
    } catch {
      toast.success('Salvo no dispositivo!');
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Templates */}
      <TemplateMenu onSelect={handleTemplate} />

      {/* Post-it cards */}
      <div className="w-full flex flex-col items-center gap-5 mt-2">
        {notes.map((note, i) => (
          <div key={note.id} onClick={() => setActiveIndex(i)} className="w-full flex justify-center">
            <PostItCard
              postit={note}
              index={i}
              total={notes.length}
              onUpdate={updateNote}
              onRemove={removeNote}
            />
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-3 flex-wrap justify-center mt-4">
        {notes.length < 5 && (
          <button
            type="button"
            onClick={addNote}
            className="bg-coigre-burgundy/10 text-coigre-burgundy border-2 border-coigre-burgundy/15
                       rounded-full px-5 py-2.5 font-heading text-sm font-bold
                       cursor-pointer transition-transform active:scale-95"
          >
            + Adicionar post-it ({notes.length}/5)
          </button>
        )}
      </div>

      <div className="flex gap-3 flex-wrap justify-center mt-1">
        <button
          type="button"
          onClick={handleDownload}
          disabled={exporting}
          className="bg-coigre-burgundy text-white border-none rounded-full
                     px-6 py-3 font-heading text-base font-bold cursor-pointer
                     shadow-lg shadow-coigre-burgundy/25
                     hover:-translate-y-0.5 hover:shadow-xl
                     active:scale-95 transition-all
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {exporting ? '⏳ Gerando...' : '📥 Baixar imagem'}
        </button>

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="bg-emerald-700 text-white border-none rounded-full
                     px-5 py-3 font-heading text-base font-bold cursor-pointer
                     shadow-lg shadow-emerald-700/25
                     active:scale-95 transition-all
                     disabled:opacity-50"
        >
          {saving ? '⏳ Salvando...' : '💾 Salvar'}
        </button>

        <button
          type="button"
          onClick={() => { resetAll(); toast('Recomeçar!', { icon: '🔄' }); }}
          className="bg-coigre-burgundy/10 text-coigre-burgundy border-2 border-coigre-burgundy/15
                     rounded-full px-4 py-2.5 font-heading text-sm font-bold
                     cursor-pointer transition-transform active:scale-95"
        >
          🔄 Novo
        </button>
      </div>

      <p className="font-patrick text-xs text-coigre-burgundy/40 text-center mt-1">
        💡 Salvar guarda no dispositivo e no servidor &bull; Baixar gera o PNG
      </p>

      {/* Hidden export area */}
      <div className="export-area">
        <div
          ref={exportRef}
          className="flex flex-col items-center gap-5 p-12"
          style={{ backgroundColor: 'transparent' }}
        >
          {notes.map((note, i) => (
            <PostItPreview key={note.id} postit={note} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
