import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'

import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Do Zero ao Viral — 84 Mil Views em 3 Dias com IA | @iaplaude' },
      { name: 'description', content: 'Ebook técnico que documenta como um canal saiu do zero a 84 mil views e proposta comercial em 13 dias, usando IA. Dados reais, não promessas.' },
      { name: 'author', content: '@iaplaude' },
      { property: 'og:type', content: 'product' },
      { property: 'og:title', content: 'Do Zero ao Viral — 84 Mil Views em 3 Dias com IA' },
      { property: 'og:description', content: 'Guia técnico completo com métricas reais documentadas dia a dia. R$99,90.' },
      { property: 'og:locale', content: 'pt_BR' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Do Zero ao Viral — 84 Mil Views em 3 Dias com IA' },
      { name: 'twitter:description', content: 'Dados reais. Sem promessas vazias. R$99,90.' },
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap' },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
