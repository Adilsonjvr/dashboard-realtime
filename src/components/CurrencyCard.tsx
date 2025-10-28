import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Activity } from 'lucide-react'
import { CurrencyCardProps } from '../types'

const CurrencyCard = ({ currency, onClick, isSelected }: CurrencyCardProps) => {
  const isPositive = currency.changePercent24h >= 0

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price)
  }

  const formatVolume = (volume: number) => {
    if (volume >= 1e9) {
      return `$${(volume / 1e9).toFixed(2)}B`
    } else if (volume >= 1e6) {
      return `$${(volume / 1e6).toFixed(2)}M`
    } else if (volume >= 1e3) {
      return `$${(volume / 1e3).toFixed(2)}K`
    }
    return `$${volume.toFixed(2)}`
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-2xl p-6 cursor-pointer
        transition-all duration-300
        ${isSelected
          ? 'bg-gradient-to-br from-blue-600 to-blue-800 border-2 border-blue-400 shadow-xl shadow-blue-500/20'
          : 'bg-slate-800 border-2 border-slate-700 hover:border-slate-600'
        }
      `}
    >
      {/* Background Gradient Effect */}
      <div className={`absolute inset-0 opacity-10 ${isPositive ? 'bg-green-500' : 'bg-red-500'}`} />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-bold text-white">{currency.symbol}</h3>
              <Activity className="w-5 h-5 text-slate-400" />
            </div>
            <p className="text-sm text-slate-400 mt-1">{currency.name}</p>
          </div>

          {/* Change Badge */}
          <div className={`
            flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold
            ${isPositive
              ? 'bg-green-500/20 text-green-400'
              : 'bg-red-500/20 text-red-400'
            }
          `}>
            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {Math.abs(currency.changePercent24h).toFixed(2)}%
          </div>
        </div>

        {/* Current Price */}
        <div className="mb-4">
          <motion.div
            key={currency.currentPrice}
            initial={{ scale: 1.1, color: isPositive ? '#22c55e' : '#ef4444' }}
            animate={{ scale: 1, color: '#ffffff' }}
            transition={{ duration: 0.3 }}
            className="text-4xl font-bold text-white"
          >
            {formatPrice(currency.currentPrice)}
          </motion.div>
          <p className={`text-sm font-medium mt-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? '+' : ''}{formatPrice(currency.change24h)} (24h)
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-700/50">
          <div>
            <p className="text-xs text-slate-400 mb-1">High 24h</p>
            <p className="text-sm font-semibold text-white">{formatPrice(currency.high24h)}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-1">Low 24h</p>
            <p className="text-sm font-semibold text-white">{formatPrice(currency.low24h)}</p>
          </div>
          <div className="col-span-2">
            <p className="text-xs text-slate-400 mb-1">Volume 24h</p>
            <p className="text-sm font-semibold text-white">{formatVolume(currency.volume24h)}</p>
          </div>
        </div>
      </div>

      {/* Pulse Animation for Selected */}
      {isSelected && (
        <motion.div
          className="absolute inset-0 border-2 border-blue-400 rounded-2xl"
          animate={{
            opacity: [0.5, 0.2, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </motion.div>
  )
}

export default CurrencyCard
