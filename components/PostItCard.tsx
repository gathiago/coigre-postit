'use client';

import { COLOR_MAP, FONT_MAP, SIZES, ROTATIONS, type PostIt, type PostItColor, type PostItFont } from '@/types/postit';
import ColorPicker from './ColorPicker';
import FontPicker from './FontPicker';

interface Props {
  postit: PostIt;
  index: number;
  total: number;
  onUpdate: (index: number, changes: Partial<PostIt>) => void;
  onRemove: (index: number) => void;
}

export default function PostItCard({ postit, index, total, onUpdate, onRemove }: Props) {
  const color = COLOR_MAP[postit.cor];
  const font = FONT_MAP[postit.fonte];
  const rotation = ROTATIONS[index % ROTATIONS.length];

  return (
    <div
      className="flex flex-col items-center w-full"
      style={{ transform: `rotate(${rotation})` }}
    >
      {/* Tape */}
      <div
        className="tape"
        style={{ backgroundColor: color.tape + 'cc' }}
      />

      {/* Card */}
      <div
        className="postit-card w-full max-w-[320px] relative"
        style={{ backgroundColor: color.bg }}
      >
        {/* Remove button */}
        {total > 1 && (
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="absolute top-2 right-3 bg-transparent border-none
                       text-sm cursor-pointer opacity-30 hover:opacity-70
                       transition-opacity z-10"
            title="Remover post-it"
          >
            ✕
          </button>
        )}

        {/* Textarea */}
        <textarea
          value={postit.texto}
          onChange={(e) => onUpdate(index, { texto: e.target.value })}
          placeholder="Escreva sua mensagem aqui..."
          className="w-full min-h-[145px] bg-transparent border-none outline-none
                     resize-none text-black/70 placeholder:text-black/25"
          style={{
            fontFamily: font.family,
            fontSize: `${postit.tamanho}px`,
            lineHeight: '28px',
            paddingTop: '4px',
          }}
        />

        {/* Controls */}
        <div className="flex gap-2 items-center flex-wrap mt-2">
          <ColorPicker
            selected={postit.cor}
            onChange={(cor: PostItColor) => onUpdate(index, { cor })}
          />

          <FontPicker
            selected={postit.fonte}
            onChange={(fonte: PostItFont) => onUpdate(index, { fonte })}
          />

          <select
            value={postit.tamanho}
            onChange={(e) => onUpdate(index, { tamanho: parseInt(e.target.value) })}
            className="bg-black/5 border-none rounded-full px-2.5 py-1
                       text-xs cursor-pointer outline-none text-black/70 font-body"
          >
            {SIZES.map((s) => (
              <option key={s} value={s}>
                {s}px
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
