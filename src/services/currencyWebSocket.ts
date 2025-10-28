import { CurrencyData, PriceHistory } from '../types'

// Lista de moedas principais para monitorar
export const CURRENCIES = [
  { symbol: 'BTC', name: 'Bitcoin' },
  { symbol: 'ETH', name: 'Ethereum' },
  { symbol: 'BNB', name: 'Binance Coin' },
  { symbol: 'SOL', name: 'Solana' },
  { symbol: 'ADA', name: 'Cardano' },
  { symbol: 'XRP', name: 'Ripple' },
]

export class CurrencyWebSocketService {
  private ws: WebSocket | null = null
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private reconnectDelay = 3000
  private isIntentionallyClosed = false

  // Usando Binance WebSocket API para dados reais
  private readonly WS_URL = 'wss://stream.binance.com:9443/ws'

  constructor(
    private onUpdate: (currencies: Map<string, CurrencyData>) => void,
    private onConnectionChange: (connected: boolean) => void
  ) {}

  connect(): void {
    this.isIntentionallyClosed = false

    // Criar streams para todas as moedas
    const streams = CURRENCIES.map(c => `${c.symbol.toLowerCase()}usdt@ticker`).join('/')
    const wsUrl = `${this.WS_URL}/${streams}`

    try {
      this.ws = new WebSocket(wsUrl)

      this.ws.onopen = () => {
        console.log('WebSocket conectado à Binance')
        this.reconnectAttempts = 0
        this.onConnectionChange(true)
      }

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          this.handleMessage(data)
        } catch (error) {
          console.error('Erro ao processar mensagem:', error)
        }
      }

      this.ws.onerror = (error) => {
        console.error('WebSocket erro:', error)
        this.onConnectionChange(false)
      }

      this.ws.onclose = () => {
        console.log('WebSocket desconectado')
        this.onConnectionChange(false)

        if (!this.isIntentionallyClosed && this.reconnectAttempts < this.maxReconnectAttempts) {
          this.reconnectAttempts++
          console.log(`Tentando reconectar... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`)
          setTimeout(() => this.connect(), this.reconnectDelay)
        }
      }
    } catch (error) {
      console.error('Erro ao conectar WebSocket:', error)
      this.onConnectionChange(false)
    }
  }

  private currenciesData = new Map<string, CurrencyData>()

  private handleMessage(data: any): void {
    // Formato da mensagem do Binance ticker
    if (data.e === '24hrTicker') {
      const symbol = data.s.replace('USDT', '')
      const currency = CURRENCIES.find(c => c.symbol === symbol)

      if (!currency) return

      const currentPrice = parseFloat(data.c)
      const change24h = parseFloat(data.p)
      const changePercent24h = parseFloat(data.P)
      const high24h = parseFloat(data.h)
      const low24h = parseFloat(data.l)
      const volume24h = parseFloat(data.v)

      const existingData = this.currenciesData.get(symbol)
      const priceHistory: PriceHistory[] = existingData?.priceHistory || []

      // Adicionar novo ponto ao histórico (mantém últimos 50 pontos)
      const newPoint: PriceHistory = {
        timestamp: Date.now(),
        price: currentPrice
      }

      const updatedHistory = [...priceHistory.slice(-49), newPoint]

      const currencyData: CurrencyData = {
        symbol: currency.symbol,
        name: currency.name,
        currentPrice,
        priceHistory: updatedHistory,
        change24h,
        changePercent24h,
        high24h,
        low24h,
        volume24h
      }

      this.currenciesData.set(symbol, currencyData)
      this.onUpdate(new Map(this.currenciesData))
    }
  }

  disconnect(): void {
    this.isIntentionallyClosed = true
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
  }

  getConnectionState(): number {
    return this.ws?.readyState ?? WebSocket.CLOSED
  }
}
