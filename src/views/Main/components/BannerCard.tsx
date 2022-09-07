import moment from 'moment'
import { useState, useEffect, useRef } from 'react'
import { Box, Text, Flex } from 'components/Common'
import styled from 'styled-components'

const St = {
  ImageWrapper: styled(Box)`
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;

    img {
      max-height: 100%;
      width: auto;
    }
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
    imagePath: '/images/home/avis-yang-wkHUmkgClg4-unsplash.jpg',
  },
  {
    firstLine: '당신은 움츠리기보다 활짝',
    secondLine: '피어나도록 만들어진 존재입니다.',
    author: '/Oprah Winfrey',
    imagePath: '/images/home/wes-hicks-u-jh6blYQmQ-unsplash.jpg',
  },
  {
    firstLine: '절대 어제를 후회하지 마라. 인생은 오늘의 나 안에 있고',
    secondLine: '내일은 스스로 만드는 것이다.',
    author: '/L. Ron Hubbard',
    imagePath: '/images/home/seb-mooze-LfAZZnTyDB8-unsplash.jpg',
  },

  {
    firstLine: '행복이란 하늘이 파랗다는 것을 발견하는 것 만큼이나',
    secondLine: '쉬운 일이다.',
    author: '/Jostein Gaarder',
    imagePath: '/images/home/billy-huynh-v9bnfMCyKbg-unsplash.jpg',
  },
  {
    firstLine: '누구나 마음 속에 생각의 보석을 지니고 있다.',
    secondLine: '다만, 캐내지 않아 잠들어 있을 뿐이다.',
    author: '/이어령',
    imagePath: '/images/home/ant-rozetsky-q-DJ9XhKkhA-unsplash.jpg',
  },
]

const BannerCard = ({ height = '231px' }) => {
  const timer: any = useRef(null)

  const [time, setTime] = useState('')
  const [bannerIndex, setBannerIndex] = useState(0)
  useEffect(() => {
    setTime(moment().format('HH:mm:ss'))
    setBannerIndex(Math.floor(Math.random() * 4) + 1)
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
        <img
          src={imagePath}
          alt="road"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: '-1',
            background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2))',
            objectFit: 'cover',
          }}
        />
        <Box width="100%" height={height} position="relative">
          <Flex flexDirection="column" justifyContent="center" alignItems="center" height="100%" position="relative">
            <Text bold>{firstLine}</Text>
            <Text bold>{secondLine}</Text>
            <Text bold>{author}</Text>
            <Box>
              <Text bold fontSize="48px">
                {time}
              </Text>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Box>
  )
}

export default BannerCard
