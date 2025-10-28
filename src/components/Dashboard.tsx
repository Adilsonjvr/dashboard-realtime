import { Activity, Users, TrendingUp, AlertCircle, Wifi, WifiOff } from 'lucide-react'
import { DashboardProps } from '../types'
import MetricCard from './MetricCard'
import Chart from './Chart'

const Dashboard = ({ data, isConnected }: DashboardProps) => {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard Real-time</h1>
          <p className="text-slate-400 mt-1">Monitoramento de métricas ao vivo</p>
        </div>
        <div className="flex items-center gap-2">
          {isConnected ? (
            <div className="flex items-center gap-2 text-green-400">
              <Wifi className="w-5 h-5" />
              <span className="text-sm font-medium">Conectado</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-red-400">
              <WifiOff className="w-5 h-5" />
              <span className="text-sm font-medium">Desconectado</span>
            </div>
          )}
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Usuários Ativos"
          value={data.activeUsers}
          icon={<Users className="w-6 h-6" />}
          color="blue"
        />
        <MetricCard
          title="Requisições"
          value={data.requests}
          icon={<Activity className="w-6 h-6" />}
          color="green"
        />
        <MetricCard
          title="Erros"
          value={data.errors}
          icon={<AlertCircle className="w-6 h-6" />}
          color="red"
        />
        <MetricCard
          title="Latência (ms)"
          value={data.latency}
          icon={<TrendingUp className="w-6 h-6" />}
          color="purple"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart
          title="CPU Usage (%)"
          data={data.cpu}
          color="#3b82f6"
        />
        <Chart
          title="Memory Usage (GB)"
          data={data.memory}
          color="#10b981"
        />
      </div>

      <div className="grid grid-cols-1">
        <Chart
          title="Network Traffic (MB/s)"
          data={data.network}
          color="#8b5cf6"
        />
      </div>
    </div>
  )
}

export default Dashboard
