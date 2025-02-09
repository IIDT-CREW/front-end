import Image from 'next/image'
import styled from 'styled-components'
import { ImageProps } from './types'
import Placeholder from './Placeholder'

const StyledImageWrapper = styled.div<{ width?: number | string; height?: number | string }>`
  position: relative;
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width || '100%')};
  height: ${({ height }) => (typeof height === 'number' ? `${height}px` : height || '100%')};
`

const StyledImage: React.FC<ImageProps> = ({ src, alt, width, height, objectFit = 'cover', ...props }) => {
  return (
    <StyledImageWrapper width={width} height={height}>
      <Image
        src={src}
        alt={alt || ''}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        {...props}
      />
    </StyledImageWrapper>
  )
}

export default StyledImage
