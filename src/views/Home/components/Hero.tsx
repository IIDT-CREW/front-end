import { useEffect } from 'react'
import Button from 'components/Common/Button/Button'
import { Flex, Grid } from 'components/Common'
import Heading from 'components/Common/Heading/Heading'

import { NextLinkFromReactRouter } from 'components/NextLink'
import useTheme from 'hooks/useTheme'
import Image from 'next/image'
import styled, { keyframes } from 'styled-components'

import NFTImage from '../../../../public/images/home/nft/NFT_2_1.png'
import NFTMinting from '../../../../public/images/home/nft/Minting_2_1.png'
import CompositeImage, { CompositeImageProps } from './CompositeImage'
import AOS from 'aos'
// import { SlideSvgDark, SlideSvgLight } from './SlideSvg'

const flyingAnim = () => keyframes`
  from {
    transform: translate(0,  0px);
  }
  50% {
    transform: translate(-5px, -5px);
  }
  to {
    transform: translate(0, 0px);
  }
`

const fading = () => keyframes`
  from {
    opacity: 0.9;
  }
  50% {
    opacity: 0.1;
  }
  to {
    opacity: 0.9;
  }
`

const BgWrapper = styled.div`
  z-index: -1;
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 0px;
  left: 0px;
`

const InnerWrapper = styled.div`
  position: absolute;
  width: 100%;
  bottom: -3px;
`

const BunnyWrapper = styled.div`
  width: 100%;
  text-align: center;
  animation: ${flyingAnim} 3.5s ease-in-out infinite;
  will-change: transform;
  > span {
    overflow: visible !important; // make sure the next-image pre-build blur image not be cropped
  }
`

const StarsWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  & :nth-child(2) {
    animation: ${fading} 2s ease-in-out infinite;
    animation-delay: 1s;
  }

  & :nth-child(3) {
    animation: ${fading} 5s ease-in-out infinite;
    animation-delay: 0.66s;
  }

  & :nth-child(4) {
    animation: ${fading} 2.5s ease-in-out infinite;
    animation-delay: 0.33s;
  }
`

const starsImage: CompositeImageProps = {
  path: '/images/home/lunar-bunny/',
  attributes: [
    { src: 'star-l', alt: '3D Star' },
    { src: 'star-r', alt: '3D Star' },
    { src: 'star-top-r', alt: '3D Star' },
  ],
}

const Hero = () => {
  const { theme } = useTheme()
  useEffect(() => {
    AOS.init()
    AOS.refresh()
  }, [])
  return (
    <>
      {/* <Flex
        position="relative"
        flexDirection={['column-reverse', null, null, 'row']}
        alignItems={['flex-end', null, null, 'center']}
        justifyContent="center"
        mt={['50px', null, 0]}
        id="homepage-hero"
      >
        <Flex flex="1" flexDirection="column">
          <Heading scale="xxl" color="secondary" mb="24px" data-aos="fade-up" data-aos-anchor-placement="top-center">
            {'NFT가 안전한지 확인해보세요'}
          </Heading>

          <Heading scale="md" mb="24px" mt="10px" data-aos="fade-up" data-aos-anchor-placement="top-center">
            {'NFT CHECK로 소중한 자산을 지키세요 '}
          </Heading>
          <Flex data-aos="fade-up" data-aos-anchor-placement="top-center">
            <NextLinkFromReactRouter to="/grade">
              <Button variant={'primary'}>{'검사하러 가기'}</Button>
            </NextLinkFromReactRouter>
          </Flex>
        </Flex>
        <Flex
          height={['192px', null, null, '100%']}
          width={['192px', null, null, '100%']}
          flex={[null, null, null, '1']}
          mb={['24px', null, null, '0']}
          position="relative"
        >
          <BunnyWrapper>
            <Image src={NFTImage} priority placeholder="blur" alt={'NFT'} />
          </BunnyWrapper>
          <StarsWrapper>
            <CompositeImage {...starsImage} />
          </StarsWrapper>
        </Flex>
      </Flex> */}

      <Grid
        alignItems="center"
        gridColumnGap="24px"
        gridTemplateAreas="'c c c c c c r r r r r r'"
        gridTemplateColumns="repeat(12,1fr)"
      >
        <div style={{ gridArea: 'c', textAlign: 'center' }}>
          <Heading scale="xxl" color="secondary" mb="24px" data-aos="fade-up" data-aos-anchor-placement="top-center">
            {'Going to be Verified Revolution'}
          </Heading>
          <Heading scale="lg" color="secondary" mb="24px" data-aos="fade-up" data-aos-anchor-placement="top-center">
            {'Going to be Verified Revolution'}
          </Heading>
          <Heading scale="md" color="secondary" mb="24px" data-aos="fade-up" data-aos-anchor-placement="top-center">
            {'Going to be Verified Revolution'}
          </Heading>
        </div>
        <div style={{ gridArea: 'r' }}>
          <BunnyWrapper>
            <Image src={NFTMinting} priority placeholder="blur" alt={'NFT'} />
          </BunnyWrapper>
        </div>
      </Grid>
    </>
  )
}

export default Hero
