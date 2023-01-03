import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Box } from 'components/Common'
import styled from 'styled-components'
import { Will } from '@api/will/types'
import { MoreOutlined, CaretUpOutlined } from '@ant-design/icons'
import Header from './Header'
import Body from './Body'
import Footer from './Footer'
import { MAX_CARD_HEIGHT } from 'config/constants/default'

const St = {
  CardWrapper: styled(Box)`
    transition: all 1s;
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.15), 0px 2px 6px rgba(0, 0, 0, 0.13);
  `,
  MoreWrapper: styled(Box)`
    background: ${({ theme }) => theme.colors.background};
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.15), 0px 2px 6px rgba(0, 0, 0, 0.13);
    border-radius: 50%;
  `,
  CloseWrapper: styled(Box)`
    background: ${({ theme }) => theme.colors.background};
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.15), 0px 2px 6px rgba(0, 0, 0, 0.13);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
}

type WillCardProps = {
  will?: Will
  handleDelete?: () => void
  handleShare?: () => void
  isPrivate?: boolean
}

const WillCard = ({ will, handleDelete, handleShare, isPrivate = true }: WillCardProps) => {
  const ref = useRef(null)
  const [isOverflow, setIsOverflow] = useState(false)
  const isOverflowContent = useRef(false)
  // console.log(ref.current.clientHeight)

  useEffect(() => {
    if (ref.current.clientHeight > MAX_CARD_HEIGHT) {
      setIsOverflow(true)
      isOverflowContent.current = true
    }
  }, [will])

  const handleIsOpen = useCallback(() => {
    setIsOverflow((prev) => !prev)
  }, [])

  return (
    <Box position="relative">
      <St.CardWrapper
        mr="24px"
        ml="24px"
        mb="40px"
        padding="20px"
        minWidth="362px"
        maxWidth="582px"
        borderRadius="4px"
        maxHeight={isOverflow ? `${MAX_CARD_HEIGHT}px` : '100vh'}
        overflow={isOverflow ? 'hidden' : ''}
      >
        <Box ref={ref}>
          <Header will={will} handleDelete={handleDelete} handleShare={handleShare} isPrivate={isPrivate} />
          <Body will={will} />
          <Footer will={will} />
        </Box>
      </St.CardWrapper>

      {isOverflowContent.current && isOverflow && (
        <St.MoreWrapper position="absolute" bottom="-15px" left="45%" onClick={handleIsOpen}>
          <MoreOutlined style={{ fontSize: '40px', cursor: 'pointer' }} />
        </St.MoreWrapper>
      )}
      {isOverflowContent.current && !isOverflow && (
        <St.CloseWrapper position="absolute" bottom="-15px" left="45%" onClick={handleIsOpen}>
          <CaretUpOutlined style={{ fontSize: '30px', cursor: 'pointer' }} />
        </St.CloseWrapper>
      )}
    </Box>
  )
}

export default React.memo(WillCard)
