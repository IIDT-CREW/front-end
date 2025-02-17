import React from 'react'
import styled from 'styled-components'
import { Will } from '@/api/will/types'
import { Text, Flex } from '@/components/Common'

const St = {
  Author: styled(Text)`
    color: ${({ theme }) => theme.colors.grayscale5};
  `,
}

type WillCardProps = {
  will?: Will
}

const Footer = ({ will }: WillCardProps) => {
  const { MEM_NICKNAME: memNickname } = will

  return (
    <Flex mt="18px" justifyContent="end">
      <St.Author>{memNickname ? memNickname : '익명'} 마침.</St.Author>
    </Flex>
  )
}

export default React.memo(Footer)
