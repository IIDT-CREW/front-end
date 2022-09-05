import { Text } from 'components/Common'
import { useWillCountData } from 'hooks/queries/useWillData'
import { SkeletonV2 } from 'components/Common/Skeleton'

const MainInfo = () => {
  const { isLoading, isError, data, error } = useWillCountData({ storeCode: '', options: '' })

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
