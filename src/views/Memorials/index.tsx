import { useEffect, useContext, useMemo, useState } from 'react'
import { Box, Flex, Text, Heading } from 'components/Common'
import styled from 'styled-components'
import WillCard from 'components/WillCard'
import { useMutation, useQueryClient } from 'react-query'
import { deleteWill, getWillList } from 'api/will'
import { toastContext } from 'contexts/Toast'
import { DEFAULT_PAGE_NO, DEFAULT_PAGE_SIZE } from 'config/constants/default'
import useIntersect from './hooks/useIntersect'
import useInfiniteScroll from 'hooks/useInfiniteScroll'
import { Skeleton } from 'components/Common/Skeleton'
import moment from 'moment'
import { Will } from '@api/will/types'
import isEmpty from 'lodash/isEmpty'

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
const makeDateList = (year, nextYear) => {
  const dateList = [
    {
      title: '이른 봄',
      fromDate: `${year}-02-04`,
      toDate: `${year}-03-04`,
    },
    {
      title: '봄',
      fromDate: `${year}-03-05`,
      toDate: `${year}-05-04`,
    },
    {
      title: '이른 여름',
      fromDate: `${year}-05-05`,
      toDate: `${year}-06-04`,
    },
    {
      title: '여름',
      fromDate: `${year}-06-05`,
      toDate: `${year}-08-07`,
    },
    {
      title: '이른 가을',
      fromDate: `${year}-08-08`,
      toDate: `${year}-09-08`,
    },
    {
      title: '가을',
      fromDate: `${year}-09-08`,
      toDate: `${year}-11-03`,
    },
    {
      title: '이른 겨울',
      fromDate: `${year}-11-04`,
      toDate: `${year}-12-03`,
    },
    {
      title: '겨울',
      fromDate: `${year}-11-05`,
      toDate: `${nextYear}-02-03`,
    },
  ]
  return dateList
}
const getWillTitle = (will) => {
  const targetDate = moment(will?.EDIT_DATE ?? will?.REG_DATE)
  const year = targetDate.format('YYYY')
  const nextYear = moment(will?.EDIT_DATE ?? will?.REG_DATE)
    .add(1, 'y')
    .format('YYYY')
  const dateList = makeDateList(year, nextYear)
  let title = ''
  dateList.forEach((date) => {
    if (moment(targetDate.format('YYYY-MM-DD')).isBetween(date.fromDate, date.toDate)) {
      //console.log('[seo] date.title', date.title)
      title = date.title
    }
  })
  return `${year}년 ${title}`
}

const WillContainerHeader = ({ dateTitle }) => {
  return (
    <Box mt="20px" mb="20px">
      <Heading textAlign={'center'}>어느 {dateTitle}에 남겨진 기억.</Heading>
    </Box>
  )
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
    queryKey: ['willList', 'get_willList_all'],
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
      queryClient.invalidateQueries(['willList', 'get_willList_all'])
    },
  })

  const willList = useMemo(
    () => (myWillData ? myWillData.pages.flatMap(({ result }) => result.willList) : []),
    [myWillData],
  )

  const [dateGroupingWillList, setDateGroupingWillList] = useState({})
  useEffect(() => {
    if (willList.length === 0) return
    const dateGroupingWillList = {}
    willList.map((will) => {
      //그룹별로 지정
      const title = getWillTitle(will)
      dateGroupingWillList[title] = dateGroupingWillList[title]
        ? dateGroupingWillList[title].concat(will)
        : (dateGroupingWillList[title] = [will])
    })
    setDateGroupingWillList(dateGroupingWillList)
  }, [willList])

  return (
    <>
      {!error &&
        !isEmpty(dateGroupingWillList) &&
        Object.keys(dateGroupingWillList)?.map((dateTitle, key) => {
          return (
            <Box key={`${dateTitle}_${key}`}>
              <WillContainerHeader dateTitle={dateTitle} />
              {dateGroupingWillList[dateTitle]?.map((will, i) => {
                return (
                  <WillCard
                    key={`${i}-${will.WILL_ID}`}
                    isPrivate={false}
                    will={will}
                    handleDelete={() => deleteMutation.mutate({ will_id: will.WILL_ID as string })}
                  />
                )
              })}
            </Box>
          )
        })}

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
  return (
    <St.Container mt="78px">
      <Flex flexDirection="column" justifyContent="center" alignItems="center">
        <Flex flexDirection="column" justifyContent="center" alignItems="center">
          <WillContainer />
        </Flex>
      </Flex>
    </St.Container>
  )
}

export default Memorials
