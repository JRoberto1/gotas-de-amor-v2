'use client'

import { Share2, Copy } from 'lucide-react'

type Props = {
  titulo: string
  texto: string
}

export default function BotaoCompartilhar({ titulo, texto }: Props) {
  const compartilhar = async () => {
    const shareData = {
      title: titulo,
      text: texto,
      url: window.location.href,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch {
        // usuário cancelou
      }
    } else {
      await navigator.clipboard.writeText(`${titulo}\n\n${texto}\n\n${window.location.href}`)
      alert('Mensagem copiada para a área de transferência!')
    }
  }

  const copiarTexto = async () => {
    await navigator.clipboard.writeText(texto)
    alert('Texto copiado!')
  }

  return (
    <div className="flex flex-wrap gap-3 mt-6">
      <button
        onClick={compartilhar}
        className="flex items-center gap-2 px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-full text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md"
      >
        <Share2 size={15} strokeWidth={2} />
        Compartilhar
      </button>
      <button
        onClick={copiarTexto}
        className="flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-gray-50 text-gray-600 border border-gray-200 rounded-full text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md"
      >
        <Copy size={15} strokeWidth={2} />
        Copiar texto
      </button>
    </div>
  )
}
