import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wifi, WifiOff, TrendingUp, TrendingDown, BarChart3, RefreshCw, Activity, Menu, ArrowUp, ArrowDown } from 'lucide-react'
import { CurrencyData } from '../types'
import Sidebar from './Sidebar'
import CurrencyChart from './CurrencyChart'
import FiatSelector from './FiatSelector'
import CryptoIcon from './CryptoIcon'
import PeriodSelector, { TimePeriod } from './PeriodSelector'
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('24h')

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
    <div className="flex h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Sidebar Desktop */}
      <div className="hidden lg:block">
        <Sidebar
          currencies={currencies}
          selectedSymbol={selectedCurrency}
          onSelectCurrency={setSelectedCurrency}
        />
      </div>

      {/* Sidebar Mobile - Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full z-50 lg:hidden"
            >
              <Sidebar
                currencies={currencies}
                selectedSymbol={selectedCurrency}
                onSelectCurrency={(symbol) => {
                  setSelectedCurrency(symbol)
                  setIsSidebarOpen(false)
                }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/50 border-b border-slate-700/50 backdrop-blur-xl"
        >
          <div className="px-4 md:px-8 py-3 md:py-4">
            <div className="flex items-center justify-between gap-2">
              {/* Mobile Menu Button + Title */}
              <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                {/* Hamburguer Button - Mobile Only */}
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="lg:hidden p-2 hover:bg-slate-800 rounded-lg transition-colors"
                  aria-label="Abrir menu"
                >
                  <Menu className="w-6 h-6 text-white" />
                </button>

                {/* Title */}
                <div className="min-w-0">
                  <h1 className="text-lg md:text-2xl font-bold text-white flex items-center gap-2 md:gap-3 truncate">
                    <Activity className="w-5 h-5 md:w-7 md:h-7 text-blue-500 flex-shrink-0" />
                    <span className="truncate">Crypto Tracker</span>
                  </h1>
                  <p className="text-xs md:text-sm text-slate-400 mt-0.5 md:mt-1 hidden sm:block">
                    Monitoramento em tempo real • {currencies.length} moedas
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
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
        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6">
          {/* Global Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4"
          >
            {/* Market Cap */}
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-xl md:rounded-2xl p-3 md:p-5 backdrop-blur-sm">
              <div className="flex items-center gap-1 md:gap-2 text-blue-400 mb-1 md:mb-2">
                <BarChart3 className="w-3 h-3 md:w-4 md:h-4" />
                <span className="text-[10px] md:text-xs font-medium uppercase tracking-wider">Market Cap</span>
              </div>
              <p className="text-base md:text-2xl font-bold text-white truncate">
                {fiatSymbol}{(totalMarketCap / 1e9).toFixed(2)}B
              </p>
              <p className="text-[10px] md:text-xs text-slate-400 mt-0.5 md:mt-1">Volume total</p>
            </div>

            {/* Average Change */}
            <div className={`bg-gradient-to-br ${averageChange >= 0 ? 'from-green-500/10 to-green-600/5 border-green-500/20' : 'from-red-500/10 to-red-600/5 border-red-500/20'} border rounded-xl md:rounded-2xl p-3 md:p-5 backdrop-blur-sm`}>
              <div className={`flex items-center gap-1 md:gap-2 ${averageChange >= 0 ? 'text-green-400' : 'text-red-400'} mb-1 md:mb-2`}>
                {averageChange >= 0 ? <TrendingUp className="w-3 h-3 md:w-4 md:h-4" /> : <TrendingDown className="w-3 h-3 md:w-4 md:h-4" />}
                <span className="text-[10px] md:text-xs font-medium uppercase tracking-wider">Média 24h</span>
              </div>
              <div className="flex items-center gap-1 md:gap-2">
                {averageChange >= 0 ? (
                  <ArrowUp className="w-4 h-4 md:w-5 md:h-5 text-green-400 animate-bounce" />
                ) : (
                  <ArrowDown className="w-4 h-4 md:w-5 md:h-5 text-red-400 animate-bounce" />
                )}
                <p className={`text-base md:text-2xl font-bold ${averageChange >= 0 ? 'text-green-400' : 'text-red-400'} truncate`}>
                  {averageChange >= 0 ? '+' : ''}{averageChange.toFixed(2)}%
                </p>
              </div>
              <p className="text-[10px] md:text-xs text-slate-400 mt-0.5 md:mt-1">Variação média</p>
            </div>

            {/* Top Gainer */}
            {topGainer && (
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 rounded-xl md:rounded-2xl p-3 md:p-5 backdrop-blur-sm overflow-hidden relative group cursor-pointer"
              >
                <div className="absolute top-1 right-1 md:top-2 md:right-2 opacity-20 group-hover:opacity-30 transition-opacity">
                  <CryptoIcon symbol={topGainer.symbol} size={40} animate={false} className="md:w-[60px] md:h-[60px]" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-1 md:gap-2 text-emerald-400 mb-1 md:mb-2">
                    <ArrowUp className="w-3 h-3 md:w-4 md:h-4 animate-bounce" />
                    <span className="text-[10px] md:text-xs font-medium uppercase tracking-wider">Gainer</span>
                  </div>
                  <div className="flex items-center gap-1 md:gap-2 mb-0.5 md:mb-1">
                    <CryptoIcon symbol={topGainer.symbol} size={20} animate={false} className="md:w-6 md:h-6" />
                    <p className="text-base md:text-2xl font-bold text-white truncate">{topGainer.symbol}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 md:w-4 md:h-4 text-emerald-400" />
                    <p className="text-[10px] md:text-xs text-emerald-400 font-semibold truncate">
                      +{topGainer.changePercent24h.toFixed(2)}%
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Top Loser */}
            {topLoser && (
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/20 rounded-xl md:rounded-2xl p-3 md:p-5 backdrop-blur-sm overflow-hidden relative group cursor-pointer"
              >
                <div className="absolute top-1 right-1 md:top-2 md:right-2 opacity-20 group-hover:opacity-30 transition-opacity">
                  <CryptoIcon symbol={topLoser.symbol} size={40} animate={false} className="md:w-[60px] md:h-[60px]" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-1 md:gap-2 text-orange-400 mb-1 md:mb-2">
                    <ArrowDown className="w-3 h-3 md:w-4 md:h-4 animate-bounce" />
                    <span className="text-[10px] md:text-xs font-medium uppercase tracking-wider">Loser</span>
                  </div>
                  <div className="flex items-center gap-1 md:gap-2 mb-0.5 md:mb-1">
                    <CryptoIcon symbol={topLoser.symbol} size={20} animate={false} className="md:w-6 md:h-6" />
                    <p className="text-base md:text-2xl font-bold text-white truncate">{topLoser.symbol}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingDown className="w-3 h-3 md:w-4 md:h-4 text-orange-400" />
                    <p className="text-[10px] md:text-xs text-orange-400 font-semibold truncate">
                      {topLoser.changePercent24h.toFixed(2)}%
                    </p>
                  </div>
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
              className="bg-slate-900/50 border border-slate-700/50 rounded-xl md:rounded-2xl p-4 md:p-6 backdrop-blur-sm"
            >
              <div className="flex flex-col gap-3 md:gap-4 mb-4 md:mb-6">
                {/* Linha 1: Info + Preço */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  {/* Info da Moeda */}
                  <div className="flex items-center gap-2 md:gap-4">
                    {/* Ícone SVG */}
                    <CryptoIcon symbol={selectedCurrencyData.symbol} size={40} className="md:w-14 md:h-14 flex-shrink-0" />
                    <div className="min-w-0">
                      <h2 className="text-lg md:text-2xl font-bold text-white truncate">
                        {selectedCurrencyData.name}
                      </h2>
                      <p className="text-xs md:text-sm text-slate-400">{selectedCurrencyData.symbol}/{fiatCurrency}</p>
                    </div>
                  </div>

                  {/* Preço e Variação */}
                  <div className="flex items-baseline gap-3 md:text-right">
                    <div className="text-xl md:text-3xl font-bold text-white">
                      {fiatSymbol}{selectedCurrencyData.currentPrice.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </div>
                    <div className={`text-xs md:text-sm font-semibold ${selectedCurrencyData.changePercent24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {selectedCurrencyData.changePercent24h >= 0 ? '+' : ''}
                      {selectedCurrencyData.changePercent24h.toFixed(2)}%
                    </div>
                  </div>
                </div>

                {/* Linha 2: Seletor de Período */}
                <div className="flex justify-center md:justify-start">
                  <PeriodSelector
                    selectedPeriod={selectedPeriod}
                    onChangePeriod={setSelectedPeriod}
                  />
                </div>
              </div>

              {/* Stats detalhadas */}
              <div className="grid grid-cols-3 gap-2 md:gap-4 mb-4 md:mb-6">
                {/* Volume 24h */}
                <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg md:rounded-xl p-2 md:p-4">
                  <p className="text-[10px] md:text-xs text-slate-400 mb-1">Volume 24h</p>
                  <p className="text-xs md:text-lg font-bold text-white truncate">
                    {fiatSymbol}{(selectedCurrencyData.volume24h * selectedCurrencyData.currentPrice).toLocaleString('en-US', {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0
                    })}
                  </p>
                </div>

                {/* Máxima 24h */}
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg md:rounded-xl p-2 md:p-4">
                  <p className="text-[10px] md:text-xs text-green-400 mb-1">Máx 24h</p>
                  <p className="text-xs md:text-lg font-bold text-green-400 truncate">
                    {fiatSymbol}{selectedCurrencyData.high24h.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </p>
                </div>

                {/* Mínima 24h */}
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg md:rounded-xl p-2 md:p-4">
                  <p className="text-[10px] md:text-xs text-red-400 mb-1">Mín 24h</p>
                  <p className="text-xs md:text-lg font-bold text-red-400 truncate">
                    {fiatSymbol}{selectedCurrencyData.low24h.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </p>
                </div>
              </div>

              {/* Gráfico */}
              <div className="h-[250px] md:h-[400px] relative">
                <CurrencyChart currency={selectedCurrencyData} />
                <p className="text-[10px] md:text-xs text-slate-500 text-center mt-2">
                  💡 Dica: Use Ctrl + Scroll para zoom, Ctrl + Arraste para mover
                </p>
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
