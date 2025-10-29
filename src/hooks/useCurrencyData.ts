import { useState, useEffect, useRef } from 'react'
import { CurrencyData } from '../types'
import { CurrencyWebSocketService } from '../services/currencyWebSocket'

export const useCurrencyData = () => {
  const [currencies, setCurrencies] = useState<Map<string, CurrencyData>>(new Map())
  const [isConnected, setIsConnected] = useState(false)
  const [fiatCurrency, setFiatCurrency] = useState('USD')
  const [currencyOrder, setCurrencyOrder] = useState<string[]>([])
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

  const changeFiatCurrency = (currency: string) => {
    setFiatCurrency(currency)
    serviceRef.current?.setFiatCurrency(currency)
  }

  const reorderCurrencies = (newCurrencies: CurrencyData[]) => {
    // Salvar nova ordem
    const newOrder = newCurrencies.map(c => c.symbol)
    setCurrencyOrder(newOrder)
    // Salvar no localStorage
    localStorage.setItem('currencyOrder', JSON.stringify(newOrder))
  }

  // Ordenar currencies baseado na ordem salva
  const currenciesArray = Array.from(currencies.values())
  const orderedCurrencies = currencyOrder.length > 0
    ? currencyOrder
        .map(symbol => currenciesArray.find(c => c.symbol === symbol))
        .filter((c): c is CurrencyData => c !== undefined)
        .concat(currenciesArray.filter(c => !currencyOrder.includes(c.symbol)))
    : currenciesArray

  // Carregar ordem salva do localStorage
  useEffect(() => {
    const savedOrder = localStorage.getItem('currencyOrder')
    if (savedOrder) {
      try {
        setCurrencyOrder(JSON.parse(savedOrder))
      } catch (e) {
        console.error('Erro ao carregar ordem salva:', e)
      }
    }
  }, [])

  return {
    currencies: orderedCurrencies,
    isConnected,
    fiatCurrency,
    changeFiatCurrency,
    reorderCurrencies,
    reconnect: () => serviceRef.current?.connect(),
    disconnect: () => serviceRef.current?.disconnect()
  }
}
