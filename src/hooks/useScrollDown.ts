import { useIsScrollDown } from '@/store/navi/hooks'
import { useRef, useState, useEffect, useCallback } from 'react'
const DELTA = 3
const isServer = typeof window === 'undefined'

const useScrollDown = () => {
  let lastScrollTop = 0
  const fixBox = useRef<HTMLElement | null>(null)
  const fixBoxHeight = useRef(0)
  const didScroll = useRef(false)
  const { isScrollDown, handleSetIsScrollDown } = useIsScrollDown()
  const hasScrolled = useCallback(() => {
    if (isServer) {
      return
    }
    const nowScrollTop = window.scrollY

    if (Math.abs(lastScrollTop - nowScrollTop) <= DELTA) return
    if (nowScrollTop > lastScrollTop && nowScrollTop > fixBoxHeight.current) {
      handleSetIsScrollDown(true)
    } else {
      handleSetIsScrollDown(false)
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

  return { isScrollDown, handleSetIsScrollDown }
}

export default useScrollDown
