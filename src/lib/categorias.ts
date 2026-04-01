export type Categoria = {
  value: string
  title: string
  emoji: string
  descricao: string
  cor: string // classe Tailwind de fundo
}

export const CATEGORIAS: Categoria[] = [
  {
    value: 'bom-dia',
    title: 'Bom Dia',
    emoji: '☀️',
    descricao: 'Comece o dia com energia e alegria',
    cor: 'bg-amber-100 hover:bg-amber-200',
  },
  {
    value: 'boa-noite',
    title: 'Boa Noite',
    emoji: '🌙',
    descricao: 'Encerre o dia com paz e gratidão',
    cor: 'bg-indigo-100 hover:bg-indigo-200',
  },
  {
    value: 'amor',
    title: 'Amor',
    emoji: '❤️',
    descricao: 'Mensagens cheias de carinho e afeto',
    cor: 'bg-rose-100 hover:bg-rose-200',
  },
  {
    value: 'fe-espiritualidade',
    title: 'Fé e Espiritualidade',
    emoji: '🙏',
    descricao: 'Palavras que tocam a alma e fortalecem a fé',
    cor: 'bg-purple-100 hover:bg-purple-200',
  },
  {
    value: 'familia',
    title: 'Família',
    emoji: '🏠',
    descricao: 'Celebre os laços que nos unem',
    cor: 'bg-orange-100 hover:bg-orange-200',
  },
  {
    value: 'motivacao',
    title: 'Motivação',
    emoji: '💪',
    descricao: 'Inspire-se e supere seus limites',
    cor: 'bg-green-100 hover:bg-green-200',
  },
  {
    value: 'amizade',
    title: 'Amizade',
    emoji: '🤝',
    descricao: 'Homenageie quem faz a vida mais leve',
    cor: 'bg-teal-100 hover:bg-teal-200',
  },
  {
    value: 'aniversario',
    title: 'Aniversário',
    emoji: '🎂',
    descricao: 'Parabenize com carinho quem você ama',
    cor: 'bg-pink-100 hover:bg-pink-200',
  },
  {
    value: 'datas-comemorativas',
    title: 'Datas Comemorativas',
    emoji: '🎉',
    descricao: 'Celebre as datas mais especiais do ano',
    cor: 'bg-yellow-100 hover:bg-yellow-200',
  },
  {
    value: 'meses-tematicos',
    title: 'Meses Temáticos',
    emoji: '📅',
    descricao: 'Mensagens especiais para cada mês',
    cor: 'bg-cyan-100 hover:bg-cyan-200',
  },
  {
    value: 'reflexao',
    title: 'Reflexão',
    emoji: '💭',
    descricao: 'Pensamentos que fazem você parar e pensar',
    cor: 'bg-slate-100 hover:bg-slate-200',
  },
]

export function getCategoriaByValue(value: string): Categoria | undefined {
  return CATEGORIAS.find((c) => c.value === value)
}

export function getCategoriaTitle(value: string): string {
  return getCategoriaByValue(value)?.title ?? value
}
