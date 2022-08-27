//src/hooks/queries/useKioskData.js
import { useQuery } from 'react-query'
import { AxiosError, AxiosResponse } from 'axios'
import * as queryKeys from 'config/constants/queryKeys'
import { axiosInstance, getWillCount } from 'api/will'

interface IGetWillCountProps {
  code: string
  reason: string
  result: number
}

export function useWillCountData({ storeCode, options }) {
  return useQuery<IGetWillCountProps, Error>([queryKeys.WILL_COUNT_DATA, storeCode], () => getWillCount(), {
    // select: ({ data }) => data,
    ...options,
  })
}

export function useGetMyWill({ storeCode, options }) {
  return useQuery<IGetWillCountProps, Error>([queryKeys.WILL_COUNT_DATA, storeCode], () => getWillCount(), {
    // select: ({ data }) => data,
    ...options,
  })
}

// const useAddComment = (id) => {

//   return useMutation((newComment) => axios.post(`/posts/${id}/comments`, newComment), {
//     onSuccess: () => {
//       // ✅ refetch the comments list for our blog post
//       queryClient.invalidateQueries(['posts', id, 'comments'])
//     },
//   })
// }
