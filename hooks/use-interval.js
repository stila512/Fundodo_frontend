import { useEffect, useRef } from 'react'

/**
 * 指定週期重複執行指定之函數
 * @param {function} callback 欲定期執行之函數
 * @param {number} delay 執行之週期 (ms)
 */
export const useInterval = (callback, delay) => {
  const savedCallback = useRef()

  useEffect(() => {
    savedCallback.current = callback
  });

  useEffect(() => {
    function tick() {
      savedCallback.current()
    }

    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay]);
}