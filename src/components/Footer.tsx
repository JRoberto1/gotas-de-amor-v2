import Link from 'next/link'
import { Droplets } from 'lucide-react'
import { CATEGORIAS } from '@/lib/categorias'
import CategoryIcon from '@/components/CategoryIcon'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Logo e descrição */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <Droplets
                size={22}
                className="text-rose-500 group-hover:text-rose-600 transition-colors"
                strokeWidth={1.75}
              />
              <span
                className="text-lg font-bold text-rose-600"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                Gotas de Amor
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Portal de mensagens temáticas para compartilhar amor, fé, motivação e carinho com quem você ama.
            </p>
          </div>

          {/* Categorias */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">
              Categorias
            </h3>
            <ul className="space-y-2">
              {CATEGORIAS.slice(0, 6).map((cat) => (
                <li key={cat.value}>
                  <Link
                    href={`/${cat.value}`}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-rose-500 transition-colors"
                  >
                    <CategoryIcon name={cat.iconName} size={13} className={cat.iconColor} />
                    {cat.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">
              Mais Categorias
            </h3>
            <ul className="space-y-2">
              {CATEGORIAS.slice(6).map((cat) => (
                <li key={cat.value}>
                  <Link
                    href={`/${cat.value}`}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-rose-500 transition-colors"
                  >
                    <CategoryIcon name={cat.iconName} size={13} className={cat.iconColor} />
                    {cat.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-300">
            © {new Date().getFullYear()} Gotas de Amor · gotasdeamor.com.br
          </p>
        </div>
      </div>
    </footer>
  )
}
