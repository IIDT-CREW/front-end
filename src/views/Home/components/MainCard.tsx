import React, { useEffect } from 'react'
import { Box, Text, Flex } from 'components/Common'
import styled from 'styled-components'
import useIntersectionObserver from 'hooks/useIntersectionObserver'

const St = {
  CardListWrappr: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  CardContainer: styled.div`
    background: linear-gradient(293deg, #f17b32, #eed848);
    border-radius: 12px;
    width: 150px;
    height: 300px;
  `,
}

const Card = ({
  height,
  title,
  secondTitle,
  imagePath = '/images/home/huyen-pham--PTlx55R-KU-unsplash.jpg',
  alt = '',
}) => {
  return (
    <Box width="100%" height={height} position="relative" mb="20px">
      <img
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
      <Box width="100%" height={height} position="relative">
        <Flex justifyContent="center" alignItems="center" height="100%" position="relative" flexDirection="column">
          <Text fontSize="36px" fontWeight="600">
            {title}
          </Text>
          <Text fontSize="36px" fontWeight="600">
            {secondTitle}
          </Text>
        </Flex>
      </Box>
    </Box>
  )
}
export default Card
