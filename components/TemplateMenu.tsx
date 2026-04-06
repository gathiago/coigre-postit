'use client';

import { useState } from 'react';
import { TEMPLATES, type Template } from '@/types/postit';

interface Props {
  onSelect: (template: Template) => void;
}

export default function TemplateMenu({ onSelect }: Props) {
  const [open, setOpen] = useState(false);

  const categories = [...new Set(TEMPLATES.map((t) => t.category))];

  return (
    <div className="w-full flex flex-col items-center">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="bg-coigre-burgundy/10 text-coigre-burgundy border-2 border-coigre-burgundy/15
                   rounded-full px-5 py-2.5 font-heading text-sm font-bold
                   cursor-pointer transition-transform active:scale-95"
      >
        {open ? '▲ Fechar templates' : '✨ Usar template pronto'}
      </button>

      {open && (
        <div className="flex flex-wrap gap-2 justify-center mt-3 animate-in">
          {categories.map((cat) => {
            const items = TEMPLATES.filter((t) => t.category === cat);
            return items.map((tpl) => (
              <button
                key={tpl.id}
                type="button"
                onClick={() => {
                  onSelect(tpl);
                  setOpen(false);
                }}
                className="bg-white/75 border-2 border-coigre-burgundy/10 rounded-2xl
                           px-3.5 py-2 font-patrick text-sm cursor-pointer
                           text-coigre-burgundy transition-transform active:scale-95
                           hover:bg-white hover:border-coigre-burgundy/25"
              >
                {tpl.emoji} {tpl.label}
              </button>
            ));
          })}
        </div>
      )}
    </div>
  );
}
