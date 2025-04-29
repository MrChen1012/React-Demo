import { useState } from 'react'

export default function useControlledState(value, onChange, defaultValue) {
  const [internalValue, setInternalValue] = useState(defaultValue)

  const isControlled = value !== undefined
  const finalValue = isControlled ? value : internalValue

  const setValue = newValue => {
    if (isControlled) {
      onChange?.(newValue)
    } else {
      setInternalValue(newValue)
    }
  }

  return [finalValue, setValue]
}
