import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import observerOptions from './options'
import Wrapper from './Wrapper'
import { ImageProps } from './types'
import { Skeleton } from '../Skeleton'
import Placeholder from './Placeholder'

type StyledImageProps = {
  isImageLoaded: boolean
  objectFit: string
  position: 'absolute' | 'fixed'
}
const StyledImage = styled.img<StyledImageProps>`
  height: 100%;
  left: 0;
  position: ${({ position }) => position};
  top: 0;
  width: 100%;
  transition: opacity 0.6s;
  //background: ${({ theme }) => theme.colors.background};
  opacity: ${({ isImageLoaded }) => (isImageLoaded ? 1 : 0.3)};
  object-fit: ${({ objectFit }) => objectFit};
`

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  isFill = false,
  objectFit = 'cover',
  position = 'absolute',
  ...props
}) => {
  const imgRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [isImageLoadError, setIsImageLoadError] = useState(false)

  useEffect(() => {
    let observer: IntersectionObserver
    const isSupported = typeof window === 'object' && window.IntersectionObserver

    if (imgRef.current && isSupported) {
      observer = new window.IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const { isIntersecting } = entry
          if (isIntersecting) {
            setIsLoaded(true)

            if (typeof observer?.disconnect === 'function') {
              observer.disconnect()
            }
          }
        })
      }, observerOptions)
      observer.observe(imgRef.current)
    }

    return () => {
      if (typeof observer?.disconnect === 'function') {
        observer.disconnect()
      }
    }
  }, [src])
  return (
    <Wrapper ref={imgRef} height={height || 0} width={width || 0} {...props}>
      {isLoaded && (
        <>
          <StyledImage
            isImageLoaded={isImageLoaded}
            src={src}
            alt={alt}
            onLoad={() => setIsImageLoaded(true)}
            onError={() => setIsImageLoadError(true)}
            objectFit={objectFit}
            position={position}
          />
          {!isImageLoaded && !isImageLoadError && (
            <Skeleton animation={'pulse'} width={isFill ? '100%' : width} height={isFill ? '100%' : height} />
          )}
        </>
      )}
      <Placeholder isVisible={isImageLoadError} />
    </Wrapper>
  )
}

export default Image
