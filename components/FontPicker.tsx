'use client';

import { FONT_MAP, type PostItFont } from '@/types/postit';

const FONTS = Object.keys(FONT_MAP) as PostItFont[];

interface Props {
  selected: PostItFont;
  onChange: (font: PostItFont) => void;
}

export default function FontPicker({ selected, onChange }: Props) {
  return (
    <select
      value={selected}
      onChange={(e) => onChange(e.target.value as PostItFont)}
      className="bg-black/5 border-none rounded-full px-3 py-1 text-xs
                 cursor-pointer outline-none text-black/70"
      style={{ fontFamily: FONT_MAP[selected].family }}
    >
      {FONTS.map((font) => (
        <option key={font} value={font} style={{ fontFamily: FONT_MAP[font].family }}>
          {FONT_MAP[font].label}
        </option>
      ))}
    </select>
  );
}
