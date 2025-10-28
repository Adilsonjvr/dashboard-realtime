import { useState, useEffect, useRef } from 'react'
import { CurrencyData } from '../types'
import { CurrencyWebSocketService } from '../services/currencyWebSocket'

export const useCurrencyData = () => {
  const [currencies, setCurrencies] = useState<Map<string, CurrencyData>>(new Map())
  const [isConnected, setIsConnected] = useState(false)
  const serviceRef = useRef<CurrencyWebSocketService | null>(null)

  useEffect(() => {
    // Criar serviço WebSocket
    serviceRef.current = new CurrencyWebSocketService(
      (updatedCurrencies) => {
        setCurrencies(updatedCurrencies)
      },
      (connected) => {
        setIsConnected(connected)
      }
    )

    // Conectar
    serviceRef.current.connect()

    // Cleanup ao desmontar
    return () => {
      if (serviceRef.current) {
        serviceRef.current.disconnect()
      }
    }
  }, [])

  return {
    currencies: Array.from(currencies.values()),
    isConnected,
    reconnect: () => serviceRef.current?.connect(),
    disconnect: () => serviceRef.current?.disconnect()
  }
}
