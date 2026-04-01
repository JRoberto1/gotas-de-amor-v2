import Link from 'next/link'
import { CATEGORIAS } from '@/lib/categorias'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo e descrição */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-3">
              <span className="text-2xl">💧</span>
              <span className="text-lg font-bold text-rose-600">Gotas de Amor</span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">
              Portal de mensagens temáticas para compartilhar amor, fé, motivação e carinho com quem você ama.
            </p>
          </div>

          {/* Categorias */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">Categorias</h3>
            <ul className="space-y-1.5">
              {CATEGORIAS.slice(0, 6).map((cat) => (
                <li key={cat.value}>
                  <Link
                    href={`/${cat.value}`}
                    className="text-sm text-gray-500 hover:text-rose-600 transition-colors"
                  >
                    {cat.emoji} {cat.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 mb-3">Mais Categorias</h3>
            <ul className="space-y-1.5">
              {CATEGORIAS.slice(6).map((cat) => (
                <li key={cat.value}>
                  <Link
                    href={`/${cat.value}`}
                    className="text-sm text-gray-500 hover:text-rose-600 transition-colors"
                  >
                    {cat.emoji} {cat.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Gotas de Amor · gotasdeamor.com.br
          </p>
        </div>
      </div>
    </footer>
  )
}
