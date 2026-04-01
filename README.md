# Gotas de Amor

Portal de mensagens temáticas para compartilhar amor, fé, motivação e carinho.

## Stack

- **Framework**: Next.js 15 (App Router)
- **CMS**: Sanity.io (headless)
- **Estilização**: Tailwind CSS v4
- **Fontes**: Playfair Display + Inter (Google Fonts via `next/font`)
- **Ícones**: Lucide React
- **Hospedagem**: Vercel
- **Linguagem**: TypeScript

## Rodando localmente

### Pré-requisitos

- Node.js 18+
- Conta no Sanity.io com projeto configurado

### Instalação

```bash
npm install
```

### Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha os valores:

```bash
cp .env.example .env.local
```

| Variável | Descrição | Onde obter |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | ID do projeto Sanity | [sanity.io/manage](https://sanity.io/manage) |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset (ex: `production`) | Sanity → Settings → Datasets |
| `SANITY_API_READ_TOKEN` | Token de leitura para Live Content API | Sanity → API → Tokens |

### Rodando

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

O Sanity Studio fica em [http://localhost:3000/studio](http://localhost:3000/studio).

## Estrutura do projeto

```
src/
├── app/
│   ├── layout.tsx              # Layout raiz (Header, Footer, fontes)
│   ├── page.tsx                # Home page
│   ├── globals.css             # Estilos globais + tema Tailwind
│   ├── not-found.tsx           # Página 404
│   ├── robots.ts               # SEO: robots.txt
│   ├── sitemap.ts              # SEO: sitemap.xml dinâmico
│   ├── [categoria]/
│   │   ├── page.tsx            # Listagem de mensagens por categoria
│   │   └── [slug]/
│   │       └── page.tsx        # Página individual de mensagem
│   └── studio/[[...tool]]/     # Sanity Studio embutido
│
├── components/
│   ├── Header.tsx              # Navbar sticky com logo e nav
│   ├── Footer.tsx              # Rodapé com links de categorias
│   ├── MensagemCard.tsx        # Card reutilizável de mensagem
│   ├── BotaoCompartilhar.tsx   # Botões de compartilhar/copiar
│   └── CategoryIcon.tsx        # Mapeamento de ícones Lucide por categoria
│
├── lib/
│   ├── categorias.ts           # Config central das 11 categorias
│   └── types.ts                # Tipos TypeScript do projeto
│
└── sanity/
    ├── schemaTypes/            # Schemas do CMS
    └── lib/                    # Client, queries, live
```

## Categorias

| Slug | Título | Ícone |
|---|---|---|
| `bom-dia` | Bom Dia | Sun |
| `boa-noite` | Boa Noite | Moon |
| `amor` | Amor | Heart |
| `fe-espiritualidade` | Fé e Espiritualidade | Sparkles |
| `familia` | Família | Home |
| `motivacao` | Motivação | Zap |
| `amizade` | Amizade | Users |
| `aniversario` | Aniversário | Cake |
| `datas-comemorativas` | Datas Comemorativas | Gift |
| `meses-tematicos` | Meses Temáticos | Calendar |
| `reflexao` | Reflexão | BookOpen |

## Deploy (Vercel)

1. Conectar o repositório em [vercel.com/new](https://vercel.com/new)
2. Adicionar as variáveis de ambiente nas configurações do projeto:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `SANITY_API_READ_TOKEN`
3. Deploy automático a cada push na branch `main`

## Sanity Studio

O Studio está disponível em `/studio`. Em produção, configure os CORS origins no painel do Sanity para incluir o domínio da Vercel.

## SEO

- `robots.txt` em `/robots.txt`
- `sitemap.xml` dinâmico em `/sitemap.xml` (todas as categorias + mensagens)
- Metadata individual por página (title, description, og:image)
- URL canônica em páginas de mensagem
