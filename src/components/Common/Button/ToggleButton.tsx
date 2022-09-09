import styled from 'styled-components'
import { ButtonProps } from './types'

interface ToggleButtonProps {
  selected: boolean
}

const ToggleButton = (props: ButtonProps | ToggleButtonProps) => {
  return (
    <StyledButton {...props}>
      <StyledSpan {...props} />
    </StyledButton>
  )
}

const StyledButton = styled.button<ToggleButtonProps>`
  width: 3.5rem;
  height: 2rem;
  display: block;
  position: relative;
  border: none;
  border-radius: 2rem;
  background-color: ${(props) => (props.selected ? '#fdb11a' : '#fff')};
  box-shadow: 0 0 1rem 3px rgba(0 0 0 / 15%);
  cursor: pointer;

  transition: all 0.2s ease-in;
`
const StyledSpan = styled.span<ToggleButtonProps>`
  width: 1.6rem;
  height: 1.6rem;
  position: absolute;
  top: 50%;
  left: ${(props) => (props.selected ? 'calc(100% - 1.8rem);' : '0.2rem')};
  transform: translateY(-50%);
  border-radius: 50%;
  background: ${(props) => (props.selected ? '#fff' : '#fdb11a')};

  transition: all 0.15s ease-in;
`

export default ToggleButton
