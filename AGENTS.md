# AGENTS.md

Visão geral da arquitetura do projeto para desenvolvedores e agentes de IA.

## Visão Geral

Landing page de vendas para o ebook "Do Zero ao Viral" do canal @iaplaude. Construída com TanStack Start e hospedada na Netlify. Não há backend de dados, pagamento ou autenticação — é uma página estática de marketing.

## Stack

| Camada | Tecnologia |
|--------|------------|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Estilização | CSS puro em `src/styles.css` (variáveis CSS + classes semânticas) |
| Tipagem | TypeScript 5.7 strict |
| Deploy | Netlify |

## Estrutura de Diretórios

```
src/
├── routes/
│   ├── __root.tsx      # Layout raiz: <html>, <head> com meta/OG tags, fontes Google
│   └── index.tsx       # Única rota — landing page completa como componente React
├── styles.css          # Todos os estilos da landing page (variáveis CSS + regras)
public/
├── ebook-cover.png     # Capa do ebook usada no hero
├── prova1.png          # Screenshot de comentário real (@tania_schreiber)
├── prova2.png          # Screenshot de comentário real (@og.padz_)
├── prova3.png          # Screenshot de comentário real (@marlonmirandas)
├── prova4.png          # Screenshot de comentário real (@andre.luis233)
netlify.toml            # Build: vite build, publish: dist/client, dev: port 8888→3000
```

## Decisões Arquiteturais

### CSS puro em vez de Tailwind utilities
A landing page usa variáveis CSS (`--bg`, `--gold`, `--gray`, etc.) e classes semânticas (`.hero`, `.metric-card`, `.testi`). Mantido separado do Tailwind para consistência com o design e facilitar manutenção de tema.

### Sem rotas de produto
As rotas `src/routes/products/` e dados em `src/data/products.ts` são remanescentes do template original e não são usadas.

### Interatividade no cliente
Animações de scroll (fade-in, contador de métricas, timeline staggered, parallax) são implementadas via `useEffect` com `IntersectionObserver` no componente `LandingPage`.

### Sem tracking externo
Meta Pixel e botão de suporte WhatsApp foram removidos intencionalmente. A URL de checkout (`CHECKOUT_URL`) aponta para `#oferta` enquanto a URL real de pagamento não é configurada.

## Convenções

- Componentes: PascalCase
- Rotas: kebab-case em nomes de arquivo
- TypeScript strict — sem `any`
