/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useCallback } from 'react'
import { useRouter } from 'next/router'
import Page from 'components/Layout/Page'
import { Flex, Box, Text } from 'components/Common'
import { getWill } from 'api/will'
import styled from 'styled-components'
import WillCard from 'views/Will/components/WillCard'
import TitleBanner from 'views/Will/components/TitleBanner'
import { MainButton } from 'views/Home'
import { useQuery } from 'react-query'
import LoginModal from 'components/LoginModal'
import { useModal } from 'components/Common'
import { useIsLogin } from 'store/auth/hooks'

declare global {
  interface Window {
    Kakao: any
    gtag: any
  }
  const Kakao: any
}

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

const WillPage = () => {
  const isLogin = useIsLogin()
  const router = useRouter()
  const { data, isLoading, isError } = useQuery('getWill', () => getWill(router.query.id as string))
  const [presentLoginModal] = useModal(<LoginModal />)

  if (isError) {
    return <div>error</div>
  }

  const handleWrite = useCallback(() => {
    if (!isLogin) presentLoginModal()
    if (isLogin) router.push('/write')
  }, [isLogin, presentLoginModal, router])

  return (
    <>
      <Page title={data?.result.TITLE} content={data.result.CONTENT} isFullPage>
        <St.Container>
          <Box mb="36px">
            <TitleBanner
              height="100vh"
              title={data.result.TITLE}
              date={data.result.REG_DATE}
              imagePath="https://images.unsplash.com/photo-1436891620584-47fd0e565afb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80"
            />
          </Box>
          <Flex flexDirection="column" justifyContent="center" alignItems="center">
            <Flex flexDirection="column" justifyContent="center" alignItems="center">
              {!isLoading && data.result && <WillCard will={data?.result} />}
            </Flex>
          </Flex>

          <Flex flexDirection="column" justifyContent="center" alignItems="center">
            <Box>
              <Text>한번 당신도 생각을 정리해보시겠어요? </Text>
              <Text>좋은 경험이 될 수 있어요 </Text>
            </Box>
            <Box mt="20px">
              <MainButton onClick={handleWrite}>네. 작성해보겠습니다.</MainButton>
            </Box>
          </Flex>
        </St.Container>
      </Page>
    </>
  )
}

export default WillPage
