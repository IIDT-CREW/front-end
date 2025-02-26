import { useEffect, useContext, useMemo } from 'react'
import { useRouter } from 'next/router'
import { Box, Flex, useModal } from 'components/Common'
import BannerCard from './components/BannerCard'
import styled from 'styled-components'
import MainInfo from './components/MainInfo'
import { MainButton } from '../Home'
import WriteWarningInfoModal from './components/modal/WriteWarningInfoModal'
import LoginModal from 'components/LoginModal'
import WillCard from 'components/WillCard'
import { useMutation, useQueryClient } from 'react-query'
import { deleteWill, getMyWill } from 'api/will'
import { toastContext } from 'contexts/Toast'
import { useIsLogin, useUserInfo } from 'store/auth/hooks'
import { DEFAULT_PAGE_NO, DEFAULT_PAGE_SIZE } from 'config/constants/default'
import useIntersect from './hooks/useIntersect'
import useInfiniteScroll from 'hooks/useInfiniteScroll'
import { Skeleton } from 'components/Common/Skeleton'

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

const WillContainer = () => {
  const queryClient = useQueryClient()
  const { name, email, userid, memIdx } = useUserInfo()
  const { onToast } = useContext(toastContext)

  const handleToast = ({ message = '' }) => {
    onToast({
      type: 'success',
      message,
      option: {
        position: 'top-center',
      },
    })
  }

  const {
    data: myWillData,
    error,
    status,
    isFetching,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteScroll({
    fetch: getMyWill,
    params: {
      memIdx: memIdx,
      pageNo: DEFAULT_PAGE_NO,
      pageSize: DEFAULT_PAGE_SIZE,
    },
    queryKey: ['willList', 'getMyWill'],
  })

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target)
    if (hasNextPage && !isFetching) {
      fetchNextPage()
    }
  })
  const deleteMutation = useMutation(deleteWill, {
    onSuccess: () => {
      handleToast({ message: '데이터를 삭제했습니다.' })
      // willList로 시작하는 모든 쿼리를 무효화한다
      queryClient.invalidateQueries(['willList'])
    },
  })

  const willList = useMemo(
    () => (myWillData ? myWillData.pages.flatMap(({ result }) => result.willList) : []),
    [myWillData],
  )
  return (
    <>
      {!error &&
        willList?.map((myWill, i) => (
          <Box key={`${i}-${myWill.WILL_ID}`}>
            <WillCard will={myWill} handleDelete={() => deleteMutation.mutate({ will_id: myWill.WILL_ID as string })} />
          </Box>
        ))}

      {(status === 'loading' || isFetching) && (
        <>
          {Array.from({ length: parseInt(DEFAULT_PAGE_SIZE, 10) }).map((v, index) => {
            return <Skeleton key={`my-will-${index}`} height="480px" minWidth="362px" maxWidth="582px" />
          })}
        </>
      )}

      <div ref={ref} />
    </>
  )
}
const Main = () => {
  const isLogin = useIsLogin()
  const [presentWarningModal] = useModal(<WriteWarningInfoModal />)
  const [presentLoginModal] = useModal(<LoginModal />)

  useEffect(() => {
    const isPrecented = localStorage.getItem('isPrecented')
    if (!isPrecented) {
      localStorage.setItem('isPrecented', 'true')
      presentWarningModal()
    }
    if (isPrecented) return
  }, [presentWarningModal])

  const router = useRouter()

  const handleWrite = () => {
    if (!isLogin) presentLoginModal()
    if (isLogin) router.push('write')
  }

  return (
    <St.Container mt="78px">
      <Box mb="36px">
        <BannerCard />
      </Box>
      <Flex flexDirection="column" justifyContent="center" alignItems="center">
        <Flex flexDirection="column" justifyContent="center" alignItems="center">
          <MainInfo />
          <Box mb="55px">
            <MainButton onClick={handleWrite}>작성하러가기</MainButton>
          </Box>
          {isLogin && <WillContainer />}
        </Flex>
      </Flex>
    </St.Container>
  )
}

export default Main
