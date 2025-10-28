import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wifi, WifiOff, TrendingUp, BarChart3, RefreshCw, Activity } from 'lucide-react'
import { CurrencyData } from '../types'
import Sidebar from './Sidebar'
import CurrencyChart from './CurrencyChart'
import FiatSelector from './FiatSelector'
import CryptoIcon from './CryptoIcon'
import { FIAT_CURRENCIES } from '../services/currencyWebSocket'

interface DashboardProps {
  currencies: CurrencyData[]
  isConnected: boolean
  onReconnect: () => void
  fiatCurrency: string
  onChangeFiatCurrency: (currency: string) => void
}

const Dashboard = ({ currencies, isConnected, onReconnect, fiatCurrency, onChangeFiatCurrency }: DashboardProps) => {
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null)

  const selectedCurrencyData = selectedCurrency
    ? currencies.find(c => c.symbol === selectedCurrency)
    : currencies[0]

  const fiatSymbol = FIAT_CURRENCIES.find(f => f.code === fiatCurrency)?.symbol || '$'

  // Calcular estatísticas globais
  const totalMarketCap = currencies.reduce((sum, c) => sum + (c.currentPrice * c.volume24h), 0)
  const averageChange = currencies.length > 0
    ? currencies.reduce((sum, c) => sum + c.changePercent24h, 0) / currencies.length
    : 0
  const topGainer = currencies.reduce((prev, current) =>
    (current.changePercent24h > prev.changePercent24h) ? current : prev
  , currencies[0])
  const topLoser = currencies.reduce((prev, current) =>
    (current.changePercent24h < prev.changePercent24h) ? current : prev
  , currencies[0])

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Sidebar */}
      <Sidebar
        currencies={currencies}
        selectedSymbol={selectedCurrency}
        onSelectCurrency={setSelectedCurrency}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/50 border-b border-slate-700/50 backdrop-blur-xl"
        >
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              {/* Title */}
              <div>
                <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                  <Activity className="w-7 h-7 text-blue-500" />
                  Crypto Tracker
                </h1>
                <p className="text-sm text-slate-400 mt-1">
                  Monitoramento em tempo real • {currencies.length} moedas
                </p>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-4">
                {/* Fiat Selector */}
                <FiatSelector
                  selectedFiat={fiatCurrency}
                  onChangeFiat={onChangeFiatCurrency}
                />

                {/* Connection Status */}
                <AnimatePresence mode="wait">
                  {isConnected ? (
                    <motion.div
                      key="connected"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-2 px-4 py-2.5 bg-green-500/10 border border-green-500/30 rounded-xl"
                    >
                      <Wifi className="w-4 h-4 text-green-400" />
                      <span className="text-sm font-medium text-green-400">Live</span>
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="disconnected"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-2 px-4 py-2.5 bg-red-500/10 border border-red-500/30 rounded-xl"
                    >
                      <WifiOff className="w-4 h-4 text-red-400" />
                      <span className="text-sm font-medium text-red-400">Offline</span>
                      <button
                        onClick={onReconnect}
                        className="ml-1 p-1 hover:bg-red-500/20 rounded-full transition-colors"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-red-400" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {/* Global Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {/* Market Cap */}
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-2xl p-5 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-blue-400 mb-2">
                <BarChart3 className="w-4 h-4" />
                <span className="text-xs font-medium uppercase tracking-wider">Market Cap</span>
              </div>
              <p className="text-2xl font-bold text-white">
                {fiatSymbol}{(totalMarketCap / 1e9).toFixed(2)}B
              </p>
              <p className="text-xs text-slate-400 mt-1">Volume total</p>
            </div>

            {/* Average Change */}
            <div className={`bg-gradient-to-br ${averageChange >= 0 ? 'from-green-500/10 to-green-600/5 border-green-500/20' : 'from-red-500/10 to-red-600/5 border-red-500/20'} border rounded-2xl p-5 backdrop-blur-sm`}>
              <div className={`flex items-center gap-2 ${averageChange >= 0 ? 'text-green-400' : 'text-red-400'} mb-2`}>
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs font-medium uppercase tracking-wider">Média 24h</span>
              </div>
              <p className={`text-2xl font-bold ${averageChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {averageChange >= 0 ? '+' : ''}{averageChange.toFixed(2)}%
              </p>
              <p className="text-xs text-slate-400 mt-1">Variação média</p>
            </div>

            {/* Top Gainer */}
            {topGainer && (
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 rounded-2xl p-5 backdrop-blur-sm overflow-hidden relative group cursor-pointer"
              >
                <div className="absolute top-2 right-2 opacity-20 group-hover:opacity-30 transition-opacity">
                  <CryptoIcon symbol={topGainer.symbol} size={60} animate={false} />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 text-emerald-400 mb-2">
                    <span className="text-xs font-medium uppercase tracking-wider">🚀 Top Gainer</span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <CryptoIcon symbol={topGainer.symbol} size={24} animate={false} />
                    <p className="text-2xl font-bold text-white">{topGainer.symbol}</p>
                  </div>
                  <p className="text-xs text-emerald-400 font-semibold">
                    +{topGainer.changePercent24h.toFixed(2)}%
                  </p>
                </div>
              </motion.div>
            )}

            {/* Top Loser */}
            {topLoser && (
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/20 rounded-2xl p-5 backdrop-blur-sm overflow-hidden relative group cursor-pointer"
              >
                <div className="absolute top-2 right-2 opacity-20 group-hover:opacity-30 transition-opacity">
                  <CryptoIcon symbol={topLoser.symbol} size={60} animate={false} />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 text-orange-400 mb-2">
                    <span className="text-xs font-medium uppercase tracking-wider">📉 Top Loser</span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <CryptoIcon symbol={topLoser.symbol} size={24} animate={false} />
                    <p className="text-2xl font-bold text-white">{topLoser.symbol}</p>
                  </div>
                  <p className="text-xs text-orange-400 font-semibold">
                    {topLoser.changePercent24h.toFixed(2)}%
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Main Chart */}
          {selectedCurrencyData && selectedCurrencyData.priceHistory.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="flex items-center gap-4 mb-2">
                    {/* Ícone SVG de alta qualidade com animação */}
                    <CryptoIcon symbol={selectedCurrencyData.symbol} size={56} />
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        {selectedCurrencyData.name}
                      </h2>
                      <p className="text-sm text-slate-400">{selectedCurrencyData.symbol}/{fiatCurrency}</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-white mb-1">
                    {fiatSymbol}{selectedCurrencyData.currentPrice.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </div>
                  <div className={`text-sm font-semibold ${selectedCurrencyData.changePercent24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {selectedCurrencyData.changePercent24h >= 0 ? '+' : ''}
                    {selectedCurrencyData.changePercent24h.toFixed(2)}% (24h)
                  </div>
                </div>
              </div>
              <div className="h-[400px]">
                <CurrencyChart currency={selectedCurrencyData} />
              </div>
            </motion.div>
          )}

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
    </div>
  )
}

export default Dashboard
