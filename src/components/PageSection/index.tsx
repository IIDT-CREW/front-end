import styled from 'styled-components'
import { BoxProps, Box, Flex, FlexProps } from 'components/Common'
import Container from 'components/Layout/Container'

interface PageSectionProps extends BackgroundColorProps {
  svgFill?: string
  dividerComponent?: React.ReactNode
  containerProps?: BoxProps
  innerProps?: BoxProps
}

interface BackgroundColorProps extends FlexProps {
  index: number
  background?: string
  getPadding?: () => string
}

const BackgroundColor = styled(Flex)<BackgroundColorProps>`
  position: relative;
  flex-direction: column;
  align-items: center;
  z-index: ${({ index }) => index - 1};
  background: ${({ background, theme }) => background || theme.colors.background};
  padding: ${({ getPadding }) => getPadding()};
`

const ChildrenWrapper = styled(Container)`
  min-height: auto;
  padding-top: 16px;
  padding-bottom: 16px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-top: 32px;
    padding-bottom: 32px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-top: 48px;
    padding-bottom: 48px;
  }
`

const PageSection: React.FC<PageSectionProps> = ({
  children,
  background,
  index = 1,
  dividerComponent,
  containerProps,
  innerProps,
  ...props
}) => {
  const getPadding = () => {
    return '48px 0'
  }

  return (
    <Box {...containerProps}>
      <BackgroundColor background={background} index={index} getPadding={getPadding} {...props}>
        <ChildrenWrapper {...innerProps}>{children}</ChildrenWrapper>
      </BackgroundColor>
    </Box>
  )
}

export default PageSection
