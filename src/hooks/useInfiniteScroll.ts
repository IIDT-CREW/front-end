import { useInfiniteQuery } from 'react-query'
import { DEFAULT_PAGE_COUNT } from 'config/constants/default'

type UseInfiniteScrollProps = {
  fetch: (props: any) => any
  params: any
  queryKey: string[]
}

const useInfiniteScroll = ({ fetch, params, queryKey = ['queryKey'] }: UseInfiniteScrollProps) => {
  const getFetchForInfiniteScroll = async ({ pageParam = 1 }) => {
    console.log('pageParam= ', pageParam)
    const { data } = await fetch({
      ...params,
      pageNo: pageParam,
      pageSize: DEFAULT_PAGE_COUNT,
    })
    console.log(data)
    const {
      // pageNo, pageSize, totalCount, totalPageCount,
      nextPageNo,
      isLast,
    } = data.meta

    return {
      result: data,
      nextPage: nextPageNo,
      isLast,
    }
  }

  const { data, error, fetchNextPage, hasNextPage, isFetching, isLoading, isFetchingNextPage, status } =
    useInfiniteQuery(queryKey, getFetchForInfiniteScroll, {
      getNextPageParam: (lastPage) => {
        if (lastPage.isLast) {
          return false
        }
        return lastPage.nextPage
      },
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime: 3000,
    })

  return {
    data,
    error,
    status,
    isFetching,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  }
}

export default useInfiniteScroll
