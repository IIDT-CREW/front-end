import { useRef, useState, useEffect } from 'react'
import moment from 'moment'
const useClock = () => {
  const timer: any = useRef(null)
  const [time, setTime] = useState('')

  useEffect(() => {
    setTime(moment().format('HH:mm:ss'))
    timer.current = setInterval(() => {
      setTime(moment().format('HH:mm:ss'))
    }, 1000)

    return () => {
      clearInterval(timer.current)
    }
  }, [])

  return { time }
}

export default useClock
