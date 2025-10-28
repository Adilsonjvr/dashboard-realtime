import Dashboard from './components/Dashboard'
import { useCurrencyData } from './hooks/useCurrencyData'

function App() {
  const { currencies, isConnected, fiatCurrency, changeFiatCurrency, reconnect } = useCurrencyData()

  return (
    <Dashboard
      currencies={currencies}
      isConnected={isConnected}
      onReconnect={reconnect}
      fiatCurrency={fiatCurrency}
      onChangeFiatCurrency={changeFiatCurrency}
    />
  )
}

export default App
