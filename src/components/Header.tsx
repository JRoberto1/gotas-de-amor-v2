import Link from 'next/link'
import { Droplets } from 'lucide-react'
import { CATEGORIAS } from '@/lib/categorias'
import CategoryIcon from '@/components/CategoryIcon'

export default function Header() {
  return (
    <header className="bg-white/90 backdrop-blur-sm border-b border-rose-100/80 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 group">
            <Droplets
              size={26}
              className="text-rose-500 group-hover:text-rose-600 transition-colors"
              strokeWidth={1.75}
            />
            <span
              className="text-xl font-bold text-rose-600 group-hover:text-rose-700 transition-colors"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Gotas de Amor
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-0.5">
            {CATEGORIAS.slice(0, 5).map((cat) => (
              <Link
                key={cat.value}
                href={`/${cat.value}`}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-500 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-all duration-200"
              >
                <CategoryIcon name={cat.iconName} size={14} className={cat.iconColor} />
                {cat.title}
              </Link>
            ))}
            <Link
              href="/#categorias"
              className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-rose-500 hover:bg-rose-50 rounded-full transition-all duration-200"
            >
              Ver todas
              <span className="text-xs">→</span>
            </Link>
          </nav>

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
