import styled from 'styled-components'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { DEFAULT_META, getCustomMeta } from 'config/constants/meta'
import Box from '../Common/Box/Box'
// import Container from './Container'

const StyledPage = styled(Box)`
  ${({ theme }) => theme.mediaQueries.sm} {
    padding-top: 50px;
    padding-bottom: 24px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-top: 50px;
    padding-bottom: 32px;
  }
`

export const PageMeta: React.FC<{ title?: string; content?: string }> = ({ title: mainTitle, content }) => {
  const { pathname } = useRouter()

  const pageMeta = getCustomMeta(pathname) || {}
  const { title, description, image } = { ...DEFAULT_META, ...pageMeta }
  const pageTitle = title

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta property="og:title" content={mainTitle} />
      <meta property="og:description" content={content ? content : description} />
      <meta property="og:image" content={image} />
    </Head>
  )
}

interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  content?: string
}

const Page: React.FC<PageProps> = ({ children, title, content, ...props }) => {
  return (
    <>
      <PageMeta title={title} content={content} />
      <StyledPage {...props}>{children}</StyledPage>
    </>
  )
}

export default Page
