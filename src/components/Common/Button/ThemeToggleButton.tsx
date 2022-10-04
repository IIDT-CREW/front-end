import styled, { css, keyframes } from 'styled-components'
import { ButtonProps } from './types'
import IconSun from '../../../../public/images/theme/Sun.svg'
import IconMoon from '../../../../public/images/theme/Moon.svg'

interface ToggleButtonProps {
  selected: boolean
}

const ThemeToggleButton = (props: ButtonProps | ToggleButtonProps) => {
  const { selected } = props as ToggleButtonProps
  return (
    <StyledButton {...props}>
      <StyledDiv visible={selected}>
        <IconMoon width="17" fill="#fff" />
      </StyledDiv>
      <StyledDiv visible={!selected}>
        <IconSun width="17" fill="#000" />
      </StyledDiv>
    </StyledButton>
  )
}

const StyledButton = styled.button<ToggleButtonProps>`
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 2rem;
  cursor: pointer;
  background: transparent;
`
const StyledDiv = styled.div<{ visible: boolean }>`
  position: absolute;
  ${(props) => fadeInOut(props.visible)};
`

// animations
const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`
const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`
// components
const fadeInOut = (visible: boolean) => css`
  visibility: ${visible ? 'visible' : 'hidden'};
  animation: ${visible ? fadeIn : fadeOut} 0.15s ease-out;
  transition: visibility 0.15s ease-out;
`

export default ThemeToggleButton
