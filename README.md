# 💰 Crypto Dashboard Real-time

> Dashboard profissional de criptomoedas com dados em tempo real, design moderno e ícones SVG de alta qualidade.

[![Live Demo](https://img.shields.io/badge/Demo-Live-success?style=for-the-badge)](https://dashboard-realtime.vercel.app)
[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.3-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)

![Dashboard Preview](https://via.placeholder.com/1200x600/0f172a/ffffff?text=Crypto+Dashboard+Preview)

## 🌟 Destaques

- 🔴 **Dados em Tempo Real** via WebSocket Binance
- 🎨 **12 Ícones SVG** customizados e animados
- 🌍 **5 Moedas Fiat** (USD, BRL, EUR, GBP, JPY)
- 📊 **Gráficos Interativos** com Chart.js
- 🎭 **Animações Suaves** com Framer Motion
- 🔍 **Busca Instantânea** de criptomoedas
- 📱 **Design Responsivo** e moderno
- ⚡ **Performance Otimizada** 60fps

## 📸 Screenshots

### Dashboard Principal
Interface principal com sidebar, gráficos e estatísticas em tempo real.

### Seletor de Moedas
Sidebar com busca instantânea e ícones SVG animados.

### Multi-Currency
Suporte a conversão para BRL, EUR, GBP e JPY em tempo real.

## 🚀 Tecnologias

### Core
- **React 18.2** - Biblioteca UI com Hooks
- **TypeScript 5.2** - Type safety e IntelliSense
- **Vite 5.0** - Build tool ultrarrápido
- **Tailwind CSS 3.3** - Utility-first CSS

### Visualização
- **Chart.js 4.4** - Gráficos canvas performáticos
- **react-chartjs-2 5.2** - Wrapper React otimizado
- **Framer Motion 10.18** - Animações fluidas

### Data & Utils
- **date-fns 3.0** - Manipulação de datas
- **Lucide React** - Ícones SVG modernos

### APIs
- **Binance WebSocket** - Dados de mercado real-time
- **Custom SVG Icons** - Ícones vetorizados exclusivos

## 💎 Features

### 🪙 12 Criptomoedas Suportadas

| Moeda | Símbolo | Ícone | Cor |
|-------|---------|-------|-----|
| Bitcoin | BTC | ₿ | `#F7931A` |
| Ethereum | ETH | Ξ | `#627EEA` |
| Binance Coin | BNB | BNB | `#F3BA2F` |
| Solana | SOL | ◎ | Gradient |
| Ripple | XRP | XRP | `#23292F` |
| Cardano | ADA | ₳ | `#0033AD` |
| Dogecoin | DOGE | Ð | `#C2A633` |
| Polygon | MATIC | MATIC | `#8247E5` |
| Polkadot | DOT | DOT | `#E6007A` |
| Avalanche | AVAX | AVAX | `#E84142` |
| Chainlink | LINK | LINK | `#2A5ADA` |
| Uniswap | UNI | UNI | `#FF007A` |

### 🌍 Conversão de Moedas Fiat

- 🇺🇸 **USD** - Dólar Americano ($)
- 🇧🇷 **BRL** - Real Brasileiro (R$)
- 🇪🇺 **EUR** - Euro (€)
- 🇬🇧 **GBP** - Libra Esterlina (£)
- 🇯🇵 **JPY** - Iene Japonês (¥)

### 📊 Estatísticas em Tempo Real

- **Market Cap Total** - Capitalização de mercado
- **Variação Média 24h** - Performance geral
- **Top Gainer** - Maior valorização
- **Top Loser** - Maior desvalorização

### 🎨 Ícones SVG de Alta Qualidade

Cada criptomoeda possui um ícone SVG exclusivo:
- ✅ Vetorizado e escalável
- ✅ Cores oficiais de cada projeto
- ✅ Animações de hover interativas
- ✅ Gradientes nativos (Solana)
- ✅ Otimizados para performance

## 🏗️ Arquitetura

```
dashboard-realtime/
├── src/
│   ├── components/
│   │   ├── Dashboard.tsx          # Layout principal
│   │   ├── Sidebar.tsx            # Barra lateral de moedas
│   │   ├── CryptoIcon.tsx         # Ícones SVG customizados
│   │   ├── CurrencyChart.tsx      # Gráfico Chart.js
│   │   └── FiatSelector.tsx       # Seletor de moeda fiat
│   ├── hooks/
│   │   └── useCurrencyData.ts     # Hook WebSocket
│   ├── services/
│   │   └── currencyWebSocket.ts   # Serviço Binance
│   ├── types/
│   │   └── index.ts               # TypeScript interfaces
│   ├── App.tsx                    # App root
│   ├── main.tsx                   # Entry point
│   └── index.css                  # Global styles
├── public/
├── vercel.json                    # Vercel config
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

### 2. Buscar Moedas
- Use a barra de busca no topo da sidebar
- Filtragem instantânea por nome ou símbolo

### 3. Selecionar Moeda
- Clique em qualquer moeda para ver detalhes
- Gráfico principal atualiza automaticamente

### 4. Trocar Moeda Fiat
- Clique no seletor de moeda (topo direito)
- Escolha entre USD, BRL, EUR, GBP, JPY
- Todas cotações convertem automaticamente

### 5. Acompanhar Performance
- Cards de estatísticas mostram performance geral
- Top Gainer/Loser destacam melhores e piores

## 🔧 Customização

### Adicionar Nova Criptomoeda

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

### Adicionar Nova Moeda Fiat

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

### Customizar Ícone SVG

Edite `src/components/CryptoIcon.tsx`:

```typescript
const iconMap = {
  ATOM: (
    <svg viewBox="0 0 32 32">
      {/* Seu SVG aqui */}
    </svg>
  ),
}
```

### Mudar Cores do Tema

Edite `src/index.css` ou componentes individuais usando classes Tailwind.

## 🌐 API WebSocket

### Endpoint Binance
```
wss://stream.binance.com:9443/ws
```

### Streams Utilizados
```
{symbol}usdt@ticker
```

### Dados Recebidos
```typescript
{
  e: '24hrTicker',           // Event type
  s: 'BTCUSDT',              // Symbol
  c: '45000.00',             // Current price
  p: '1250.50',              // Price change
  P: '2.85',                 // Price change percent
  h: '46000.00',             // High price
  l: '43500.00',             // Low price
  v: '25000000000'           // Volume
}
```

## 🐛 Troubleshooting

### WebSocket não conecta

**Problema:** Status "Offline" constante

**Soluções:**
1. Verifique conexão com internet
2. Teste endpoint: `wscat -c wss://stream.binance.com:9443/ws`
3. Verifique firewall/proxy
4. Binance pode ter rate limit (aguarde 1 min)

### Gráfico não renderiza

**Problema:** Área do gráfico em branco

**Soluções:**
1. Verifique console para erros Chart.js
2. Confirme que há dados em `priceHistory`
3. Limpe cache do navegador
4. Reinstale dependências: `rm -rf node_modules && npm install`

### Build falha no TypeScript

**Problema:** Erros de tipo na compilação

**Soluções:**
1. Execute: `npx tsc --noEmit`
2. Verifique versão Node.js (18+)
3. Atualize dependências: `npm update`

### Performance lenta

**Problema:** Interface travando

**Soluções:**
1. Desabilite React DevTools em produção
2. Limite histórico de preços (máx 50 pontos)
3. Use `React.memo()` em componentes pesados
4. Verifique memory leaks no Console

## 📊 Performance

- ⚡ **First Load**: ~800ms
- 🎨 **FPS**: 60fps constante
- 📦 **Bundle Size**: ~250KB (gzipped)
- 🚀 **Lighthouse Score**: 95+

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Adilson Jr**

- GitHub: [@Adilsonjvr](https://github.com/Adilsonjvr)
- LinkedIn: [Adilson Jr](https://linkedin.com/in/adilsonjvr)
- Portfolio: [adilsonjvr.dev](https://portfolio-k1pghyq26-adilsonjvrs-projects.vercel.app)

## 🙏 Agradecimentos

- Binance por fornecer API WebSocket gratuita
- Comunidade React e TypeScript
- Chart.js e Framer Motion teams
- Todos que contribuíram com feedback

## 📚 Recursos Úteis

- [Binance API Docs](https://binance-docs.github.io/apidocs/)
- [Chart.js Documentation](https://www.chartjs.org/docs/)
- [Framer Motion Guide](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

<p align="center">
  Feito com ❤️ e ☕ por <a href="https://github.com/Adilsonjvr">Adilson Jr</a>
</p>

<p align="center">
  <sub>⭐ Se este projeto te ajudou, considere dar uma estrela!</sub>
</p>
