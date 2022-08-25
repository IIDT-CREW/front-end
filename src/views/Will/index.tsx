/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Page from 'components/Layout/Page'
import { Flex, Box, Text } from 'components/Common'
import { Heading } from 'components/Common/Heading'
import { getWill, insertWill } from 'api/will'
import styled from 'styled-components'
import { LinkOutlined } from '@ant-design/icons'
import CopyToClipboard from './components/CopyToClipboard'
import BannerCard from 'views/Main/components/BannerCard'
import WriteCard from 'views/Main/components/WriteCard'
import { useQuery, useMutation, useQueryClient } from 'react-query'

declare global {
  interface Window {
    Kakao: any
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
  const queryClient = useQueryClient()
  console.log('(router.query.id = ', router.query.id)
  const { data, isLoading } = useQuery('getWill', () => getWill(router.query.id as string))

  function kakaoShareFix() {
    // Kakao.Link.cleanup()
    Kakao.cleanup()
    if (process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT) {
      // 새로운 키를 이용하여 init
      Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT)
    }
  }
  useEffect(() => {
    // init 체크
    if (!Kakao.isInitialized()) {
      kakaoShareFix()
    }
  }, [router.query.id])

  const handleKakao = () => {
    // 공유 정보 가져오기
    // const shareContent = {
    //   title: document.querySelector('[property="og:title"]').attributes.content.value,
    //   desc: document.querySelector('[property="og:description"]').attributes.content.value,
    //   image: document.querySelector('[property="og:image"]').attributes.content.value,
    //   url: router.asPath,
    // }

    // 카카오 공유
    const kakaoShareFunc = function () {
      Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
          title: '유서',
          description: data.result.CONTENT,
          imageUrl: 'https://www.if-i-die-tomorrow.com/images/home/patrick-ryan-3kUIaB2EPp8-unsplash.jpg',
          imageWidth: 1200,
          imageHeight: 630,
          link: {
            webUrl: `${process.env.NEXT_PUBLIC_API_URL}/will/${router.query.id}`,
          },
        },
        buttons: [
          {
            title: '읽으러 가기',
            link: {
              webUrl: `${process.env.NEXT_PUBLIC_API_URL}/will/${router.query.id}`,
            },
          },
        ],
      })
    }
    kakaoShareFunc()
  }

  return (
    <>
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
      <Heading padding="20px" scale="md" textAlign="center">
        이 마지막 일기를 전달하시겠어요?
      </Heading>
      <Box>
        <Flex justifyContent="center" alignItems="center" flexWrap="wrap" style={{ gap: '10px' }}>
          <CopyToClipboard toCopy={`${process.env.NEXT_PUBLIC_API_URL}/${router.asPath}`} />
          <div onClick={handleKakao} type="button">
            <img alt="" src="//developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_small.png" />
          </div>
        </Flex>
        <div></div>
      </Box>
    </>
  )
}

export default WillPage
