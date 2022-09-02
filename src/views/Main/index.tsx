import { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { Box, Flex } from 'components/Common'
import BannerCard from './components/BannerCard'
import styled from 'styled-components'
import MainInfo from './components/MainInfo'
import { MainButton } from '../Home'
import { useModal } from 'components/Common'
import WriteWarningInfoModal from './components/modal/WriteWarningInfoModal'
import LoginModal from 'components/LoginModal'
import WriteCard from './components/WriteCard'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { deleteWill, getMyWill } from 'api/will'
import { toastContext } from 'contexts/Toast'
import { useIsLogin, useUserInfo } from 'store/auth/hooks'

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
  const isLogin = useIsLogin()
  const { name, email, userid } = useUserInfo()
  const queryClient = useQueryClient()
  const { onToast } = useContext(toastContext)
  const [presentWarningModal] = useModal(<WriteWarningInfoModal />)
  const [presenLoginModal] = useModal(<LoginModal />)

  useEffect(() => {
    presentWarningModal()
  }, [])

  const router = useRouter()
  const handleWrite = () => {
    if (!isLogin) {
      presenLoginModal()
    }
    if (isLogin) {
      router.push('write')
    }
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

  const { data, isLoading, isError } = useQuery(
    'myWill',
    () =>
      isLogin &&
      getMyWill({
        mem_userid: userid,
        mem_email: email,
      }),
    {
      select: (data) => {
        return {
          ...data,
          result: data?.result?.slice(0, 1),
        }
      },
    },
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

          {isLogin &&
            !isError &&
            data?.result?.map((myWill) => {
              return (
                <WriteCard
                  key={myWill.WILL_ID}
                  will={myWill}
                  handleDelete={() => deleteMutation.mutate({ will_id: myWill.WILL_ID as string })}
                />
              )
            })}
        </Flex>
      </Flex>
    </St.Container>
  )
}

export default Main
