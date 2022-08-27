import styled from 'styled-components'

const Placeholder = styled.div<{ isVisible: boolean }>`
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  background: grey;
  transition: opacity 0.6s;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
`

export default Placeholder
