import { useState, useEffect } from 'react'

const useLocalStorage = (key, initialValue) => {
  const [state, setState] = useState(initialValue)

  useEffect(() => {
    try {
      const value = window.localStorage.getItem(key)
      if (value) {
        setState(JSON.parse(value))
      }
    } catch (error) {
      console.log(error)
    }
  }, [key])

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(state) : value
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
      setState(value)
    } catch (error) {
      console.log(error)
    }
  }

  return [state, setValue]
}

export default useLocalStorage
