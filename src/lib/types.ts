export type Mensagem = {
  _id: string
  titulo: string
  slug: string
  texto: string
  categoria: string
  tags?: string[]
  destaque?: boolean
}
