'use client';

import { COLOR_MAP, type PostItColor } from '@/types/postit';

const COLORS = Object.keys(COLOR_MAP) as PostItColor[];

interface Props {
  selected: PostItColor;
  onChange: (color: PostItColor) => void;
}

export default function ColorPicker({ selected, onChange }: Props) {
  return (
    <div className="flex gap-1.5">
      {COLORS.map((color) => (
        <button
          key={color}
          type="button"
          aria-label={color}
          onClick={() => onChange(color)}
          className={`
            w-5 h-5 rounded-full shrink-0 transition-transform
            shadow-sm hover:scale-110
            ${selected === color
              ? 'ring-2 ring-coigre-burgundy ring-offset-1 scale-110'
              : 'ring-1 ring-black/10'
            }
          `}
          style={{ backgroundColor: COLOR_MAP[color].bg }}
        />
      ))}
    </div>
  );
}
