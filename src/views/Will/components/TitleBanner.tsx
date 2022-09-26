import { useCallback, useState } from 'react'
import { Box, Text, Flex } from 'components/Common'
import moment from 'moment'
import styled from 'styled-components'
import StyledImage from 'components/Common/Image/StyledImage'
import Typing from 'views/Home/components/Typing'
type DateTextWrapperProps = {
  isStart: boolean
}
const St = {
  TextWrapper: styled(Text)`
    background: #000000;    
    color : #fff
    padding: ${({ theme }) => (theme.isDark ? '0px 10px' : '')};
    width: 80%;
    text-align: center;
    span{
        color : #fff
    }
  `,
  DateTextWrapper: styled(Text)`
    color: #fff;
    padding: ${({ theme }) => (theme.isDark ? '0px 10px' : '')};
    opacity: 0;
    transition: all 1s;
    transform: translate3d(0px, 15px, 0px);
    ${({ isStart }: DateTextWrapperProps) => {
      return isStart
        ? `opacity: 1;
         transform: translate3d(0px,0px,0px);`
        : null
    }}
  `,
}

type TitleBannerProps = {
  height: string
  title: string
  date: string
  imagePath: string
}
const TitleBanner = ({ height, title, date, imagePath }: TitleBannerProps) => {
  const [status, setStatus] = useState<'is_done' | 'is_init'>('is_init')

  const handleStatus = useCallback((status: 'is_done' | 'is_init') => {
    setStatus(status)
  }, [])

  return (
    <Box paddingTop="">
      <Box width="100%" height={height} position="relative">
        <StyledImage
          isFill
          src={imagePath}
          alt={'jms-ZfVqAKZ4YRQ-unsplash'}
          position="fixed"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: '-1',
            objectFit: 'cover',
            background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2))',
            clipPath: 'inset(0)',
          }}
        />
        <Box width="100%" height={height} position="relative">
          <Flex flexDirection="column" justifyContent="center" alignItems="center" height="100%" position="relative">
            <St.TextWrapper fontSize={['18px', null, null, '32px']} bold>
              <Typing str={title} handleStatus={handleStatus} status={status} />
            </St.TextWrapper>
            <St.DateTextWrapper fontSize={['14px', null, null, '18px']} bold isStart={status === 'is_done'}>
              {moment(date).format('YYYY년 MM월 DD일 hh시 mm분')}
            </St.DateTextWrapper>
          </Flex>
        </Box>
      </Box>
    </Box>
  )
}

export default TitleBanner
