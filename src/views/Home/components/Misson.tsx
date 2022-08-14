import Button from 'components/Common/Button/Button'
import { Flex } from 'components/Common'
import Heading from 'components/Common/Heading/Heading'

import { NextLinkFromReactRouter } from 'components/NextLink'

import useTheme from 'hooks/useTheme'
import Image from 'next/image'
import styled, { keyframes } from 'styled-components'
import bunnyImage from '../../../../public/images/home/lunar-bunny/bunny@2x.png'
import NFTImage from '../../../../public/images/home/nft/NFT_2_1.png'
import NFTMonitoring from '../../../../public/images/home/nft/Monitoring_2_1.png'
import NFTDigital_Art from '../../../../public/images/home/nft/Digital_Art_2_1.png'
import NFTMarket from '../../../../public/images/home/nft/Market_2_1.png'
import Text from 'components/Common/Text/Text'
import CompositeImage, { CompositeImageProps } from './CompositeImage'
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

const ImageWrapper = styled.div`
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

  return (
    <>
      <Flex
        position="relative"
        flexDirection={'column'}
        alignItems={['flex-end', null, null, 'center']}
        justifyContent="center"
        mt={['50px', null, 0]}
        id="homepage-hero"
      >
        <Flex flex="1" flexDirection="column">
          <Heading scale="md" mb="24px" mt="10px" textAlign="center">
            {'Our Misson'}
          </Heading>
          <Heading scale="xxl" color="#fff" textAlign="center">
            {'Lorem ipsum dolor sit amet '}
          </Heading>
          <Heading scale="xxl" color="#fff" mb="24px" textAlign="center">
            {' consectetur adipiscing elit'}
          </Heading>
        </Flex>

        <Flex
          height={['192px', null, null, '100%']}
          width={['192px', null, null, '100%']}
          flex={[null, null, null, '1']}
          mb={['24px', null, null, '0']}
          position="relative"
          justifyContent="center"
        >
          <div>
            <Heading scale="md" mb="24px" mt="10px" textAlign="center">
              Our Misson
            </Heading>
            <Text>Donec imperdiet lorem nulla </Text>
          </div>
          <div>
            <ImageWrapper>
              <Image src={NFTMonitoring} priority placeholder="blur" alt={'NFT'} />
            </ImageWrapper>
          </div>
        </Flex>

        <Flex
          height={['192px', null, null, '100%']}
          width={['192px', null, null, '100%']}
          flex={[null, null, null, '1']}
          mb={['24px', null, null, '0']}
          position="relative"
          justifyContent="center"
        >
          <div>
            <ImageWrapper>
              <Image src={NFTDigital_Art} priority placeholder="blur" alt={'NFT'} />
            </ImageWrapper>
          </div>
          <div>
            <Heading scale="md" mb="24px" mt="10px" textAlign="center">
              Our Misson
            </Heading>
            <Text>
              tincidunt cursus. Fusce vulputate, enim id facilisis faucibus, justo nunc consectetur nibh, sit amet
              euismod ante mauris ut est. Vestibulum eu ligula eu erat eleifend imperdiet et eu nulla. Curabitur sodales
              ullamcorper nibh sed sagittis. Integer a elit nec nisl cursus vehicula eu a nibh. Donec posuere tortor id
              egestas ultrices. Aliquam in eros eros. Maecenas fringilla enim varius, fringilla lectus ut, finibus sapie{' '}
            </Text>
          </div>
        </Flex>
        <Flex
          height={['192px', null, null, '100%']}
          width={['192px', null, null, '100%']}
          flex={[null, null, null, '1']}
          mb={['24px', null, null, '0']}
          position="relative"
          justifyContent="center"
        >
          <div data-aos="zoom-in-right" style={{ flex: '1' }}>
            <Heading scale="md" mb="24px" mt="10px" textAlign="center">
              TESK
            </Heading>
            <Text>
              tincidunt cursus. Fusce vulputate, enim id facilisis faucibus, justo nunc consectetur nibh, sit amet
              euismod ante mauris ut est. Vestibulum eu ligula eu erat eleifend imperdiet et eu nulla. Curabitur sodales
              ullamcorper nibh sed sagittis. Integer a elit nec nisl cursus vehicula eu a nibh. Donec posuere tortor id
              egestas ultrices. Aliquam in eros eros. Maecenas fringilla enim varius, fringilla lectus ut, finibus sapie
            </Text>
          </div>
          <div data-aos="zoom-in-left" style={{ flex: '1', display: 'flex' }}>
            <ImageWrapper>
              <Image src={NFTMarket} priority placeholder="blur" alt={'NFT'} />
            </ImageWrapper>
          </div>
        </Flex>
      </Flex>
    </>
  )
}

export default Hero
