import { useEffect, useContext, useMemo } from 'react'
import { Box, Flex } from 'components/Common'
import styled from 'styled-components'
import WriteCard from './components/WriteCard'
import { useMutation, useQueryClient } from 'react-query'
import { deleteWill, getWillList } from 'api/will'
import { toastContext } from 'contexts/Toast'
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
    fetch: getWillList,
    params: {
      pageNo: DEFAULT_PAGE_NO,
      pageSize: DEFAULT_PAGE_SIZE,
    },
    queryKey: ['willList'],
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
      // myWill로 시작하는 모든 쿼리를 무효화한다
      queryClient.invalidateQueries('getMyWill')
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
          <WriteCard
            key={`${i}-${myWill.WILL_ID}`}
            isPrivate={false}
            will={myWill}
            handleDelete={() => deleteMutation.mutate({ will_id: myWill.WILL_ID as string })}
          />
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
const Memorials = () => {
  console.log('Memorials = ')
  return (
    <St.Container mt="78px">
      <Box mb="36px">[ ] 날의 기록들</Box>
      <Flex flexDirection="column" justifyContent="center" alignItems="center">
        <Flex flexDirection="column" justifyContent="center" alignItems="center">
          <WillContainer />
        </Flex>
      </Flex>
    </St.Container>
  )
}

export default Memorials
