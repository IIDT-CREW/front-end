import styled, { keyframes } from 'styled-components'
import PageSection from '@/components/PageSection'
import useTheme from '@/hooks/useTheme'
import Container from '@/components/Layout/Container'
import { PageMeta } from '@/components/Layout/Page'
import Heading from '@/components/Common/Heading/Heading'
import { Box } from '@/components/Common/Box'
import { Text } from '@/components/Common/Text'
import Page from '@/components/Layout/Page'
import LayoutContainer from './components/Layout/LayoutContainer'
import ImageWrapper from './components/Layout/ImageWrapper'
import LastLeaf from '../../../public/images/home/rhys-fradley.jpg'
import road from '../../../public/images/home/casey-horner.jpg'
import React, { useEffect } from 'react'
import AOS from 'aos'
import CountDown from './components/CountDown'
import Link from 'next/link'

const StyledHeroSection = styled(PageSection)`
  padding-top: 16px;

  ${({ theme }) => theme.mediaQueries.md} {
    padding-top: 48px;
  }
`

const UserBannerWrapper = styled(Container)`
  z-index: 1;
  position: absolute;
  width: 100%;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  padding-left: 0px;
  padding-right: 0px;

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-left: 24px;
    padding-right: 24px;
  }
`

const BackgroundWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  background-url: url('/images/home/nft/Vibes@2x.png');
  html,
  body {
    position: relative;
    height: 100%;
    padding: 0 !important;
    margin: 0 !important;
  }

  .container {
    overflow: hidden;
  }

  .item {
    position: absolute;
    width: 100px;
    color: white;
    text-align: center;
  }

  .item:nth-child(6n + 1) {
    background: #f55;
    height: 200px;
  }

  .item:nth-child(6n + 2) {
    background: #7e7;
    height: 300px;
  }

  .item:nth-child(6n + 3) {
    background: #66e;
    height: 200px;
  }

  .item:nth-child(6n + 4) {
    background: #4af;
    height: 100px;
  }

  .item:nth-child(6n + 5) {
    background: #ed5;
    height: 150px;
  }

  .item:nth-child(6n + 6) {
    background: #d5e;
    height: 130px;
  }

  .result {
    text-align: center;
    padding: 10px;
    font-weight: bold;
    box-sizing: border-box;
    font-size: 14px;
  }

  .button {
    position: relative;
    display: block;
    margin: 10px auto;
    padding: 10px 20px;
    background: white;
    border: 1px solid #ccc;
    appearance: none;
    font-weight: bold;
    width: 150px;
    text-align: center;
    box-sizing: border-box;
    font-size: 14px;
  }

  .image {
    position: relative;
    width: 100%;
    font-size: 0;
  }

  .image img {
    width: 100%;
  }

  .title {
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-weight: bold;
    font-size: 14px;
  }

  @media (prefers-color-scheme: dark) {
    .title,
    .result {
      color: white;
    }
  }

  @media (prefers-color-scheme: light) {
    .title,
    .result {
      color: black;
    }
  }
`
const HeadingContainer = styled.div`
  position: absolute;
  margin-top: 280px;
  width: 100%;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: center;
`

//aos
//offest
//easing
//duration
//anchor
//placement

const MainButton = styled.button`
  cursor: pointer;
  outline: none;
  border: none;
  box-sizing: border-box;
  height: 70px;
  width: 400px;
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
  background: linear-gradient(316deg, #334ccb, #fc466b);
  color: white;
  border-radius: 40px;
  line-height: 1;
  font-weight: 600;
  background:;
`

const leftAosArray = ['fade-right', '200', '', '3000']
const rightAosArray = ['fade-left', '200', '', '3000']
const Home: React.FC = () => {
  useEffect(() => {
    AOS.init()
    AOS.refresh()
  }, [])

  const { theme } = useTheme()
  // const { accessToken } = useSelector<AppState, AppState['auth']>((state) => state.auth)

  const HomeSectionContainerStyles = {
    margin: '0',
    width: '100%',
    height: '100%',
    maxWidth: '968px',
  }
  const right = <ImageWrapper src={LastLeaf} alt="nft" width="80%" height="800px" />
  const left = (
    <>
      <Text bold>만약에...,</Text>
      <Heading scale="xl" mt="10px" textAlign="center">
        내일이 내 인생에
      </Heading>
      <Heading scale="xl" textAlign="center">
        마지막이라고
      </Heading>
      <Heading scale="xl" mb="24px" textAlign="center">
        생각해 보신적이 있나요?
      </Heading>
    </>
  )

  const rightSecond = <ImageWrapper src={road} alt="nft" width="80%" height="800px" />
  const leftSecond = (
    <>
      <Text bold>생각해봐요...,</Text>
      <Heading scale="xl" mt="10px" textAlign="center">
        지금까지 걸어왔던
      </Heading>
      <Heading scale="xl" textAlign="center">
        당신의 발자취들...
      </Heading>
      <Heading scale="xl" mb="24px" textAlign="center">
        만족할만한 삶을
      </Heading>
      <Heading scale="xl" mb="24px" textAlign="center">
        당신은 살아왔나요?
      </Heading>
    </>
  )

  return (
    <>
      <Box pt="50px" height="100vh">
        <Heading scale="xl" mt="10px" textAlign="center" style={{ fontFamily: 'MapoGoldenPier' }}>
          IIDT
        </Heading>
        <Heading scale="xxl" mb="24px" mt="10px" textAlign="center" style={{ fontFamily: 'MapoGoldenPier' }}>
          당신이 내일 만약 죽는다면
        </Heading>
        <CountDown />
      </Box>

      <Page>
        <PageSection innerProps={{ style: HomeSectionContainerStyles }} background={theme.colors.background} index={2}>
          <Box marginBottom={'10px'} />
          <LayoutContainer
            leftChildren={left}
            rightChildren={right}
            leftAosArray={leftAosArray}
            rightAosArray={rightAosArray}
          />
          <Box marginBottom={'10px'} />

          <LayoutContainer
            leftChildren={rightSecond}
            rightChildren={leftSecond}
            leftAosArray={leftAosArray}
            rightAosArray={rightAosArray}
          />
        </PageSection>

        <Box mb="50px" style={{ textAlign: 'center' }}>
          <Heading scale="xl" color="" data-aos="fade-up" data-aos-duration="1000">
            다시 한번 삶을 되돌아보는 시간
          </Heading>
          <Heading scale="xxl" color="" mb="24px" data-aos="fade-up" data-aos-duration="3000">
            만약 내가 내일 죽는다면
          </Heading>
        </Box>
        <Box style={{ textAlign: 'center' }}>
          <Text
            bold
            fontSize="30px"
            style={{ fontFamily: 'MapoGoldenPier' }}
            data-aos="fade-up"
            data-aos-duration="3000"
          >
            ↓
          </Text>
          <Box border="1px solid grey" data-aos="fade-up" data-aos-duration="3000">
            <Link href="/write">
              <Text bold fontSize="30px" style={{ fontFamily: 'MapoGoldenPier' }}>
                작성 하러 가기
              </Text>
            </Link>
          </Box>
        </Box>
      </Page>
      <div style={{ marginBottom: '50px' }}></div>
    </>
  )
}

export default Home
