import styled from 'styled-components'
import { Button, Heading, Text, LogoIcon } from 'components/Common'
import Page from 'components/Layout/Page'
import Link from 'next/link'

const StyledNotFound = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
  justify-content: center;
`

const NotFound = () => {
  return (
    <Page>
      <StyledNotFound>
        <LogoIcon width="64px" mb="8px" />
        <Heading scale="xxl">404</Heading>
        <Text mb="16px">{'Oops, page not found.'}</Text>
        <Link href="/" passHref>
          <Button as="button" scale="sm">
            {'Back Home'}
          </Button>
        </Link>
      </StyledNotFound>
    </Page>
  )
}

export default NotFound
