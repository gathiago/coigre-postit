export type PostItColor = 'amarelo' | 'rosa' | 'azul' | 'verde' | 'laranja' | 'lilas';
export type PostItFont = 'caveat' | 'kalam' | 'patrick' | 'indie';

export interface PostIt {
  id?: number;
  session_id?: string;
  cor: PostItColor;
  fonte: PostItFont;
  tamanho: number;
  texto: string;
  posicao: number;
  grupo_id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Template {
  id: string;
  category: string;
  emoji: string;
  label: string;
  texto: string;
}

export interface ColorInfo {
  bg: string;
  tape: string;
}

export const COLOR_MAP: Record<PostItColor, ColorInfo> = {
  amarelo: { bg: '#FEEDA1', tape: '#f5e08a' },
  rosa:    { bg: '#FFBADB', tape: '#f06292' },
  azul:    { bg: '#B6D3F8', tape: '#8bb8f0' },
  verde:   { bg: '#A5D6A7', tape: '#66bb6a' },
  laranja: { bg: '#FFCC80', tape: '#ffa726' },
  lilas:   { bg: '#CE93D8', tape: '#ba68c8' },
};

export const FONT_MAP: Record<PostItFont, { label: string; family: string }> = {
  caveat:  { label: 'Caveat',       family: "'Caveat', cursive" },
  kalam:   { label: 'Kalam',        family: "'Kalam', cursive" },
  patrick: { label: 'Patrick Hand', family: "'Patrick Hand', cursive" },
  indie:   { label: 'Indie Flower', family: "'Indie Flower', cursive" },
};

export const SIZES = [14, 16, 18, 20, 24] as const;

export const ROTATIONS = ['-2deg', '1.5deg', '-1deg', '2deg', '-0.5deg'];

export const TEMPLATES: Template[] = [
  {
    id: 'amor-1',
    category: 'Amor',
    emoji: '💌',
    label: 'Amor',
    texto: 'Você é especial pra mim.\nObrigado por existir na minha vida. ❤️',
  },
  {
    id: 'amor-2',
    category: 'Amor',
    emoji: '💌',
    label: 'Pega na minha mão',
    texto: 'Pega na minha mão e vamos.\nJuntos a gente vai mais longe. 💕',
  },
  {
    id: 'fofo-1',
    category: 'Fofura',
    emoji: '🐣',
    label: 'Fofo',
    texto: 'Ei, só passando pra lembrar\nque você é incrível! 🌸',
  },
  {
    id: 'fofo-2',
    category: 'Fofura',
    emoji: '🐣',
    label: 'Bom dia',
    texto: 'Bom dia, pessoa linda!\nHoje vai ser um dia maravilhoso ☀️',
  },
  {
    id: 'lembrete-1',
    category: 'Lembrete',
    emoji: '📌',
    label: 'Lembrete',
    texto: 'Não esqueça de:\n✅ Tomar água\n✅ Respirar fundo\n✅ Ser feliz',
  },
  {
    id: 'lembrete-2',
    category: 'Lembrete',
    emoji: '📌',
    label: 'Lista',
    texto: '📋 Lista do dia:\n• Organizar a mesa\n• Responder mensagens\n• Descansar!',
  },
  {
    id: 'versiculo-1',
    category: 'Versículo',
    emoji: '📖',
    label: 'Salmos 23',
    texto: '"O Senhor é o meu pastor;\nnada me faltará."\n— Salmos 23:1',
  },
  {
    id: 'versiculo-2',
    category: 'Versículo',
    emoji: '📖',
    label: 'Jeremias 29',
    texto: '"Porque eu bem sei os planos\nque tenho para vocês"\n— Jeremias 29:11',
  },
  {
    id: 'motivacao-1',
    category: 'Motivação',
    emoji: '⚡',
    label: 'Motivação',
    texto: 'Vai com tudo!\nCada pequeno passo\nte leva mais longe. 🚀',
  },
  {
    id: 'motivacao-2',
    category: 'Motivação',
    emoji: '⚡',
    label: 'Força',
    texto: 'Você já passou por\ncoisas piores e venceu.\nVai vencer de novo! 💪',
  },
  {
    id: 'motivacao-3',
    category: 'Motivação',
    emoji: '⚡',
    label: 'Acredita',
    texto: 'Acredita em você!\nO melhor ainda está\npor vir. ✨',
  },
];
