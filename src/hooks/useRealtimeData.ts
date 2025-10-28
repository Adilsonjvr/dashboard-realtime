import { useState, useEffect, useRef } from 'react'
import { RealtimeData, MetricData } from '../types'

const MOCK_MODE = true // Set to false when WebSocket server is available

export const useRealtimeData = () => {
  const [data, setData] = useState<RealtimeData>({
    cpu: [],
    memory: [],
    network: [],
    activeUsers: 0,
    requests: 0,
    errors: 0,
    latency: 0,
  })
  const [isConnected, setIsConnected] = useState(false)
  const wsRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    if (MOCK_MODE) {
      // Mock data generator for demonstration
      setIsConnected(true)

      const interval = setInterval(() => {
        const now = Date.now()
        const newMetric = (prev: MetricData[], max: number): MetricData[] => {
          const newData = [
            ...prev.slice(-19),
            {
              timestamp: now,
              value: Math.random() * max,
              label: new Date(now).toLocaleTimeString(),
            },
          ]
          return newData
        }

        setData(prev => ({
          cpu: newMetric(prev.cpu, 100),
          memory: newMetric(prev.memory, 16),
          network: newMetric(prev.network, 1000),
          activeUsers: Math.floor(Math.random() * 500) + 100,
          requests: Math.floor(Math.random() * 10000) + 5000,
          errors: Math.floor(Math.random() * 50),
          latency: Math.floor(Math.random() * 200) + 50,
        }))
      }, 1000)

      return () => clearInterval(interval)
    } else {
      // WebSocket connection (for future real implementation)
      const ws = new WebSocket('ws://localhost:8080')
      wsRef.current = ws

      ws.onopen = () => {
        setIsConnected(true)
        console.log('WebSocket connected')
      }

      ws.onmessage = (event) => {
        const newData = JSON.parse(event.data)
        setData(newData)
      }

      ws.onerror = (error) => {
        console.error('WebSocket error:', error)
        setIsConnected(false)
      }

      ws.onclose = () => {
        setIsConnected(false)
        console.log('WebSocket disconnected')
      }

      return () => {
        ws.close()
      }
    }
  }, [])

  return { data, isConnected }
}
