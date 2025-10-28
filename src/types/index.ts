export interface CurrencyPrice {
  symbol: string
  name: string
  price: number
  change24h: number
  changePercent24h: number
  high24h: number
  low24h: number
  volume24h: number
  lastUpdate: number
}

export interface PriceHistory {
  timestamp: number
  price: number
}

export interface CurrencyData {
  symbol: string
  name: string
  currentPrice: number
  priceHistory: PriceHistory[]
  change24h: number
  changePercent24h: number
  high24h: number
  low24h: number
  volume24h: number
  color?: string
  icon?: string
}

export interface DashboardData {
  currencies: Map<string, CurrencyData>
  lastUpdate: number
  isConnected: boolean
}

export interface WebSocketMessage {
  type: 'price_update' | 'history' | 'error'
  data: any
}

export interface CurrencyCardProps {
  currency: CurrencyData
  onClick?: () => void
  isSelected?: boolean
}
