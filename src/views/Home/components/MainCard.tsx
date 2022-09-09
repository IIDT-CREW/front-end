import { Box, Text, Flex } from 'components/Common'
import StyledImage from 'components/Common/Image/StyledImage'

const Card = ({
  height,
  title,
  secondTitle,
  imagePath = '/images/home/huyen-pham--PTlx55R-KU-unsplash.jpg',
  alt = '',
}) => {
  return (
    <Box
      width="100%"
      height={`${height}px`}
      position="relative"
      mb="20px"
      background="linear-gradient(0deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4))"
    >
      <StyledImage
        isFill
        src={imagePath}
        alt={alt}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: '-1',
          objectFit: 'cover',
          filter: 'blur(2px)',
        }}
      />

      <Box width="100%" height={`${height}px`} position="relative">
        <Flex justifyContent="center" alignItems="center" height="100%" position="relative" flexDirection="column">
          <Text
            fontSize={['16px', '16px', '36px', '36px']}
            fontWeight="600"
            color="#000"
            data-aos="fade-down"
            data-aos-duration="1000"
          >
            {title}
          </Text>
          <Text
            fontSize={['16px', '16px', '36px', '36px']}
            fontWeight="600"
            color="#000"
            data-aos="fade-up"
            data-aos-duration="3000"
          >
            {secondTitle}
          </Text>
        </Flex>
      </Box>
    </Box>
  )
}
export default Card
