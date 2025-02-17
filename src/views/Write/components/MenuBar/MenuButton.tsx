import React from 'react'
import { ArrowLeft, ArrowRight } from '@/components/Common/Svg'
import styled from 'styled-components'
import { PREV } from '@/views/Write/data'
import { StyleMenuButton } from '@/views/Write/components/MenuBar'
type Variant = 'primary' | 'secondary'

const St = {
  RoundIconButton: styled.button`
    width: 24px;
    height: 24px;
    border-radius: 100%;
    border: 1px solid ${({ theme }) => theme.colors.grayscale2};
    background-color: ${({ theme }) => theme.colors.grayscale0};
    padding: 0;
    box-sizing: border-box;
  `,
}

type MenuButtonProps = {
  isMobile: boolean
  text: string
  isDisabled: boolean
  handleMenuButton: (e: any) => void
  variant?: Variant
  buttonType: 'prev' | 'next' | 'done'
}

const MenuButton = ({
  handleMenuButton,
  isMobile,
  text,
  isDisabled,
  variant = 'primary',
  buttonType,
}: MenuButtonProps) => {
  if (isMobile) {
    return (
      <St.RoundIconButton onClick={() => handleMenuButton(buttonType)}>
        {buttonType === PREV ? (
          <ArrowLeft css={{ fill: '#000', width: '21px' }} />
        ) : (
          <ArrowRight css={{ fill: '#000', width: '21px' }} />
        )}
      </St.RoundIconButton>
    )
  }
  return (
    <StyleMenuButton
      id={buttonType}
      variant={variant}
      onClick={() => handleMenuButton(buttonType)}
      disabled={isDisabled}
    >
      {text}
    </StyleMenuButton>
  )
}

export default MenuButton
