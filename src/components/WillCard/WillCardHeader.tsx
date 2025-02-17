import React, { useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import { Box, Text, Flex, useModal } from '@/components/Common'
import styled from 'styled-components'
import { usePopper } from 'react-popper'
import Ellipsis from '@/components/Common/Svg/Icons/Ellipsis'
import Export from '@/components/Common/Svg/Icons/Export'
import Trash from '@/components/Common/Svg/Icons/Trash'
import Edit from '@/components/Common/Svg/Icons/Edit'
import Panorama from '@/components/Common/Svg/Icons/Panorama'
import moment from 'moment'
import WriteDeleteModal from '@/views/Main/components/modal/WriteDeleteModal'
import ShareModal from '@/views/Main/components/modal/ShareModal'
import { useIsLogin } from '@/store/auth/hooks'
import { Will } from '@/api/will/types'

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
    color: ${({ theme }) => theme.colors.text};
  `,
  MenuWrapper: styled<any>(Box)`
    width: 200px;
    background: ${({ theme }) => theme.colors.background};
    box-shadow:
      0px 0px 1px rgba(0, 0, 0, 0.08),
      0px 16px 30px 4px rgba(0, 0, 0, 0.1);
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
    box-shadow:
      0px 0px 1px rgba(0, 0, 0, 0.15),
      0px 2px 6px rgba(0, 0, 0, 0.13);
  `,

  Author: styled(Text)`
    color: ${({ theme }) => theme.colors.grayscale5};
  `,
}

const MenuItem = ({
  presentDeleteModal,
  presentShareModal,
  handleEdit,
  handlePreview,
}: {
  presentDeleteModal: () => void
  presentShareModal: () => void
  handleEdit: () => void
  handlePreview: () => void
}) => {
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
      <Flex padding="8px" style={{ gap: '8px' }} onClick={handlePreview}>
        <Panorama />
        <Text>미리보기</Text>
      </Flex>
      <Flex padding="8px" style={{ gap: '8px' }} onClick={presentDeleteModal}>
        <Trash />
        <Text color="#F3213B">삭제하기</Text>
      </Flex>
    </Box>
  )
}
type HeaderProps = {
  will?: Will
  handleDelete?: () => void
  handleShare?: () => void
  isPrivate?: boolean
}

const Header = ({ will, handleDelete, handleShare, isPrivate = true }: HeaderProps) => {
  const { CONTENT: content, REG_DATE: regDate, TITLE: title, WILL_ID } = will
  const router = useRouter()
  const isLogin = useIsLogin()
  const [presentDeleteModal] = useModal(<WriteDeleteModal handleDelete={handleDelete} />)
  const [presentShareModal] = useModal(
    <ShareModal handleShare={handleShare} content={content} willId={WILL_ID} title={title} />,
  )

  const [targetRef, setTargetRef] = useState<HTMLDivElement | null>(null)
  const [tooltipRef, setTooltipRef] = useState<HTMLDivElement | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const { styles, attributes } = usePopper(targetRef, tooltipRef, {
    strategy: 'fixed',
    placement: 'bottom-start',
    modifiers: [{ name: 'offset', options: { offset: [0, 0] } }],
  })

  const handleIsOpen = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const handleEdit = useCallback(() => {
    router.push(`/write?will_id=${WILL_ID}`)
  }, [WILL_ID, router])

  const handlePreview = useCallback(() => {
    router.push(`/will/${WILL_ID}`)
  }, [WILL_ID, router])

  return (
    <Box mb="20px">
      <Flex justifyContent="space-between" alignItems="center">
        <Text>{moment(regDate).format('YYYY.MM.DD')}</Text>
        {isLogin && (
          <Text style={{ cursor: 'pointer' }} onClick={handleIsOpen} ref={setTargetRef}>
            {isPrivate && (
              <>
                <Ellipsis />
                {isOpen && (
                  <St.MenuWrapper ref={setTooltipRef} style={styles.popper} {...attributes.popper} isOpen={isOpen}>
                    <MenuItem
                      presentDeleteModal={presentDeleteModal}
                      presentShareModal={presentShareModal}
                      handleEdit={handleEdit}
                      handlePreview={handlePreview}
                    />
                  </St.MenuWrapper>
                )}
              </>
            )}
          </Text>
        )}
      </Flex>
    </Box>
  )
}
export default Header
