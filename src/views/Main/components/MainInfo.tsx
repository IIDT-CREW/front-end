import { useState } from 'react'
import { Text } from 'components/Common'
import { useMutation, useQuery, QueryClientProvider } from 'react-query'
import useBaseQueryClient from 'hooks/queries/useBaseQueryClient'
import { useWillCountData } from 'hooks/queries/useWillData'
import { SkeletonV2 } from 'components/Common/Skeleton'

const MainInfo = () => {
  const [willCount, setWillCount] = useState(1)
  const { isLoading, isError, data, error } = useWillCountData({ storeCode: '', options: '' })
  console.log(isLoading, isError, data, error)
  // Query
  // const { isLoading, data, isError } = useQuery('users', getUserWithAxios, {
  //   staleTime: 5000,
  // })

  //   const mutation = useMutation((data: User) => axios.post('http://localhost:8000/user', data), {
  //     onMutate: (data: User) => {
  //       const previousValue = queryClient.getQueryData('users')
  //       console.log('previousValue', data)
  //       queryClient.setQueryData('users', (old: any) => {
  //         console.log('old', old)
  //         return [...old, data]
  //       })

  //       return previousValue
  //     },
  //     onSuccess: (result, variables, context) => {
  //       console.log('성공 메시지:', result)
  //       console.log('변수', variables)
  //       console.log('onMutate에서 넘어온 값', context)
  //       setUserId(userId + 1)
  //     },
  //   })

  return (
    <>
      <Text fontSize={['18px']} bold mb="24px">
        지금까지 작성된 마지막 일기
      </Text>
      {isLoading ? (
        <SkeletonV2 height="24px" width="24px" mb="24px"></SkeletonV2>
      ) : (
        <Text fontSize="26px" bold mb="24px">
          {data.result}개
        </Text>
      )}

      <Text fontSize="18px" bold mb="24px">
        당신의 마지막 일기를 작성해주세요.
      </Text>
    </>
  )
}
export default MainInfo
