import Link from 'next/link'
import { Droplets } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-28 text-center">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-rose-50 mb-6 shadow-sm">
        <Droplets size={36} className="text-rose-400" strokeWidth={1.5} />
      </div>
      <h1
        className="text-3xl font-bold text-gray-700 mb-3"
        style={{ fontFamily: 'var(--font-playfair)' }}
      >
        Página não encontrada
      </h1>
      <p className="text-gray-400 mb-8 leading-relaxed">
        A mensagem que você procura pode ter sido movida ou não existe mais.
      </p>
      <Link
        href="/"
        className="inline-block px-7 py-3 bg-rose-500 hover:bg-rose-600 text-white font-medium rounded-full transition-all duration-200 shadow-md hover:shadow-lg"
      >
        Voltar ao início
      </Link>
    </div>
  )
}
