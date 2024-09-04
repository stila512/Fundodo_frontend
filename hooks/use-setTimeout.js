// https://www.joshwcomeau.com/snippets/react-hooks/use-timeout/

import { useEffect, useRef } from 'react'

/**
 * 在指定時間過後執行指定之函數
 * @param {function} callback 欲執行之函數
 * @param {number} delay 等待之時間 (ms)
 */
export default function useTimeout(callback, delay) {
  const timeoutRef = useRef(null)
  const savedCallback = useRef(callback)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    const tick = () => savedCallback.current()
    if (typeof delay === 'number') {
      timeoutRef.current = window.setTimeout(tick, delay)
      return () => window.clearTimeout(timeoutRef.current)
    }
  }, [delay])

  return timeoutRef
}