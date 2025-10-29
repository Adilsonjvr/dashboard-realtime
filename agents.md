# 🤖 Agents.md - Documentação para Agentes IA

> Memória persistente e guia técnico para assistentes de IA trabalhando neste projeto

## 📋 Índice de Contexto

- [Visão Geral do Projeto](#visão-geral-do-projeto)
- [Arquitetura Técnica](#arquitetura-técnica)
- [Padrões de Código](#padrões-de-código)
- [Estrutura de Dados](#estrutura-de-dados)
- [Fluxo de Dados](#fluxo-de-dados)
- [Componentes Principais](#componentes-principais)
- [Features Implementadas](#features-implementadas)
- [Features Pendentes](#features-pendentes)
- [Guias de Modificação](#guias-de-modificação)
- [Troubleshooting Comum](#troubleshooting-comum)
- [Decisões de Design](#decisões-de-design)

---

## 🎯 Visão Geral do Projeto

### Propósito
Dashboard profissional de monitoramento de criptomoedas em tempo real com drag-and-drop, tooltips avançados e análise interativa para portfólio profissional.

### Stack Atual (2025)
```
Frontend: React 18.2 + TypeScript 5.2
Build: Vite 5.0
Styling: Tailwind CSS 3.3
Charts: Chart.js 4.4 + chartjs-plugin-zoom 2.0
Animations: Framer Motion 10.18
Drag & Drop: @dnd-kit 6.1 (core + sortable + utilities)
Data: Binance WebSocket API (real-time)
Utils: date-fns 3.0, Lucide React
Deploy: Vercel (auto-deploy via GitHub)
```

### Características-Chave
- **Real-time**: WebSocket com reconexão automática (5 tentativas)
- **Drag & Drop**: Reordenação de moedas com persistência localStorage
- **Multi-currency**: 12 criptomoedas, 5 moedas fiat
- **Advanced Tooltips**: Data/hora, preço, volume, máx/mín 24h
- **Zoom & Pan**: Chart.js plugin para análise detalhada
- **SVG Icons**: 12 ícones customizados vetorizados de alta qualidade
- **Responsive**: Mobile-first com menu hamburguer
- **Performant**: 60fps, debouncing, histórico limitado
- **Accessible**: Teclado, touch, ARIA labels

---

## 🏗️ Arquitetura Técnica

### Hierarquia de Componentes (Atualizada)

```
App.tsx
└── Dashboard.tsx
    ├── Sidebar.tsx (Desktop - sempre visível)
    │   ├── Header
    │   │   ├── Title "Criptomoedas"
    │   │   └── Search Input (debounced)
    │   ├── DndContext (drag-and-drop)
    │   │   └── SortableContext
    │   │       └── SortableCurrencyItem (x12)
    │   │           ├── GripVertical Icon (drag handle)
    │   │           ├── CryptoIcon.tsx
    │   │           ├── Name + Symbol
    │   │           ├── Change % (TrendingUp/Down)
    │   │           └── Current Price
    │   └── Stats Summary (Alta/Baixa)
    │
    ├── Sidebar.tsx (Mobile - overlay)
    │   └── [Mesma estrutura, fecha após seleção]
    │
    ├── Header
    │   ├── Hamburger Menu (mobile)
    │   ├── Title "Crypto Tracker"
    │   ├── FiatSelector.tsx (dropdown)
    │   └── Connection Status (Live/Offline)
    │
    └── Main Content
        ├── Stats Cards Grid (2x2 mobile, 1x4 desktop)
        │   ├── Market Cap (BarChart3 icon)
        │   ├── Média 24h (ArrowUp/Down animado)
        │   ├── Top Gainer (ArrowUp + TrendingUp)
        │   └── Top Loser (ArrowDown + TrendingDown)
        │
        └── Main Chart Card
            ├── Header
            │   ├── CryptoIcon + Name
            │   ├── Current Price + Change %
            │   └── PeriodSelector (1H, 24H, 7D, 30D, 1A)
            ├── Stats Grid (3 cols)
            │   ├── Volume 24h
            │   ├── Máxima 24h (green)
            │   └── Mínima 24h (red)
            └── CurrencyChart.tsx (Chart.js + zoom)
                └── Tooltip hint (Ctrl+Scroll para zoom)
```

### Fluxo de Estado (Atualizado)

```
useCurrencyData Hook
  ↓
Estado: currencies, currencyOrder, fiatCurrency
  ↓
CurrencyWebSocketService
  ↓
WebSocket Connection (Binance)
  ↓
Message Handler → Parse → Convert Fiat
  ↓
State Update (currencies Map)
  ↓
Ordenação baseada em currencyOrder (localStorage)
  ↓
Component Re-render
  ↓
UI Update (60fps)
```

### Gerenciamento de Estado

**Global State (via useCurrencyData):**
- `currencies: CurrencyData[]` - Array ordenado de moedas
- `isConnected: boolean` - Status WebSocket
- `fiatCurrency: string` - Moeda fiat selecionada (USD, BRL, EUR, GBP, JPY)
- `currencyOrder: string[]` - Ordem customizada dos símbolos
- `reorderCurrencies: (currencies: CurrencyData[]) => void` - Função de reordenação

**Local State (Dashboard):**
- `selectedCurrency: string | null` - Moeda selecionada para gráfico
- `isSidebarOpen: boolean` - Estado do menu mobile
- `selectedPeriod: TimePeriod` - Período selecionado (1h, 24h, 7d, 30d, 1y)

**Local State (Sidebar):**
- `searchTerm: string` - Busca raw (não debounced)
- `debouncedSearchTerm: string` - Busca debounced (300ms)

**Derived State:**
- `topGainer` - Calculado de currencies (reduce)
- `topLoser` - Calculado de currencies (reduce)
- `averageChange` - Calculado de currencies (média)
- `totalMarketCap` - Calculado (sum de price * volume)

**Persistência:**
- `localStorage.currencyOrder` - Array JSON de símbolos

---

## 📐 Padrões de Código

### Naming Conventions

**Componentes:**
```typescript
// PascalCase para componentes
Dashboard.tsx
CryptoIcon.tsx
FiatSelector.tsx
PeriodSelector.tsx  // Novo
SortableCurrencyItem // Dentro de Sidebar.tsx
```

**Hooks:**
```typescript
// camelCase com prefixo 'use'
useCurrencyData.ts
useDebounce.ts  // Novo - custom hook
```

**Services:**
```typescript
// camelCase para classes/instâncias
currencyWebSocket.ts
export class CurrencyWebSocketService { }
```

**Types:**
```typescript
// PascalCase para interfaces e types
interface CurrencyData { }
interface DashboardProps { }
type TimePeriod = '1h' | '24h' | '7d' | '30d' | '1y'
```

### Estrutura de Arquivo Padrão

**Componente:**
```typescript
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Icon } from 'lucide-react'
import { Type } from '../types'
import ChildComponent from './ChildComponent'
import { useCustomHook } from '../hooks/useCustomHook'

interface ComponentProps {
  prop1: string
  prop2?: number
  onAction: (value: string) => void
}

const Component = ({ prop1, prop2 = 0, onAction }: ComponentProps) => {
  const [state, setState] = useState(initial)
  const customValue = useCustomHook(state)

  const handler = () => {
    // logic
    onAction(value)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="responsive-classes"
    >
      {/* JSX com comentários descritivos */}
      <ChildComponent />
    </motion.div>
  )
}

export default Component
```

### TypeScript Strictness

**tsconfig.json (configuração atual):**
```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true
  }
}
```

**Regras Importantes:**
- ✅ Sempre tipar props com interface
- ✅ Evitar `any`, usar `unknown` se necessário
- ✅ Usar optional chaining: `currency?.color`
- ✅ Null checks explícitos: `if (value === null) return ''`
- ✅ Tipar eventos: `React.ChangeEvent<HTMLInputElement>`
- ✅ Tipar callbacks: `onAction: (value: string) => void`

---

## 🗄️ Estrutura de Dados

### CurrencyData Interface

```typescript
interface CurrencyData {
  symbol: string           // 'BTC', 'ETH', etc.
  name: string            // 'Bitcoin', 'Ethereum'
  currentPrice: number    // Preço convertido para fiat selecionado
  priceHistory: PriceHistory[]  // Últimos 50 pontos (limitado)
  change24h: number       // Variação em valor absoluto (fiat)
  changePercent24h: number // Variação em % (pode ser negativo)
  high24h: number         // Máxima 24h (fiat)
  low24h: number          // Mínima 24h (fiat)
  volume24h: number       // Volume em unidades (não USD)
  color?: string          // '#F7931A' (hex color oficial)
  icon?: string           // '₿' ou 'BTC' (fallback)
}
```

### PriceHistory Interface

```typescript
interface PriceHistory {
  timestamp: number  // Unix timestamp em milliseconds (Date.now())
  price: number     // Preço convertido no momento
}
```

### TimePeriod Type

```typescript
export type TimePeriod = '1h' | '24h' | '7d' | '30d' | '1y'
// Usado no PeriodSelector
// ⚠️ UI implementada, funcionalidade de fetch pendente
```

### Binance WebSocket Message Format

```typescript
// Event: 24hrTicker
// Stream: {symbol}usdt@ticker (ex: btcusdt@ticker)
{
  e: '24hrTicker',    // Event type
  s: 'BTCUSDT',       // Symbol (sempre USDT pair)
  c: '45000.00',      // Close price (current price)
  p: '1250.50',       // Price change 24h
  P: '2.85',          // Price change percent 24h
  h: '46000.00',      // High price 24h
  l: '43500.00',      // Low price 24h
  v: '25000.50'       // Volume 24h (in base currency)
}
```

### LocalStorage Keys

```typescript
// Chave para ordem das moedas
'currencyOrder': string[]  // JSON.stringify(['BTC', 'ETH', ...])

// Exemplo de uso:
localStorage.setItem('currencyOrder', JSON.stringify(['BTC', 'ETH']))
const saved = JSON.parse(localStorage.getItem('currencyOrder') || '[]')
```

---

## 🔄 Fluxo de Dados Detalhado

### 1. Inicialização Completa

```
App.tsx monta
  → useCurrencyData() executa
    → CurrencyWebSocketService instanciado
      → connect() chamado
        → WebSocket.connect(wss://stream.binance.com:9443/ws/...)
          → ws.onopen
            → onConnectionChange(true)
              → setIsConnected(true)
                → UI mostra "Live" (green)

    → useEffect para carregar currencyOrder
      → localStorage.getItem('currencyOrder')
        → setCurrencyOrder(savedOrder)
          → Moedas ordenadas na próxima renderização
```

### 2. Recebimento de Dados Real-time

```
Binance envia mensagem ticker
  → ws.onmessage(event)
    → JSON.parse(event.data)
      → handleMessage(data)
        → Verifica: data.e === '24hrTicker'
          → Extract: symbol (remove 'USDT')
            → Find currency in CURRENCIES array
              → Parse valores (parseFloat)
                → convertPrice(valueUSD, fiatCurrency)
                  → rate = conversionRates.get(fiatCurrency)
                    → convertedValue = valueUSD * rate
                      → Create newPoint { timestamp, price }
                        → Update priceHistory (slice(-49) + newPoint)
                          → Create CurrencyData object
                            → currenciesData.set(symbol, currencyData)
                              → onUpdate(new Map(currenciesData))
                                → setCurrencies(updatedMap)
                                  → Ordenação aplicada (currencyOrder)
                                    → Component re-render (React)
                                      → UI atualiza (< 16ms para 60fps)
```

### 3. Drag & Drop Reordenação

```
User arrasta moeda ETH para posição 2
  → onDragEnd event (dnd-kit)
    → Extract: active.id = 'ETH', over.id = 'BTC'
      → Find oldIndex, newIndex
        → arrayMove(currencies, oldIndex, newIndex)
          → reordered = [...currencies com nova ordem]
            → onReorderCurrencies(reordered)
              → Extract symbols: ['BTC', 'ETH', ...]
                → setCurrencyOrder(newOrder)
                  → localStorage.setItem('currencyOrder', JSON.stringify)
                    → Próxima renderização usa nova ordem
                      → UI reflete mudança (com animação CSS transform)
```

### 4. Conversão de Moeda Fiat

```
User seleciona EUR (€) no FiatSelector
  → onChangeFiat('EUR')
    → changeFiatCurrency('EUR')
      → setFiatCurrency('EUR')
        → serviceRef.current?.setFiatCurrency('EUR')
          → this.fiatCurrency = 'EUR'
            → Para cada moeda em currenciesData:
              → Reconverte preços com nova taxa (0.92)
                → USD 45000 → EUR 41400
                  → Update priceHistory com novos valores
                    → onUpdate(new Map(updatedData))
                      → UI atualiza todos preços com €
```

### 5. Zoom & Pan no Gráfico

```
User pressiona Ctrl + Scroll
  → chartjs-plugin-zoom intercepta evento
    → Verifica: zoom.wheel.enabled = true
      → Verifica: modifierKey 'ctrl' pressionado
        → Calcula novo range de dados
          → Atualiza scales (x min/max)
            → Chart.js re-render com novo viewport
              → Animação smooth (150ms)

User pressiona Ctrl + Arrasta
  → chartjs-plugin-zoom intercepta drag
    → Verifica: pan.enabled = true
      → Calcula delta de movimento
        → Shift scales
          → Chart.js re-render
```

### 6. Tooltips Avançados

```
User move mouse sobre gráfico
  → Chart.js detecta hover
    → interaction.mode = 'index'
      → Find datapoint index
        → callbacks.title(context)
          → Get timestamp from priceHistory[index]
            → format(timestamp, 'dd/MM/yyyy HH:mm:ss')
        → callbacks.label(context)
          → Get price from context.parsed.y
            → Format com toLocaleString
        → callbacks.afterLabel()
          → Return array: [high24h, low24h, volume24h]
            → Tooltip renderiza com múltiplas linhas
              → Display na posição do mouse
```

---

## 🧩 Componentes Principais (Atualizado)

### App.tsx

**Responsabilidade:** Entry point e gerenciamento de dados globais

**Hook usado:**
```typescript
const {
  currencies,           // CurrencyData[] ordenado
  isConnected,          // boolean
  fiatCurrency,         // string
  changeFiatCurrency,   // (currency: string) => void
  reorderCurrencies,    // (currencies: CurrencyData[]) => void
  reconnect             // () => void
} = useCurrencyData()
```

**Renderiza:**
```typescript
<Dashboard
  currencies={currencies}
  isConnected={isConnected}
  onReconnect={reconnect}
  fiatCurrency={fiatCurrency}
  onChangeFiatCurrency={changeFiatCurrency}
  onReorderCurrencies={reorderCurrencies}
/>
```

### Dashboard.tsx

**Responsabilidade:** Layout principal, orquestração de componentes

**Props:**
```typescript
interface DashboardProps {
  currencies: CurrencyData[]
  isConnected: boolean
  onReconnect: () => void
  fiatCurrency: string
  onChangeFiatCurrency: (currency: string) => void
  onReorderCurrencies: (currencies: CurrencyData[]) => void
}
```

**Estado Local:**
```typescript
const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null)
const [isSidebarOpen, setIsSidebarOpen] = useState(false)  // Mobile menu
const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('24h')
```

**Lógica Principal:**
- Calcula estatísticas derivadas (topGainer, topLoser, averageChange)
- Gerencia seleção de moeda para gráfico principal
- Toggle sidebar mobile
- Renderiza grid de cards com indicadores visuais (ArrowUp/Down animados)

**Responsividade:**
- Desktop: Sidebar sempre visível (hidden lg:block)
- Mobile: Sidebar em overlay com backdrop blur (AnimatePresence)
- Breakpoint: `lg` (1024px)

### Sidebar.tsx

**Responsabilidade:** Lista de moedas com drag-and-drop e busca

**Componentes Internos:**
- `SortableCurrencyItem` - Item individual com handle de drag

**Props:**
```typescript
interface SidebarProps {
  currencies: CurrencyData[]
  selectedSymbol: string | null
  onSelectCurrency: (symbol: string) => void
  onReorderCurrencies: (currencies: CurrencyData[]) => void
}
```

**Estado Local:**
```typescript
const [searchTerm, setSearchTerm] = useState('')
const debouncedSearchTerm = useDebounce(searchTerm, 300)
```

**Features:**
- **Busca:** Case-insensitive, debounced (300ms)
- **Drag & Drop:** @dnd-kit com PointerSensor + KeyboardSensor
- **Handle:** GripVertical icon sempre visível em mobile (opacity-30)
- **Animações:** Stagger nas moedas, transform durante drag
- **Stats:** Footer com contagem Alta/Baixa

**Accessibility:**
- Navegação por teclado (Tab, Arrow keys)
- Screen reader labels
- Touch-friendly (44px+ área de toque)

### CryptoIcon.tsx

**Responsabilidade:** Renderizar ícones SVG das criptomoedas

**Props:**
```typescript
interface CryptoIconProps {
  symbol: string
  size?: number
  className?: string
  animate?: boolean  // default: true
}
```

**SVG Icons (12 total):**
- BTC, ETH, BNB, SOL, XRP, ADA, DOGE, MATIC, DOT, AVAX, LINK, UNI
- Cada um com cores oficiais
- Viewbox: 0 0 32 32
- Fallback: Círculo com 3 letras do símbolo

**Animações (Framer Motion):**
```typescript
whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
whileTap={{ scale: 0.95 }}
transition={{ duration: 0.3 }}
```

### CurrencyChart.tsx

**Responsabilidade:** Gráfico Chart.js com zoom e tooltips avançados

**Props:**
```typescript
interface CurrencyChartProps {
  currency: CurrencyData
}
```

**Chart.js Configuração:**
```typescript
{
  type: 'line',
  data: {
    labels: currency.priceHistory.map(p => format(p.timestamp, 'HH:mm:ss')),
    datasets: [{
      data: currency.priceHistory.map(p => p.price),
      borderColor: currency.changePercent24h >= 0 ? 'green' : 'red',
      backgroundColor: 'rgba(..., 0.1)',
      tension: 0.4,  // Curva suave
      fill: true,
      pointRadius: 0,
      pointHoverRadius: 6
    }]
  },
  options: {
    plugins: {
      tooltip: {
        callbacks: {
          title: () => 'dd/MM/yyyy HH:mm:ss',
          label: () => 'Preço: $XX,XXX.XX',
          afterLabel: () => ['Máx 24h: ...', 'Mín 24h: ...', 'Volume 24h: ...']
        }
      },
      zoom: {
        pan: { enabled: true, mode: 'x', modifierKey: 'ctrl' },
        zoom: {
          wheel: { enabled: true, modifierKey: 'ctrl' },
          pinch: { enabled: true },
          mode: 'x'
        }
      }
    }
  }
}
```

### PeriodSelector.tsx

**Responsabilidade:** Seletor visual de período (UI apenas)

**Props:**
```typescript
interface PeriodSelectorProps {
  selectedPeriod: TimePeriod
  onChangePeriod: (period: TimePeriod) => void
}
```

**Períodos:**
```typescript
['1h', '24h', '7d', '30d', '1y'] → ['1H', '24H', '7D', '30D', '1A']
```

**Features:**
- Animação LayoutId (Framer Motion) entre períodos
- Ícone Clock (hidden sm:block)
- Responsivo: px-2 md:px-3, text-xs md:text-sm

**⚠️ Status:** UI completa, funcionalidade de fetch histórico pendente

### FiatSelector.tsx

**Responsabilidade:** Dropdown de seleção de moeda fiat

**Props:**
```typescript
interface FiatSelectorProps {
  selectedFiat: string
  onChangeFiat: (code: string) => void
}
```

**Estado Local:**
```typescript
const [isOpen, setIsOpen] = useState(false)
const dropdownRef = useRef<HTMLDivElement>(null)

// Click outside para fechar
useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (!dropdownRef.current?.contains(event.target)) {
      setIsOpen(false)
    }
  }
  document.addEventListener('mousedown', handleClickOutside)
  return () => document.removeEventListener('mousedown', handleClickOutside)
}, [])
```

**Features:**
- Animação entrada/saída (AnimatePresence)
- Mostra: Bandeira emoji + Código + Nome + Símbolo
- Responsivo: Versão compacta em mobile (hidden sm:block)

---

## ✅ Features Implementadas (Detalhado)

### 1. Drag & Drop Reordenação
**Status:** ✅ Completo
**Biblioteca:** @dnd-kit 6.1
**Persistência:** localStorage
**Acessibilidade:** Mouse, Touch, Teclado

**Implementação:**
- DndContext com sensors (PointerSensor, KeyboardSensor)
- SortableContext com verticalListSortingStrategy
- Handle GripVertical sempre visível em mobile
- arrayMove para reordenar array
- localStorage salva ordem como JSON

**Responsividade:**
- Mobile: Handle opacity-30 (sempre visível)
- Desktop: Handle opacity-0 hover:opacity-100
- Touch: touch-none para prevenir scroll acidental

### 2. Tooltips Avançados
**Status:** ✅ Completo
**Informações:** 5 linhas

**Conteúdo:**
1. Título: dd/MM/yyyy HH:mm:ss (date-fns)
2. Preço: Formatado com toLocaleString
3. Máxima 24h: Com símbolo fiat
4. Mínima 24h: Com símbolo fiat
5. Volume 24h: Calculado (volume * currentPrice)

**Estilo:**
- Background: rgba(15, 23, 42, 0.95)
- Border: Verde ou vermelho (tendência)
- Padding: 16px
- Font: Title 14px bold, Body 13px

### 3. Zoom & Pan no Gráfico
**Status:** ✅ Completo
**Plugin:** chartjs-plugin-zoom 2.0

**Controles:**
- Zoom: Ctrl + Scroll (Windows) ou Cmd + Scroll (Mac)
- Pan: Ctrl + Arrastar
- Pinch: 2 dedos em touch devices
- Reset: Refresh ou duplo clique

**Config:**
```typescript
zoom: {
  pan: { enabled: true, mode: 'x', modifierKey: 'ctrl' },
  zoom: {
    wheel: { enabled: true, modifierKey: 'ctrl' },
    pinch: { enabled: true },
    mode: 'x'
  }
}
```

### 4. Indicadores de Tendência
**Status:** ✅ Completo
**Ícones:** ArrowUp/Down (bounce), TrendingUp/Down

**Locais:**
- Card Média 24h: Seta dinâmica + ícone trending
- Top Gainer: ArrowUp verde animado
- Top Loser: ArrowDown vermelho animado

**Animação:**
```typescript
className="animate-bounce"  // Tailwind built-in
```

### 5. Debouncing na Busca
**Status:** ✅ Completo
**Hook:** useDebounce (custom)
**Delay:** 300ms

**Implementação:**
```typescript
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}
```

### 6. Responsividade Mobile
**Status:** ✅ Completo
**Breakpoint:** lg (1024px)

**Features:**
- Menu hamburguer (lg:hidden)
- Sidebar overlay com backdrop blur
- Animações slide-in/out (Framer Motion)
- Text sizes adaptativos (text-xs md:text-sm)
- Padding responsivo (p-3 md:p-6)
- Grid adaptativos (grid-cols-2 md:grid-cols-4)
- Handle drag sempre visível em mobile

### 7. Cards de Estatísticas Detalhadas
**Status:** ✅ Completo

**Cards no gráfico:**
1. Volume 24h (slate background)
2. Máxima 24h (green background)
3. Mínima 24h (red background)

**Grid:** 3 colunas desktop, 3 colunas mobile (compacto)

### 8. Seletor de Período (UI)
**Status:** ⚠️ UI pronta, funcionalidade pendente

**Períodos:** 1H, 24H, 7D, 30D, 1A
**Animação:** LayoutId transition
**Responsivo:** Sim

**Pendente:**
- Fetch de dados históricos da Binance
- Integração com API Kline/Candlestick
- Cache de dados por período
- Loading states

---

## 🚧 Features Pendentes (Roadmap Detalhado)

### 1. Seletor de Período (Funcionalidade)
**Prioridade:** Alta
**Complexidade:** Média

**Tarefas:**
- [ ] Integrar Binance Kline API
- [ ] Fetch histórico: `/api/v3/klines?symbol=BTCUSDT&interval=1h`
- [ ] Parse dados OHLC
- [ ] Cache em memória (Map por símbolo+período)
- [ ] Loading state durante fetch
- [ ] Error handling

**API Endpoint:**
```typescript
`https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=${interval}&limit=100`
// interval: 1h, 1d, 1w, 1M
// limit: número de pontos
```

### 2. Capitalização de Mercado
**Prioridade:** Alta
**Complexidade:** Baixa

**Tarefas:**
- [ ] Adicionar `marketCap: number` no CurrencyData
- [ ] Fetch de API externa (CoinGecko ou similar)
- [ ] Card dedicado para market cap global
- [ ] Ranking por market cap na sidebar
- [ ] Atualização periódica (não real-time)

### 3. Sistema de Watchlists Múltiplas
**Prioridade:** Média
**Complexidade:** Alta

**Tarefas:**
- [ ] Interface Watchlist (nome, moedas[])
- [ ] UI: Tabs ou Dropdown no header
- [ ] CRUD watchlists (criar, renomear, deletar)
- [ ] Adicionar/remover moedas
- [ ] Persistência localStorage (JSON)
- [ ] Watchlist ativa (estado global)

### 4. Portfolio Tracker
**Prioridade:** Média
**Complexidade:** Alta

**Tarefas:**
- [ ] Interface Holdings (symbol, amount, buyPrice, buyDate)
- [ ] Página/Modal dedicado
- [ ] Input para adicionar holding
- [ ] Cálculo lucro/prejuízo: (currentPrice - buyPrice) * amount
- [ ] Total portfolio value
- [ ] Gráfico de distribuição (pie chart)
- [ ] Exportar CSV
- [ ] Persistência localStorage

### 5. Gráficos de Vela (Candlestick)
**Prioridade:** Média
**Complexidade:** Média

**Tarefas:**
- [ ] Instalar: `npm install chart.js-chart-financial`
- [ ] Fetch dados OHLC da Binance
- [ ] Componente CandlestickChart
- [ ] Toggle Line/Candlestick
- [ ] Cores: verde (close > open), vermelho (close < open)

### 6. Indicadores Técnicos
**Prioridade:** Baixa
**Complexidade:** Alta

**Tarefas:**
- [ ] Instalar: `npm install technicalindicators`
- [ ] Calcular RSI (14 períodos)
- [ ] Calcular MACD (12, 26, 9)
- [ ] Calcular SMA/EMA (20, 50, 200)
- [ ] Overlay no gráfico principal
- [ ] Toggle para mostrar/ocultar
- [ ] Sidebar com configurações

### 7. Sistema de Alertas
**Prioridade:** Baixa
**Complexidade:** Média

**Tarefas:**
- [ ] Interface Alert (symbol, condition, targetPrice)
- [ ] Lógica de verificação (useEffect com interval)
- [ ] Web Notifications API
- [ ] Som de notificação
- [ ] Histórico de alertas disparados
- [ ] Persistência localStorage

### 8. Modo Alto Contraste
**Prioridade:** Baixa
**Complexidade:** Baixa

**Tarefas:**
- [ ] Tema high-contrast (cores WCAG AAA)
- [ ] Toggle no header
- [ ] Persistência localStorage
- [ ] CSS variables ou Tailwind dark mode

### 9. Comparação de Moedas
**Prioridade:** Baixa
**Complexidade:** Média

**Tarefas:**
- [ ] Multi-select de moedas
- [ ] Normalização de escala (0-100%)
- [ ] Cores distintas por moeda
- [ ] Legenda interativa
- [ ] Toggle no gráfico principal

---

## 🔧 Guias de Modificação (Atualizado)

### Adicionar Nova Criptomoeda

**Passo 1:** Atualizar `src/services/currencyWebSocket.ts`

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

**Passo 2:** Adicionar ícone SVG em `src/components/CryptoIcon.tsx`

```typescript
const iconMap: { [key: string]: JSX.Element } = {
  // ... existing
  ATOM: (
    <svg viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#2E3148"/>
      {/* Desenho SVG aqui */}
      <path d="..." fill="white"/>
    </svg>
  )
}
```

**Passo 3:** Verificar Binance suporta

```bash
# Testar stream
wscat -c "wss://stream.binance.com:9443/ws/atomusdt@ticker"
```

**Passo 4:** Testar no app
- ✅ Moeda aparece na sidebar
- ✅ Ícone renderiza corretamente
- ✅ Dados atualizam em real-time
- ✅ Drag & drop funciona
- ✅ Seleção exibe gráfico

### Adicionar Nova Moeda Fiat

**Passo 1:** Atualizar `src/services/currencyWebSocket.ts`

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

**Passo 2:** Adicionar taxa de conversão

```typescript
// No constructor ou fetchConversionRates
this.conversionRates.set('CAD', 1.35)  // 1 USD = 1.35 CAD
```

**Passo 3:** (Opcional) Fetch taxa real

```typescript
private async fetchConversionRates(): Promise<void> {
  try {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD')
    const data = await response.json()

    this.conversionRates.set('CAD', data.rates.CAD)
    this.conversionRates.set('EUR', data.rates.EUR)
    // ...
  } catch (error) {
    console.error('Erro ao buscar taxas:', error)
  }
}
```

### Modificar Delay do Debounce

**Em `src/components/Sidebar.tsx`:**

```typescript
// Aumentar para 500ms (mais lento)
const debouncedSearchTerm = useDebounce(searchTerm, 500)

// Diminuir para 100ms (mais rápido, mais chamadas)
const debouncedSearchTerm = useDebounce(searchTerm, 100)

// Desabilitar (0ms - sem debounce)
const debouncedSearchTerm = useDebounce(searchTerm, 0)
```

### Modificar Limite de Histórico

**Em `src/services/currencyWebSocket.ts` → `handleMessage()`:**

```typescript
// Atual: 50 pontos
const updatedHistory = [...priceHistory.slice(-49), newPoint]

// Aumentar para 100 pontos (mais memória, mais zoom)
const updatedHistory = [...priceHistory.slice(-99), newPoint]

// Diminuir para 20 pontos (menos memória, menos detalhe)
const updatedHistory = [...priceHistory.slice(-19), newPoint]
```

⚠️ **Atenção:** Mais pontos = mais memória + mais processamento Chart.js

### Customizar Cores do Tema

**Opção 1: Tailwind classes inline**

```typescript
// Mudar cor do card Gainer
className="bg-gradient-to-br from-purple-500/10 to-purple-600/5"

// Mudar cor da sidebar
className="bg-gradient-to-b from-purple-900 to-purple-800"
```

**Opção 2: CSS variables em `src/index.css`**

```css
:root {
  --color-primary: #3b82f6;  /* blue-500 */
  --color-success: #22c55e;  /* green-500 */
  --color-danger: #ef4444;   /* red-500 */
}

/* Usar em componentes */
.custom-card {
  background-color: var(--color-primary);
}
```

**Opção 3: Tailwind config**

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        success: '#22c55e',
        danger: '#ef4444'
      }
    }
  }
}

// Usar: bg-primary, text-success, border-danger
```

---

## 🐛 Troubleshooting Comum (Atualizado)

### Drag & Drop não funciona em mobile

**Sintomas:**
- Não consegue arrastar moedas no celular
- Handle não responde ao toque
- Scroll ativa ao invés de drag

**Diagnóstico:**
```typescript
// Verificar se sensors estão configurados
const sensors = useSensors(
  useSensor(PointerSensor),  // ← Deve estar presente
  useSensor(KeyboardSensor)
)

// Verificar se touch-none está no handle
className="... touch-none"  // ← Previne scroll
```

**Soluções:**
1. Verificar handle está visível (opacity-30 em mobile)
2. Toque e segure por 300ms antes de arrastar
3. Certifique-se que não está em modo busca (filtro)
4. Limpe cache do navegador (Cmd+Shift+R)
5. Teste em outro navegador mobile (Safari, Firefox)
6. Verifique se @dnd-kit instalado: `npm list @dnd-kit/core`

### Tooltips não aparecem no gráfico

**Sintomas:**
- Hover no gráfico não mostra nada
- Console erro Chart.js

**Diagnóstico:**
```typescript
// Em CurrencyChart.tsx
console.log('Currency:', currency)
console.log('Price history:', currency.priceHistory)
console.log('Chart ref:', chartRef.current)
```

**Soluções:**
1. Verificar `priceHistory.length > 0`
2. Confirmar chartjs-plugin-zoom registrado
3. Verificar callbacks não têm null checks faltando
4. Testar com outra moeda selecionada
5. Limpar cache: `localStorage.clear()` + refresh

### Ordem das moedas não persiste

**Sintomas:**
- Ordem reseta ao recarregar página
- localStorage não salva

**Diagnóstico:**
```javascript
// No console do navegador
localStorage.getItem('currencyOrder')
// Deve retornar: '["BTC","ETH","BNB",...]'

// Se retornar null:
console.log('localStorage habilitado:', typeof Storage !== 'undefined')
```

**Soluções:**
1. Verificar localStorage habilitado (não está em modo privado)
2. Console: `localStorage.clear()` e reordene
3. Verificar permissões do site (Settings > Privacy)
4. Testar em modo normal (não incognito)
5. Verificar se `reorderCurrencies` está sendo chamado:
   ```typescript
   console.log('Reordering:', newCurrencies.map(c => c.symbol))
   ```

### Zoom do gráfico não funciona

**Sintomas:**
- Ctrl + Scroll não faz zoom
- Nenhuma resposta ao scroll

**Diagnóstico:**
```typescript
// Verificar plugin registrado
import zoomPlugin from 'chartjs-plugin-zoom'
ChartJS.register(..., zoomPlugin)  // ← Deve estar

// Verificar config
options: {
  plugins: {
    zoom: {
      zoom: { wheel: { enabled: true } }  // ← Deve ser true
    }
  }
}
```

**Soluções:**
1. **Mac**: Usar Cmd ao invés de Ctrl
2. Verificar plugin instalado: `npm list chartjs-plugin-zoom`
3. Reinstalar: `npm install chartjs-plugin-zoom@latest`
4. Verificar console para erros do plugin
5. Testar sem modifierKey: `modifierKey: null` (temporário)
6. Atualizar Chart.js: `npm update chart.js`

### WebSocket desconecta frequentemente

**Sintomas:**
- Status alterna Live/Offline
- Dados param de atualizar intermitentemente

**Diagnóstico:**
```typescript
// Adicionar logs em currencyWebSocket.ts
ws.onclose = (event) => {
  console.log('WebSocket closed:', event.code, event.reason)
  // 1000 = Normal closure
  // 1006 = Abnormal closure
}
```

**Soluções:**
1. **Rate Limit**: Aguarde 1-5 minutos
2. **Firewall**: Desabilite temporariamente
3. **VPN**: Desconecte e teste
4. **Proxy**: Bypass para stream.binance.com
5. **ISP**: Alguns bloqueiam WebSocket (use 4G/5G para testar)
6. **Binance Status**: Verifique https://www.binancestatus.com

### TypeScript Build Error: context.parsed.y possibly null

**Erro:**
```
src/components/CurrencyChart.tsx:80:12
'context.parsed.y' is possibly 'null'
```

**Solução:**
```typescript
// ❌ Errado
callbacks: {
  label: (context) => {
    return `$${context.parsed.y.toFixed(2)}`
  }
}

// ✅ Correto
callbacks: {
  label: (context) => {
    const value = context.parsed.y
    if (value === null) return ''
    return `$${value.toFixed(2)}`
  }
}
```

### Performance lenta / FPS baixo

**Sintomas:**
- UI travando durante drag
- Gráfico renderiza lento
- Memory leak (RAM aumenta constantemente)

**Diagnóstico:**
```bash
# Chrome DevTools > Performance
# 1. Clique Record (⚫)
# 2. Use o app por 10 segundos
# 3. Stop recording
# 4. Analise FPS graph (deve ser ~60fps)

# Memory leak check:
# Chrome DevTools > Memory > Take snapshot
# Use o app por 1 minuto
# Take outro snapshot
# Compare: deve ser similar
```

**Soluções:**

**1. Limitar histórico (já implementado):**
```typescript
const updatedHistory = [...priceHistory.slice(-49), newPoint]
// Não aumentar acima de 100 pontos
```

**2. Memoizar componentes pesados:**
```typescript
import { memo } from 'react'

const CryptoIcon = memo(({ symbol, size }: Props) => {
  // ...
})
```

**3. Desabilitar animações em produção:**
```typescript
const shouldAnimate = process.env.NODE_ENV === 'development'

// Usar em Framer Motion
animate={shouldAnimate ? { opacity: 1 } : undefined}
```

**4. Verificar memory leaks:**
```typescript
// Sempre limpar listeners em useEffect
useEffect(() => {
  const handler = () => { }
  document.addEventListener('click', handler)

  return () => {
    document.removeEventListener('click', handler)  // ← Importante!
  }
}, [])
```

**5. Reduzir re-renders:**
```typescript
// Usar useCallback para funções
const handleSelect = useCallback((symbol: string) => {
  setSelectedCurrency(symbol)
}, [])

// Usar useMemo para cálculos pesados
const topGainer = useMemo(() => {
  return currencies.reduce((prev, current) =>
    current.changePercent24h > prev.changePercent24h ? current : prev
  )
}, [currencies])
```

---

## 🎨 Decisões de Design (Atualizadas)

### Por que @dnd-kit ao invés de react-beautiful-dnd?

**Razões:**
1. **Performance**: Usa CSS transforms nativos (mais rápido)
2. **Bundle size**: ~50KB vs ~100KB (react-beautiful-dnd)
3. **Acessibilidade**: ARIA compliant out-of-the-box
4. **Touch**: Suporte nativo a dispositivos móveis
5. **Typescript**: Tipagem melhor e mais estrita
6. **Manutenção**: react-beautiful-dnd está deprecated
7. **Flexibilidade**: Mais composable e customizável

### Por que localStorage ao invés de IndexedDB?

**Razões:**
1. **Simplicidade**: API síncrona, fácil de usar
2. **Suporte**: 100% dos navegadores modernos
3. **Tamanho**: Apenas ~5KB de dados (order array)
4. **Latência**: Acesso instantâneo (< 1ms)
5. **Debugging**: Fácil de inspecionar no DevTools

**Quando usar IndexedDB:**
- Dados > 5MB
- Queries complexas
- Transações
- Dados binários

### Por que debounce de 300ms?

**Razões:**
1. **Balance**: Não muito rápido (lag), não muito lento (delay perceptível)
2. **Pesquisa**: 300ms é padrão da indústria (Google usa 200-400ms)
3. **Performance**: Reduz chamadas em 80-90%
4. **UX**: Usuário não percebe o delay
5. **Network**: Menos requisições (se fosse API externa)

**Comparação:**
- 100ms: Muito rápido, poucas economias
- 300ms: ✅ Ideal
- 500ms: Perceptível, parece lento
- 1000ms: Muito lento, má UX

### Por que Chart.js ao invés de D3.js?

**Razões:**
1. **Learning Curve**: Chart.js é muito mais simples
2. **Bundle Size**: ~200KB vs ~500KB (D3)
3. **Performance**: Canvas vs SVG para real-time
4. **Manutenção**: Menos código customizado
5. **Plugins**: Ecossistema rico (zoom, annotations, etc.)

**Quando usar D3:**
- Visualizações muito customizadas
- Interações complexas
- Múltiplos gráficos integrados
- Transições avançadas

### Por que não usar Redux/Zustand ainda?

**Razões:**
1. **Prop Drilling**: Apenas 2-3 níveis (aceitável)
2. **Escopo**: Estado é local ao Dashboard
3. **Simplicidade**: Hooks suficientes para MVP
4. **Bundle**: Evita +10-20KB
5. **Refactor**: Fácil migrar depois se necessário

**Quando adicionar Zustand:**
- Portfolio tracker (estado global)
- Watchlists múltiplas
- Alertas compartilhados
- Preferências de usuário (tema, etc.)

### Estrutura de Pastas Flat

**Por que `src/components/` ao invés de nested?**

**Razões:**
1. **Simplicidade**: Projeto pequeno (~10 componentes)
2. **Imports**: Mais curtos (`'../components/X'`)
3. **Navegação**: Mais rápido encontrar arquivos
4. **Refactor**: Fácil mover depois se crescer

**Quando nested:**
- Projeto > 50 componentes
- Múltiplas features isoladas
- Domain-driven design

---

## 📝 Changelog Importante (Atualizado)

### v3.0.0 - Advanced Features (2025-10-29)
- ✅ **Drag & Drop**: Reordenação de moedas com @dnd-kit
- ✅ **Persistência**: localStorage para ordem customizada
- ✅ **Tooltips Avançados**: 5 linhas de informação
- ✅ **Zoom & Pan**: chartjs-plugin-zoom integrado
- ✅ **Debouncing**: Hook customizado useDebounce
- ✅ **Indicadores Visuais**: Setas animadas (ArrowUp/Down)
- ✅ **Cards Detalhados**: Volume, Máx/Mín 24h
- ✅ **PeriodSelector**: UI completa (funcionalidade pendente)
- ✅ **Mobile Refinado**: Handle sempre visível, espaçamento otimizado

### v2.0.0 - Redesign Completo (2025-10-28)
- ✅ Sidebar com 12 moedas
- ✅ Ícones SVG customizados
- ✅ Seletor de moeda fiat (5 moedas)
- ✅ Conversão em tempo real
- ✅ Responsividade mobile completa

### v1.5.0 - Ícones SVG (2025-10-27)
- ✅ Componente CryptoIcon
- ✅ 12 ícones vetorizados
- ✅ Animações de hover

### v1.0.0 - MVP (2025-10-26)
- ✅ Dashboard básico
- ✅ 6 criptomoedas
- ✅ WebSocket Binance
- ✅ Gráficos Chart.js

---

## 🚀 Próximos Passos Sugeridos

### Curto Prazo (1-2 dias)
1. **Implementar fetch de períodos** - Alta prioridade, UI já pronta
2. **Adicionar market cap** - Relativamente simples, boa feature
3. **Otimizar bundle** - Code splitting, lazy loading

### Médio Prazo (1 semana)
4. **Watchlists múltiplas** - Feature diferencial
5. **Portfolio tracker básico** - Agregar muito valor
6. **Gráficos candlestick** - Para traders

### Longo Prazo (1 mês)
7. **Indicadores técnicos** - Complexo mas valioso
8. **Sistema de alertas** - Requer backend ou Service Worker
9. **Mobile App** - React Native reaproveitando lógica

---

## 🔑 Comandos Essenciais

```bash
# Desenvolvimento
npm run dev                    # Inicia dev server (localhost:5173)
npm run dev -- --host          # Expõe na rede local

# Build
npm run build                  # Compila TypeScript + Vite build
npm run preview                # Preview do build local

# Type Check
npx tsc --noEmit               # Verifica erros TypeScript sem compilar
npx tsc --noEmit --watch       # Watch mode

# Lint
npm run lint                   # ESLint check
npm run lint -- --fix          # Auto-fix problemas

# Deploy
vercel                         # Deploy para Vercel
vercel --prod                  # Deploy para produção

# Análise
npm run build -- --mode=analyze  # Analisa bundle size
npm list --depth=0             # Lista dependências

# Limpeza
rm -rf node_modules dist       # Limpa build e deps
npm install                    # Reinstala dependências
npm dedupe                     # Remove duplicatas
```

---

## 📚 Recursos de Referência (Atualizados)

### Documentação Oficial

**Core:**
- [React 18 Docs](https://react.dev) - Hooks, Patterns
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - Tipos, Interfaces
- [Vite Guide](https://vitejs.dev/guide/) - Config, Plugins
- [Tailwind CSS](https://tailwindcss.com/docs) - Utilities, Customization

**Visualização:**
- [Chart.js Docs](https://www.chartjs.org/docs/) - Options, Plugins
- [chartjs-plugin-zoom](https://www.chartjs.org/chartjs-plugin-zoom/) - Zoom, Pan
- [Framer Motion](https://www.framer.com/motion/) - Animations, Gestures

**Interação:**
- [dnd-kit Docs](https://docs.dndkit.com/) - Sortable, Sensors
- [dnd-kit Examples](https://master--5fc05e08a4a65d0021ae0bf2.chromatic.com/) - Demos

**Utils:**
- [date-fns](https://date-fns.org/docs/) - Date formatting
- [Lucide Icons](https://lucide.dev/) - Icon search

### APIs

**Binance:**
- [WebSocket Streams](https://binance-docs.github.io/apidocs/spot/en/#websocket-market-streams)
- [24hr Ticker](https://binance-docs.github.io/apidocs/spot/en/#24hr-ticker-price-change-statistics)
- [Klines/Candlestick](https://binance-docs.github.io/apidocs/spot/en/#kline-candlestick-data)

**Exchange Rates:**
- [ExchangeRate-API](https://www.exchangerate-api.com/docs/free) - Fiat conversions

### Tools

**DevTools:**
- [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/) - Components, Profiler
- [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/) - Para quando adicionar Zustand

**Testing:**
- [wscat](https://github.com/websockets/wscat) - WebSocket CLI testing
  ```bash
  npm install -g wscat
  wscat -c "wss://stream.binance.com:9443/ws/btcusdt@ticker"
  ```

**Playgrounds:**
- [TypeScript Playground](https://www.typescriptlang.org/play) - Testar tipos
- [Tailwind Play](https://play.tailwindcss.com/) - Testar CSS

---

## 🤝 Dicas para Agentes IA

### Ao Fazer Modificações

**Checklist Pré-modificação:**
1. ✅ **Ler arquivo completo** antes de editar
2. ✅ **Verificar imports** existentes e reutilizar
3. ✅ **Manter estilo** consistente (espaçamento, naming)
4. ✅ **Adicionar tipos** TypeScript para novas props/funções
5. ✅ **Testar build** após mudanças (`npm run build`)
6. ✅ **Commit semântico** seguindo Conventional Commits

**Padrões de Commit:**
```bash
feat: adiciona funcionalidade X
fix: corrige bug em Y ao fazer Z
refactor: reestrutura componente A para melhorar B
docs: atualiza README com informações sobre C
style: ajusta espaçamento em D
perf: otimiza performance de E usando F
test: adiciona testes para G
chore: atualiza dependências H
```

### Quando Não Sabe

**❌ NÃO:**
- Adivinhar tipos → use `unknown` temporariamente
- Usar `any` → sempre há alternativa melhor
- Remover código sem entender → comente e pergunte
- Fazer breaking changes sem avisar
- Ignorar erros TypeScript

**✅ FAZER:**
- Perguntar ao usuário sobre decisões de design
- Ler código existente similar no projeto
- Consultar documentação oficial
- Adicionar TODO comments para features futuras
- Sugerir alternativas quando aplicável

### Contexto Importante

**Estado Atual do Projeto:**
- MVP completo e funcional ✅
- Features avançadas implementadas (drag-and-drop, zoom, tooltips) ✅
- Responsividade mobile refinada ✅
- Performance otimizada ✅
- Arquitetura sólida para escalar

**Próximas Prioridades:**
1. Implementar fetch de períodos (UI pronta)
2. Adicionar market cap
3. Watchlists múltiplas
4. Portfolio tracker

**Pontos de Atenção:**
- ⚠️ PeriodSelector: UI pronta mas não funcional
- ⚠️ Histórico limitado a 50 pontos (performance)
- ⚠️ Taxas de conversão fiat são fixas (não real-time)
- ⚠️ Sem autenticação/backend ainda

**Padrões Estabelecidos:**
- Mobile-first responsiveness
- Framer Motion para animações
- Tailwind para styling
- TypeScript strict mode
- Functional components + Hooks
- No class components

---

**Última atualização:** 2025-10-29
**Versão:** 3.0.0
**Mantido por:** Agentes IA + Adilson Jr
**Status:** ✅ Produção (https://dashboard-realtime.vercel.app)
