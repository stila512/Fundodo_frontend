import { useState } from 'react'

/**
 * 存取 localstorage 的 API
 * @param {string} key localstorage key
 * @param {any} initialValue key 對應的初始值
 * @returns [storedValue, setValue]
 */
export default function useLocalStorage(key, initialValue) {
  // 作為初始值的函數只會被執行一次
  /** @type {[any, React.Dispatch<any>]} */
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') return initialValue;

    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key)
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      // If error also return initialValue
      console.error('storedValue 的初始函數出錯惹')
      console.log(error)
      return initialValue
    }
  });

  /**
   * 針對 localstorage 之指定 key 來儲存新值
   * @param {any} value 欲儲存的新值
   */
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      // Save state
      setStoredValue(valueToStore)
      // Save to local storage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error)
    }
  }
  return [storedValue, setValue]
}