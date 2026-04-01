# skill: debug
# Quando usar: sempre que algo quebrar, der erro ou não funcionar como esperado

---

## Regra Principal

**Nunca tente a mesma solução mais de 2 vezes.**
Se tentou e não resolveu, pare, diagnostique a causa raiz antes de tentar de novo.

---

## 1. Protocolo de Diagnóstico

Antes de qualquer correção, responda estas perguntas:

1. **O que exatamente está acontecendo?** (mensagem de erro completa)
2. **O que deveria estar acontecendo?**
3. **Quando começou?** (após qual mudança)
4. **Acontece sempre ou só às vezes?**
5. **Acontece localmente, em produção ou nos dois?**

Só depois de responder todas vá para a correção.

---

## 2. Leitura de Erros

### Erros de Build (Next.js / TypeScript)
```bash
npm run build 2>&1 | head -50
```
Leia as primeiras linhas — o erro real está no início, não no fim.

### Erros de Runtime (console do navegador)
- Abra DevTools (F12) → aba Console
- Filtre por "Errors" (vermelho)
- O erro mais importante é geralmente o primeiro da lista

### Erros de API / Rede
- DevTools → aba Network
- Filtre por "Fetch/XHR"
- Clique na requisição com erro e veja Response

### Erros de Deploy (Vercel)
- Acesse vercel.com → projeto → Deployments
- Clique no deploy com erro
- Leia o log completo — o erro real está nas últimas linhas antes de "Error"

---

## 3. Diagnóstico por Tipo de Problema

### Imagens não carregando
1. Abra a URL da imagem diretamente no navegador
2. Se abrir: problema é no código (componente Image)
3. Se der 403: API key inválida ou expirada
4. Se der 429: rate limit — implemente delay entre requests
5. Se der 000: rede local bloqueando (teste em produção)

### Deploy não atualiza
1. Verifique se o push foi feito: `git log --oneline -3`
2. Verifique o status do deploy na Vercel
3. Se status Error: leia o log de build
4. Se status Ready mas site antigo: cache do navegador — Ctrl+Shift+R
5. Se ainda antigo: cache ISR da Vercel — faça Redeploy sem cache

### Variável de ambiente não funciona
1. Verifique se está no `.env.local` (não `.env`)
2. No Next.js: variáveis do browser precisam de `NEXT_PUBLIC_`
3. Na Vercel: verifique em Settings → Environment Variables
4. Após adicionar na Vercel: faça novo deploy

### ESLint bloqueando build
```bash
npm run lint 2>&1
```
Leia o erro, corrija e rode `npm run build` novamente antes do push.

### Erro de TypeScript
- Leia a linha exata indicada
- Erros comuns: `let` que deveria ser `const`, tipo `any` não declarado
- Nunca use `// @ts-ignore` como solução permanente

---

## 4. Quando Pedir Ajuda

Se depois de 2 tentativas o problema persistir:

1. Mostre o erro completo (não resumido)
2. Mostre o código relacionado
3. Descreva o que já tentou
4. Informe: local ou produção? Sempre ou às vezes?

---

## 5. Registro de Aprendizado

Após resolver, registre no `LEARNINGS.md`:

```markdown
## [DATA] — Título do Problema
**Problema:** descrição do que quebrou
**Causa raiz:** por que aconteceu
**Solução:** o que resolveu
**Prevenção:** o que fazer para não acontecer de novo
```

---

## 6. Problemas Mais Comuns (Referência Rápida)

| Erro                                    | Causa                        | Solução rápida                        |
|-----------------------------------------|------------------------------|---------------------------------------|
| `let` declared but never reassigned     | ESLint: use `const`          | Troque `let` por `const`              |
| Cannot find module                      | Import errado ou faltando    | Verifique o caminho do import         |
| hydration mismatch                      | Server e client diferentes   | Verifique dados dinâmicos no SSR      |
| 429 Too Many Requests                   | Rate limit de API            | Implemente delay entre requests       |
| CORS error                              | Backend não permite origem   | Configure CORS no servidor            |
| Blank page after deploy                 | Erro de runtime silencioso   | Abra console do navegador             |
| Build passa local, falha na Vercel      | Variável de ambiente faltando| Verifique Settings → Env Variables    |
