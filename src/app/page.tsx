import type { Metadata } from 'next'
import Link from 'next/link'
import { Droplets, MessageCircle } from 'lucide-react'
import { sanityFetch } from '@/sanity/lib/live'
import { MENSAGENS_DESTAQUE_QUERY } from '@/sanity/lib/queries'
import { CATEGORIAS } from '@/lib/categorias'
import MensagemCard from '@/components/MensagemCard'
import CategoryIcon from '@/components/CategoryIcon'
import type { Mensagem } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Gotas de Amor — Mensagens Temáticas',
  description:
    'Encontre mensagens de amor, fé, motivação, bom dia, boa noite, aniversário e muito mais. Compartilhe carinho com quem você ama.',
  openGraph: {
    title: 'Gotas de Amor — Mensagens Temáticas',
    description:
      'Portal de mensagens para compartilhar amor, fé e carinho com quem você ama.',
    url: 'https://gotasdeamor.com.br',
  },
}

export default async function HomePage() {
  const { data: destaques } = await sanityFetch({ query: MENSAGENS_DESTAQUE_QUERY })

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-white to-pink-50/60 border-b border-rose-100/60">
        {/* Decorativo */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-rose-100/30 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full bg-pink-100/30 blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 py-24 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-100/80 mb-6 shadow-sm">
            <Droplets size={32} className="text-rose-500" strokeWidth={1.5} />
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-5 leading-tight"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Mensagens que tocam o{' '}
            <span className="text-rose-500">coração</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto mb-10 leading-relaxed">
            Encontre a mensagem perfeita para compartilhar amor, fé, alegria e carinho com quem você ama.
          </p>
          <Link
            href="#categorias"
            className="inline-block px-8 py-3.5 bg-rose-500 hover:bg-rose-600 text-white font-medium rounded-full text-base transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            Explorar mensagens
          </Link>
        </div>
      </section>

      {/* Categorias */}
      <section id="categorias" className="max-w-6xl mx-auto px-4 py-16">
        <div className="mb-10">
          <h2
            className="text-2xl md:text-3xl font-bold text-gray-800 mb-2"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Categorias
          </h2>
          <p className="text-gray-400">Escolha um tema e encontre a mensagem certa</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {CATEGORIAS.map((cat) => (
            <Link
              key={cat.value}
              href={`/${cat.value}`}
              className={`${cat.cor} rounded-2xl p-5 text-center transition-all duration-300 group hover:shadow-md hover:-translate-y-1 border border-transparent hover:border-white`}
            >
              <div className="flex justify-center mb-3">
                <div className="w-11 h-11 rounded-xl bg-white/70 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-300">
                  <CategoryIcon name={cat.iconName} size={22} className={cat.iconColor} />
                </div>
              </div>
              <div
                className="font-semibold text-gray-700 text-sm group-hover:text-gray-900 transition-colors"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                {cat.title}
              </div>
              <div className="text-xs text-gray-400 mt-1 leading-snug hidden sm:block">
                {cat.descricao}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Destaques */}
      {destaques && destaques.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-12 border-t border-gray-100">
          <div className="mb-8">
            <h2
              className="text-2xl md:text-3xl font-bold text-gray-800 mb-2"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Mensagens em Destaque
            </h2>
            <p className="text-gray-400">Selecionadas com carinho para você</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {(destaques as Mensagem[]).map((m) => (
              <MensagemCard key={m._id} mensagem={m} />
            ))}
          </div>
        </section>
      )}

      {/* CTA final */}
      <section className="bg-gradient-to-br from-rose-50 to-pink-50/40 border-t border-rose-100/60 mt-10">
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <MessageCircle
            size={36}
            className="text-rose-300 mx-auto mb-4"
            strokeWidth={1.5}
          />
          <p
            className="text-2xl md:text-3xl font-bold text-gray-700 mb-3"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Mais de 200 mensagens esperando por você
          </p>
          <p className="text-gray-400 mb-8 leading-relaxed">
            Explore todas as categorias e encontre as palavras certas para cada momento especial.
          </p>
          <Link
            href="#categorias"
            className="inline-block px-8 py-3.5 bg-rose-500 hover:bg-rose-600 text-white font-medium rounded-full transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            Ver todas as categorias
          </Link>
        </div>
      </section>
    </>
  )
}
