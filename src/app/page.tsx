import type { Metadata } from 'next'
import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/live'
import { MENSAGENS_DESTAQUE_QUERY } from '@/sanity/lib/queries'
import { CATEGORIAS } from '@/lib/categorias'
import MensagemCard from '@/components/MensagemCard'
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
      <section className="bg-gradient-to-br from-rose-50 via-white to-pink-50 border-b border-rose-100">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <div className="text-5xl mb-4">💧</div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
            Mensagens que tocam o{' '}
            <span className="text-rose-500">coração</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto mb-8">
            Encontre a mensagem perfeita para compartilhar amor, fé, alegria e carinho com quem você ama.
          </p>
          <Link
            href="#categorias"
            className="inline-block px-8 py-3 bg-rose-500 hover:bg-rose-600 text-white font-medium rounded-full text-lg transition-colors shadow-md hover:shadow-lg"
          >
            Explorar mensagens
          </Link>
        </div>
      </section>

      {/* Categorias */}
      <section id="categorias" className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Categorias</h2>
        <p className="text-gray-400 mb-8">Escolha um tema e encontre a mensagem certa</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {CATEGORIAS.map((cat) => (
            <Link
              key={cat.value}
              href={`/${cat.value}`}
              className={`${cat.cor} rounded-2xl p-5 text-center transition-all duration-200 group hover:shadow-md hover:-translate-y-0.5`}
            >
              <div className="text-3xl mb-2">{cat.emoji}</div>
              <div className="font-semibold text-gray-700 text-sm group-hover:text-gray-900">
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
        <section className="max-w-6xl mx-auto px-4 py-10 border-t border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Mensagens em Destaque</h2>
          <p className="text-gray-400 mb-8">Selecionadas com carinho para você</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {(destaques as Mensagem[]).map((m) => (
              <MensagemCard key={m._id} mensagem={m} />
            ))}
          </div>
        </section>
      )}

      {/* CTA final */}
      <section className="bg-rose-50 border-t border-rose-100 mt-10">
        <div className="max-w-2xl mx-auto px-4 py-14 text-center">
          <p className="text-2xl font-bold text-gray-700 mb-3">
            Mais de 200 mensagens esperando por você 💬
          </p>
          <p className="text-gray-400 mb-6">
            Explore todas as categorias e encontre as palavras certas para cada momento especial.
          </p>
          <Link
            href="#categorias"
            className="inline-block px-7 py-3 bg-rose-500 hover:bg-rose-600 text-white font-medium rounded-full transition-colors"
          >
            Ver todas as categorias
          </Link>
        </div>
      </section>
    </>
  )
}
