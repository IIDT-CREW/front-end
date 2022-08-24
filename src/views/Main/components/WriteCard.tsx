import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Box, Text, Flex } from 'components/Common'
import styled from 'styled-components'
import { usePopper } from 'react-popper'
import Ellipsis from 'components/Common/Svg/Icons/Ellipsis'
import Export from 'components/Common/Svg/Icons/Export'
import Trash from 'components/Common/Svg/Icons/Trash'
import { useModal } from 'components/Common'
import moment from 'moment'
import WriteDeleteModal from './modal/WriteDeleteModal'

const St = {
  Container: styled(Box)`
    min-height: calc(100% - 231px);
  `,
  Main: styled(Box)`
    height: calc(100% - 231px);
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
}

const MenuItem = ({ presentDeleteModal, handleShare }) => {
  return (
    <Box>
      {/* <Flex padding="8px" style={{ gap: '8px' }}>
          <Export />
          <Text>수정하기</Text>
        </Flex> */}
      <Flex padding="8px" style={{ gap: '8px' }} onClick={handleShare}>
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
}

const WriteCard = ({ will, handleDelete }: WriteCardProps) => {
  const router = useRouter()
  const { CONTENT: content, EDIT_DATE: editDate, MEM_IDX, REG_DATE: regDate, THUMBNAIL, TITLE, WILL_ID } = will

  const [presentDeleteModal] = useModal(<WriteDeleteModal handleDelete={handleDelete} />)
  const [targetRef, setTargetRef] = useState<HTMLDivElement | null>(null)
  const [tooltipRef, setTooltipRef] = useState<HTMLDivElement | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const { styles, attributes } = usePopper(targetRef, tooltipRef, {
    strategy: 'fixed',
    placement: 'bottom-start',
    modifiers: [{ name: 'offset', options: { offset: [0, 0] } }],
  })

  function kakaoShareFix() {
    // 기존 카카오 클린업
    // Kakao.Link.cleanup()
    Kakao.cleanup()
    // 새로운 키를 이용하여 init

    Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT)
  }

  useEffect(() => {
    // init 체크
    if (!Kakao.isInitialized()) {
      kakaoShareFix()
    }
  }, [router.query.id])

  const handleIsOpen = () => {
    setIsOpen((prev) => !prev)
  }
  const handleKakao = () => {
    // 공유 정보 가져오기
    // const shareContent = {
    //   title: document.querySelector('[property="og:title"]').attributes.content.value,
    //   desc: document.querySelector('[property="og:description"]').attributes.content.value,
    //   image: document.querySelector('[property="og:image"]').attributes.content.value,
    //   url: router.asPath,
    // }
    // // 카카오 공유
    // const kakaoShareFunc = function () {
    //   Kakao.Link.sendDefault({
    //     objectType: 'feed',
    //     content: {
    //       title: shareContent.title,
    //       description: shareContent.desc,
    //       imageUrl: shareContent.image,
    //       imageWidth: 1200,
    //       imageHeight: 630,
    //       link: {
    //         webUrl: shareContent.url,
    //       },
    //     },
    //     buttons: [
    //       {
    //         title: '읽으러 가기',
    //         link: {
    //           webUrl: 'http://localhost:3001',
    //         },
    //       },
    //     ],
    //   })
    // }
    // kakaoShareFunc()
  }

  return (
    <Box mb="40px" padding="20px" width="582px" border="1px solid black" borderRadius="4px">
      <Box padding="10px">
        <Flex justifyContent="space-between" alignItems="center">
          <Text>{moment(regDate).format('YYYY.MM.DD')}</Text>
          <Text style={{ cursor: 'pointer' }} onClick={handleIsOpen} ref={setTargetRef}>
            <Ellipsis />
            <St.MenuWrapper ref={setTooltipRef} style={styles.popper} {...attributes.popper} isOpen={isOpen}>
              <MenuItem presentDeleteModal={presentDeleteModal} handleShare={handleKakao} />
            </St.MenuWrapper>
          </Text>
        </Flex>
      </Box>

      <Box>
        <Text>{content}</Text>
      </Box>
    </Box>
  )
}

export default WriteCard
