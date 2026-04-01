# skill: content
# Quando usar: criação de textos, importação em lote, conteúdo para CMS, mensagens, artigos

---

## 1. Antes de Começar

Pergunte se ainda não souber:
- Qual o tom? (formal, informal, inspiracional, técnico)
- Qual o público? (idade, contexto, plataforma)
- Onde vai publicar? (site, app, redes sociais, CMS)
- Tem categorias ou estrutura definida?
- Qual volume? (poucos textos ou importação em lote)

---

## 2. Criação de Conteúdo em Lote

Para criar muitos textos de uma vez, sempre use estrutura JSON:

```json
[
  {
    "titulo": "Título do conteúdo",
    "texto": "Corpo do conteúdo aqui",
    "categoria": "nome-da-categoria",
    "tags": ["tag1", "tag2"],
    "destaque": false
  }
]
```

**Regras para o conteúdo:**
- Títulos: diretos, entre 3 e 8 palavras
- Textos: completos, sem truncar no meio
- Categorias: sempre em kebab-case (com-hífen, sem-espaço)
- Tags: palavras-chave relevantes para busca
- Nunca crie conteúdo ofensivo, enganoso ou inadequado

---

## 3. Importação no Sanity

Para importar conteúdo em lote no Sanity:

1. Crie o arquivo JSON com o conteúdo
2. Use o script `scripts/import-content.ts`
3. Execute com o token de escrita (Editor) do Sanity
4. Verifique quantos foram importados e quantos deram erro
5. Publique os documentos (chegam como draft)

**Token necessário:** SANITY_API_TOKEN com permissão Editor
**Nunca use token no frontend** — apenas em scripts locais

```typescript
// Estrutura mínima do documento Sanity
const doc = {
  _type: 'mensagem',
  titulo: item.titulo,
  slug: { _type: 'slug', current: slugify(item.titulo) },
  texto: item.texto,
  categoria: item.categoria,
  tags: item.tags,
  destaque: item.destaque,
}
```

---

## 4. Slugify — Padrão

Todo conteúdo com URL própria precisa de slug:

```typescript
function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove acentos
    .replace(/[^a-z0-9\s-]/g, '')   // remove especiais
    .trim()
    .replace(/\s+/g, '-')            // espaços viram hífens
}
```

---

## 5. Publicação em Lote

Documentos importados chegam como **draft** no Sanity.
Para publicar todos de uma vez:

```typescript
// Script publish-all.ts
const drafts = await client.fetch(`*[_id in path("drafts.**")]._id`)
for (const id of drafts) {
  await client.patch(id).commit() // publica o draft
}
```

---

## 6. Boas Práticas de Conteúdo

**Para textos inspiracionais / mensagens:**
- Uma ideia por mensagem
- Tom consistente dentro da categoria
- Evite clichês óbvios
- Varie o início das frases entre mensagens da mesma categoria

**Para SEO:**
- Título da página: palavra-chave principal + nome do site
- Meta description: resumo em 1 frase com a palavra-chave
- Conteúdo: palavra-chave presente mas de forma natural

**Para redes sociais:**
- Máximo 280 caracteres para Twitter/X
- Hashtags ao final, não no meio do texto
- Emojis com moderação — 1 a 2 por post

---

## 7. Checklist Antes de Publicar

- [ ] Conteúdo revisado — sem erros de português
- [ ] Slugs únicos — sem duplicatas
- [ ] Categorias consistentes com o schema do CMS
- [ ] Documentos publicados (não apenas importados como draft)
- [ ] Verificar no CMS se aparecem corretamente
