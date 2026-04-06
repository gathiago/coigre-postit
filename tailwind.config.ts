import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './hooks/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        coigre: {
          blue: '#B6D3F8',
          pink: '#FFBADB',
          yellow: '#FEEDA1',
          burgundy: '#691F31',
          white: '#FFFFFD',
        },
        postit: {
          amarelo: '#FEEDA1',
          rosa: '#FFBADB',
          azul: '#B6D3F8',
          verde: '#A5D6A7',
          laranja: '#FFCC80',
          lilas: '#CE93D8',
        },
        tape: {
          amarelo: '#f5e08a',
          rosa: '#f06292',
          azul: '#8bb8f0',
          verde: '#66bb6a',
          laranja: '#ffa726',
          lilas: '#ba68c8',
        },
      },
      fontFamily: {
        heading: ['var(--font-heading)', '"DM Sans"', 'sans-serif'],
        body: ['var(--font-body)', '"Noto Serif"', 'serif'],
        caveat: ['var(--font-caveat)', 'Caveat', 'cursive'],
        kalam: ['var(--font-kalam)', 'Kalam', 'cursive'],
        patrick: ['var(--font-patrick)', '"Patrick Hand"', 'cursive'],
        indie: ['var(--font-indie)', '"Indie Flower"', 'cursive'],
      },
    },
  },
  plugins: [],
};

export default config;
