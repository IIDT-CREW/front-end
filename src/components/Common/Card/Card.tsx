import styled, { keyframes, css, DefaultTheme } from 'styled-components'
import { Box } from '../Box'
import { HTMLAttributes } from 'react'
import { space, SpaceProps } from 'styled-system'

export interface CardProps extends SpaceProps, HTMLAttributes<HTMLDivElement> {
  isActive?: boolean
  isSuccess?: boolean
  isWarning?: boolean
  isDisabled?: boolean
  borderBackground?: string
  background?: string
  test?: () => void
}
interface StyledCardProps extends CardProps {
  theme: DefaultTheme
}

const PromotedGradient = keyframes`
  0% {
    background-position: 50% 0%;
  }
  50% {
    background-position: 50% 100%;
  }
  100% {
    background-position: 50% 0%;
  }
`
const getBorderColor = ({
  isActive,
  isSuccess,
  isWarning,
  borderBackground,
  theme,
}: StyledCardProps) => {
  if (borderBackground) {
    return borderBackground
  }
  if (isWarning) {
    return theme.colors.warning
  }

  if (isSuccess) {
    return theme.colors.success
  }

  if (isActive) {
    return `linear-gradient(180deg, ${theme.colors.primaryBright}, ${theme.colors.secondary})`
  }

  return theme.colors.cardBorder
}

const St = {
  CardWrapper: styled.div<CardProps>`
    background: ${getBorderColor};
    border-radius: ${({ theme }) => theme.radii.card};
    color: ${({ theme, isDisabled }) => theme.colors[isDisabled ? 'textDisabled' : 'text']};
    overflow: hidden;
    position: relative;
    cursor: pointer;
    ${({ isActive }) =>
      isActive &&
      css`
        animation: ${PromotedGradient} 1.5s ease infinite;
        background-size: 400% 400%;
      `}

    padding: 1px 1px 3px 1px;
  `,
  CardInner: styled(Box)<{ background?: string; hasCustomBorder: boolean }>`
    width: 100%;
    height: 100%;
    overflow: ${({ hasCustomBorder }) => (hasCustomBorder ? 'initial' : 'inherit')};
    background: ${({ theme, background }) => background ?? theme.card.background};
    border-radius: ${({ theme }) => theme.radii.card};
  `,
}

const Card = ({ children, background, ...props }: CardProps) => {
  return (
    <St.CardWrapper {...props}>
      <St.CardInner background={background} hasCustomBorder={!!props.borderBackground}>
        {children}
      </St.CardInner>
    </St.CardWrapper>
  )
}
export default Card
