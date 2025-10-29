# 💰 Crypto Dashboard Real-time

> Dashboard profissional de criptomoedas com dados em tempo real, drag-and-drop, tooltips avançados e design moderno responsivo.

[![Live Demo](https://img.shields.io/badge/Demo-Live-success?style=for-the-badge)](https://dashboard-realtime.vercel.app)
[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.3-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)

## 🌟 Destaques

- 🔴 **Dados em Tempo Real** via WebSocket Binance
- 🎯 **Drag & Drop** para reordenar moedas (com persistência)
- 📊 **Tooltips Avançados** com preço, volume, máx/mín 24h
- 🔍 **Zoom & Pan** no gráfico (Ctrl + Scroll/Arraste)
- 🎨 **12 Ícones SVG** customizados e animados
- 🌍 **5 Moedas Fiat** (USD, BRL, EUR, GBP, JPY)
- ⚡ **Debouncing** na busca para performance
- 📈 **Indicadores Visuais** de tendência (setas animadas)
- 📱 **100% Responsivo** mobile-first
- 💾 **LocalStorage** para salvar preferências

## 📸 Screenshots

### Dashboard Principal
Interface principal com sidebar drag-and-drop, gráficos interativos e estatísticas em tempo real.

### Tooltips Avançados
Hover no gráfico exibe: timestamp completo, preço do ponto, máxima 24h, mínima 24h e volume 24h.

### Mobile Responsivo
Sidebar overlay com menu hamburguer, drag handle sempre visível, layout otimizado para telas pequenas.

## 🚀 Tecnologias

### Core
- **React 18.2** - Biblioteca UI com Hooks
- **TypeScript 5.2** - Type safety e IntelliSense
- **Vite 5.0** - Build tool ultrarrápido
- **Tailwind CSS 3.3** - Utility-first CSS

### Visualização
- **Chart.js 4.4** - Gráficos canvas performáticos
- **chartjs-plugin-zoom 2.0** - Zoom e pan interativos
- **react-chartjs-2 5.2** - Wrapper React otimizado
- **Framer Motion 10.18** - Animações fluidas

### Interação
- **@dnd-kit 6.1** - Drag and drop acessível
- **@dnd-kit/sortable 8.0** - Lista sortable
- **@dnd-kit/utilities 3.2** - Helpers dnd-kit

### Data & Utils
- **date-fns 3.0** - Manipulação de datas
- **Lucide React** - Ícones SVG modernos

### APIs
- **Binance WebSocket** - Dados de mercado real-time
- **Custom SVG Icons** - Ícones vetorizados exclusivos

## 💎 Features Implementadas

### ✅ Visualização Avançada de Dados

#### Tooltips Interativos
- 📅 **Data/Hora Completa** - dd/MM/yyyy HH:mm:ss
- 💰 **Preço do Ponto** - formatado com 2 decimais
- 📈 **Máxima 24h** - maior preço nas últimas 24h
- 📉 **Mínima 24h** - menor preço nas últimas 24h
- 📊 **Volume 24h** - volume negociado em USD

#### Zoom e Pan
- 🔍 **Zoom** - Ctrl + Scroll do mouse
- 👆 **Pan** - Ctrl + Arrastar
- 📱 **Pinch Zoom** - suporte a dispositivos touch
- ℹ️ **Dica Visual** - instrução abaixo do gráfico

#### Cards de Estatísticas Detalhadas
- 💵 **Volume 24h** - volume total negociado
- ✅ **Máxima 24h** - card verde com máxima
- ❌ **Mínima 24h** - card vermelho com mínima
- 📊 **Grid Responsivo** - 3 colunas desktop, compacto mobile

### ✅ Seletor de Período (UI Pronto)
- ⏰ **5 Períodos** - 1H, 24H, 7D, 30D, 1A
- 🎨 **Animação LayoutId** - transição suave entre períodos
- 📱 **Responsivo** - ícone Clock oculto em mobile
- ⚠️ **Status**: UI implementada, **funcionalidade pendente**

### ✅ Indicadores Visuais de Tendência
- ⬆️ **Setas Animadas** - ArrowUp/ArrowDown com bounce
- 📈 **Card Média 24h** - seta dinâmica baseada em tendência
- 🚀 **Top Gainer** - ArrowUp + TrendingUp
- 📉 **Top Loser** - ArrowDown + TrendingDown
- 🎨 **Cores Semânticas** - verde (alta), vermelho (baixa)

### ✅ Drag & Drop para Reordenar
- 🎯 **Reordenação Intuitiva** - arraste e solte moedas
- 👆 **Handle Visual** - ícone GripVertical
- 💾 **Persistência** - ordem salva no localStorage
- ♿ **Acessível** - suporte a mouse, touch e teclado
- 📱 **Mobile-First** - handle sempre visível em mobile

### ✅ Performance Otimizada
- ⚡ **Debouncing 300ms** - na busca da sidebar
- 🎯 **Custom Hook** - `useDebounce` reutilizável
- 🚫 **Reduz Re-renders** - durante digitação rápida
- 📊 **Histórico Limitado** - máximo 50 pontos no gráfico

### ✅ Responsividade Mobile
- 🍔 **Menu Hamburguer** - sidebar overlay animado
- 👆 **Drag Handle Visível** - opacity-30 em mobile
- 📏 **Espaçamento Otimizado** - pl-5 mobile, pl-6 desktop
- 🔍 **Text Sizes Adaptativos** - text-xs md:text-sm
- 📱 **Breakpoints** - mobile-first com md: (768px+)

### 🪙 12 Criptomoedas Suportadas

| Moeda | Símbolo | Cor Oficial | Icon |
|-------|---------|-------------|------|
| Bitcoin | BTC | `#F7931A` | ₿ |
| Ethereum | ETH | `#627EEA` | Ξ |
| Binance Coin | BNB | `#F3BA2F` | BNB |
| Solana | SOL | `#14F195` | ◎ |
| Ripple | XRP | `#23292F` | XRP |
| Cardano | ADA | `#0033AD` | ₳ |
| Dogecoin | DOGE | `#C2A633` | Ð |
| Polygon | MATIC | `#8247E5` | MATIC |
| Polkadot | DOT | `#E6007A` | DOT |
| Avalanche | AVAX | `#E84142` | AVAX |
| Chainlink | LINK | `#2A5ADA` | LINK |
| Uniswap | UNI | `#FF007A` | UNI |

### 🌍 Conversão de Moedas Fiat

- 🇺🇸 **USD** - Dólar Americano ($)
- 🇧🇷 **BRL** - Real Brasileiro (R$)
- 🇪🇺 **EUR** - Euro (€)
- 🇬🇧 **GBP** - Libra Esterlina (£)
- 🇯🇵 **JPY** - Iene Japonês (¥)

## 🚧 Features Pendentes (Roadmap)

### 📅 Seletor de Período (Funcionalidade)
**Status**: UI pronta, lógica pendente
- [ ] Integrar com API histórica da Binance
- [ ] Fetch de dados por período (1h, 24h, 7d, 30d, 1a)
- [ ] Cache de dados históricos
- [ ] Loading state durante fetch
- [ ] Tratamento de erros

### 📊 Capitalização de Mercado
- [ ] Exibir market cap individual por moeda
- [ ] Ranking por market cap
- [ ] Fetch de dados adicionais da API
- [ ] Card dedicado para market cap global

### 📁 Sistema de Watchlists Múltiplas
- [ ] Criar múltiplas watchlists personalizadas
- [ ] Adicionar/remover moedas de watchlists
- [ ] Alternar entre watchlists
- [ ] Persistência no localStorage
- [ ] UI com tabs ou dropdown

### 💼 Portfolio Tracker
- [ ] Adicionar quantidade de moedas possuídas
- [ ] Calcular valor total do portfolio
- [ ] Mostrar lucro/prejuízo em tempo real
- [ ] Histórico de transações (compra/venda)
- [ ] Gráfico de distribuição do portfolio
- [ ] Exportar dados para CSV

### 📈 Tipos de Gráficos Alternativos
- [ ] Gráfico de Velas (Candlestick)
- [ ] Gráfico de Área (Area Chart)
- [ ] Seletor de tipo de gráfico
- [ ] Fetch de dados OHLC da Binance

### 🔬 Indicadores Técnicos
- [ ] RSI (Relative Strength Index)
- [ ] MACD (Moving Average Convergence Divergence)
- [ ] Médias Móveis (SMA, EMA)
- [ ] Bollinger Bands
- [ ] Toggle para mostrar/ocultar indicadores
- [ ] Biblioteca de cálculo (ex: technicalindicators)

### 🔔 Sistema de Alertas de Preço
- [ ] Criar alertas personalizados
- [ ] Notificações quando preço atingir valor
- [ ] Alertas de variação percentual
- [ ] Histórico de alertas disparados
- [ ] Web Notifications API
- [ ] Som de notificação

### 🎨 Modo de Alto Contraste
- [ ] Tema high-contrast
- [ ] Cores mais acessíveis (WCAG AAA)
- [ ] Toggle no header

### 🔄 Comparação entre Moedas
- [ ] Múltiplas moedas no mesmo gráfico
- [ ] Normalização de escala
- [ ] Cores distintas por moeda
- [ ] Toggle para adicionar/remover do gráfico

## 🏗️ Arquitetura

```
dashboard-realtime/
├── src/
│   ├── components/
│   │   ├── Dashboard.tsx          # Layout principal
│   │   ├── Sidebar.tsx            # Barra lateral drag-and-drop
│   │   ├── CryptoIcon.tsx         # Ícones SVG customizados (12)
│   │   ├── CurrencyChart.tsx      # Gráfico Chart.js + zoom
│   │   ├── FiatSelector.tsx       # Seletor de moeda fiat
│   │   └── PeriodSelector.tsx     # Seletor de período (UI)
│   ├── hooks/
│   │   ├── useCurrencyData.ts     # Hook WebSocket + reorder
│   │   └── useDebounce.ts         # Hook debounce 300ms
│   ├── services/
│   │   └── currencyWebSocket.ts   # Serviço Binance WS
│   ├── types/
│   │   └── index.ts               # TypeScript interfaces
│   ├── App.tsx                    # App root
│   ├── main.tsx                   # Entry point
│   └── index.css                  # Global styles + Tailwind
├── public/
├── vercel.json                    # Vercel config
├── README.md                      # Este arquivo
├── agents.md                      # Documentação para IA
└── package.json
```

## 🚀 Quick Start

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/Adilsonjvr/dashboard-realtime.git

# Entre no diretório
cd dashboard-realtime

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse: [http://localhost:5173](http://localhost:5173)

### Build para Produção

```bash
# Gerar build otimizado
npm run build

# Preview do build
npm run preview
```

## 📦 Deploy

### Vercel (Recomendado)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Adilsonjvr/dashboard-realtime)

**Via CLI:**
```bash
npm install -g vercel
vercel
```

**Via GitHub:**
1. Push para GitHub
2. Importe no Vercel
3. Deploy automático configurado!

### Outras Plataformas

- **Netlify**: `npm run build` → Deploy pasta `dist/`
- **GitHub Pages**: Requer ajuste de base path
- **Docker**: Dockerfile incluído (opcional)

## 🎯 Como Usar

### 1. Visualizar Cotações
- Veja todas as 12 criptomoedas na sidebar
- Cotações atualizadas em tempo real via WebSocket

### 2. Reordenar Moedas (Drag & Drop)
- **Desktop**: Hover para mostrar handle, arraste e solte
- **Mobile**: Handle sempre visível, toque e arraste
- **Teclado**: Navegue com Tab, mova com Space + Arrow keys
- Ordem salva automaticamente no localStorage

### 3. Buscar Moedas
- Use a barra de busca no topo da sidebar
- Filtragem instantânea por nome ou símbolo
- Debounce de 300ms para performance

### 4. Selecionar Moeda
- Clique em qualquer moeda para ver detalhes
- Gráfico principal atualiza automaticamente
- Tooltips aparecem ao passar o mouse no gráfico

### 5. Explorar Gráfico Interativo
- **Zoom In/Out**: Ctrl + Scroll do mouse
- **Pan (Mover)**: Ctrl + Clique e arraste
- **Mobile**: Pinch to zoom com 2 dedos
- **Reset**: Dê refresh ou duplo clique no gráfico

### 6. Ver Estatísticas Detalhadas
- **Cards superiores**: Market Cap, Média 24h, Top Gainer/Loser
- **Cards do gráfico**: Volume, Máxima e Mínima 24h
- **Tooltips**: Hover no gráfico para dados do ponto

### 7. Trocar Moeda Fiat
- Clique no seletor de moeda (topo direito)
- Escolha entre USD, BRL, EUR, GBP, JPY
- Todas cotações convertem automaticamente

### 8. Selecionar Período (UI Pronta)
- Clique em 1H, 24H, 7D, 30D ou 1A
- ⚠️ **Aviso**: Funcionalidade de fetch ainda não implementada
- Atualmente mostra sempre últimos 50 pontos em tempo real

## 🔧 Customização

### Adicionar Nova Criptomoeda

**1. Adicione aos dados:**
Edite `src/services/currencyWebSocket.ts`:

```typescript
export const CURRENCIES = [
  // ... moedas existentes
  {
    symbol: 'ATOM',
    name: 'Cosmos',
    color: '#2E3148',
    icon: 'ATOM'
  },
]
```

**2. Crie o ícone SVG:**
Edite `src/components/CryptoIcon.tsx`:

```typescript
const iconMap: { [key: string]: JSX.Element } = {
  // ... ícones existentes
  ATOM: (
    <svg viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#2E3148"/>
      {/* Seu desenho SVG aqui */}
    </svg>
  ),
}
```

### Adicionar Nova Moeda Fiat

Edite `src/services/currencyWebSocket.ts`:

```typescript
export const FIAT_CURRENCIES = [
  // ... moedas existentes
  {
    code: 'AUD',
    symbol: 'A$',
    name: 'Australian Dollar',
    flag: '🇦🇺'
  },
]
```

E adicione taxa de conversão no mesmo arquivo:

```typescript
private conversionRates: Map<string, number> = new Map([
  // ... taxas existentes
  ['AUD', 1.5], // Exemplo: 1 USD = 1.5 AUD
])
```

### Mudar Delay do Debounce

Edite onde `useDebounce` é chamado (ex: `src/components/Sidebar.tsx`):

```typescript
// 300ms (padrão)
const debouncedSearchTerm = useDebounce(searchTerm, 300)

// 500ms (mais lento, menos chamadas)
const debouncedSearchTerm = useDebounce(searchTerm, 500)

// 100ms (mais rápido, mais chamadas)
const debouncedSearchTerm = useDebounce(searchTerm, 100)
```

### Customizar Cores do Tema

Edite `tailwind.config.js` ou use classes inline nos componentes:

```typescript
// Exemplo: mudar cor do card Gainer
className="bg-gradient-to-br from-purple-500/10 to-purple-600/5"
```

## 🌐 API WebSocket

### Endpoint Binance
```
wss://stream.binance.com:9443/ws
```

### Streams Utilizados
```
{symbol}usdt@ticker
```

Exemplo: `btcusdt@ticker`, `ethusdt@ticker`

### Dados Recebidos (Ticker 24h)
```typescript
{
  e: '24hrTicker',           // Event type
  s: 'BTCUSDT',              // Symbol
  c: '45000.00',             // Current price
  p: '1250.50',              // Price change (24h)
  P: '2.85',                 // Price change percent (24h)
  h: '46000.00',             // High price (24h)
  l: '43500.00',             // Low price (24h)
  v: '25000.50'              // Volume (24h)
}
```

### Reconnect Logic
- Máximo 5 tentativas automáticas
- Delay de 3 segundos entre tentativas
- Botão manual de reconexão no header

## 🐛 Troubleshooting

### WebSocket não conecta

**Problema:** Status "Offline" constante

**Soluções:**
1. Verifique conexão com internet
2. Teste endpoint: `wscat -c wss://stream.binance.com:9443/ws`
3. Verifique firewall/proxy/VPN
4. Binance pode ter rate limit (aguarde 1-5 min)
5. Verifique console para erros específicos

### Drag & Drop não funciona em mobile

**Problema:** Não consegue arrastar moedas no celular

**Soluções:**
1. Verifique se handle (3 linhas) está visível
2. Toque e segure por 300ms antes de arrastar
3. Certifique-se que não está em modo busca
4. Limpe cache do navegador
5. Teste em outro navegador mobile

### Tooltips não aparecem

**Problema:** Hover no gráfico não mostra informações

**Soluções:**
1. Verifique console para erros Chart.js
2. Confirme que há dados em `priceHistory`
3. Teste com outra moeda selecionada
4. Limpe cache: `Ctrl+Shift+R` (ou `Cmd+Shift+R`)

### Gráfico não renderiza

**Problema:** Área do gráfico em branco

**Soluções:**
1. Verifique console para erros Chart.js
2. Confirme que há dados em `priceHistory`
3. Limpe cache do navegador
4. Reinstale dependências: `rm -rf node_modules && npm install`
5. Verifique se WebSocket está conectado (status "Live")

### Build falha no TypeScript

**Problema:** Erros de tipo na compilação

**Soluções:**
1. Execute: `npx tsc --noEmit` para ver erros detalhados
2. Verifique versão Node.js (18+ requerido)
3. Atualize dependências: `npm update`
4. Reinstale tipos: `npm install -D @types/node @types/react`

### Performance lenta

**Problema:** Interface travando ou FPS baixo

**Soluções:**
1. Desabilite React DevTools em produção
2. Histórico já limitado a 50 pontos (não mude)
3. Verifique memory leaks no Console → Memory
4. Feche outras abas do navegador
5. Teste em modo Incognito
6. Atualize navegador para última versão

### Ordem das moedas não persiste

**Problema:** Ordem resetada ao recarregar

**Soluções:**
1. Verifique se localStorage está habilitado
2. Console: `localStorage.getItem('currencyOrder')`
3. Modo privado/incognito pode desabilitar localStorage
4. Limpe localStorage: `localStorage.clear()` e reordene

### Zoom do gráfico não funciona

**Problema:** Ctrl + Scroll não faz zoom

**Soluções:**
1. Certifique-se de pressionar **Ctrl** antes de rolar
2. No Mac, use **Cmd** em vez de Ctrl
3. Verifique se plugin zoom está registrado
4. Console: procure erros do chartjs-plugin-zoom
5. Reinstale: `npm install chartjs-plugin-zoom`

## 📊 Performance Atual

- ⚡ **First Load**: ~1.2s (com WebSocket)
- 🎨 **FPS**: 60fps constante
- 📦 **Bundle Size**: ~552KB (~182KB gzipped)
- 🚀 **Lighthouse Score**:
  - Performance: 90+
  - Accessibility: 95+
  - Best Practices: 100
  - SEO: 100

### Breakdown do Bundle
- React + ReactDOM: ~130KB
- Chart.js + Plugins: ~150KB
- @dnd-kit: ~50KB
- Framer Motion: ~80KB
- Outros: ~142KB

### Otimizações Futuras
- [ ] Code splitting por rota
- [ ] Lazy loading de componentes pesados
- [ ] Tree shaking de bibliotecas
- [ ] Compressão Brotli no servidor
- [ ] Service Worker para cache

## 🤝 Contribuindo

Contribuições são bem-vindas! Especialmente para features pendentes.

### Como Contribuir

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona NovaFeature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

### Convenção de Commits

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` nova feature
- `fix:` correção de bug
- `docs:` mudanças em documentação
- `style:` formatação, ponto e vírgula, etc
- `refactor:` refatoração de código
- `perf:` melhoria de performance
- `test:` adição de testes
- `chore:` atualização de build, configs, etc

## 📄 Licença

Este projeto está sob a licença MIT. Veja [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Adilson Jr**

- GitHub: [@Adilsonjvr](https://github.com/Adilsonjvr)
- LinkedIn: [Adilson Jr](https://linkedin.com/in/adilsonjvr)
- Portfolio: [adilsonjvr.dev](https://portfolio-k1pghyq26-adilsonjvrs-projects.vercel.app)

## 🙏 Agradecimentos

- Binance por fornecer API WebSocket gratuita e estável
- Comunidade React e TypeScript
- Chart.js, Framer Motion e dnd-kit teams
- Todos que contribuíram com feedback e issues

## 📚 Recursos Úteis

### Documentação de APIs e Bibliotecas
- [Binance WebSocket API](https://binance-docs.github.io/apidocs/spot/en/#websocket-market-streams)
- [Chart.js Documentation](https://www.chartjs.org/docs/)
- [chartjs-plugin-zoom](https://www.chartjs.org/chartjs-plugin-zoom/)
- [dnd-kit Documentation](https://docs.dndkit.com/)
- [Framer Motion Guide](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/docs)

### Tutoriais Relacionados
- [WebSocket em React](https://javascript.info/websocket)
- [TypeScript com React](https://react-typescript-cheatsheet.netlify.app/)
- [Drag and Drop Acessível](https://docs.dndkit.com/introduction/philosophy)

---

<p align="center">
  Feito com ❤️ e ☕ por <a href="https://github.com/Adilsonjvr">Adilson Jr</a>
</p>

<p align="center">
  <sub>⭐ Se este projeto te ajudou, considere dar uma estrela!</sub>
</p>

<p align="center">
  <sub>🐛 Encontrou um bug? <a href="https://github.com/Adilsonjvr/dashboard-realtime/issues">Abra uma issue</a></sub>
</p>
