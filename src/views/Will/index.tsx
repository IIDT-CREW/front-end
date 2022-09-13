/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useRouter } from 'next/router'
import Page from 'components/Layout/Page'
import { Flex, Box } from 'components/Common'
import { getWill } from 'api/will'
import styled from 'styled-components'
import BannerCard from 'views/Main/components/BannerCard'
import WriteCard from 'views/Main/components/WriteCard'
import { useQuery } from 'react-query'

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
  const router = useRouter()
  const { data, isLoading } = useQuery('getWill', () => getWill(router.query.id as string))
  return (
    <>
      <Page title={data.result.TITLE} content={data.result.CONTENT}>
        <St.Container mt="78px">
          <Box mb="36px">
            <BannerCard />
          </Box>
          <Flex flexDirection="column" justifyContent="center" alignItems="center">
            <Flex flexDirection="column" justifyContent="center" alignItems="center">
              {!isLoading && data.result && <WriteCard will={data?.result} />}
            </Flex>
          </Flex>
        </St.Container>
      </Page>
    </>
  )
}

export default WillPage
