import moment from 'moment'
import { useState, useEffect, useRef } from 'react'
import { Box, Text, Flex } from 'components/Common'
import styled from 'styled-components'
import StyledImage from 'components/Common/Image/StyledImage'
import { fontSize, FontSizeProps, style } from 'styled-system'

const St = {
  TextWrapper: styled(Text)`
    padding: ${({ theme }) => (theme.isDark ? '0px 10px' : '')};
    color: inherit;
  `,
}

const bannerJson = [
  {
    firstLine: '',
    secondLine: '',
    author: '',
    imagePath: '',
  },
  {
    firstLine: '포기하지 말라, 희망을 잃지 말라',
    secondLine: '자신을 저버리지 말라',
    author: '/Christopher Reeve',
    alt: 'Christopher Reeve',
    imagePath: '/images/home/avis-yang-0QPGGcOLxWQ-unsplash.jpg',
  },
  {
    firstLine: '당신은 움츠리기보다 활짝',
    secondLine: '피어나도록 만들어진 존재입니다.',
    author: '/Oprah Winfrey',
    alt: 'Oprah Winfrey',
    imagePath: '/images/home/wes-hicks-u-jh6blYQmQ-unsplash.jpg',
  },
  {
    firstLine: '절대 어제를 후회하지 마라. ',
    secondLine: '인생은 오늘의 나 안에 있고 내일은 스스로 만드는 것이다.',
    author: '/L. Ron Hubbard',
    alt: 'L. Ron Hubbard',
    imagePath: '/images/home/neora-aylon-iI3fVBUUXEE-unsplash.jpg',
  },

  {
    firstLine: '행복이란 하늘이 파랗다는 것을',
    secondLine: '발견하는 것 만큼이나 쉬운 일이다.',
    author: '/Jostein Gaarder',
    alt: 'Jostein Gaarder',
    imagePath: '/images/home/billy-huynh-v9bnfMCyKbg-unsplash.jpg',
  },
  {
    firstLine: '누구나 마음 속에 생각의 보석을 지니고 있다.',
    secondLine: '다만, 캐내지 않아 잠들어 있을 뿐이다.',
    author: '/이어령',
    alt: '이어령',
    imagePath: '/images/home/ant-rozetsky-q-DJ9XhKkhA-unsplash.jpg',
  },
]
// const bannerIndex = Math.floor(Math.random() * 5)
const BannerCard = ({ height = '231px' }) => {
  const timer: any = useRef(null)

  const [time, setTime] = useState('')
  const [bannerIndex, setBannerIndex] = useState(0)
  useEffect(() => {
    setTime(moment().format('HH:mm:ss'))
    setBannerIndex(Math.floor(Math.random() * 5) + 1)
    timer.current = setInterval(() => {
      setTime(moment().format('HH:mm:ss'))
    }, 1000)

    return () => {
      clearInterval(timer.current)
    }
  }, [])

  const { firstLine, secondLine, author, imagePath } = bannerJson[bannerIndex]
  return (
    <Box paddingTop="">
      <Box width="100%" height={height} position="relative">
        <Box width="100%" height={height} position="relative" background={`url(${imagePath}) 50%/ cover`}>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="100%"
            position="relative"
            background="inherit"
            style={{
              color: 'transparent',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              textAlign: 'center',
              filter: 'invert(1) grayscale(1) contrast(2) drop-shadow(3px 3px 5px black)',
            }}
          >
            <St.TextWrapper fontSize={['14px', null, null, '18px']} bold>
              {firstLine}
            </St.TextWrapper>
            <St.TextWrapper fontSize={['14px', null, null, '18px']} bold>
              {secondLine}
            </St.TextWrapper>
            <St.TextWrapper fontSize={['14px', null, null, '18px']} bold>
              {author}
            </St.TextWrapper>
            <Text bold fontSize="48px" textAlign="center" color="inherit">
              {time}
            </Text>
          </Flex>
        </Box>
      </Box>
    </Box>
  )
}

export default BannerCard
