export type Categoria = {
  value: string
  title: string
  iconName: string   // nome do componente Lucide
  iconColor: string  // classe Tailwind text-*
  descricao: string
  cor: string        // classes Tailwind de fundo para cards
}

export const CATEGORIAS: Categoria[] = [
  {
    value: 'bom-dia',
    title: 'Bom Dia',
    iconName: 'Sun',
    iconColor: 'text-amber-500',
    descricao: 'Comece o dia com energia e alegria',
    cor: 'bg-amber-50 hover:bg-amber-100',
  },
  {
    value: 'boa-noite',
    title: 'Boa Noite',
    iconName: 'Moon',
    iconColor: 'text-indigo-400',
    descricao: 'Encerre o dia com paz e gratidão',
    cor: 'bg-indigo-50 hover:bg-indigo-100',
  },
  {
    value: 'amor',
    title: 'Amor',
    iconName: 'Heart',
    iconColor: 'text-rose-500',
    descricao: 'Mensagens cheias de carinho e afeto',
    cor: 'bg-rose-50 hover:bg-rose-100',
  },
  {
    value: 'fe-espiritualidade',
    title: 'Fé e Espiritualidade',
    iconName: 'Sparkles',
    iconColor: 'text-purple-500',
    descricao: 'Palavras que tocam a alma e fortalecem a fé',
    cor: 'bg-purple-50 hover:bg-purple-100',
  },
  {
    value: 'familia',
    title: 'Família',
    iconName: 'Home',
    iconColor: 'text-orange-500',
    descricao: 'Celebre os laços que nos unem',
    cor: 'bg-orange-50 hover:bg-orange-100',
  },
  {
    value: 'motivacao',
    title: 'Motivação',
    iconName: 'Zap',
    iconColor: 'text-green-500',
    descricao: 'Inspire-se e supere seus limites',
    cor: 'bg-green-50 hover:bg-green-100',
  },
  {
    value: 'amizade',
    title: 'Amizade',
    iconName: 'Users',
    iconColor: 'text-teal-500',
    descricao: 'Homenageie quem faz a vida mais leve',
    cor: 'bg-teal-50 hover:bg-teal-100',
  },
  {
    value: 'aniversario',
    title: 'Aniversário',
    iconName: 'Cake',
    iconColor: 'text-pink-500',
    descricao: 'Parabenize com carinho quem você ama',
    cor: 'bg-pink-50 hover:bg-pink-100',
  },
  {
    value: 'datas-comemorativas',
    title: 'Datas Comemorativas',
    iconName: 'Gift',
    iconColor: 'text-yellow-500',
    descricao: 'Celebre as datas mais especiais do ano',
    cor: 'bg-yellow-50 hover:bg-yellow-100',
  },
  {
    value: 'meses-tematicos',
    title: 'Meses Temáticos',
    iconName: 'Calendar',
    iconColor: 'text-cyan-500',
    descricao: 'Mensagens especiais para cada mês',
    cor: 'bg-cyan-50 hover:bg-cyan-100',
  },
  {
    value: 'reflexao',
    title: 'Reflexão',
    iconName: 'BookOpen',
    iconColor: 'text-slate-500',
    descricao: 'Pensamentos que fazem você parar e pensar',
    cor: 'bg-slate-50 hover:bg-slate-100',
  },
]

export function getCategoriaByValue(value: string): Categoria | undefined {
  return CATEGORIAS.find((c) => c.value === value)
}

export function getCategoriaTitle(value: string): string {
  return getCategoriaByValue(value)?.title ?? value
}
