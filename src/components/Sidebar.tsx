import { motion } from 'framer-motion'
import { Search, TrendingUp, TrendingDown } from 'lucide-react'
import { CurrencyData } from '../types'
import { useState } from 'react'

interface SidebarProps {
  currencies: CurrencyData[]
  selectedSymbol: string | null
  onSelectCurrency: (symbol: string) => void
}

const Sidebar = ({ currencies, selectedSymbol, onSelectCurrency }: SidebarProps) => {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCurrencies = currencies.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="w-80 bg-gradient-to-b from-slate-900 to-slate-800 border-r border-slate-700/50 flex flex-col h-screen sticky top-0">
      {/* Header */}
      <div className="p-6 border-b border-slate-700/50">
        <h2 className="text-xl font-bold text-white mb-4">Criptomoedas</h2>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar moeda..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Currency List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        <div className="p-3 space-y-2">
          {filteredCurrencies.map((currency, index) => {
            const isSelected = selectedSymbol === currency.symbol
            const isPositive = currency.changePercent24h >= 0

            return (
              <motion.button
                key={currency.symbol}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.02 }}
                onClick={() => onSelectCurrency(currency.symbol)}
                className={`
                  w-full p-4 rounded-xl text-left transition-all duration-200
                  ${isSelected
                    ? 'bg-gradient-to-r from-blue-600/20 to-blue-500/10 border-2 border-blue-500/50 shadow-lg shadow-blue-500/10'
                    : 'bg-slate-800/30 border border-slate-700/50 hover:bg-slate-800/50 hover:border-slate-600'
                  }
                `}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    {/* Icon/Symbol */}
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold"
                      style={{
                        backgroundColor: `${currency.color}20`,
                        color: currency.color || '#fff'
                      }}
                    >
                      {currency.icon || currency.symbol.charAt(0)}
                    </div>

                    {/* Name & Symbol */}
                    <div>
                      <div className="font-semibold text-white text-sm">
                        {currency.symbol}
                      </div>
                      <div className="text-xs text-slate-400">
                        {currency.name}
                      </div>
                    </div>
                  </div>

                  {/* Change Indicator */}
                  <div className={`flex items-center gap-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                    {isPositive ? (
                      <TrendingUp className="w-3.5 h-3.5" />
                    ) : (
                      <TrendingDown className="w-3.5 h-3.5" />
                    )}
                    <span className="text-xs font-semibold">
                      {Math.abs(currency.changePercent24h).toFixed(2)}%
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="text-white font-bold text-lg">
                  ${currency.currentPrice.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="p-4 border-t border-slate-700/50 bg-slate-900/50">
        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="bg-green-500/10 rounded-lg p-3">
            <div className="text-xs text-green-400 mb-1">Alta</div>
            <div className="text-lg font-bold text-green-400">
              {currencies.filter(c => c.changePercent24h > 0).length}
            </div>
          </div>
          <div className="bg-red-500/10 rounded-lg p-3">
            <div className="text-xs text-red-400 mb-1">Baixa</div>
            <div className="text-lg font-bold text-red-400">
              {currencies.filter(c => c.changePercent24h < 0).length}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
