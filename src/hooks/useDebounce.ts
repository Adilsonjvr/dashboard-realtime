import { useEffect, useState } from 'react'

/**
 * Hook para debounce de valores
 * @param value - Valor a ser "debouncado"
 * @param delay - Delay em milissegundos (padrão: 300ms)
 * @returns Valor debounced
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    // Atualizar valor debounced após o delay
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Cancelar timeout se value mudar (cleanup)
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
