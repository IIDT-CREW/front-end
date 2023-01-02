import React from 'react'
import { Box } from 'components/Common'
import styled from 'styled-components'
import { Will } from '@api/will/types'

import Header from './Header'
import Body from './Body'
import Footer from './Footer'

const St = {
  CardWrapper: styled(Box)`
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.15), 0px 2px 6px rgba(0, 0, 0, 0.13);
  `,
}

type WillCardProps = {
  will?: Will
  handleDelete?: () => void
  handleShare?: () => void
  isPrivate?: boolean
}

const WillCard = ({ will, handleDelete, handleShare, isPrivate = true }: WillCardProps) => {
  return (
    <St.CardWrapper
      mr="24px"
      ml="24px"
      mb="40px"
      padding="20px"
      minWidth="362px"
      maxWidth="582px"
      borderRadius="4px"
      maxHeight="500px"
    >
      <Header will={will} handleDelete={handleDelete} handleShare={handleShare} isPrivate={isPrivate} />
      <Body will={will} />
      <Footer will={will} />
    </St.CardWrapper>
  )
}

export default React.memo(WillCard)
