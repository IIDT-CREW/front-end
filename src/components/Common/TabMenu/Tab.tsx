import styled from 'styled-components'
import { color } from 'styled-system'
import { TabProps } from './types'

const getBorderRadius = ({ scale }: TabProps) => (scale === 'md' ? '4px 4px 0 0' : '8px 8px 0 0')

const getPadding = ({ scale }: TabProps) => (scale === 'md' ? '8px' : '16px')

const Tab = styled.button<TabProps>`
  display: inline-flex;
  justify-content: center;
  cursor: pointer;
  border: 0;
  outline: 0;
  flex-grow: 1;
  padding: ${getPadding};
  border-radius: ${getBorderRadius};
  font-size: 16px;
  font-weight: 600;

  ${({ theme }) => theme.mediaQueries.md} {
    flex-grow: 0;
  }

  ${color}
`

Tab.defaultProps = {
  scale: 'md',
}

export default Tab
