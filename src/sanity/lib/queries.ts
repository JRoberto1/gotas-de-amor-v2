import { defineQuery } from 'next-sanity'

// Home: destaques + contagem por categoria
export const MENSAGENS_DESTAQUE_QUERY = defineQuery(`
  *[_type == "mensagem" && destaque == true] | order(_createdAt desc) [0...6] {
    _id,
    titulo,
    "slug": slug.current,
    texto,
    categoria,
    tags
  }
`)

// Listagem por categoria
export const MENSAGENS_POR_CATEGORIA_QUERY = defineQuery(`
  *[_type == "mensagem" && categoria == $categoria] | order(_createdAt desc) [$start...$end] {
    _id,
    titulo,
    "slug": slug.current,
    texto,
    categoria,
    tags,
    destaque
  }
`)

export const MENSAGENS_POR_CATEGORIA_COUNT_QUERY = defineQuery(`
  count(*[_type == "mensagem" && categoria == $categoria])
`)

// Mensagem individual
export const MENSAGEM_QUERY = defineQuery(`
  *[_type == "mensagem" && slug.current == $slug][0] {
    _id,
    titulo,
    "slug": slug.current,
    texto,
    categoria,
    tags,
    destaque
  }
`)

// Slugs para generateStaticParams
export const MENSAGENS_SLUGS_QUERY = defineQuery(`
  *[_type == "mensagem" && defined(slug.current)] {
    "slug": slug.current,
    categoria
  }
`)

// Sitemap
export const SITEMAP_QUERY = defineQuery(`
  *[_type == "mensagem" && defined(slug.current)] {
    "slug": slug.current,
    categoria,
    _updatedAt
  }
`)

// Mensagens relacionadas (mesma categoria, excluindo atual)
export const MENSAGENS_RELACIONADAS_QUERY = defineQuery(`
  *[_type == "mensagem" && categoria == $categoria && slug.current != $slug] | order(_createdAt desc) [0...3] {
    _id,
    titulo,
    "slug": slug.current,
    texto,
    categoria
  }
`)
