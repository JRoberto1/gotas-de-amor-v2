import Link from 'next/link'
import { CATEGORIAS } from '@/lib/categorias'

export default function Header() {
  return (
    <header className="bg-white border-b border-rose-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl">💧</span>
            <span className="text-xl font-bold text-rose-600 group-hover:text-rose-700 transition-colors">
              Gotas de Amor
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {CATEGORIAS.slice(0, 5).map((cat) => (
              <Link
                key={cat.value}
                href={`/${cat.value}`}
                className="px-3 py-1.5 text-sm text-gray-600 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors"
              >
                {cat.emoji} {cat.title}
              </Link>
            ))}
            <Link
              href="/#categorias"
              className="px-3 py-1.5 text-sm font-medium text-rose-600 hover:bg-rose-50 rounded-full transition-colors"
            >
              Ver todas →
            </Link>
          </nav>

          {/* Mobile: link para categorias */}
          <Link
            href="/#categorias"
            className="md:hidden px-4 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50 rounded-full transition-colors"
          >
            Categorias
          </Link>
        </div>
      </div>
    </header>
  )
}
