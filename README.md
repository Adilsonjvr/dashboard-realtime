# Dashboard Real-time

Dashboard interativo com dados em tempo real construído com React, TypeScript e Tailwind CSS.

## Características

- Visualização de métricas em tempo real
- Gráficos dinâmicos e responsivos
- Interface moderna e dark mode
- Suporte a WebSocket para dados ao vivo
- Modo mock para demonstração

## Tecnologias

- **React 18** - Biblioteca UI
- **TypeScript** - Type safety
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Estilização
- **Recharts** - Gráficos e visualizações
- **Lucide React** - Ícones

## Instalação

```bash
npm install
```

## Desenvolvimento

```bash
npm run dev
```

Acesse `http://localhost:5173`

## Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```

## Estrutura do Projeto

```
src/
├── components/       # Componentes React
│   ├── Dashboard.tsx
│   ├── MetricCard.tsx
│   └── Chart.tsx
├── hooks/           # Custom hooks
│   └── useRealtimeData.ts
├── types/           # TypeScript types
│   └── index.ts
├── App.tsx          # Componente principal
├── main.tsx         # Entry point
└── index.css        # Estilos globais
```

## Configuração WebSocket

Por padrão, o app usa dados mockados. Para conectar a um servidor WebSocket real:

1. Abra `src/hooks/useRealtimeData.ts`
2. Altere `MOCK_MODE = false`
3. Configure a URL do WebSocket no construtor

## Licença

MIT
