import moment from 'moment'
import { useState, useEffect } from 'react'
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

const CountDown = ({ height = '550px', isCountDown = true, text = '' }) => {
  let timer: any = null
  const [time, setTime] = useState(moment())
  useEffect(() => {
    timer = setInterval(() => {
      setTime(moment())
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])

  const nextDay = moment(moment().add(1, 'days').format('YYYY-MM-DD'))
  const leftTime = nextDay.unix() - time.unix()
  //const formatted = moment.utc(leftTime * 1000).format('HH:mm:ss')
  return (
    <Box paddingTop="">
      <Box width="100%" height={height} position="relative">
        <img
          src="/images/home/matthew-mendez.jpg"
          alt="road"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: '-1',
            objectFit: 'cover',
            filter: 'blur(2px)',
          }}
        />
        <Box width="100%" height={height} position="relative">
          <Flex justifyContent="center" alignItems="center" height="100%" position="relative">
            {text === '' && (
              <Text bold fontSize="72px" color="#fff">
                {isCountDown ? moment.utc(leftTime * 1000).format('HH:mm:ss') : moment().format('HH:mm:ss')}
              </Text>
            )}
            {text !== '' && (
              <Text bold fontSize="72px" color="#fff">
                {text}
              </Text>
            )}
          </Flex>
        </Box>
      </Box>
    </Box>
  )
}

export default CountDown
