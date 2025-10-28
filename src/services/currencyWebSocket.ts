import { CurrencyData, PriceHistory } from '../types'

// Lista expandida de criptomoedas para monitorar
export const CURRENCIES = [
  { symbol: 'BTC', name: 'Bitcoin', color: '#F7931A', icon: '₿' },
  { symbol: 'ETH', name: 'Ethereum', color: '#627EEA', icon: 'Ξ' },
  { symbol: 'BNB', name: 'Binance Coin', color: '#F3BA2F', icon: 'BNB' },
  { symbol: 'SOL', name: 'Solana', color: '#14F195', icon: '◎' },
  { symbol: 'XRP', name: 'Ripple', color: '#23292F', icon: 'XRP' },
  { symbol: 'ADA', name: 'Cardano', color: '#0033AD', icon: '₳' },
  { symbol: 'DOGE', name: 'Dogecoin', color: '#C2A633', icon: 'Ð' },
  { symbol: 'MATIC', name: 'Polygon', color: '#8247E5', icon: 'MATIC' },
  { symbol: 'DOT', name: 'Polkadot', color: '#E6007A', icon: 'DOT' },
  { symbol: 'AVAX', name: 'Avalanche', color: '#E84142', icon: 'AVAX' },
  { symbol: 'LINK', name: 'Chainlink', color: '#2A5ADA', icon: 'LINK' },
  { symbol: 'UNI', name: 'Uniswap', color: '#FF007A', icon: 'UNI' },
]

// Moedas fiat suportadas
export const FIAT_CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar', flag: '🇺🇸' },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real', flag: '🇧🇷' },
  { code: 'EUR', symbol: '€', name: 'Euro', flag: '🇪🇺' },
  { code: 'GBP', symbol: '£', name: 'British Pound', flag: '🇬🇧' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', flag: '🇯🇵' },
]

export class CurrencyWebSocketService {
  private ws: WebSocket | null = null
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private reconnectDelay = 3000
  private isIntentionallyClosed = false
  private fiatCurrency: string = 'USD'
  private conversionRates: Map<string, number> = new Map([
    ['USD', 1],
    ['BRL', 5.0],
    ['EUR', 0.92],
    ['GBP', 0.79],
    ['JPY', 149.5],
  ])

  // Usando Binance WebSocket API para dados reais
  private readonly WS_URL = 'wss://stream.binance.com:9443/ws'

  constructor(
    private onUpdate: (currencies: Map<string, CurrencyData>) => void,
    private onConnectionChange: (connected: boolean) => void
  ) {
    this.fetchConversionRates()
  }

  setFiatCurrency(currency: string): void {
    this.fiatCurrency = currency
    // Reprocessar dados com nova moeda
    this.onUpdate(new Map(this.currenciesData))
  }

  private async fetchConversionRates(): Promise<void> {
    try {
      // Usar API de taxas de câmbio (exemplo: exchangerate-api.com)
      // Por enquanto, usar valores aproximados
      this.conversionRates.set('USD', 1)
      this.conversionRates.set('BRL', 5.0)
      this.conversionRates.set('EUR', 0.92)
      this.conversionRates.set('GBP', 0.79)
      this.conversionRates.set('JPY', 149.5)
    } catch (error) {
      console.error('Erro ao buscar taxas de conversão:', error)
    }
  }

  private convertPrice(priceUSD: number): number {
    const rate = this.conversionRates.get(this.fiatCurrency) || 1
    return priceUSD * rate
  }

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

      const currentPriceUSD = parseFloat(data.c)
      const change24hUSD = parseFloat(data.p)
      const changePercent24h = parseFloat(data.P)
      const high24hUSD = parseFloat(data.h)
      const low24hUSD = parseFloat(data.l)
      const volume24h = parseFloat(data.v)

      // Converter para moeda selecionada
      const currentPrice = this.convertPrice(currentPriceUSD)
      const change24h = this.convertPrice(change24hUSD)
      const high24h = this.convertPrice(high24hUSD)
      const low24h = this.convertPrice(low24hUSD)

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
        volume24h,
        color: currency.color,
        icon: currency.icon
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
