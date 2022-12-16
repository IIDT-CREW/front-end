import React, { useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import { Box, Text, Flex } from 'components/Common'
import { getColor } from 'components/Common/Text/Text'
import styled from 'styled-components'
import { usePopper } from 'react-popper'
import Ellipsis from 'components/Common/Svg/Icons/Ellipsis'
import Export from 'components/Common/Svg/Icons/Export'
import Trash from 'components/Common/Svg/Icons/Trash'
import Edit from 'components/Common/Svg/Icons/Edit'
import Panorama from 'components/Common/Svg/Icons/Panorama'
import { useModal } from 'components/Common'
import moment from 'moment'
import WriteDeleteModal from 'views/Main/components/modal/WriteDeleteModal'
import ShareModal from 'views/Main/components/modal/ShareModal'
import { useIsLogin } from 'store/auth/hooks'
import { IS_DEFAULT_MODE } from 'config/constants/default'
import { Will } from '@api/will/types'
import { QUESTION_LIST } from '@views/Write/data'

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

  Author: styled(Text)`
    color: ${({ theme }) => theme.colors.grayscale5};
  `,
}

const MenuItem = ({ presentDeleteModal, presentShareModal, handleEdit, handlePreview }) => {
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

type WillCardProps = {
  will?: Will
  handleDelete?: () => void
  handleShare?: () => void
  isPrivate?: boolean
}

const WillCard = ({ will, handleDelete, handleShare, isPrivate = true }: WillCardProps) => {
  const {
    CONTENT: content,
    EDIT_DATE: editDate,
    MEM_NICKNAME: memNickname,
    REG_DATE: regDate,
    THUMBNAIL,
    TITLE: title,
    WILL_ID,
    CONTENT_TYPE: contentType,
    ANSWER_LIST: answerList,
  } = will
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

  const isDefaultType = contentType === IS_DEFAULT_MODE

  return (
    <St.CardWrapper mr="24px" ml="24px" mb="40px" padding="20px" minWidth="362px" maxWidth="582px" borderRadius="4px">
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

      <Box>
        <Text fontWeight="600" mb="16px" fontSize="23px">
          {title ? title : `${moment(regDate).format('YYYY년 M월 D일')}에 쓰는 하루 유서`}
        </Text>

        {isDefaultType ? (
          <St.Contents>{content}</St.Contents>
        ) : (
          <St.Contents>
            {answerList?.map((answer) => {
              return (
                <>
                  <Text bold>{QUESTION_LIST[parseInt(answer?.question_index)]?.question}</Text>
                  <Text>{answer?.question_answer}</Text>
                </>
              )
            })}
          </St.Contents>
        )}

        <Flex mt="18px" justifyContent="end">
          <St.Author>{memNickname ? memNickname : '익명'} 마침.</St.Author>
        </Flex>
      </Box>
    </St.CardWrapper>
  )
}

export default React.memo(WillCard)
