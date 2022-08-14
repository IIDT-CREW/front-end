import styled from 'styled-components'
import { variant } from 'styled-system'
import { styleVariants, scaleVariants } from './theme'
import { Scale, ButtonProps } from './types'
// type ButtonProps = {
//   /** 버튼 안의 내용 */
//   children: React.ReactNode
//   /** 클릭했을 때 호출할 함수 */
//   onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void
//   /** 버튼의 생김새를 설정합니다. */
//   theme?: Scale
// }

/** `Button` 컴포넌트는 어떠한 작업을 트리거 할 때 사용합니다.  */
const Button = (props: ButtonProps) => {
  const { children, scale, ...rest } = props
  return <StyledButton {...rest}>{children}</StyledButton>
}

const StyledButton = styled.button`
  width: ${(props) => (props.width ? props.width : 'auto')}
  outline: none;
  border: none;
  box-sizing: border-box;
  height: 2rem;
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
  background: grey;
  color: white;
  border-radius: 0.25rem;
  line-height: 1;
  font-weight: 600;
  ${variant({
    variants: styleVariants,
  })};
  &:focus {
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  }
  &:hover {
    background: #e49600;
  }
  &:active {
    background: #e49600;
  }
`

export default Button
