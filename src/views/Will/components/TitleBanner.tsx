import { Box, Text, Flex } from 'components/Common'
import moment from 'moment'
import styled from 'styled-components'
import StyledImage from 'components/Common/Image/StyledImage'
const St = {
  TextWrapper: styled(Text)`
    background: ${({ theme }) => (theme.isDark ? theme.colors.backgroundAlt : '')};
    padding: ${({ theme }) => (theme.isDark ? '0px 10px' : '')};
  `,
}

type TitleBannerProps = {
  height: string
  title: string
  date: string
  imagePath: string
}
const TitleBanner = ({ height, title, date, imagePath }: TitleBannerProps) => {
  return (
    <Box paddingTop="">
      <Box width="100%" height={height} position="relative">
        <StyledImage
          isFill
          src={imagePath}
          //src="/images/home/jms-ZfVqAKZ4YRQ-unsplash.jpg"
          alt={'jms-ZfVqAKZ4YRQ-unsplash'}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: '-1',
            objectFit: 'cover',
            background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2))',
          }}
        />
        <Box width="100%" height={height} position="relative">
          <Flex flexDirection="column" justifyContent="center" alignItems="center" height="100%" position="relative">
            <St.TextWrapper fontSize={['18px', null, null, '32px']} bold>
              {title}
            </St.TextWrapper>
            <St.TextWrapper fontSize={['14px', null, null, '18px']} bold>
              {moment(date).format('YYYY년 MM월 DD일 hh시 mm분')}
            </St.TextWrapper>
          </Flex>
        </Box>
      </Box>
    </Box>
  )
}

export default TitleBanner
