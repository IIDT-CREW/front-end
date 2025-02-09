import { useInfiniteQuery } from '@tanstack/react-query'
import { DEFAULT_PAGE_SIZE } from '@/config/constants/default'

type UseInfiniteScrollProps = {
  fetch: (props: any) => any
  params: any
  queryKey: string[]
}

const useInfiniteScroll = ({ fetch, params, queryKey = ['queryKey'] }: UseInfiniteScrollProps) => {
  const getFetchForInfiniteScroll = async ({ pageParam = 1 }) => {
    const { result } = await fetch({
      ...params,
      pageNo: pageParam,
      pageSize: DEFAULT_PAGE_SIZE,
    })

    const {
      // pageNo, pageSize, totalCount, totalPageCount,
      nextPageNo,
      isLast,
    } = result?.meta

    return {
      result,
      nextPage: nextPageNo,
      isLast,
    }
  }

  const { data, error, fetchNextPage, hasNextPage, isFetching, isLoading, isFetchingNextPage, status } =
    useInfiniteQuery(queryKey, getFetchForInfiniteScroll, {
      getNextPageParam: (lastPage: any) => {
        if (lastPage.isLast) {
          return false
        }
        return lastPage.nextPage
      },
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: false,
      staleTime: 1000 * 20,
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
