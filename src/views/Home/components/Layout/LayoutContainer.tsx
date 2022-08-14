import Button from 'components/Common/Button/Button'
import { Flex } from 'components/Common'
import Heading from 'components/Common/Heading/Heading'

import { NextLinkFromReactRouter } from 'components/NextLink'

import useTheme from 'hooks/useTheme'
import Image from 'next/image'
import styled, { keyframes } from 'styled-components'
import NFTMonitoring from '../../../../public/images/home/nft/Monitoring_2_1.png'
import Text from 'components/Common/Text/Text'
import { ReactElement } from 'react'

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

type LayoutContainerProps = {
  leftChildren: ReactElement
  rightChildren: ReactElement
  leftAosArray: string[]
  rightAosArray: string[]
}

const LeftContainer = styled.div`
  flex: 1 1;
  justify-content: center;
  text-align: center;
`
const RightContainer = styled.div`
  flex: 1 1;
  justify-content: center;
  text-align: center;
`
const LayoutContainer = ({ leftChildren, rightChildren, leftAosArray, rightAosArray }: LayoutContainerProps) => {
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
        <Flex
          height={['100%', null, null, '100%']}
          width={['100%', null, null, '100%']}
          flex={[null, null, null, '1']}
          mb={['0', null, null, '0']}
          position="relative"
          justifyContent="center"
        >
          <LeftContainer
            data-aos={leftAosArray[0] && leftAosArray[0]}
            data-aos-offset={leftAosArray[1] && leftAosArray[1]}
            data-aos-easing={leftAosArray[2] && leftAosArray[2]}
            data-aos-duration={leftAosArray[3] && leftAosArray[3]}
            data-aos-anchor={leftAosArray[4] && leftAosArray[4]}
            data-aos-placement={leftAosArray[5] && leftAosArray[5]}
          >
            {leftChildren}
          </LeftContainer>
          <RightContainer
            data-aos={rightAosArray[0] && rightAosArray[0]}
            data-aos-offset={rightAosArray[1] && rightAosArray[1]}
            data-aos-easing={rightAosArray[2] && rightAosArray[2]}
            data-aos-duration={rightAosArray[3] && rightAosArray[3]}
            data-aos-anchor={rightAosArray[4] && rightAosArray[4]}
            data-aos-placement={rightAosArray[5] && rightAosArray[5]}
          >
            {rightChildren}
          </RightContainer>
        </Flex>
      </Flex>
    </>
  )
}

export default LayoutContainer
