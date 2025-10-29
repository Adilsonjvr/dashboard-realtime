import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { FIAT_CURRENCIES } from '../services/currencyWebSocket'

interface FiatSelectorProps {
  selectedFiat: string
  onChangeFiat: (code: string) => void
}

const FiatSelector = ({ selectedFiat, onChangeFiat }: FiatSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const selectedCurrency = FIAT_CURRENCIES.find(f => f.code === selectedFiat) || FIAT_CURRENCIES[0]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 md:gap-2 px-2 md:px-4 py-2 md:py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl hover:bg-slate-800 hover:border-slate-600 transition-all"
      >
        <span className="text-xl md:text-2xl">{selectedCurrency.flag}</span>
        <div className="text-left hidden sm:block">
          <div className="text-xs text-slate-400">Moeda</div>
          <div className="text-sm font-semibold text-white">{selectedCurrency.code}</div>
        </div>
        <div className="text-left sm:hidden">
          <div className="text-xs font-semibold text-white">{selectedCurrency.code}</div>
        </div>
        <ChevronDown className={`w-3.5 h-3.5 md:w-4 md:h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 right-0 w-56 md:w-64 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50"
          >
            <div className="p-2">
              {FIAT_CURRENCIES.map((currency) => (
                <button
                  key={currency.code}
                  onClick={() => {
                    onChangeFiat(currency.code)
                    setIsOpen(false)
                  }}
                  className={`
                    w-full flex items-center gap-2 md:gap-3 px-2 md:px-3 py-2 md:py-2.5 rounded-lg text-left transition-all
                    ${selectedFiat === currency.code
                      ? 'bg-blue-600/20 border border-blue-500/50'
                      : 'hover:bg-slate-700/50'
                    }
                  `}
                >
                  <span className="text-xl md:text-2xl">{currency.flag}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs md:text-sm font-semibold text-white">{currency.code}</div>
                    <div className="text-[10px] md:text-xs text-slate-400 truncate">{currency.name}</div>
                  </div>
                  <div className="text-base md:text-lg text-slate-300 flex-shrink-0">{currency.symbol}</div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default FiatSelector
