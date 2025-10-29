import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'

export type TimePeriod = '1h' | '24h' | '7d' | '30d' | '1y'

interface PeriodSelectorProps {
  selectedPeriod: TimePeriod
  onChangePeriod: (period: TimePeriod) => void
}

const PERIODS: { value: TimePeriod; label: string }[] = [
  { value: '1h', label: '1H' },
  { value: '24h', label: '24H' },
  { value: '7d', label: '7D' },
  { value: '30d', label: '30D' },
  { value: '1y', label: '1A' },
]

const PeriodSelector = ({ selectedPeriod, onChangePeriod }: PeriodSelectorProps) => {
  return (
    <div className="flex items-center gap-2 bg-slate-800/50 border border-slate-700 rounded-xl p-1">
      <Clock className="w-4 h-4 text-slate-400 ml-2 hidden sm:block" />
      {PERIODS.map((period) => (
        <motion.button
          key={period.value}
          onClick={() => onChangePeriod(period.value)}
          whileTap={{ scale: 0.95 }}
          className={`
            relative px-2 md:px-3 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-semibold transition-all
            ${selectedPeriod === period.value
              ? 'text-white'
              : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }
          `}
        >
          {selectedPeriod === period.value && (
            <motion.div
              layoutId="period-selector"
              className="absolute inset-0 bg-blue-600/30 border border-blue-500/50 rounded-lg"
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            />
          )}
          <span className="relative z-10">{period.label}</span>
        </motion.button>
      ))}
    </div>
  )
}

export default PeriodSelector
