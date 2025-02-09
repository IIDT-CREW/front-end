import styled from 'styled-components'
import Head from 'next/head'
import { usePathname, useRouter } from 'next/navigation'
import { DEFAULT_META, getCustomMeta } from '@/config/constants/meta'
import Box from '@/components/Common/Box/Box'
// import Container from './Container'

type StyledPageProps = {
  isFullPage: boolean
}
const StyledPage = styled(Box)<StyledPageProps>`
  ${({ theme }) => theme.mediaQueries.sm} {
    padding-top: 50px;
    padding-bottom: 24px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-top: 50px;
    padding-bottom: 32px;
  }

  ${({ isFullPage }) => isFullPage && 'padding-top: 0px !important;'}
`

export const PageMeta: React.FC<{ title?: string; content?: string }> = ({ title: mainTitle, content }) => {
  const pathname = usePathname()

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
  isFullPage?: boolean
}

const Page: React.FC<PageProps> = ({ children, title, content, isFullPage = false, ...props }) => {
  return (
    <>
      <PageMeta title={title} content={content} />
      <StyledPage {...props} isFullPage={isFullPage}>
        {children}
      </StyledPage>
    </>
  )
}

export default Page
