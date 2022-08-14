import React, { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import styled from 'styled-components'
import useIntersectionObserver from 'hooks/useIntersectionObserver'

const St = {
  CardListWrappr: styled(motion.div)`
    display: flex;
    justify-content: space-between;
  `,
  CardContainer: styled(motion.div)`
    background: linear-gradient(293deg, #f17b32, #eed848);
    border-radius: 12px;
    width: 150px;
    height: 300px;
  `,
}

const CardItem = () => {
  return <St.CardContainer></St.CardContainer>
}
const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.3,
    },
  },
}

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
}
const Example = () => {
  const controls = useAnimation()
  const { observerRef, isIntersecting } = useIntersectionObserver()

  console.log('isIntersecting= ', isIntersecting)
  useEffect(() => {
    if (isIntersecting) {
      controls.start('visible')
    }
    //  else {
    //   controls.set('hidden')
    // }
  }, [isIntersecting])
  return (
    <St.CardListWrappr variants={container} initial="hidden" animate={controls} ref={observerRef}>
      {[0, 1, 2, 3].map((index) => (
        <St.CardContainer key={index} className="item" variants={item} />
      ))}
    </St.CardListWrappr>
  )
}

export default Example
