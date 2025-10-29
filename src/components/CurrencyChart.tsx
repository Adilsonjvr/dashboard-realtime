import { useEffect, useRef } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ChartOptions
} from 'chart.js'
import zoomPlugin from 'chartjs-plugin-zoom'
import { Line } from 'react-chartjs-2'
import { CurrencyData } from '../types'
import { format } from 'date-fns'

// Registrar componentes do Chart.js incluindo zoom
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  zoomPlugin
)

interface CurrencyChartProps {
  currency: CurrencyData
}

const CurrencyChart = ({ currency }: CurrencyChartProps) => {
  const chartRef = useRef<ChartJS<'line'>>(null)

  const data = {
    labels: currency.priceHistory.map(p => format(p.timestamp, 'HH:mm:ss')),
    datasets: [
      {
        label: `${currency.name} (USD)`,
        data: currency.priceHistory.map(p => p.price),
        borderColor: currency.changePercent24h >= 0 ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)',
        backgroundColor: currency.changePercent24h >= 0
          ? 'rgba(34, 197, 94, 0.1)'
          : 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: currency.changePercent24h >= 0 ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)',
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2,
      }
    ]
  }

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: currency.changePercent24h >= 0 ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)',
        borderWidth: 2,
        padding: 16,
        displayColors: false,
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 13
        },
        bodySpacing: 6,
        callbacks: {
          title: (context) => {
            const index = context[0].dataIndex
            const timestamp = currency.priceHistory[index]?.timestamp
            if (!timestamp) return ''
            return format(timestamp, 'dd/MM/yyyy HH:mm:ss')
          },
          label: (context) => {
            const value = context.parsed.y
            if (value === null) return ''
            return `Preço: $${value.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}`
          },
          afterLabel: () => {
            return [
              `Máx 24h: $${currency.high24h.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
              `Mín 24h: $${currency.low24h.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
              `Volume 24h: $${(currency.volume24h * currency.currentPrice).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
            ]
          }
        }
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'x',
          modifierKey: 'ctrl',
        },
        zoom: {
          wheel: {
            enabled: true,
            modifierKey: 'ctrl',
          },
          pinch: {
            enabled: true
          },
          mode: 'x',
        }
      }
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
        ticks: {
          color: '#94a3b8',
          maxTicksLimit: 6,
        }
      },
      y: {
        display: true,
        position: 'right',
        grid: {
          color: 'rgba(148, 163, 184, 0.1)',
        },
        ticks: {
          color: '#94a3b8',
          callback: (value) => {
            return '$' + Number(value).toLocaleString('en-US', {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            })
          }
        }
      }
    },
    animation: {
      duration: 750,
    }
  }

  useEffect(() => {
    // Atualizar gráfico quando dados mudarem
    if (chartRef.current) {
      chartRef.current.update('none')
    }
  }, [currency.priceHistory])

  return (
    <div className="w-full h-full">
      <Line ref={chartRef} data={data} options={options} />
    </div>
  )
}

export default CurrencyChart
