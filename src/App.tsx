import { useState, useEffect } from 'react'
import Dashboard from './components/Dashboard'
import { useRealtimeData } from './hooks/useRealtimeData'

function App() {
  const { data, isConnected } = useRealtimeData()

  return (
    <div className="min-h-screen bg-slate-900">
      <Dashboard data={data} isConnected={isConnected} />
    </div>
  )
}

export default App
