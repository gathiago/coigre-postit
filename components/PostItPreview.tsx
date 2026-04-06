'use client';

import { COLOR_MAP, FONT_MAP, ROTATIONS, type PostIt } from '@/types/postit';

interface Props {
  postit: PostIt;
  index: number;
}

export default function PostItPreview({ postit, index }: Props) {
  const color = COLOR_MAP[postit.cor];
  const font = FONT_MAP[postit.fonte];
  const rotation = ROTATIONS[index % ROTATIONS.length];

  return (
    <div
      className="flex flex-col items-center"
      style={{ transform: `rotate(${rotation})` }}
    >
      {/* Tape */}
      <div
        className="w-[62px] h-[18px] rounded-sm -mb-2.5 z-10 opacity-85"
        style={{ backgroundColor: color.tape + 'cc' }}
      />

      {/* Card */}
      <div
        className="w-[320px] min-h-[200px] rounded-sm shadow-postit
                   px-5 whitespace-pre-wrap break-words text-black/70"
        style={{
          backgroundColor: color.bg,
          fontFamily: font.family,
          fontSize: `${postit.tamanho}px`,
          lineHeight: '28px',
          paddingTop: '10px',
          paddingBottom: '14px',
          backgroundImage: `repeating-linear-gradient(
            transparent, transparent 27px,
            rgba(105,31,49,0.08) 27px, rgba(105,31,49,0.08) 28px
          )`,
          backgroundPositionY: '6px',
        }}
      >
        {postit.texto}
      </div>
    </div>
  );
}
