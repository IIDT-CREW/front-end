import styled from 'styled-components'
import { scales, HeadingProps } from './types'
import Text from '../Text/Text'

const style = {
  [scales.MD]: {
    fontSize: '18px',
    fontSizeLg: '18px',
  },
  [scales.LG]: {
    fontSize: '26px',
    fontSizeLg: '26px',
  },
  [scales.XL]: {
    fontSize: '36px',
    fontSizeLg: '36px',
  },
  [scales.XXL]: {
    fontSize: '45px',
    fontSizeLg: '45px',
  },
}

const Heading = styled(Text).attrs({ bold: true })<HeadingProps>`
  font-size: ${({ scale }) => style[scale || scales.MD].fontSize};
  font-weight: 600;
  line-height: 1.1;
  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: ${({ scale }) => style[scale || scales.MD].fontSizeLg};
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    font-size: ${({ scale }) => style[scale || scales.LG].fontSizeLg};
  }
`

export default Heading
