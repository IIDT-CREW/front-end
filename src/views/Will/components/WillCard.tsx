import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Box, Text, Flex } from 'components/Common'
import { getColor } from 'components/Common/Text/Text'
import styled from 'styled-components'
import { usePopper } from 'react-popper'
import Export from 'components/Common/Svg/Icons/Export'
import Trash from 'components/Common/Svg/Icons/Trash'
import Edit from 'components/Common/Svg/Icons/Edit'
import { useModal } from 'components/Common'
import moment from 'moment'
import { useIsLogin, useUserInfo } from 'store/auth/hooks'
import { Will } from 'api/types'

const St = {
  Container: styled(Box)`
    min-height: calc(100% - 231px);
  `,
  Main: styled(Box)`
    height: calc(100% - 231px);
  `,
  Contents: styled.pre`
    white-space: break-spaces;
    font-weight: 400;
    line-height: 1.5;
    font-size: 18px;
    color: ${getColor};
  `,
  MenuWrapper: styled<any>(Box)`
    width: 200px;
    background: ${({ theme }) => theme.colors.background};
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.08), 0px 16px 30px 4px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    padding: 18px;
    ${({ isOpen }) =>
      !isOpen &&
      `
      pointer-events: none;
      visibility: hidden;
    `};
  `,
  CardWrapper: styled(Box)``,
}

const MenuItem = ({ presentDeleteModal, presentShareModal, handleEdit }) => {
  return (
    <Box>
      <Flex padding="8px" style={{ gap: '8px' }} onClick={handleEdit}>
        <Edit />
        <Text>수정하기</Text>
      </Flex>
      <Flex padding="8px" style={{ gap: '8px' }} onClick={presentShareModal}>
        <Export />
        <Text>공유하기</Text>
      </Flex>
      <Flex padding="8px" style={{ gap: '8px' }} onClick={presentDeleteModal}>
        <Trash />
        <Text>삭제하기</Text>
      </Flex>
    </Box>
  )
}

type WillCardProps = {
  will?: Will
}

const WillCard = ({ will }: WillCardProps) => {
  const { CONTENT: content, EDIT_DATE: editDate, MEM_IDX, REG_DATE: regDate, THUMBNAIL, TITLE: title, WILL_ID } = will
  return (
    <St.CardWrapper mr="24px" ml="24px" mb="40px" padding="20px" minWidth="362px" maxWidth="582px" borderRadius="4px">
      <Box>
        <St.Contents>{content}</St.Contents>
      </Box>
    </St.CardWrapper>
  )
}

export default WillCard
