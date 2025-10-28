# 🤖 Agents.md - Documentação para Agentes IA

> Memória persistente e guia técnico para assistentes de IA trabalhando neste projeto

## 📋 Índice de Contexto

- [Visão Geral do Projeto](#visão-geral-do-projeto)
- [Arquitetura Técnica](#arquitetura-técnica)
- [Padrões de Código](#padrões-de-código)
- [Estrutura de Dados](#estrutura-de-dados)
- [Fluxo de Dados](#fluxo-de-dados)
- [Componentes Principais](#componentes-principais)
- [Guias de Modificação](#guias-de-modificação)
- [Troubleshooting Comum](#troubleshooting-comum)
- [Decisões de Design](#decisões-de-design)

---

## 🎯 Visão Geral do Projeto

### Propósito
Dashboard de monitoramento de criptomoedas em tempo real para portfólio profissional.

### Stack Principal
```
Frontend: React 18 + TypeScript 5
Build: Vite 5
Styling: Tailwind CSS 3
Charts: Chart.js 4
Animations: Framer Motion 10
Data: Binance WebSocket API
```

### Características-Chave
- **Real-time**: WebSocket com reconexão automática
- **Multi-currency**: 12 criptomoedas, 5 moedas fiat
- **SVG Icons**: Ícones customizados vetorizados
- **Responsive**: Mobile-first design
- **Performant**: 60fps, <1s initial load

---

## 🏗️ Arquitetura Técnica

### Hierarquia de Componentes

```
App.tsx
└── Dashboard.tsx
    ├── Sidebar.tsx
    │   ├── Search Input
    │   ├── CryptoIcon.tsx (x12)
    │   └── Stats Summary
    ├── Header
    │   ├── Title
    │   ├── FiatSelector.tsx
    │   └── Connection Status
    └── Main Content
        ├── Stats Cards (x4)
        │   └── CryptoIcon.tsx
        └── CurrencyChart.tsx
            └── Chart.js Line Chart
```

### Fluxo de Estado

```
useCurrencyData Hook
  ↓
CurrencyWebSocketService
  ↓
WebSocket Connection (Binance)
  ↓
Message Handler
  ↓
State Update (currencies)
  ↓
Component Re-render
  ↓
UI Update
```

### Gerenciamento de Estado

**Global State:**
- `currencies: CurrencyData[]` - Array de todas moedas
- `isConnected: boolean` - Status WebSocket
- `fiatCurrency: string` - Moeda fiat selecionada

**Local State:**
- `selectedCurrency: string | null` - Moeda selecionada para gráfico
- `searchTerm: string` - Busca na sidebar

**Derived State:**
- `topGainer` - Calculado de currencies
- `topLoser` - Calculado de currencies
- `averageChange` - Calculado de currencies

---

## 📐 Padrões de Código

### Naming Conventions

**Componentes:**
```typescript
// PascalCase para componentes
Dashboard.tsx
CryptoIcon.tsx
FiatSelector.tsx
```

**Hooks:**
```typescript
// camelCase com prefixo 'use'
useCurrencyData.ts
useRealtimeData.ts (deprecated)
```

**Services:**
```typescript
// camelCase para classes/instâncias
currencyWebSocket.ts
export class CurrencyWebSocketService { }
```

**Types:**
```typescript
// PascalCase para interfaces
interface CurrencyData { }
interface DashboardProps { }
```

### Estrutura de Arquivo

**Componente Padrão:**
```typescript
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Icon } from 'lucide-react'
import { Type } from '../types'
import ChildComponent from './ChildComponent'

interface ComponentProps {
  prop1: string
  prop2?: number
}

const Component = ({ prop1, prop2 = 0 }: ComponentProps) => {
  const [state, setState] = useState(initial)

  const handler = () => {
    // logic
  }

  return (
    <motion.div>
      {/* JSX */}
    </motion.div>
  )
}

export default Component
```

### TypeScript Strictness

**Configuração:**
```json
{
  "strict": true,
  "noUnusedLocals": true,
  "noUnusedParameters": true,
  "noFallthroughCasesInSwitch": true
}
```

**Regras:**
- Sempre tipar props com interface
- Evitar `any`, usar `unknown` se necessário
- Usar optional chaining: `currency?.color`
- Null checks explícitos: `if (value === null) return ''`

---

## 🗄️ Estrutura de Dados

### CurrencyData Interface

```typescript
interface CurrencyData {
  symbol: string           // 'BTC', 'ETH'
  name: string            // 'Bitcoin', 'Ethereum'
  currentPrice: number    // Preço em moeda fiat selecionada
  priceHistory: PriceHistory[]  // Últimos 50 pontos
  change24h: number       // Variação em valor absoluto
  changePercent24h: number // Variação em %
  high24h: number         // Máxima 24h
  low24h: number          // Mínima 24h
  volume24h: number       // Volume em USD
  color?: string          // '#F7931A' (hex)
  icon?: string           // '₿' ou 'BTC'
}
```

### PriceHistory Interface

```typescript
interface PriceHistory {
  timestamp: number  // Unix timestamp em ms
  price: number     // Preço no momento
}
```

### Binance WebSocket Message

```typescript
// Formato recebido da Binance
{
  e: '24hrTicker',    // Event type
  s: 'BTCUSDT',       // Symbol
  c: '45000.00',      // Close price (current)
  p: '1250.50',       // Price change
  P: '2.85',          // Price change percent
  h: '46000.00',      // High price 24h
  l: '43500.00',      // Low price 24h
  v: '25000000000'    // Volume 24h
}
```

---

## 🔄 Fluxo de Dados

### 1. Inicialização

```
App monta
  → useCurrencyData executa
    → CurrencyWebSocketService instanciado
      → connect() chamado
        → WebSocket conexão estabelecida
          → onConnectionChange(true)
```

### 2. Recebimento de Dados

```
Binance envia mensagem ticker
  → ws.onmessage
    → handleMessage(data)
      → Parse JSON
        → Extract valores
          → Convert para fiat
            → Update priceHistory
              → Create CurrencyData
                → Update Map
                  → onUpdate callback
                    → setCurrencies
                      → Re-render
```

### 3. Conversão de Moeda

```
User seleciona EUR
  → changeFiatCurrency('EUR')
    → setFiatCurrency('EUR')
      → serviceRef.setFiatCurrency('EUR')
        → conversionRates.get('EUR') = 0.92
          → convertPrice(45000) = 41400
            → onUpdate(new Map)
              → UI atualiza com € valores
```

### 4. Seleção de Moeda

```
User clica em ETH na sidebar
  → setSelectedCurrency('ETH')
    → selectedCurrencyData = find(c => c.symbol === 'ETH')
      → CurrencyChart recebe novo currency prop
        → Chart.js atualiza dataset
          → Animação de transição
```

---

## 🧩 Componentes Principais

### Dashboard.tsx

**Responsabilidade:** Layout principal e orquestração

**Props:**
```typescript
{
  currencies: CurrencyData[]
  isConnected: boolean
  onReconnect: () => void
  fiatCurrency: string
  onChangeFiatCurrency: (currency: string) => void
}
```

**Estado Local:**
- `selectedCurrency: string | null`

**Lógica:**
- Calcula estatísticas (topGainer, topLoser, averageChange)
- Gerencia seleção de moeda para gráfico
- Renderiza Sidebar + Main Content

### Sidebar.tsx

**Responsabilidade:** Lista de criptomoedas com busca

**Props:**
```typescript
{
  currencies: CurrencyData[]
  selectedSymbol: string | null
  onSelectCurrency: (symbol: string) => void
}
```

**Estado Local:**
- `searchTerm: string`

**Features:**
- Busca case-insensitive
- Filter currencies por nome/símbolo
- Animação stagger nas moedas
- Stats de alta/baixa no footer

### CryptoIcon.tsx

**Responsabilidade:** Renderizar ícones SVG

**Props:**
```typescript
{
  symbol: string
  size?: number
  className?: string
  animate?: boolean
}
```

**SVG Map:**
- BTC, ETH, BNB, SOL, XRP, ADA, DOGE, MATIC, DOT, AVAX, LINK, UNI
- Fallback: Círculo com 3 primeiras letras

**Animações:**
- Hover: scale(1.1) + rotate(-5 → 5 → -5 → 0)
- Tap: scale(0.95)

### CurrencyChart.tsx

**Responsabilidade:** Gráfico de linha Chart.js

**Props:**
```typescript
{
  currency: CurrencyData
}
```

**Configuração Chart.js:**
- Type: 'line'
- Tension: 0.4 (curva suave)
- Points: 0 radius (apenas linha)
- Colors: Verde se alta, vermelho se baixa
- Tooltip: Custom com formatação de moeda
- Axes: X = tempo, Y = preço

### FiatSelector.tsx

**Responsabilidade:** Dropdown de seleção de moeda fiat

**Props:**
```typescript
{
  selectedFiat: string
  onChangeFiat: (code: string) => void
}
```

**Estado Local:**
- `isOpen: boolean`

**Features:**
- Click outside para fechar
- Animação de entrada/saída
- Mostra bandeira + código + nome

---

## 🔧 Guias de Modificação

### Adicionar Nova Criptomoeda

**Passo 1:** Atualizar `currencyWebSocket.ts`

```typescript
export const CURRENCIES = [
  // ... existing
  {
    symbol: 'ATOM',
    name: 'Cosmos',
    color: '#2E3148',
    icon: 'ATOM'
  }
]
```

**Passo 2:** Adicionar ícone SVG em `CryptoIcon.tsx`

```typescript
const iconMap = {
  // ... existing
  ATOM: (
    <svg viewBox="0 0 32 32">
      <circle cx="16" cy="16" r="16" fill="#2E3148"/>
      {/* Seu design aqui */}
    </svg>
  )
}
```

**Passo 3:** Testar
- Verificar sidebar mostra nova moeda
- Confirmar ícone renderiza
- Testar seleção e gráfico

### Adicionar Nova Moeda Fiat

**Passo 1:** Atualizar `currencyWebSocket.ts`

```typescript
export const FIAT_CURRENCIES = [
  // ... existing
  {
    code: 'CAD',
    symbol: 'C$',
    name: 'Canadian Dollar',
    flag: '🇨🇦'
  }
]
```

**Passo 2:** Atualizar taxa de conversão

```typescript
private conversionRates: Map<string, number> = new Map([
  // ... existing
  ['CAD', 1.35],
])
```

**Passo 3:** Testar dropdown e conversão

### Modificar Animações

**Framer Motion Props Comuns:**

```typescript
// Fade in
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}

// Slide up
initial={{ y: 20 }}
animate={{ y: 0 }}

// Scale
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}

// Rotate
animate={{ rotate: 360 }}
transition={{ duration: 1 }}

// Stagger children
variants={staggerContainer}
```

### Mudar Cores do Tema

**Tailwind Classes:**
- Background: `bg-slate-900`, `bg-slate-800`
- Borders: `border-slate-700`
- Text: `text-white`, `text-slate-400`
- Accents: `text-blue-500`, `bg-green-500/10`

**Customizar em `index.css`:**
```css
:root {
  background-color: #020617; /* Alterar aqui */
}
```

---

## 🐛 Troubleshooting Comum

### WebSocket não conecta

**Sintomas:**
- Status "Offline" persistente
- Nenhuma moeda na sidebar
- Console mostra erro de conexão

**Diagnóstico:**
```typescript
// Em currencyWebSocket.ts
ws.onerror = (error) => {
  console.error('WebSocket erro:', error)
}
```

**Soluções:**
1. Verificar URL: `wss://stream.binance.com:9443/ws`
2. Testar em terminal: `wscat -c wss://stream.binance.com:9443/ws/btcusdt@ticker`
3. Checar firewall/proxy bloqueando WebSocket
4. Rate limit da Binance (aguardar 60s)

### Gráfico não renderiza

**Sintomas:**
- Área do gráfico vazia
- Console erro Chart.js

**Diagnóstico:**
```typescript
// Em CurrencyChart.tsx
console.log('Currency data:', currency)
console.log('Price history:', currency.priceHistory)
```

**Soluções:**
1. Verificar `priceHistory.length > 0`
2. Confirmar Chart.js registrado:
   ```typescript
   ChartJS.register(CategoryScale, LinearScale, ...)
   ```
3. Checar formatação de dados:
   ```typescript
   data: currency.priceHistory.map(p => p.price)
   ```

### TypeScript Build Error

**Sintomas:**
- `npm run build` falha
- Erro: `Type 'X' is not assignable to type 'Y'`

**Diagnóstico:**
```bash
npx tsc --noEmit
```

**Soluções Comuns:**

**Null check faltando:**
```typescript
// ❌ Errado
const value = context.parsed.y.toFixed(2)

// ✅ Correto
const value = context.parsed.y
if (value === null) return ''
return value.toFixed(2)
```

**Optional chaining:**
```typescript
// ❌ Errado
const color = currency.color

// ✅ Correto
const color = currency.color || '#64748b'
const color = currency?.color ?? '#64748b'
```

### Performance Issues

**Sintomas:**
- UI travando
- FPS baixo
- Memory leak

**Diagnóstico:**
```typescript
// Chrome DevTools > Performance
// Record 10s de uso normal
```

**Otimizações:**

**1. Limitar histórico:**
```typescript
const updatedHistory = [...priceHistory.slice(-49), newPoint]
// Máximo 50 pontos
```

**2. Memoizar componentes:**
```typescript
const CryptoIcon = React.memo(({ symbol, size }: Props) => {
  // ...
})
```

**3. Debounce search:**
```typescript
const debouncedSearch = useDe bounce(searchTerm, 300)
```

**4. Disable animations em produção:**
```typescript
const shouldAnimate = process.env.NODE_ENV === 'development'
```

---

## 🎨 Decisões de Design

### Por que Chart.js ao invés de Recharts?

**Razões:**
1. **Performance**: Canvas vs SVG - mais rápido para real-time
2. **Bundle size**: Chart.js é menor (~200KB vs ~400KB)
3. **Customização**: API mais flexível para tooltips
4. **Animações**: Transições nativas mais suaves

### Por que Framer Motion?

**Razões:**
1. **Declarativo**: Animações como props
2. **Performance**: GPU-accelerated
3. **Gestures**: whileHover, whileTap built-in
4. **Layout animations**: Automatic FLIP animations

### Por que WebSocket ao invés de Polling?

**Razões:**
1. **Latency**: Dados instantâneos vs 1-5s delay
2. **Bandwidth**: Menos requisições HTTP
3. **Real-time**: True push ao invés de pull
4. **Binance**: API oficial usa WebSocket

### Por que Sidebar ao invés de Grid?

**Razões:**
1. **Focus**: Gráfico principal tem mais espaço
2. **Scroll**: Lista longa de moedas navegável
3. **Desktop-first**: Melhor UX em telas grandes
4. **Consistência**: Padrão de apps financeiros

### Estrutura de Pastas

**Por que components/ na raiz de src/?**
- Flat structure mais fácil de navegar
- Imports mais curtos
- Não há necessidade de nested folders (projeto pequeno)

**Por que services/ separado?**
- Lógica de negócio isolada
- Testável independentemente
- Reutilizável em múltiplos componentes

---

## 📝 Changelog Importante

### v2.0.0 - Redesign Completo
- ✅ Sidebar com 12 moedas
- ✅ Ícones SVG customizados
- ✅ Seletor de moeda fiat (5 moedas)
- ✅ Conversão em tempo real

### v1.5.0 - Ícones SVG
- ✅ Componente CryptoIcon
- ✅ 12 ícones vetorizados
- ✅ Animações de hover

### v1.0.0 - MVP
- ✅ Dashboard básico
- ✅ 6 criptomoedas
- ✅ WebSocket Binance
- ✅ Gráficos Chart.js

---

## 🚀 Próximas Features (Roadmap)

### Alta Prioridade
- [ ] Dark/Light mode toggle
- [ ] Favoritos (localStorage)
- [ ] Alertas de preço
- [ ] Export de dados (CSV/JSON)

### Média Prioridade
- [ ] Gráfico de candlestick
- [ ] Timeframe selector (1h, 24h, 7d, 30d)
- [ ] Volume bars
- [ ] Comparação de moedas

### Baixa Prioridade
- [ ] Portfolio tracker
- [ ] News feed integration
- [ ] Mobile app (React Native)
- [ ] API própria (backend)

---

## 🔑 Comandos Essenciais

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Type check
npx tsc --noEmit

# Lint
npm run lint

# Deploy
vercel

# Analisar bundle
npm run build -- --mode=analyze
```

---

## 📚 Recursos de Referência

### Documentação Oficial
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Chart.js](https://www.chartjs.org/docs/)
- [Framer Motion](https://www.framer.com/motion/)

### APIs
- [Binance WebSocket](https://binance-docs.github.io/apidocs/spot/en/#websocket-market-streams)
- [Binance Ticker 24hr](https://binance-docs.github.io/apidocs/spot/en/#24hr-ticker-price-change-statistics)

### Tools
- [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [Tailwind Play](https://play.tailwindcss.com/)

---

## 🤝 Dicas para Agentes IA

### Ao Fazer Modificações

1. **Sempre ler o arquivo antes de editar**
2. **Preservar imports existentes**
3. **Manter consistência de estilo**
4. **Adicionar tipos TypeScript**
5. **Testar localmente se possível**
6. **Commit messages descritivos**

### Padrões de Commit

```
feat: adiciona nova funcionalidade X
fix: corrige bug em Y
refactor: reestrutura componente Z
docs: atualiza README
style: ajusta CSS de A
perf: otimiza performance de B
test: adiciona testes para C
```

### Quando Não Sabe

- ❌ Não adivinhar tipos
- ❌ Não usar `any`
- ❌ Não remover código sem entender
- ✅ Perguntar ao usuário
- ✅ Ler documentação
- ✅ Verificar código existente similar

---

**Última atualização:** 2025-10-28
**Versão:** 2.0.0
**Mantido por:** Agentes IA + Adilson Jr
