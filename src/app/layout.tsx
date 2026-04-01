import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { SanityLive } from '@/sanity/lib/live'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://gotasdeamor.com.br'),
  title: {
    default: 'Gotas de Amor — Mensagens Temáticas',
    template: '%s | Gotas de Amor',
  },
  description:
    'Portal de mensagens de amor, fé, motivação, bom dia, boa noite, aniversário e muito mais. Compartilhe carinho com quem você ama.',
  keywords: ['mensagens', 'frases', 'amor', 'bom dia', 'boa noite', 'motivação', 'fé', 'família'],
  openGraph: {
    siteName: 'Gotas de Amor',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col" style={{ background: 'var(--background)' }}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <SanityLive />
      </body>
    </html>
  )
}
