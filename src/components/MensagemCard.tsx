import Link from 'next/link'
import { getCategoriaByValue } from '@/lib/categorias'

type Props = {
  mensagem: {
    _id: string
    titulo: string
    slug: string
    texto: string
    categoria: string
    tags?: string[]
    destaque?: boolean
  }
}

export default function MensagemCard({ mensagem }: Props) {
  const cat = getCategoriaByValue(mensagem.categoria)
  const textoPreview =
    mensagem.texto.length > 160
      ? mensagem.texto.slice(0, 160).trimEnd() + '…'
      : mensagem.texto

  return (
    <Link
      href={`/${mensagem.categoria}/${mensagem.slug}`}
      className="group block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
    >
      {/* Faixa de categoria */}
      <div className={`h-1.5 w-full ${cat ? cat.cor.split(' ')[0].replace('bg-', 'bg-') : 'bg-rose-200'}`} />

      <div className="p-5">
        {/* Badge de categoria */}
        <div className="flex items-center gap-1.5 mb-3">
          <span className="text-base">{cat?.emoji ?? '💬'}</span>
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
            {cat?.title ?? mensagem.categoria}
          </span>
          {mensagem.destaque && (
            <span className="ml-auto text-xs bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full font-medium">
              Destaque
            </span>
          )}
        </div>

        {/* Título */}
        <h2 className="text-base font-semibold text-gray-800 mb-2 group-hover:text-rose-600 transition-colors leading-snug">
          {mensagem.titulo}
        </h2>

        {/* Preview do texto */}
        <p className="text-sm text-gray-500 leading-relaxed">{textoPreview}</p>

        {/* Tags */}
        {mensagem.tags && mensagem.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {mensagem.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
