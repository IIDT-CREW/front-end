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
import moment from 'moment'
import WriteWarningInfoModal from './components/modal/WriteWarningInfoModal'
import WriteDeleteModal from './components/modal/WriteDeleteModal'
import WriteCard from './components/WriteCard'
import will from './dummy.json'
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

const Main = () => {
  const [presentWarningModal] = useModal(<WriteWarningInfoModal />)
  useEffect(() => {
    presentWarningModal()
  }, [])

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
          <WriteCard
            will={{
              CONTENT:
                '그들은 인간의 눈이 피어나기 석가는 타오르고 이는 거친 있으랴? 얼음 생의 싸인 우리의 생명을 역사를 물방아 황금시대다. 능히 두기 인간은 뿐이다. 용감하고 봄바람을 꽃 뼈 설산에서 이것은 인생의 소담스러운 운다. 원질이 그들의 가치를 청춘이 위하여, 있다. 무엇이 들어 따뜻한 끓는다 가슴에 대고, 장식하는 보는 우리의 불러 싹이 뿐이다. 공자는 뜨거운지라, 설레는 있는 과실이 용기가 있다. 위하여서, 품었기 가는 노년에게서 간에 대중을 끓는다. 새가 천지는 같이, 곧 같이, 위하여 아니한 천고에 것이다. 노래하며 것은 새 같으며, 뼈 산야에 인간에 피어나기 피다. 청춘 청춘의 힘차게 부패뿐이다. 무엇을 없는 그들은 작고 돋고, 노래하며 듣는다. 아름답고 되는 온갖 몸이 맺어, 쓸쓸하랴? 인생을 소리다.이것은 그러므로 기쁘며, 돋고, 유소년에게서 소담스러운 얼음과 힘있다. 들어 방지하는 만물은 온갖 가지에 것이다. 그것을 같은 청춘의 이상의 용기가 사막이다. 천고에 힘차게 그것을 못할 풍부하게 구할 남는 기관과 위하여 것이다. 더운지라 우리는 내는 평화스러운 하였으며, 것이 반짝이는 이상의 옷을 있으랴? 아니한 봄날의 못할 생의 것이다.',
              EDIT_DATE: '2022-08-22',
              IS_DELETE: 'string',
              IS_PRIVATE: 0,
              MEM_IDX: 0,
              REG_DATE: '2022-08-22',
              THUMBNAIL: 'string',
              TITLE: 'string',
              WILL_ID: 'string',
            }}
          />
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
