import { HTMLAttributes } from 'react'
import styled from 'styled-components'

interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  max?: number
  value?: number
}
const ProgressBar = ({ max, value }: ProgressProps) => {
  return (
    <St.Wrapper>
      <St.Progress max={max} value={value} />
    </St.Wrapper>
  )
}
const St = {
  Wrapper: styled.div<ProgressProps>`
    width: 100%;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.grayscale2};
  `,
  Progress: styled.div<ProgressProps>`
    width: ${({ max, value }) => `${(value / max) * 100}%`};
    height: 2px;
    background-color: ${({ theme }) => theme.colors.grayscale6};
  `,
}

export default ProgressBar
