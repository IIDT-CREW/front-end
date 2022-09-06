import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Box, Text, Flex } from 'components/Common'
import { getColor } from 'components/Common/Text/Text'
import styled from 'styled-components'
import { usePopper } from 'react-popper'
import Ellipsis from 'components/Common/Svg/Icons/Ellipsis'
import Export from 'components/Common/Svg/Icons/Export'
import Trash from 'components/Common/Svg/Icons/Trash'
import Edit from 'components/Common/Svg/Icons/Edit'
import { useModal } from 'components/Common'
import moment from 'moment'
import WriteDeleteModal from './modal/WriteDeleteModal'
import ShareModal from './modal/ShareModal'
import { useIsLogin, useUserInfo } from 'store/auth/hooks'

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
  CardWrapper: styled(Box)`
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.15), 0px 2px 6px rgba(0, 0, 0, 0.13);
  `,
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

type WriteCardProps = {
  will?: {
    CONTENT: string
    EDIT_DATE: string
    IS_DELETE: string
    IS_PRIVATE: number
    MEM_IDX: number
    REG_DATE: string
    THUMBNAIL: string
    TITLE: string
    WILL_ID: string
  }
  handleDelete?: () => void
  handlShare?: () => void
}

const WriteCard = ({ will, handleDelete, handlShare }: WriteCardProps) => {
  const { CONTENT: content, EDIT_DATE: editDate, MEM_IDX, REG_DATE: regDate, THUMBNAIL, TITLE, WILL_ID } = will
  const router = useRouter()
  const isLogin = useIsLogin()
  const [presentDeleteModal] = useModal(<WriteDeleteModal handleDelete={handleDelete} />)
  const [presentShareModal] = useModal(<ShareModal handlShare={handlShare} content={content} willId={WILL_ID} />)

  const [targetRef, setTargetRef] = useState<HTMLDivElement | null>(null)
  const [tooltipRef, setTooltipRef] = useState<HTMLDivElement | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const { styles, attributes } = usePopper(targetRef, tooltipRef, {
    strategy: 'fixed',
    placement: 'bottom-start',
    modifiers: [{ name: 'offset', options: { offset: [0, 0] } }],
  })

  const handleIsOpen = () => {
    setIsOpen((prev) => !prev)
  }

  const handleEdit = () => {
    router.push(`/write?will_id=${WILL_ID}`)
  }

  return (
    <St.CardWrapper mr="24px" ml="24px" mb="40px" padding="20px" minWidth="362px" maxWidth="582px" borderRadius="4px">
      <Box mb="20px">
        <Flex justifyContent="space-between" alignItems="center">
          <Text>{moment(regDate).format('YYYY.MM.DD')}</Text>
          {isLogin && (
            <Text style={{ cursor: 'pointer' }} onClick={handleIsOpen} ref={setTargetRef}>
              <Ellipsis />
              <St.MenuWrapper ref={setTooltipRef} style={styles.popper} {...attributes.popper} isOpen={isOpen}>
                <MenuItem
                  presentDeleteModal={presentDeleteModal}
                  presentShareModal={presentShareModal}
                  handleEdit={handleEdit}
                />
              </St.MenuWrapper>
            </Text>
          )}
        </Flex>
      </Box>

      <Box>
        <Text fontWeight="600" mb="8px">
          {TITLE ? TITLE : '22년 9월 1일에 쓰는 마지막 일기'}
        </Text>
        <St.Contents>{content}</St.Contents>
      </Box>
    </St.CardWrapper>
  )
}

export default WriteCard
