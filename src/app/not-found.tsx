import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <div className="text-6xl mb-6">💧</div>
      <h1 className="text-3xl font-bold text-gray-700 mb-3">Página não encontrada</h1>
      <p className="text-gray-400 mb-8">
        A mensagem que você procura pode ter sido movida ou não existe mais.
      </p>
      <Link
        href="/"
        className="inline-block px-7 py-3 bg-rose-500 hover:bg-rose-600 text-white font-medium rounded-full transition-colors"
      >
        Voltar ao início
      </Link>
    </div>
  )
}
