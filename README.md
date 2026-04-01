# Template de Agente — Roberto

Este é o template base para todos os projetos.
Copie esta pasta para cada novo projeto e o Claude Code já sabe como operar.

---

## Como usar

### Novo projeto
```bash
# Copie este template para a pasta do novo projeto
cp -r skills-template/ meu-novo-projeto/
cd meu-novo-projeto/

# Abra o Claude Code
claude
```

O Claude Code vai ler o `AGENTS.md` automaticamente e já sabe:
- Como se comportar
- Qual skill carregar para cada tipo de tarefa
- Como registrar aprendizados

---

## Estrutura

```
skills-template/
├── AGENTS.md          ← guarda-chuva principal (lido automaticamente)
├── LEARNINGS.md       ← aprendizados registrados ao longo do tempo
├── README.md          ← este arquivo
└── skills/
    ├── web.md         ← sites, portais, landing pages
    ├── app.md         ← apps mobile, PWA
    ├── automation.md  ← scripts, integrações, automações
    ├── content.md     ← textos, importação em lote, CMS
    └── debug.md       ← diagnóstico e resolução de problemas
```

---

## Skills disponíveis

| Skill           | Quando usar                                      |
|-----------------|--------------------------------------------------|
| web.md          | Site, portal, landing page, blog, sistema web    |
| app.md          | App mobile, PWA, aplicativo                      |
| automation.md   | Script, integração, bot, processamento de dados  |
| content.md      | Textos, mensagens, importação em CMS             |
| debug.md        | Algo quebrou, erro, comportamento inesperado     |

---

## Atualizando as Skills

As skills melhoram com o uso. Quando o agente descobrir algo importante:
1. Registra em `LEARNINGS.md`
2. Atualiza a skill correspondente com a nova regra

Você também pode editar as skills diretamente para adicionar preferências pessoais.

---

## Dica

Quanto mais você usar, melhor fica.
O agente aprende com cada projeto e registra o que funciona.
