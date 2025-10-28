export interface MetricData {
  timestamp: number
  value: number
  label: string
}

export interface RealtimeData {
  cpu: MetricData[]
  memory: MetricData[]
  network: MetricData[]
  activeUsers: number
  requests: number
  errors: number
  latency: number
}

export interface DashboardProps {
  data: RealtimeData
  isConnected: boolean
}
