import { forwardRef } from 'react'
import styled from 'styled-components'
import { space } from 'styled-system'
import { WrapperProps } from './types'

const StyledWrapper = styled.div<{ $width: number; $height: number; isFill: boolean }>`
  max-height: ${({ isFill, $height }) => (isFill ? '100%' : `${$height}px`)};
  max-width: ${({ isFill, $width }) => (isFill ? '100%' : `${$width}px`)};
  position: relative;
  width: 100%;
  height: ${({ isFill }) => '100%'};
  &:after {
    content: '';
    display: block;
    padding-top: ${({ $width, $height }) => ($height / $width) * 100}%;
  }
  //background: ${({ theme }) => theme.colors.background};
  ${space}
`

const Wrapper = forwardRef<HTMLDivElement, WrapperProps>(({ width, height, isFill, ...props }, ref) => {
  return <StyledWrapper ref={ref} isFill={isFill} $width={width} $height={height} {...props} />
})

export default Wrapper
