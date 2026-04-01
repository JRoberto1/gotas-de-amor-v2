# skill: web
# Quando usar: sempre que o projeto for um site, portal, landing page, blog ou sistema web

---

## 1. Antes de Começar

Pergunte se ainda não souber:
- Qual o objetivo do site? (informativo, e-commerce, conteúdo, sistema)
- Tem design pronto ou precisa criar do zero?
- Vai ter CMS (gerenciamento de conteúdo) ou é estático?
- Onde vai hospedar? (Vercel, Netlify, VPS, cPanel/Hostgator)
- Tem domínio? Onde está registrado?

Só comece a codar depois de ter essas respostas.

---

## 2. Escolha da Stack

Decida a stack baseado no projeto, nesta ordem de critério:

| Situação                                  | Stack recomendada              |
|-------------------------------------------|--------------------------------|
| Site simples, sem CMS, hospedagem básica  | HTML + CSS + JS puro           |
| Site com conteúdo gerenciável             | Next.js + Sanity CMS + Vercel  |
| E-commerce                                | Next.js + Stripe ou Shopify    |
| Sistema web com usuários e banco          | Next.js + Supabase ou Firebase |
| Landing page rápida                       | HTML + Tailwind (sem framework)|

**Regra:** use a stack mais simples que resolve o problema.
Não use Next.js se HTML puro resolve.

---

## 3. Imagens — Regras Obrigatórias

Imagens são o ponto mais frágil de sites. Siga sempre:

**Em páginas de listagem (grids, cards):**
- Prefira catálogo local de URLs verificadas a APIs externas
- Se usar API (Pexels, Unsplash): chunk de 2 requests, delay mínimo 600ms entre chunks
- Sempre implemente fallback visual (gradiente) se a imagem falhar
- Nunca deixe card sem imagem — fallback sempre ativo
- Teste TODAS as imagens antes de fazer deploy

**Para verificar se URLs de imagens funcionam:**
```bash
# Teste rápido de URL
curl -o /dev/null -s -w "%{http_code}" "URL_DA_IMAGEM"
# Retorno 200 = ok | 000 = bloqueado pela rede local (teste no navegador)
```

**Se usar Pexels API:**
- Guarde a PEXELS_API_KEY no .env
- Use cache ISR (revalidate: 86400) para não repetir requests
- Queries em inglês têm muito mais resultado que em português
- Rate limit: processe em lotes de 2 com 600ms de delay

**Se usar imagens fixas:**
- Crie um catálogo verificado por categoria em `lib/images-catalog.ts`
- Use o script `scripts/verify-images.ts` para validar todas antes de usar

---

## 4. SEO — Checklist Obrigatório

Todo site precisa ter antes do deploy:

- [ ] `robots.txt` em `/public/robots.txt`
- [ ] `sitemap.xml` dinâmico em `app/sitemap.ts`
- [ ] Meta title único por página (máx 60 caracteres)
- [ ] Meta description única por página (máx 160 caracteres)
- [ ] og:title, og:description, og:image em todas as páginas
- [ ] URL canônica em cada página
- [ ] Google Search Console verificado
- [ ] Sitemap submetido ao Google

---

## 5. Deploy — Fluxo Padrão

**Vercel (recomendado para Next.js):**
1. Repositório no GitHub
2. Conectar Vercel ao GitHub
3. Configurar variáveis de ambiente na Vercel (não no código)
4. Todo push na main/master dispara deploy automático

**Hostgator/cPanel (para sites HTML simples):**
1. Zip dos arquivos finais
2. Upload via Gerenciador de Arquivos em `public_html/`
3. Testar no navegador antes de apagar versão anterior

**Regra de ouro:** sempre teste localmente antes de deploy.
Nunca faça deploy sem build local limpo.

---

## 6. Variáveis de Ambiente

- Nunca coloque chaves de API diretamente no código
- Sempre use `.env` local e configure na plataforma de deploy
- Crie `.env.example` com as variáveis sem valores reais
- Variáveis do Next.js expostas ao browser precisam de `NEXT_PUBLIC_` no nome

---

## 7. CMS Sanity — Padrão

Quando o projeto usar Sanity:
- Project ID e dataset ficam em variáveis de ambiente
- Token de escrita (Editor) só para scripts de importação — nunca no frontend
- Documentos importados via script precisam ser publicados — não ficam como draft automaticamente
- Schema de mensagens/conteúdo: sempre inclua `slug` gerado do título

**Para importação em lote:**
- Use script `scripts/import-content.ts`
- Processe em lotes de 10 com delay de 200ms
- Confirme quantos foram importados e quantos deram erro
- Publique após importar (documentos chegam como draft)

---

## 8. Problemas Comuns e Soluções

| Problema                          | Causa provável              | Solução                                    |
|-----------------------------------|-----------------------------|--------------------------------------------|
| Imagens repetindo                 | Cache antigo ou fallback    | Verifique se pexelsQuery existe nos docs   |
| Imagens quebrando                 | Rate limit da API           | Implemente chunks com delay                |
| Deploy não atualiza               | Cache ISR da Vercel         | Redeploy sem cache ou mude revalidate      |
| Site não aparece no Google        | Não indexado ainda          | Submeta sitemap no Search Console          |
| Build falha na Vercel             | ESLint ou TypeScript error  | Rode `npm run build` local antes do push   |
| Variável de ambiente não funciona | Falta NEXT_PUBLIC_ ou Vercel| Verifique nome e configuração na Vercel    |

---

## 9. Antes de Encerrar o Projeto

- [ ] Build local limpo sem erros
- [ ] Todas as imagens carregando
- [ ] SEO configurado
- [ ] Variáveis de ambiente na plataforma de deploy
- [ ] README.md atualizado com instruções de como rodar
- [ ] .env.example criado
- [ ] Repositório no GitHub atualizado
