# skill: app
# Quando usar: sempre que o projeto for um app mobile, PWA ou aplicativo desktop

---

## 1. Antes de Começar

Pergunte se ainda não souber:
- iOS, Android ou ambos?
- Precisa funcionar offline?
- Vai ter login de usuário?
- Vai consumir API externa ou ter backend próprio?
- Vai para loja (Play Store / App Store) ou é uso interno?
- Tem design/protótipo pronto?

---

## 2. Escolha da Stack

| Situação                                        | Stack recomendada         |
|-------------------------------------------------|---------------------------|
| App simples, sem loja, acesso pelo navegador    | PWA (Next.js ou Vite)     |
| App Android + iOS com uma base de código        | React Native + Expo       |
| App com muitos dados offline e sincronização    | React Native + SQLite     |
| App corporativo com integração a sistemas       | React Native + Supabase   |
| Protótipo rápido para validar ideia             | PWA com HTML/JS puro      |

**Regra:** PWA resolve 80% dos casos sem precisar de loja.
Só vá para React Native se realmente precisar de recursos nativos.

---

## 3. PWA — Checklist Obrigatório

Se for PWA:
- [ ] `manifest.json` configurado (nome, ícone, cor)
- [ ] Service Worker registrado
- [ ] Funciona sem internet (pelo menos tela de fallback)
- [ ] Ícone em múltiplos tamanhos (192x192 e 512x512 mínimo)
- [ ] Meta viewport configurado para mobile
- [ ] Testado no celular antes de entregar

---

## 4. APIs Externas — Regras

- Sempre guarde chaves no `.env`
- Implemente tratamento de erro em toda chamada de API
- Nunca exponha chave de API no frontend
- Para APIs com rate limit: implemente retry com delay exponencial
- Documente no README quais APIs o projeto usa e como obter as chaves

---

## 5. Autenticação

| Necessidade              | Solução recomendada     |
|--------------------------|-------------------------|
| Login simples            | Supabase Auth           |
| Login social (Google)    | Supabase ou Firebase    |
| Login corporativo        | Auth0                   |
| Sem login necessário     | Não implemente          |

---

## 6. Dados e Armazenamento

| Necessidade                        | Solução              |
|------------------------------------|----------------------|
| Dados simples, sem sync            | localStorage / AsyncStorage |
| Dados com sync entre dispositivos  | Supabase ou Firebase |
| Dados offline pesados              | SQLite (via Expo)    |
| Arquivo de configuração local      | JSON no dispositivo  |

---

## 7. Problemas Comuns e Soluções

| Problema                        | Causa provável           | Solução                              |
|---------------------------------|--------------------------|--------------------------------------|
| App não instala como PWA        | manifest.json incompleto | Verifique nome, ícones e start_url   |
| API não responde no mobile      | CORS ou HTTP (não HTTPS) | Use HTTPS e configure CORS no backend|
| App lento no celular            | Imagens grandes          | Comprima e use formatos modernos     |
| Login não persiste              | Token não salvo          | Salve token no AsyncStorage          |
| Funciona no PC, quebra no mobile| Viewport não configurado | Adicione meta viewport               |

---

## 8. Antes de Entregar

- [ ] Testado em celular real (não só no simulador)
- [ ] Funciona em tela pequena (320px mínimo)
- [ ] Imagens otimizadas
- [ ] Erros tratados com mensagem amigável ao usuário
- [ ] README com instruções de instalação e uso
- [ ] Variáveis de ambiente documentadas no .env.example
