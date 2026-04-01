import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { client } from '@/sanity/client'
import { sanityFetch } from '@/sanity/lib/live'
import {
  MENSAGEM_QUERY,
  MENSAGENS_SLUGS_QUERY,
  MENSAGENS_RELACIONADAS_QUERY,
} from '@/sanity/lib/queries'
import { getCategoriaByValue } from '@/lib/categorias'
import MensagemCard from '@/components/MensagemCard'
import BotaoCompartilhar from '@/components/BotaoCompartilhar'

type Props = {
  params: Promise<{ categoria: string; slug: string }>
}

export async function generateStaticParams() {
  const slugs = await client
    .withConfig({ useCdn: false })
    .fetch(MENSAGENS_SLUGS_QUERY)

  return (slugs ?? []).map((item: { slug: string; categoria: string }) => ({
    categoria: item.categoria,
    slug: item.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const { data: mensagem } = await sanityFetch({
    query: MENSAGEM_QUERY,
    params: { slug },
    stega: false,
  })

  if (!mensagem) return {}

  const cat = getCategoriaByValue(mensagem.categoria)
  const descricao = mensagem.texto.slice(0, 155).trimEnd() + '…'

  return {
    title: mensagem.titulo,
    description: descricao,
    openGraph: {
      title: `${mensagem.titulo} | Gotas de Amor`,
      description: descricao,
      url: `https://gotasdeamor.com.br/${mensagem.categoria}/${mensagem.slug}`,
      type: 'article',
    },
    keywords: mensagem.tags ?? [],
    alternates: {
      canonical: `https://gotasdeamor.com.br/${mensagem.categoria}/${mensagem.slug}`,
    },
  }
}

export default async function MensagemPage({ params }: Props) {
  const { categoria, slug } = await params

  const [{ data: mensagem }, { data: relacionadas }] = await Promise.all([
    sanityFetch({ query: MENSAGEM_QUERY, params: { slug } }),
    sanityFetch({
      query: MENSAGENS_RELACIONADAS_QUERY,
      params: { categoria, slug },
    }),
  ])

  if (!mensagem) notFound()

  const cat = getCategoriaByValue(mensagem.categoria)

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-8 flex items-center gap-2 flex-wrap">
        <Link href="/" className="hover:text-rose-500 transition-colors">
          Início
        </Link>
        <span>/</span>
        <Link
          href={`/${mensagem.categoria}`}
          className="hover:text-rose-500 transition-colors"
        >
          {cat?.title ?? mensagem.categoria}
        </Link>
        <span>/</span>
        <span className="text-gray-600 truncate max-w-[200px]">{mensagem.titulo}</span>
      </nav>

      {/* Card principal */}
      <article className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Cabeçalho com categoria */}
        <div className={`${cat?.cor.split(' ')[0] ?? 'bg-rose-100'} px-8 py-6`}>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">{cat?.emoji ?? '💬'}</span>
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              {cat?.title ?? mensagem.categoria}
            </span>
            {mensagem.destaque && (
              <span className="ml-auto text-xs bg-white/80 text-rose-600 px-3 py-0.5 rounded-full font-medium">
                Destaque
              </span>
            )}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 leading-snug mt-2">
            {mensagem.titulo}
          </h1>
        </div>

        {/* Texto da mensagem */}
        <div className="px-8 py-8">
          <blockquote className="text-lg text-gray-700 leading-relaxed whitespace-pre-line border-l-4 border-rose-200 pl-5">
            {mensagem.texto}
          </blockquote>

          {/* Tags */}
          {mensagem.tags && mensagem.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {mensagem.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Botões de compartilhamento */}
          <BotaoCompartilhar titulo={mensagem.titulo} texto={mensagem.texto} />
        </div>
      </article>

      {/* Mensagens relacionadas */}
      {relacionadas && relacionadas.length > 0 && (
        <section className="mt-14">
          <h2 className="text-xl font-bold text-gray-700 mb-5">
            Mais mensagens de {cat?.title ?? mensagem.categoria}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relacionadas.map((m: { _id: string; titulo: string; slug: string; texto: string; categoria: string; tags?: string[]; destaque?: boolean }) => (
              <MensagemCard key={m._id} mensagem={m} />
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link
              href={`/${mensagem.categoria}`}
              className="inline-block px-6 py-2.5 border border-rose-200 text-rose-600 hover:bg-rose-50 rounded-full text-sm font-medium transition-colors"
            >
              Ver todas as mensagens de {cat?.title} →
            </Link>
          </div>
        </section>
      )}
    </div>
  )
}
