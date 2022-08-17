import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Page from 'components/Layout/Page'
import { Flex, Box, Text } from 'components/Common'
import { Heading } from 'components/Common/Heading'
import CountDown from 'views/Home/components/CountDown'
import { getWill, insertWill } from 'api/will'
import styled from 'styled-components'
import { LinkOutlined } from '@ant-design/icons'
import CopyToClipboard from './components/CopyToClipboard'

declare global {
  interface Window {
    Kakao: any
  }
  const Kakao: any
}

const St = {
  ImageWrapper: styled.div`
    width: 100%;
    height: 700px;
    position: absolute;
    z-index: -1;
  `,
  Paper: styled.div`
    #text{
        color : ${({ theme }) => theme.colors.primaryDark} !important;
    }
   
    padding :50px 100px 50px 100px;
    background: url(/images/home/textured-paper.png) local;
    height: 700px;
    width: 100%
    padding: 0 2%;
    font-weight: 400;
    overflow-y: auto;
  `,
}

const WillPage = () => {
  const router = useRouter()
  console.log(router.query.id)

  function kakaoShareFix() {
    // 포스트 하단 공유 기능 fix
    // 기존 카카오 클린업
    // Kakao.Link.cleanup()
    Kakao.cleanup()
    // 새로운 키를 이용하여 init
    Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT)
  }
  useEffect(() => {
    // init 체크
    if (!Kakao.isInitialized()) {
      kakaoShareFix()
    }
  }, [router.query.id])
  const handleGetWill = async () => {
    try {
      const res = await getWill(router.query.id as string)
      console.log(res)
    } catch (e) {
      console.log(e)
    }
  }

  const handleInsertWill = async () => {
    try {
      const parameter = {
        title: 'test',
        content: 'hello',
        thumbnail: 'title',
        mem_idx: null,
        will_id: 'tttt',
      }
      const res = await insertWill(parameter)
      console.log(res)
    } catch (e) {
      console.log(e)
    }
  }

  const handleKakao = () => {
    // 버튼 요소 생성 및 변경
    // var kakaoBtnNew = document.createElement('button')
    // var kakaoIco = document.createElement('span')
    // var kakaoBtnTxt = document.createTextNode('카카오톡으로 공유')
    // kakaoIco.classList.add('ico_sns')
    // kakaoIco.classList.add('ico_kt')
    // kakaoBtnNew.appendChild(kakaoIco)
    // kakaoBtnNew.appendChild(kakaoBtnTxt)
    // kakaoBtnNew.classList.add('btn_mark')

    // var kakaoBtnOld = document.querySelector('a[data-service="kakaotalk"]')
    // var kakaoBtnWrap = document.querySelector('.bundle_post')

    // 공유 정보 가져오기
    const shareContent = {
      title: document.querySelector('[property="og:title"]').attributes.content.value,
      desc: document.querySelector('[property="og:description"]').attributes.content.value,
      image: document.querySelector('[property="og:image"]').attributes.content.value,
      url: router.asPath,
    }

    // 카카오 공유
    const kakaoShareFunc = function () {
      Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
          title: shareContent.title,
          description: shareContent.desc,
          imageUrl: shareContent.image,
          imageWidth: 1200,
          imageHeight: 630,
          link: {
            webUrl: shareContent.url,
          },
        },
        buttons: [
          {
            title: '읽으러 가기',
            link: {
              webUrl: 'http://localhost:3001',
            },
          },
        ],
      })
    }
    kakaoShareFunc()
  }

  return (
    <Page>
      <CountDown height="100px" isCountDown={false} text="마지막으로...," />
      {/* <Heading padding="20px" scale="xl" textAlign="center">
        마지막으로..,
      </Heading> */}
      <Flex flexDirection="column">
        <Box mt="20px" position="relative" style={{ backgroundColor: '#ffffff' }}>
          {/* <St.ImageWrapper>
            <img
              src="https://source.unsplash.com/random/"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </St.ImageWrapper> */}
          <Flex justifyContent="center" flexDirection="column">
            <St.Paper>
              <Heading scale="xl" fontFamily="MapoGoldenPier" mb="5px" id="text">
                제목...,
              </Heading>
              <Text fontFamily="MapoGoldenPier" bold fontSize="18px" id="text">
                TEXT TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT TEXT
                TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT TEXT
                TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT TEXT
                TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT TEXT
                TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT TEXT
                TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT TEXT
                TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT TEXT
                TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT TEXT
                TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT TEXT
                TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT TEXT
                TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT TEXT
                TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT TEXT
                TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT TEXT
                TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT TEXT
                TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT TEXT
                TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT TEXT
                TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT TEXT
                TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT TEXT
                TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT TEXT
                TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT TEXT
                TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT TEXT
                TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT TEXT
                TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT TEXT
                TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT TEXT
                TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT TEXT
                TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT TEXT
                TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT TEXT
                TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT TEXT
                TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT TEXT
                TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT TEXT
                TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT TEXT
                TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT TEXT
                TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT TEXT
                TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT TEXT
                TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT TEXT
                TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT TEXT
                TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT TEXT
                TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT TEXT
                TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT TEXT
                TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT TEXT
                TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT TEXT
                TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT TEXT
                TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT TEXT
                TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT
              </Text>
            </St.Paper>
          </Flex>
        </Box>
      </Flex>
      <div></div>

      <Heading padding="20px" scale="md" textAlign="center">
        당신의 유서를 전달하시겠어요?
      </Heading>
      <Box>
        <Flex justifyContent="center" alignItems="center" flexWrap="wrap" style={{ gap: '10px' }}>
          <CopyToClipboard toCopy={`http://localhost:3001/${router.asPath}`} />
          <div onClick={handleKakao}>
            <img src="//developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_small.png" />
          </div>
        </Flex>
        <div></div>
      </Box>
      <button onClick={handleGetWill}>handleGetWill</button>
      <button onClick={handleInsertWill}>handleInsertWill</button>
    </Page>
  )
}

export default WillPage
