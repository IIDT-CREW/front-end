import Image from 'next/image'
import styled, { keyframes } from 'styled-components'

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
type StyledImageWrapperProps = {
  width?: string
  height?: string
}
const St = {
  ImageWrapper: styled.div<StyledImageWrapperProps>`
    width: ${(props) => (props.width ? props.width : '100%')};
    height: ${(props) => (props.height ? props.height : '100%')};
    margin: auto;
    text-align: center;
    animation: ${flyingAnim} 3.5s ease-in-out infinite;
    will-change: transform;
    > span {
      overflow: visible !important; // make sure the next-image pre-build blur image not be cropped
    }
    img {
      height: 100%;
      object-fit: cover;
    }
  `,
}

type ImageWrapperProps = {
  src: any
  alt: string
  width?: string
  height?: string
}
const ImageWrapper = ({ src, alt, ...props }: ImageWrapperProps) => {
  return (
    <St.ImageWrapper {...props}>
      <Image
        src={src}
        priority
        placeholder="blur"
        alt={alt}
        height={props.height ? parseInt(props.height) : undefined}
      />
    </St.ImageWrapper>
  )
}
export default ImageWrapper
