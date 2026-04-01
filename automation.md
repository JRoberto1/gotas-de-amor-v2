# skill: automation
# Quando usar: scripts, integrações entre sistemas, automações, bots, processamento de dados

---

## 1. Antes de Começar

Pergunte se ainda não souber:
- O que dispara a automação? (horário, evento, manual)
- O que ela faz? (entrada → processamento → saída)
- Onde vai rodar? (local, servidor, nuvem)
- Precisa rodar uma vez ou repetidamente?
- Tem APIs envolvidas? Quais?

---

## 2. Escolha da Linguagem

| Situação                              | Linguagem recomendada  |
|---------------------------------------|------------------------|
| Script simples, uso local             | Python                 |
| Integração com APIs web               | Python ou Node.js      |
| Automação de navegador (scraping)     | Python + Playwright    |
| Processamento de arquivos (Excel, CSV)| Python + pandas        |
| Webhook / servidor leve               | Node.js + Express      |
| Agendamento de tarefas                | Python + cron          |

---

## 3. Estrutura Padrão de Script

Todo script de automação deve ter:

```python
# Nome do script e o que faz
# Autor, data de criação

import os
from dotenv import load_dotenv

load_dotenv()  # Sempre carrega .env

def main():
    # Lógica principal aqui
    pass

def processar_item(item):
    # Funções separadas por responsabilidade
    pass

if __name__ == "__main__":
    main()
```

---

## 4. Tratamento de Erros em Automações

Erros em automação precisam ser **descritivos** — o script precisa continuar mesmo se um item falhar:

```python
sucessos = 0
erros = 0

for item in lista:
    try:
        processar(item)
        sucessos += 1
    except Exception as e:
        erros += 1
        print(f"Erro em {item}: {e}")
        # Continua para o próximo — não para tudo

print(f"Finalizado: {sucessos} ok, {erros} erros")
```

---

## 5. APIs Externas — Boas Práticas

- Sempre implemente retry com delay em caso de falha
- Respeite rate limits — adicione delay entre requests
- Guarde todas as chaves no `.env`
- Nunca exponha chaves no código ou no git
- Documente quais APIs o script usa e como obter as chaves

```python
import time

def chamar_api_com_retry(url, max_tentativas=3):
    for tentativa in range(max_tentativas):
        try:
            response = requests.get(url)
            if response.status_code == 200:
                return response.json()
            elif response.status_code == 429:
                time.sleep(2 ** tentativa)  # delay exponencial
        except Exception as e:
            if tentativa == max_tentativas - 1:
                raise e
            time.sleep(1)
```

---

## 6. Agendamento

| Plataforma     | Como agendar                        |
|----------------|-------------------------------------|
| Linux/Mac      | crontab -e                          |
| Windows        | Agendador de Tarefas                |
| Nuvem (grátis) | GitHub Actions (até 2000 min/mês)   |
| Nuvem (pago)   | Railway, Render, AWS Lambda         |

---

## 7. Processamento em Lote

Para processar muitos itens sem travar:

```python
def processar_em_lotes(lista, tamanho_lote=10, delay=0.5):
    for i in range(0, len(lista), tamanho_lote):
        lote = lista[i:i + tamanho_lote]
        for item in lote:
            processar(item)
        time.sleep(delay)  # respeita rate limit
        print(f"Lote {i//tamanho_lote + 1} concluído")
```

---

## 8. Antes de Entregar

- [ ] Script testado com dados reais (não só mock)
- [ ] Erros tratados — script não para no primeiro erro
- [ ] Variáveis de ambiente no `.env.example`
- [ ] README com instruções de como rodar
- [ ] Log claro de o que foi processado e o que deu erro
