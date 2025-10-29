import { motion } from 'framer-motion'
import { Search, TrendingUp, TrendingDown, GripVertical } from 'lucide-react'
import { CurrencyData } from '../types'
import { useState } from 'react'
import CryptoIcon from './CryptoIcon'
import { useDebounce } from '../hooks/useDebounce'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface SidebarProps {
  currencies: CurrencyData[]
  selectedSymbol: string | null
  onSelectCurrency: (symbol: string) => void
  onReorderCurrencies: (currencies: CurrencyData[]) => void
}

// Componente para item arrastável
interface SortableCurrencyItemProps {
  currency: CurrencyData
  isSelected: boolean
  onSelect: () => void
}

const SortableCurrencyItem = ({ currency, isSelected, onSelect }: SortableCurrencyItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: currency.symbol })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const isPositive = currency.changePercent24h >= 0

  return (
    <div ref={setNodeRef} style={style}>
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onSelect}
        className={`
          w-full p-3 md:p-4 rounded-xl text-left transition-all duration-200 relative
          ${isSelected
            ? 'bg-gradient-to-r from-blue-600/20 to-blue-500/10 border-2 border-blue-500/50 shadow-lg shadow-blue-500/10'
            : 'bg-slate-800/30 border border-slate-700/50 hover:bg-slate-800/50 hover:border-slate-600'
          }
          ${isDragging ? 'cursor-grabbing' : 'cursor-pointer'}
        `}
      >
        {/* Drag Handle - sempre visível em mobile */}
        <div
          {...attributes}
          {...listeners}
          className="absolute left-0.5 md:left-1 top-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing opacity-30 md:opacity-0 md:group-hover:opacity-100 hover:opacity-100 transition-opacity touch-none"
        >
          <GripVertical className="w-3.5 h-3.5 md:w-4 md:h-4 text-slate-500 hover:text-slate-300" />
        </div>

        <div className="flex items-center justify-between mb-1.5 md:mb-2 pl-5 md:pl-6">
          <div className="flex items-center gap-2 md:gap-3">
            {/* Icon SVG de alta qualidade */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.3 }}
            >
              <CryptoIcon symbol={currency.symbol} size={32} animate={false} className="md:w-10 md:h-10" />
            </motion.div>

            {/* Name & Symbol */}
            <div>
              <div className="font-semibold text-white text-xs md:text-sm">
                {currency.symbol}
              </div>
              <div className="text-[10px] md:text-xs text-slate-400">
                {currency.name}
              </div>
            </div>
          </div>

          {/* Change Indicator */}
          <div className={`flex items-center gap-0.5 md:gap-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? (
              <TrendingUp className="w-3 h-3 md:w-3.5 md:h-3.5" />
            ) : (
              <TrendingDown className="w-3 h-3 md:w-3.5 md:h-3.5" />
            )}
            <span className="text-[10px] md:text-xs font-semibold">
              {Math.abs(currency.changePercent24h).toFixed(2)}%
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="text-white font-bold text-base md:text-lg pl-5 md:pl-6">
          ${currency.currentPrice.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}
        </div>
      </motion.button>
    </div>
  )
}

const Sidebar = ({ currencies, selectedSymbol, onSelectCurrency, onReorderCurrencies }: SidebarProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  const filteredCurrencies = currencies.filter(c =>
    c.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
    c.symbol.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  )

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = currencies.findIndex((c) => c.symbol === active.id)
      const newIndex = currencies.findIndex((c) => c.symbol === over.id)

      const reordered = arrayMove(currencies, oldIndex, newIndex)
      onReorderCurrencies(reordered)
    }
  }

  return (
    <div className="w-80 max-w-[85vw] bg-gradient-to-b from-slate-900 to-slate-800 border-r border-slate-700/50 flex flex-col h-screen sticky top-0">
      {/* Header */}
      <div className="p-4 md:p-6 border-b border-slate-700/50">
        <h2 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4">Criptomoedas</h2>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar moeda..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 md:py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-sm md:text-base text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Currency List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={filteredCurrencies.map(c => c.symbol)}
            strategy={verticalListSortingStrategy}
          >
            <div className="p-3 space-y-2 group">
              {filteredCurrencies.map((currency) => (
                <SortableCurrencyItem
                  key={currency.symbol}
                  currency={currency}
                  isSelected={selectedSymbol === currency.symbol}
                  onSelect={() => onSelectCurrency(currency.symbol)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      {/* Stats Summary */}
      <div className="p-3 md:p-4 border-t border-slate-700/50 bg-slate-900/50">
        <div className="grid grid-cols-2 gap-2 md:gap-3 text-center">
          <div className="bg-green-500/10 rounded-lg p-2 md:p-3">
            <div className="text-[10px] md:text-xs text-green-400 mb-1">Alta</div>
            <div className="text-base md:text-lg font-bold text-green-400">
              {currencies.filter(c => c.changePercent24h > 0).length}
            </div>
          </div>
          <div className="bg-red-500/10 rounded-lg p-2 md:p-3">
            <div className="text-[10px] md:text-xs text-red-400 mb-1">Baixa</div>
            <div className="text-base md:text-lg font-bold text-red-400">
              {currencies.filter(c => c.changePercent24h < 0).length}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
