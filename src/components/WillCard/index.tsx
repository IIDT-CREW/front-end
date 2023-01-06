import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Box } from 'components/Common'
import styled from 'styled-components'
import { Will } from '@api/will/types'
import { MoreOutlined, CaretUpOutlined } from '@ant-design/icons'
import Header from './WillCardHeader'
import Body from './WillCardBody'
import Footer from './WillCardFooter'
import { MAX_CARD_HEIGHT } from 'config/constants/default'

const MARGIN_BOTTOM = 40
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

  useEffect(() => {
    if (ref.current.clientHeight + MARGIN_BOTTOM > MAX_CARD_HEIGHT) {
      setIsOverflow(true)
      isOverflowContent.current = true
    }
  }, [will])

  const handleIsOpen = useCallback(() => {
    setIsOverflow((prev) => !prev)
  }, [])

  console.log(will, ref?.current?.clientHeight)
  return (
    <Box position="relative">
      <St.CardWrapper
        mr="24px"
        ml="24px"
        mb={`${MARGIN_BOTTOM}px`}
        padding="20px"
        minWidth="362px"
        maxWidth="582px"
        borderRadius="4px"
        maxHeight={isOverflow ? `${MAX_CARD_HEIGHT}px` : `${ref?.current?.clientHeight + MARGIN_BOTTOM}px`}
        overflow={isOverflow ? 'hidden' : 'auto'}
      >
        <Box ref={ref}>
          <Header will={will} handleDelete={handleDelete} handleShare={handleShare} isPrivate={isPrivate} />
          <Body will={will} />
          <Footer will={will} />
        </Box>
      </St.CardWrapper>

      {isOverflowContent?.current && isOverflow && (
        <St.MoreWrapper position="absolute" bottom="-15px" left="45%" onClick={handleIsOpen}>
          <MoreOutlined style={{ fontSize: '40px', cursor: 'pointer' }} />
        </St.MoreWrapper>
      )}
      {isOverflowContent?.current && !isOverflow && (
        <St.CloseWrapper position="absolute" bottom="-15px" left="45%" onClick={handleIsOpen}>
          <CaretUpOutlined style={{ fontSize: '30px', cursor: 'pointer' }} />
        </St.CloseWrapper>
      )}
    </Box>
  )
}

export default React.memo(WillCard)
