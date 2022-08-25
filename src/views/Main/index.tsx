import { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { Box, Flex } from 'components/Common'
import BannerCard from './components/BannerCard'
import styled from 'styled-components'
import MainInfo from './components/MainInfo'
import { MainButton } from '../Home'
import { useModal } from 'components/Common'
import WriteWarningInfoModal from './components/modal/WriteWarningInfoModal'
import WriteCard from './components/WriteCard'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { deleteWill, getMyWill } from 'api/will'
import { toastContext } from 'contexts/Toast'

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
  const queryClient = useQueryClient()
  const { onToast } = useContext(toastContext)
  const [presentWarningModal] = useModal(<WriteWarningInfoModal />)

  useEffect(() => {
    presentWarningModal()
  }, [])

  const router = useRouter()
  const handleWrite = () => {
    router.push('write')
  }
  const handleToast = ({ message = '' }) => {
    onToast({
      type: 'success',
      message,
      option: {
        position: 'top-center',
      },
    })
  }

  const { data, isLoading } = useQuery('myWill', () =>
    getMyWill({
      mem_userid: '2342340674',
      mem_email: '',
    }),
  )

  const deleteMutation = useMutation(deleteWill, {
    onSuccess: () => {
      handleToast({ message: '데이터를 삭제했습니다.' })
      // myWill로 시작하는 모든 쿼리를 무효화한다
      queryClient.invalidateQueries('myWill')
    },
  })

  return (
    <St.Container mt="78px">
      <Box mb="36px">
        <BannerCard />
      </Box>
      <Flex flexDirection="column" justifyContent="center" alignItems="center">
        <Flex flexDirection="column" justifyContent="center" alignItems="center">
          <MainInfo />
          <Box mb="55px">
            <MainButton onClick={handleWrite}> 작성하러가기</MainButton>
          </Box>
          {data?.result?.map((myWill) => {
            return (
              <WriteCard
                will={myWill}
                handleDelete={() => deleteMutation.mutate({ will_id: myWill.WILL_ID as string })}
              />
            )
          })}

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
    </St.Container>
  )
}

export default Main
