import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Sprout } from 'lucide-react'
import { sanityFetch } from '@/sanity/lib/live'
import {
  MENSAGENS_POR_CATEGORIA_QUERY,
  MENSAGENS_POR_CATEGORIA_COUNT_QUERY,
} from '@/sanity/lib/queries'
import { CATEGORIAS, getCategoriaByValue } from '@/lib/categorias'
import MensagemCard from '@/components/MensagemCard'
import CategoryIcon from '@/components/CategoryIcon'
import type { Mensagem } from '@/lib/types'

const POR_PAGINA = 12

type Props = {
  params: Promise<{ categoria: string }>
  searchParams: Promise<{ pagina?: string }>
}

export async function generateStaticParams() {
  return CATEGORIAS.map((c) => ({ categoria: c.value }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria } = await params
  const cat = getCategoriaByValue(categoria)
  if (!cat) return {}

  return {
    title: `Mensagens de ${cat.title}`,
    description: `${cat.descricao}. Encontre as melhores mensagens de ${cat.title.toLowerCase()} no Gotas de Amor.`,
    openGraph: {
      title: `Mensagens de ${cat.title} | Gotas de Amor`,
      description: cat.descricao,
      url: `https://gotasdeamor.com.br/${categoria}`,
    },
  }
}

export default async function CategoriaPage({ params, searchParams }: Props) {
  const { categoria } = await params
  const { pagina: paginaParam } = await searchParams

  const cat = getCategoriaByValue(categoria)
  if (!cat) notFound()

  const pagina = Math.max(1, parseInt(paginaParam ?? '1'))
  const start = (pagina - 1) * POR_PAGINA
  const end = start + POR_PAGINA

  const [{ data: mensagens }, { data: total }] = await Promise.all([
    sanityFetch({
      query: MENSAGENS_POR_CATEGORIA_QUERY,
      params: { categoria, start, end },
    }),
    sanityFetch({
      query: MENSAGENS_POR_CATEGORIA_COUNT_QUERY,
      params: { categoria },
    }),
  ])

  const totalPaginas = Math.ceil((total ?? 0) / POR_PAGINA)
  const bgStrip = cat.cor.split(' ')[0]

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-rose-500 transition-colors">
          Início
        </Link>
        <span className="text-gray-200">/</span>
        <span className="text-gray-600">{cat.title}</span>
      </nav>

      {/* Cabeçalho da categoria */}
      <div className={`${bgStrip} rounded-3xl p-10 mb-12 text-center shadow-sm`}>
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/70 mb-4 shadow-sm">
          <CategoryIcon name={cat.iconName} size={30} className={cat.iconColor} />
        </div>
        <h1
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-2"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          Mensagens de {cat.title}
        </h1>
        <p className="text-gray-500 max-w-md mx-auto">{cat.descricao}</p>
        {total !== null && (
          <p className="text-sm text-gray-400 mt-3">
            {total} mensagem{total !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      {/* Grid de mensagens */}
      {mensagens && mensagens.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {(mensagens as Mensagem[]).map((m) => (
              <MensagemCard key={m._id} mensagem={m} />
            ))}
          </div>

          {/* Paginação */}
          {totalPaginas > 1 && (
            <div className="flex items-center justify-center gap-3">
              {pagina > 1 && (
                <Link
                  href={`/${categoria}?pagina=${pagina - 1}`}
                  className="px-5 py-2.5 rounded-full border border-gray-200 text-sm text-gray-600 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600 transition-all duration-200 shadow-sm"
                >
                  ← Anterior
                </Link>
              )}

              <span className="text-sm text-gray-400 px-4">
                {pagina} / {totalPaginas}
              </span>

              {pagina < totalPaginas && (
                <Link
                  href={`/${categoria}?pagina=${pagina + 1}`}
                  className="px-5 py-2.5 rounded-full border border-gray-200 text-sm text-gray-600 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600 transition-all duration-200 shadow-sm"
                >
                  Próxima →
                </Link>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20 text-gray-400">
          <Sprout size={40} className="mx-auto mb-4 text-gray-300" strokeWidth={1.5} />
          <p className="text-lg">Nenhuma mensagem encontrada nesta categoria ainda.</p>
        </div>
      )}

      {/* Outras categorias */}
      <div className="mt-16 border-t border-gray-100 pt-10">
        <h2
          className="text-lg font-semibold text-gray-700 mb-5"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          Outras categorias
        </h2>
        <div className="flex flex-wrap gap-2">
          {CATEGORIAS.filter((c) => c.value !== categoria).map((c) => (
            <Link
              key={c.value}
              href={`/${c.value}`}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-sm text-gray-600 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600 transition-all duration-200 shadow-sm"
            >
              <CategoryIcon name={c.iconName} size={13} className={c.iconColor} />
              {c.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
