import { AxiosError, AxiosResponse } from 'axios'
import { useQuery, UseQueryOptions } from 'react-query'

import { getWill } from 'api/will'
import { GetWill } from 'api/will/types'
import { queryKeys } from 'config/constants/queryKeys'

export function useGetWill(willId: string, options?: UseQueryOptions<GetWill, AxiosError, GetWill, Array<string>>) {
  return useQuery(queryKeys.getWill(willId), () => getWill(willId), options)
}
