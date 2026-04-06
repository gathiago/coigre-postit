import type { Metadata } from 'next';
import { DM_Sans, Noto_Serif, Caveat, Kalam, Patrick_Hand, Indie_Flower } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-heading',
});

const notoSerif = Noto_Serif({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-body',
});

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-caveat',
});

const kalam = Kalam({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-kalam',
});

const patrickHand = Patrick_Hand({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-patrick',
});

const indieFlower = Indie_Flower({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-indie',
});

export const metadata: Metadata = {
  title: '📌 Coigre Post-it Virtual',
  description: 'Crie, personalize e baixe post-its virtuais com a identidade Coigre',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`
        ${dmSans.variable} ${notoSerif.variable}
        ${caveat.variable} ${kalam.variable}
        ${patrickHand.variable} ${indieFlower.variable}
      `}
    >
      <body className="font-body text-coigre-burgundy">
        {/* Header */}
        <header className="text-center pt-8 pb-4 px-5">
          <h1 className="font-heading font-bold text-coigre-burgundy text-4xl sm:text-5xl tracking-tight">
            📌 Coigre Post-it
          </h1>
          <p className="font-patrick text-coigre-burgundy/60 text-base sm:text-lg mt-1.5">
            Escreva, personalize e baixe sua mensagem em imagem
          </p>
          <nav className="flex justify-center gap-6 mt-4">
            <a
              href="/"
              className="font-heading font-bold text-sm text-coigre-burgundy/80
                         hover:text-coigre-burgundy border-b-2 border-transparent
                         hover:border-coigre-burgundy/30 pb-1 transition-colors"
            >
              Criar
            </a>
            <a
              href="/galeria"
              className="font-heading font-bold text-sm text-coigre-burgundy/80
                         hover:text-coigre-burgundy border-b-2 border-transparent
                         hover:border-coigre-burgundy/30 pb-1 transition-colors"
            >
              Galeria
            </a>
          </nav>
        </header>

        {/* Content */}
        <main className="max-w-2xl mx-auto px-4 pb-20">
          {children}
        </main>

        <Toaster
          position="bottom-center"
          toastOptions={{
            className: 'toast-coigre',
            style: {
              background: '#691F31',
              color: '#fff',
              borderRadius: '24px',
              padding: '10px 22px',
            },
          }}
        />
      </body>
    </html>
  );
}
