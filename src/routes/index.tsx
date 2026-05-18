import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'

export const Route = createFileRoute('/')({
  component: LandingPage,
})

function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [showFloat, setShowFloat] = useState(false)
  const heroVisualRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fadeObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            fadeObs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    document.querySelectorAll('.fade').forEach((el) => fadeObs.observe(el))

    const tlObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const items = document.querySelectorAll('.tl-item')
            items.forEach((it, idx) =>
              setTimeout(() => it.classList.add('in'), idx * 180)
            )
            tlObs.disconnect()
          }
        })
      },
      { threshold: 0.2 }
    )
    const tl = document.querySelector('.timeline')
    if (tl) tlObs.observe(tl)

    const fmt = (n: number, dec: number) => {
      if (dec > 0) return n.toFixed(dec).replace('.', ',')
      return Math.round(n).toLocaleString('pt-BR')
    }
    const counter = (el: Element) => {
      const target = parseFloat((el as HTMLElement).dataset.count || '0')
      const dec = parseInt((el as HTMLElement).dataset.decimals || '0')
      const suffix = (el as HTMLElement).dataset.suffix || ''
      const dur = 1800
      const start = performance.now()
      const tick = (t: number) => {
        const p = Math.min((t - start) / dur, 1)
        const eased = 1 - Math.pow(1 - p, 3)
        el.textContent = fmt(target * eased, dec) + suffix
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }
    const cObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && (e.target as HTMLElement).dataset.count) {
            counter(e.target)
            cObs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.4 }
    )
    document.querySelectorAll('[data-count]').forEach((el) => cObs.observe(el))

    const onScroll = () => {
      setShowFloat(window.scrollY > window.innerHeight * 0.8)
      if (window.scrollY < 800 && heroVisualRef.current) {
        heroVisualRef.current.style.transform = `translateY(${window.scrollY * 0.08}px)`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      fadeObs.disconnect()
      tlObs.disconnect()
      cObs.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const CHECKOUT_URL = 'https://pay.kiwify.com.br/bNDpqIz'

  const testimonials = [
    { username: '@tania_schreiber', msg: 'Cara, vocês são maravilhosos! Já sou fã! 😁' },
    { username: '@og.padz_', msg: 'Quando eles vão marca a primeira turnê?' },
    { username: '@marlonmirandas', msg: 'Referência melodia e harmônica de (O Sapo Não lava o pé) 🦁🦁🦁' },
    { username: '@andre.luis233', msg: 'Galera o solo do piano😢 que isso fera 😂😂😂😂😂😂' },
  ]

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div>
              <span className="eyebrow"><span className="dot"></span> Dados Reais · Documentados Dia a Dia</span>
              <h1>84 Mil Views em <span className="gold">3 Dias</span>.<br />Canal Criado do Zero.<br />Tudo com Inteligência Artificial.</h1>
              <p className="sub">Este ebook documenta cada passo, cada ferramenta, cada decisão e cada erro de um canal que saiu do zero e recebeu proposta comercial em menos de 2 semanas. Com análises reais feitas em parceria com IA.</p>
              <a href={CHECKOUT_URL} className="cta-btn" target="_blank" rel="noopener noreferrer">Quero o Guia Completo — R$99,90</a>
              <div className="micro">Acesso imediato · Garantia de 7 dias · Dados reais, não promessas</div>
            </div>
            <div className="hero-visual" ref={heroVisualRef}>
              <img src="/ebook-cover.png" alt="Ebook Do Zero ao Viral — Capa" />
            </div>
          </div>
        </div>
      </section>

      {/* DASHBOARD */}
      <section className="alt" id="dashboard">
        <div className="container">
          <div className="section-head fade">
            <span className="label">// Resultados</span>
            <h2>Números Reais. Sem Filtro.</h2>
            <p>Tudo que está abaixo foi documentado com prints, capturas e análises hora a hora.</p>
          </div>
          <div className="metrics-grid">
            <div className="metric-card fade"><div className="ticker">VIEWS</div><div className="num" data-count="84000" data-suffix="+">0</div><div className="lbl">views em 3 dias (1 vídeo)</div></div>
            <div className="metric-card fade"><div className="ticker">FOLLOWERS</div><div className="num" data-count="1100" data-suffix="+">0</div><div className="lbl">seguidores orgânicos</div></div>
            <div className="metric-card fade"><div className="ticker">SHARES</div><div className="num" data-count="2600" data-suffix="+">0</div><div className="lbl">compartilhamentos</div></div>
            <div className="metric-card fade"><div className="ticker">SHARE RATE</div><div className="num" data-count="21.52" data-decimals="2" data-suffix="%">0</div><div className="lbl">taxa de compartilhamento</div></div>
            <div className="metric-card fade"><div className="ticker">SKIP RATE</div><div className="num" data-count="22.92" data-decimals="2" data-suffix="%">0</div><div className="lbl">skip rate (meta: abaixo de 30%)</div></div>
            <div className="metric-card fade"><div className="ticker">TIME TO OFFER</div><div className="num">&lt; 14<span style={{ fontSize: '1.2rem' }}> dias</span></div><div className="lbl">até primeira proposta comercial</div></div>
          </div>
          <p className="metrics-foot fade">Cada um desses números foi documentado em tempo real com prints de tela, análises de métricas e decisões estratégicas explicadas passo a passo no ebook.</p>
        </div>
      </section>

      {/* TIMELINE */}
      <section id="historia">
        <div className="container">
          <div className="section-head fade">
            <span className="label">// A Jornada</span>
            <h2>De Zero a Proposta Comercial em 13 Dias</h2>
          </div>
          <div className="timeline">
            <div className="tl-item"><div className="tl-day">DIA 01</div><div className="tl-text">Primeiro vídeo postado. Zero seguidores.</div></div>
            <div className="tl-item"><div className="tl-day">DIA 03</div><div className="tl-text">10.900 views no primeiro vídeo. 200 seguidores.</div></div>
            <div className="tl-item"><div className="tl-day">DIA 05</div><div className="tl-text">Segundo vídeo postado. Skip rate de 22,92%.</div></div>
            <div className="tl-item"><div className="tl-day">DIA 07</div><div className="tl-text">Terceiro vídeo explode: 26.000 views em 1 dia.</div></div>
            <div className="tl-item"><div className="tl-day">DIA 10</div><div className="tl-text">84.000+ views. 1.100 seguidores.</div></div>
            <div className="tl-item"><div className="tl-day">DIA 13</div><div className="tl-text">Proposta comercial recebida. Canal monetizável.</div></div>
          </div>
          <p className="timeline-foot fade">Neste ebook você vai ler exatamente o que aconteceu em cada um desses dias. Cada decisão, cada métrica analisada, cada erro corrigido em tempo real.</p>
        </div>
      </section>

      {/* DIFERENCIAL */}
      <section className="alt">
        <div className="container">
          <div className="section-head fade">
            <span className="label">// O Diferencial</span>
            <h2>Por Que Este Ebook é Diferente</h2>
          </div>
          <div className="cols-3">
            <div className="feature fade">
              <div className="icon"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18" /><path d="M7 14l4-4 4 4 5-5" /></svg></div>
              <h3>Análises Reais de Métricas</h3>
              <p>Cada vídeo postado foi analisado hora a hora com inteligência artificial. Skip rate, taxa de compartilhamento, tempo médio de visualização, faixa etária do público — tudo documentado e explicado em linguagem simples.</p>
            </div>
            <div className="feature fade">
              <div className="icon"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg></div>
              <h3>Templates Prontos Para Usar</h3>
              <p>Você recebe os prompts EXATOS que geraram os personagens, as músicas e as animações. Copia, cola, adapta pro seu conteúdo. Sem precisar aprender do zero.</p>
            </div>
            <div className="feature fade">
              <div className="icon"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg></div>
              <h3>Estratégia de IA como Consultor</h3>
              <p>O ebook mostra como usar o Claude (IA) como consultor estratégico em tempo real — analisando métricas, sugerindo horários de postagem, criando prompts, identificando problemas antes que eles matem o vídeo.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTERS */}
      <section id="conteudo">
        <div className="container">
          <div className="section-head fade">
            <span className="label">// Conteúdo</span>
            <h2>O Que Você Vai Encontrar Dentro</h2>
          </div>
          <div className="chapters">
            <div className="chapter fade"><div className="emo">🎵</div><div><h3>Capítulo 1 — O Nicho de Ouro</h3><p>Como funciona o mercado de canais de IA musical, por que viraliza, e qual público realmente compartilha (spoiler: não é quem você imagina).</p></div></div>
            <div className="chapter fade"><div className="emo">🎤</div><div><h3>Capítulo 2 — Criando Músicas que Prendem</h3><p>Suno passo a passo: Style prompts, Cover Mode, configurações exatas, como fazer a voz entrar nos primeiros 4 segundos (a regra que mudou tudo).</p></div></div>
            <div className="chapter fade"><div className="emo">🎨</div><div><h3>Capítulo 3 — Personagens Fotorrealistas com IA</h3><p>O modelo cinematográfico CGI Hollywood que desenvolvemos: prompt completo, psicologia das cores, como usar imagem de referência para consistência visual.</p></div></div>
            <div className="chapter fade"><div className="emo">🎬</div><div><h3>Capítulo 4 — Animação dos Personagens</h3><p>Kling, Dreamina, Veo 3, HeyGen — qual usar pra cada situação, prompts de animação, como evitar bugs e desperdiçar créditos.</p></div></div>
            <div className="chapter fade"><div className="emo">✂️</div><div><h3>Capítulo 5 — Edição Profissional no CapCut</h3><p>Exportação 4K 60fps, fontes corretas, watermark, texto na tela, configurações de upload que fazem diferença na qualidade.</p></div></div>
            <div className="chapter highlight fade"><div className="emo">📊</div><div><h3>Capítulo 6 — Análise de Métricas (O Ouro do Ebook)</h3><p>AS ANÁLISES REAIS: como interpretar skip rate, taxa de compartilhamento, tempo médio e faixa etária do público. Com prints reais do canal e decisões tomadas baseadas nos dados. Este capítulo sozinho vale o ebook inteiro.</p></div></div>
            <div className="chapter fade"><div className="emo">📱</div><div><h3>Capítulo 7 — Estratégias de Viralização</h3><p>Quando postar, quando NÃO postar, como usar canal existente para alavancar canal novo (sem risco), Community Posts, comentários fixados, frequência ideal por fase de crescimento.</p></div></div>
            <div className="chapter fade"><div className="emo">💰</div><div><h3>Capítulo 8 — Monetização Real</h3><p>Instagram não paga no Brasil. E agora? YouTube AdSense, publipost, afiliados, infoprodutos. Com estimativas reais de receita por faixa de seguidores.</p></div></div>
          </div>
          <p className="chapters-foot fade">O ebook inclui todos os templates, prompts e checklists mencionados prontos para copiar e colar.</p>
        </div>
      </section>

      {/* PREVIEW METRICS */}
      <section className="alt">
        <div className="container">
          <div className="section-head fade">
            <span className="label">// Preview</span>
            <h2>Um Gostinho do Que Tem Dentro</h2>
            <p>Análise real do vídeo que fez 84k views.</p>
          </div>
          <div className="preview-box fade">
            <div className="preview-row"><span className="t">4h</span><span className="v">1.305 views</span><span className="s">skip 33,96%</span></div>
            <div className="preview-row"><span className="t">14h</span><span className="v">5.845 views</span><span className="s">skip 31,41%</span></div>
            <div className="preview-row"><span className="t">Dia 3</span><span className="v">32.410 views</span><span className="s">skip 27,95%</span></div>
            <div className="preview-row"><span className="t">Dia 5</span><span className="v">84.000+ views</span><span className="s">skip 28,34%</span></div>
          </div>
          <p style={{ textAlign: 'center', color: 'var(--gray)', marginTop: 30, maxWidth: 680, marginLeft: 'auto', marginRight: 'auto' }} className="fade">No ebook você vê essa análise para CADA vídeo postado, com explicação do que cada número significa e qual decisão foi tomada baseada nele.</p>
          <div className="golden-box fade">
            Este tipo de análise em tempo real é o que diferencia um canal que cresce de um que estagna. E agora você tem acesso a todas elas.
          </div>
        </div>
      </section>

      {/* AUDIENCE */}
      <section>
        <div className="container">
          <div className="section-head fade">
            <span className="label">// Para Quem</span>
            <h2>Este Ebook é Para Você?</h2>
          </div>
          <div className="audience">
            <div className="aud-col yes fade">
              <h3 style={{ color: 'var(--green)' }}>Este ebook é para você se...</h3>
              <ul>
                <li><span className="ic">✓</span> Quer criar um canal de conteúdo com IA do zero</li>
                <li><span className="ic">✓</span> Já tentou e não conseguiu viralizar</li>
                <li><span className="ic">✓</span> Quer entender como funcionam as métricas do Instagram</li>
                <li><span className="ic">✓</span> Quer aprender Suno, Midjourney, CapCut na prática</li>
                <li><span className="ic">✓</span> Busca uma fonte de renda com conteúdo digital</li>
                <li><span className="ic">✓</span> Quer usar IA como ferramenta de trabalho real</li>
              </ul>
            </div>
            <div className="aud-col no fade">
              <h3 style={{ color: 'var(--red)' }}>Este ebook NÃO é para você se...</h3>
              <ul>
                <li><span className="ic">✕</span> Espera ficar rico do dia pra noite</li>
                <li><span className="ic">✕</span> Não quer investir tempo aprendendo as ferramentas</li>
                <li><span className="ic">✕</span> Procura um "botão mágico" de viralização</li>
                <li><span className="ic">✕</span> Não está disposto a testar, errar e ajustar</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="alt">
        <div className="container">
          <div className="section-head fade">
            <span className="label">// Reação Real</span>
            <h2>Comentários Reais dos Vídeos</h2>
          </div>
          <div className="testi-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="testi fade">
                <div className="head">
                  <div className="avatar"></div>
                  <div className="uname">{t.username}</div>
                </div>
                <div className="msg">{t.msg}</div>
              </div>
            ))}
          </div>
          <p className="testi-foot fade">Comentários orgânicos reais do canal <span style={{ color: 'var(--gold)' }}>@iaplaude</span></p>
        </div>
      </section>

      {/* AUTHOR */}
      <section>
        <div className="container">
          <div className="section-head fade">
            <span className="label">// Autor</span>
            <h2>Quem Está Por Trás do @iaplaude</h2>
          </div>
          <div className="author-card fade">
            <div className="avatar">i</div>
            <p>Sou criador de conteúdo digital. Quando descobri o potencial de canais de IA musical, decidi testar na prática e documentar tudo. Em menos de 2 semanas, o canal saiu do zero para mais de 1.100 seguidores e 84 mil views em um único vídeo, com proposta comercial recebida antes de completar 14 dias.</p>
            <p>Este ebook é o registro completo dessa jornada — cada acerto, cada erro, cada métrica. Não é teoria de guru. É prática documentada.</p>
          </div>
        </div>
      </section>

      {/* GUARANTEE */}
      <section className="alt">
        <div className="container">
          <div className="guarantee fade">
            <div className="seal">
              <div className="big">7</div>
              <div className="small">DIAS · GARANTIA</div>
            </div>
            <h2>Garantia Incondicional de 7 Dias</h2>
            <p>Leia o ebook inteiro. Aplique o que aprender. Se em 7 dias você sentir que não valeu cada centavo, me manda um email e devolvemos 100% do valor. Sem perguntas, sem burocracia, sem ressentimento.</p>
          </div>
        </div>
      </section>

      {/* OFFER */}
      <div className="offer-wrap" id="oferta">
        <div className="container">
          <div className="offer-card fade">
            <span className="pretitle">// Comece Agora</span>
            <h2>Acesso Imediato ao Guia Completo</h2>
            <div className="product">Ebook Completo + Templates + Análises de Métricas</div>
            <div className="price">R$99,90</div>
            <div className="install">ou 6x de R$17,86</div>
            <a href={CHECKOUT_URL} className="cta-btn lg" target="_blank" rel="noopener noreferrer">Quero o Guia Completo — R$99,90</a>
            <div className="badges">
              <span>🔒 Compra 100% segura</span>
              <span>⚡ Acesso imediato por email</span>
              <span>↩️ Garantia de 7 dias</span>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <section>
        <div className="container">
          <div className="section-head fade">
            <span className="label">// FAQ</span>
            <h2>Perguntas Frequentes</h2>
          </div>
          <div className="faq">
            {[
              { q: 'Preciso saber algo sobre música?', a: 'Não. O ebook ensina do zero. As ferramentas de IA fazem o trabalho musical.' },
              { q: 'Quanto custa pra começar a criar?', a: 'Suno tem versão gratuita. CapCut tem versão gratuita. Midjourney/Flow tem planos a partir de R$50/mês. Você pode começar gastando zero.' },
              { q: 'Funciona pra qualquer tipo de conteúdo?', a: 'O método foi testado com músicas, mas os princípios de análise de métricas e viralização se aplicam a qualquer formato de Reels/Shorts.' },
              { q: 'Como recebo o ebook?', a: 'Imediatamente após a confirmação do pagamento, por email. Formato PDF.' },
              { q: 'E se eu não gostar?', a: 'Garantia incondicional de 7 dias. Devolvemos 100%.' },
              { q: 'Posso parcelar?', a: 'Sim, até 6x no cartão de crédito.' },
            ].map((item, i) => (
              <div key={i} className={`faq-item${openFaq === i ? ' open' : ''}`}>
                <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {item.q}<span className="plus">+</span>
                </button>
                <div className="faq-a"><div>{item.a}</div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="container footer-inner">
          <div className="logo">@iaplaude</div>
          <div className="social">
            <a href="https://instagram.com/iaplaude" target="_blank" rel="noopener">Instagram</a>
            <a href="#" target="_blank" rel="noopener">TikTok</a>
            <a href="#" target="_blank" rel="noopener">YouTube</a>
          </div>
          <div>© 2026 @iaplaude — Todos os direitos reservados.</div>
          <div className="legal">Este produto é comercializado através da plataforma Hotmart/Kiwify. As marcas Instagram, TikTok, YouTube, Suno, Midjourney, CapCut e Claude são propriedade de seus respectivos donos.</div>
          <div className="links"><a href="#">Termos de Uso</a> · <a href="#">Política de Privacidade</a></div>
        </div>
      </footer>

      {/* Floating CTA mobile */}
      <div className={`float-cta${showFloat ? ' show' : ''}`}>
        <a href={CHECKOUT_URL} className="cta-btn" target="_blank" rel="noopener noreferrer">Garantir por R$99,90</a>
      </div>
    </>
  )
}
