import Link from 'next/link'
import { Star } from 'lucide-react'
import { getCategoriaByValue } from '@/lib/categorias'
import CategoryIcon from '@/components/CategoryIcon'

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

  // Extrai a cor de fundo da primeira classe do cor (ex: 'bg-amber-50')
  const bgStrip = cat ? cat.cor.split(' ')[0] : 'bg-rose-100'

  return (
    <Link
      href={`/${mensagem.categoria}/${mensagem.slug}`}
      className="group block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
    >
      {/* Faixa de cor da categoria */}
      <div className={`h-1 w-full ${bgStrip}`} />

      <div className="p-5">
        {/* Badge de categoria */}
        <div className="flex items-center gap-1.5 mb-3">
          {cat ? (
            <CategoryIcon name={cat.iconName} size={14} className={cat.iconColor} />
          ) : (
            <CategoryIcon name="MessageCircle" size={14} className="text-rose-400" />
          )}
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
            {cat?.title ?? mensagem.categoria}
          </span>
          {mensagem.destaque && (
            <span className="ml-auto flex items-center gap-1 text-xs bg-rose-50 text-rose-500 px-2 py-0.5 rounded-full font-medium">
              <Star size={10} strokeWidth={2} className="fill-rose-400 text-rose-400" />
              Destaque
            </span>
          )}
        </div>

        {/* Título */}
        <h2
          className="text-base font-semibold text-gray-800 mb-2 group-hover:text-rose-600 transition-colors leading-snug"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
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
                className="text-xs bg-gray-50 text-gray-400 border border-gray-100 px-2 py-0.5 rounded-full"
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
