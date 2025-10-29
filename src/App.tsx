import Dashboard from './components/Dashboard'
import { useCurrencyData } from './hooks/useCurrencyData'

function App() {
  const { currencies, isConnected, fiatCurrency, changeFiatCurrency, reorderCurrencies, reconnect } = useCurrencyData()

  return (
    <Dashboard
      currencies={currencies}
      isConnected={isConnected}
      onReconnect={reconnect}
      fiatCurrency={fiatCurrency}
      onChangeFiatCurrency={changeFiatCurrency}
      onReorderCurrencies={reorderCurrencies}
    />
  )
}

export default App
