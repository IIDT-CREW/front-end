import { Text } from '@/components/Common'
import { SkeletonV2 } from '@/components/Common/Skeleton'
import { useWill } from '@/hooks/queries/useWill'

const MainInfo = () => {
  const { useWillCountQuery } = useWill()
  const { data, isLoading, isError } = useWillCountQuery()
  return (
    <>
      <Text fontSize={['18px']} bold mb="24px">
        지금까지 작성된 오늘 유서
      </Text>
      {isLoading || isError ? (
        <SkeletonV2 height="24px" width="24px" mb="24px"></SkeletonV2>
      ) : (
        <Text fontSize="26px" bold mb="24px">
          {data}개
        </Text>
      )}

      <Text fontSize="18px" bold mb="24px">
        당신의 오늘 유서를 작성해주세요.
      </Text>
    </>
  )
}
export default MainInfo
