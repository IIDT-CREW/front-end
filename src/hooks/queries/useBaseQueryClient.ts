/**
 * https://react-query.tanstack.com/reference/QueryClient
 */
import { useState } from 'react'
import { QueryClient } from 'react-query'

type QueryClientState = QueryClient

const useBaseQueryClient = (): QueryClientState => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: false,
            // globally default to 20 seconds
            staleTime: 20 * 1000,
          },
          mutations: {
            retry: false,
          },
        },
      }),
  )
  return queryClient
}

export default useBaseQueryClient
