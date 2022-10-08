import { HTMLAttributes } from 'react'
import styled, { CSSProp } from 'styled-components'

interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  max?: number
  value?: number
  wrapperCss?: CSSProp
}
const ProgressBar = ({ max, value, wrapperCss }: ProgressProps) => {
  return (
    <St.Wrapper wrapperCss={wrapperCss}>
      <St.Progress max={max} value={value} />
    </St.Wrapper>
  )
}
const St = {
  Wrapper: styled.div<ProgressProps>`
    width: 100%;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.grayscale2};
    ${({ wrapperCss }) => wrapperCss}
  `,
  Progress: styled.div<ProgressProps>`
    transition: all 0.3s;
    width: ${({ max, value }) => `${(value / max) * 100}%`};
    height: 2px;
    background-color: ${({ theme }) => theme.colors.grayscale6};
  `,
}

export default ProgressBar
