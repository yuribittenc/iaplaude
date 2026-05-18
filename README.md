# Do Zero ao Viral — Ebook Landing Page

Landing page de vendas para o ebook **"Do Zero ao Viral — 84 Mil Views em 3 Dias com IA"** do canal [@iaplaude](https://instagram.com/iaplaude).

## Sobre

Página de vendas completa documentando a jornada de um canal de IA musical que saiu do zero a 84 mil views e proposta comercial em 13 dias. Inclui métricas reais, timeline da jornada, sumário de capítulos, depoimentos orgânicos e seção de oferta.

## Tech Stack

| Camada | Tecnologia |
|--------|------------|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Estilização | CSS customizado (variáveis oklch + classes utilitárias) |
| Tipagem | TypeScript 5.7 (strict mode) |
| Deploy | Netlify |

## Como Rodar Localmente

```bash
npm install
npm run dev
```

O servidor de desenvolvimento sobe na porta **3000** (ou porta **8888** via Netlify CLI).

### Com Netlify CLI (recomendado)

```bash
netlify dev
```

### Build de produção

```bash
npm run build
npm run preview
```

## Estrutura

```
src/
├── routes/
│   ├── __root.tsx   # Layout raiz com head/meta tags
│   └── index.tsx    # Landing page completa
├── styles.css       # Estilos globais da landing page
public/
├── ebook-cover.png  # Capa do ebook (mockup)
├── prova1-4.png     # Screenshots de comentários reais
```
