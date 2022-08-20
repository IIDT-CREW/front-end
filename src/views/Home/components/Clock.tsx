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

const Clock = ({ height = '300px', isCountDown = true, text = '' }) => {
  const timer: any = useRef(null)

  const [time, setTime] = useState(moment())
  useEffect(() => {
    timer.current = setInterval(() => {
      setTime(moment())
    }, 1000)
    return () => {
      clearInterval(timer.current)
    }
  }, [])
  // const nextDay = moment(moment().add(1, 'days').format('YYYY-MM-DD'))
  // const leftTime = nextDay.unix() - time.unix()
  //const formatted = moment.utc(leftTime * 1000).format('HH:mm:ss')
  return (
    <Box paddingTop="">
      <Box width="100%" height={height} position="relative">
        <Box width="100%" height={height} position="relative">
          <Flex flexDirection="column" justifyContent="center" alignItems="center" height="100%" position="relative">
            <Text bold fontSize="26px">
              현재 시간
            </Text>
            <Text bold fontSize="48px">
              {time.format('HH:mm:ss')}
            </Text>
          </Flex>
        </Box>
      </Box>
    </Box>
  )
}

export default Clock
