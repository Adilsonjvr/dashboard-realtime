import Dashboard from './components/Dashboard'
import { useCurrencyData } from './hooks/useCurrencyData'

function App() {
  const { currencies, isConnected, reconnect } = useCurrencyData()

  return <Dashboard currencies={currencies} isConnected={isConnected} onReconnect={reconnect} />
}

export default App
