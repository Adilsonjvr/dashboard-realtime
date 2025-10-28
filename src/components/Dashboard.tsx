import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wifi, WifiOff, TrendingUp, DollarSign, BarChart3, RefreshCw } from 'lucide-react'
import { CurrencyData } from '../types'
import CurrencyCard from './CurrencyCard'
import CurrencyChart from './CurrencyChart'

interface DashboardProps {
  currencies: CurrencyData[]
  isConnected: boolean
  onReconnect: () => void
}

const Dashboard = ({ currencies, isConnected, onReconnect }: DashboardProps) => {
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null)

  const selectedCurrencyData = selectedCurrency
    ? currencies.find(c => c.symbol === selectedCurrency)
    : currencies[0] // Default to first currency

  // Calcular estatísticas globais
  const totalMarketCap = currencies.reduce((sum, c) => sum + (c.currentPrice * c.volume24h), 0)
  const averageChange = currencies.reduce((sum, c) => sum + c.changePercent24h, 0) / currencies.length
  const gainers = currencies.filter(c => c.changePercent24h > 0).length
  const losers = currencies.filter(c => c.changePercent24h < 0).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
              <DollarSign className="w-10 h-10 text-blue-500" />
              Crypto Dashboard
            </h1>
            <p className="text-slate-400">Cotações em tempo real via Binance WebSocket</p>
          </div>

          {/* Connection Status */}
          <div className="flex items-center gap-4">
            <AnimatePresence mode="wait">
              {isConnected ? (
                <motion.div
                  key="connected"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-full"
                >
                  <Wifi className="w-5 h-5 text-green-400" />
                  <span className="text-sm font-medium text-green-400">Conectado</span>
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                </motion.div>
              ) : (
                <motion.div
                  key="disconnected"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-full"
                >
                  <WifiOff className="w-5 h-5 text-red-400" />
                  <span className="text-sm font-medium text-red-400">Desconectado</span>
                  <button
                    onClick={onReconnect}
                    className="ml-2 p-1 hover:bg-red-500/30 rounded-full transition-colors"
                  >
                    <RefreshCw className="w-4 h-4 text-red-400" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Global Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <BarChart3 className="w-4 h-4" />
              <span className="text-sm">Market Cap</span>
            </div>
            <p className="text-2xl font-bold text-white">
              ${(totalMarketCap / 1e9).toFixed(2)}B
            </p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">Avg Change</span>
            </div>
            <p className={`text-2xl font-bold ${averageChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {averageChange >= 0 ? '+' : ''}{averageChange.toFixed(2)}%
            </p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <span className="text-sm">🚀 Gainers</span>
            </div>
            <p className="text-2xl font-bold text-green-400">{gainers}</p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <span className="text-sm">📉 Losers</span>
            </div>
            <p className="text-2xl font-bold text-red-400">{losers}</p>
          </div>
        </motion.div>

        {/* Main Chart */}
        {selectedCurrencyData && selectedCurrencyData.priceHistory.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6"
          >
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-white mb-1">
                {selectedCurrencyData.name} Price Chart
              </h2>
              <p className="text-slate-400 text-sm">Últimos dados em tempo real</p>
            </div>
            <div className="h-[400px]">
              <CurrencyChart currency={selectedCurrencyData} />
            </div>
          </motion.div>
        )}

        {/* Currency Cards Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-white mb-4">Moedas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {currencies.map((currency, index) => (
                <motion.div
                  key={currency.symbol}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index }}
                >
                  <CurrencyCard
                    currency={currency}
                    isSelected={selectedCurrency === currency.symbol}
                    onClick={() => setSelectedCurrency(currency.symbol)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* No Data Message */}
        {currencies.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <BarChart3 className="w-16 h-16 text-slate-600 mb-4" />
            <h3 className="text-xl font-semibold text-slate-400 mb-2">
              Aguardando dados...
            </h3>
            <p className="text-slate-500">
              Conectando ao WebSocket da Binance
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
