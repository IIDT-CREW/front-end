import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Box, Text, Flex } from 'components/Common'
import BannerCard from './components/BannerCard'
import styled from 'styled-components'
import { MainButton } from '../Home'
import { usePopper } from 'react-popper'
import Ellipsis from 'components/Common/Svg/Icons/Ellipsis'
import Export from 'components/Common/Svg/Icons/Export'
import Trash from 'components/Common/Svg/Icons/Trash'
import { useModal } from 'components/Common'
import WriteWarningInfoModal from './components/modal/WriteWarningInfoModal'
import WriteDeleteModal from './components/modal/WriteDeleteModal'

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

const MenuItem = ({ presentDeleteModal }) => {
  return (
    <Box>
      {/* <Flex padding="8px" style={{ gap: '8px' }}>
        <Export />
        <Text>수정하기</Text>
      </Flex> */}
      <Flex padding="8px" style={{ gap: '8px' }}>
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
const WriteCard = () => {
  const [presentWarningModal] = useModal(<WriteWarningInfoModal />)
  const [presentDeleteModal] = useModal(<WriteDeleteModal />)

  useEffect(() => {
    presentWarningModal()
  }, [])

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

  return (
    <Box mb="40px" padding="20px" width="582px" border="1px solid black" borderRadius="4px">
      <Box padding="10px">
        <Flex justifyContent="space-between" alignItems="center">
          <Text>2022.08.29</Text>
          <Text style={{ cursor: 'pointer' }} onClick={handleIsOpen} ref={setTargetRef}>
            <Ellipsis />
            <St.MenuWrapper ref={setTooltipRef} style={styles.popper} {...attributes.popper} isOpen={isOpen}>
              <MenuItem presentDeleteModal={presentDeleteModal} />
            </St.MenuWrapper>
          </Text>
        </Flex>
      </Box>

      <Box>
        <Text>
          글쓰는중글쓰는중글쓰는중글쓰는중글쓰는중글쓰는중글쓰는중
          글쓰는중글쓰는중글쓰는중글쓰는중글쓰는중글쓰는중글쓰는중글쓰는 중글쓰는중글쓰는중글쓰는중글쓰는중글쓰는중
          글쓰는중글쓰는중글쓰는중글쓰는중글쓰는중글쓰는중글쓰는중
          글쓰는중글쓰는중글쓰는중글쓰는중글쓰는중글쓰는중글쓰는중글쓰는 중글쓰는중글쓰는중글쓰는중글쓰는중글쓰는중
          글쓰는중글쓰는중글쓰는중글쓰는중글쓰는중글쓰는중글쓰는중
          글쓰는중글쓰는중글쓰는중글쓰는중글쓰는중글쓰는중글쓰는중글쓰는 중글쓰는중글쓰는중글쓰는중글쓰는중글쓰는중
          글쓰는중글쓰는중글쓰는중글쓰는중글쓰는중글쓰는중글쓰는중
          글쓰는중글쓰는중글쓰는중글쓰는중글쓰는중글쓰는중글쓰는중글쓰는 중글쓰는중글쓰는중글쓰는중글쓰는중글쓰는중
        </Text>
      </Box>
    </Box>
  )
}
const Main = () => {
  const [willCount, setWillCount] = useState(1)

  const router = useRouter()
  const handleWrite = () => {
    router.push('write')
  }
  return (
    <St.Container mt="78px">
      <Box mb="36px">
        <BannerCard />
      </Box>
      <Flex flexDirection="column" justifyContent="center" alignItems="center">
        <Flex flexDirection="column" justifyContent="center" alignItems="center">
          <Text fontSize="18px" bold mb="24px">
            지금까지 작성된 마지막 일기
          </Text>
          <Text fontSize="26px" bold mb="24px">
            {willCount}개
          </Text>
          <Text fontSize="18px" bold mb="24px">
            당신의 마지막 일기를 작성해주세요.
          </Text>
          <Box mb="55px">
            <MainButton onClick={handleWrite}> 작성하러가기</MainButton>
          </Box>
          <WriteCard />
        </Flex>
      </Flex>

      {/* <St.Main>
        <Flex height="100%" flexDirection="column" justifyContent="center" alignItems="center">
          <Flex flexDirection="column" justifyContent="center" alignItems="center">
            <Text fontSize="18px" bold mb="24px">
              지금까지 작성된 마지막 일기
            </Text>
            <Text fontSize="26px" bold mb="24px">
              {willCount}개
            </Text>
            <Text fontSize="18px" bold mb="24px">
              당신의 마지막 일기를 작성해주세요.
            </Text>
            <Box mb="55px">
              <MainButton> 작성하러가기</MainButton>
            </Box>
          </Flex>
        </Flex>
      </St.Main> */}
    </St.Container>
  )
}

export default Main
