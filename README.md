# 💰 Crypto Dashboard Real-time

Dashboard interativo de cotações de criptomoedas em tempo real via WebSocket da Binance. Interface moderna, reativa e com animações suaves usando React, TypeScript, Chart.js e Framer Motion.

![Dashboard Preview](https://img.shields.io/badge/Status-Live-success)
![React](https://img.shields.io/badge/React-18.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue)
![Chart.js](https://img.shields.io/badge/Chart.js-4.4-ff6384)

## ✨ Características

- 📊 **Dados em Tempo Real** - Conexão WebSocket com a API da Binance
- 📈 **Gráficos Interativos** - Visualizações dinâmicas com Chart.js
- 🎨 **Animações Suaves** - Transições e animações com Framer Motion
- 💳 **Cards Interativos** - Informações detalhadas de cada moeda
- 📱 **Design Responsivo** - Funciona perfeitamente em mobile e desktop
- 🌙 **Dark Mode** - Interface moderna com tema escuro
- 🔄 **Auto Reconnect** - Reconexão automática em caso de perda de conexão
- ⚡ **Performance** - Otimizado para alta frequência de atualizações

## 🚀 Tecnologias

- **React 18** - Biblioteca UI
- **TypeScript** - Type safety e autocomplete
- **Vite** - Build tool extremamente rápido
- **Tailwind CSS** - Estilização utilitária
- **Chart.js** - Biblioteca de gráficos poderosa e flexível
- **react-chartjs-2** - Wrapper React para Chart.js
- **Framer Motion** - Animações declarativas
- **Lucide React** - Ícones modernos
- **date-fns** - Manipulação de datas

## 📦 Instalação

```bash
npm install
```

## 🎯 Desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:5173](http://localhost:5173)

## 🏗️ Build

```bash
npm run build
```

## 👀 Preview

```bash
npm run preview
```

## 📁 Estrutura do Projeto

```
src/
├── components/              # Componentes React
│   ├── Dashboard.tsx       # Layout principal do dashboard
│   ├── CurrencyCard.tsx    # Card de moeda com animações
│   └── CurrencyChart.tsx   # Gráfico Chart.js
├── hooks/                  # Custom hooks
│   └── useCurrencyData.ts # Hook para gerenciar dados WebSocket
├── services/               # Serviços
│   └── currencyWebSocket.ts # Serviço WebSocket Binance
├── types/                  # TypeScript types
│   └── index.ts           # Interfaces e tipos
├── App.tsx                # Componente raiz
├── main.tsx              # Entry point
└── index.css             # Estilos globais
```

## 🌐 API WebSocket

O dashboard se conecta à API WebSocket pública da Binance:

- **Endpoint**: `wss://stream.binance.com:9443/ws`
- **Moedas**: BTC, ETH, BNB, SOL, ADA, XRP
- **Dados**: Preço atual, variação 24h, máxima/mínima, volume

### Formato dos Dados

```typescript
{
  symbol: 'BTC',
  name: 'Bitcoin',
  currentPrice: 45000.00,
  change24h: 1250.50,
  changePercent24h: 2.85,
  high24h: 46000.00,
  low24h: 43500.00,
  volume24h: 25000000000
}
```

## 🎨 Features Interativas

### 1. Cards de Moedas
- Clique em qualquer card para visualizar o gráfico detalhado
- Animação de pulsação no card selecionado
- Cores dinâmicas baseadas em alta/baixa
- Efeito hover com escala

### 2. Gráfico Principal
- Histórico de preços em tempo real
- Tooltip interativo com valores formatados
- Cores adaptativas (verde para alta, vermelho para baixa)
- Suavização de curvas com tension

### 3. Estatísticas Globais
- Market Cap total
- Variação média
- Contadores de gainers e losers
- Atualização em tempo real

## 🔧 Customização

### Adicionar Novas Moedas

Edite `src/services/currencyWebSocket.ts`:

```typescript
export const CURRENCIES = [
  { symbol: 'BTC', name: 'Bitcoin' },
  { symbol: 'ETH', name: 'Ethereum' },
  // Adicione mais moedas aqui
  { symbol: 'DOGE', name: 'Dogecoin' },
]
```

### Alterar Cores do Tema

Edite as classes Tailwind em `src/components/Dashboard.tsx` e `src/components/CurrencyCard.tsx`.

## 🐛 Troubleshooting

### WebSocket não conecta
- Verifique sua conexão com a internet
- A Binance pode ter limites de rate
- Verifique o console do navegador para erros

### Gráfico não renderiza
- Certifique-se de que o Chart.js foi instalado corretamente
- Verifique se há dados no priceHistory

## 📝 Licença

MIT

## 👨‍💻 Autor

Criado como projeto de portfólio para demonstrar habilidades em:
- React e TypeScript
- WebSocket real-time
- Visualização de dados
- Animações e UX
- Integração com APIs públicas
