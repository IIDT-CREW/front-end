import { useRef, useState, useEffect, useCallback } from 'react'
const DELTA = 3
const isServer = typeof window === 'undefined'

const useScrollDown = () => {
  let lastScrollTop = 0
  const fixBox = useRef(null)
  const fixBoxHeight = useRef(0)
  const didScroll = useRef(false)

  const [isScrollDown, setIsScrollDown] = useState(false)
  const hasScrolled = useCallback(() => {
    if (isServer) {
      return
    }
    const nowScrollTop = window.scrollY

    if (Math.abs(lastScrollTop - nowScrollTop) <= DELTA) return
    if (nowScrollTop > lastScrollTop && nowScrollTop > fixBoxHeight.current) {
      setIsScrollDown(true)
    } else {
      setIsScrollDown(false)
    }
    lastScrollTop = nowScrollTop
  }, [])

  const onScroll = useCallback(() => {
    didScroll.current = true
  }, [])

  useEffect(() => {
    fixBox.current = document.querySelector('app-bar') as HTMLElement
    if (fixBox.current) {
      fixBoxHeight.current = fixBox.current.offsetHeight
    }
    window.addEventListener('scroll', onScroll)

    setInterval(() => {
      if (didScroll.current) {
        hasScrolled()
        didScroll.current = false
      }
    }, 250)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [hasScrolled, onScroll])

  return { isScrollDown, setIsScrollDown }
}

export default useScrollDown
