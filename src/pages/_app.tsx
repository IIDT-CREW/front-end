import { useEffect, useRef } from 'react'
import ResetCSS from 'style/ResetCSS'
import Script from 'next/script'
import '../style/index.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Fragment } from 'react'
import { PersistGate } from 'redux-persist/integration/react'
import { useStore, persistor } from 'store'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import Providers from '../Providers'
import GlobalStyle from '../style/Global'
import useBaseQueryClient from 'hooks/queries/useBaseQueryClient'
import Menu from 'components/Menu'
import Footer from 'components/Footer'
import MenuWrapper from 'components/MenuWrapper'
import { useNaviState } from 'store/navi/hooks'
import { MENU_HEIGHT, FOOTER_HEIGHT } from 'config/constants/default'
// import useAuthUserStorage from 'hooks/useAuthUserStorage'
import useAuthAccessToken from 'hooks/useAuthAccessToken'
import * as gtag from 'utils/gtag'

import styled from 'styled-components'
import { ToastContainer } from 'react-toastify'
import 'style/custom-react-toastify.css'
import 'aos/dist/aos.css'

if (process.env.NODE_ENV === 'development') {
  import('mocks')
}

function GlobalHooks() {
  // useAuthUserStorage()
  useAuthAccessToken()
  return null
}

function MyApp(props: AppProps) {
  const { pageProps } = props
  const store = useStore(pageProps.initialReduxState)
  const queryClient = useBaseQueryClient()

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, minimum-scale=1, viewport-fit=cover"
        />
        <meta name="title" content="IIDT" />
        <meta name="description" content="오늘이 마지막이라면" />
        <meta name="theme-color" content="#FFFFFF" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
        <meta name="twitter:image" content="" />
        <meta name="twitter:description" content="-" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="" />
        <title>IIDT</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Providers store={store}>
            <GlobalHooks />
            <ResetCSS />
            <GlobalStyle />
            <PersistGate loading={null} persistor={persistor}>
              <App {...props} />
            </PersistGate>
          </Providers>
        </Hydrate>

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <Script
        strategy="afterInteractive"
        id="google-tag"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${process.env.NEXT_PUBLIC_GTAG}');
          `,
        }}
      />
    </>
  )
}

type NextPageWithLayout = NextPage & {
  Layout?: React.FC
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

// const ProductionErrorBoundary = process.env.NODE_ENV === 'production' ? ErrorBoundary : Fragment

const St = {
  Wrapper: styled.div`
    min-height: calc(100vh - ${MENU_HEIGHT}px - ${FOOTER_HEIGHT}px);
  `,
}
const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const router = useRouter()
  // Use the layout defined at the page level, if available
  const Layout = Component.Layout || Fragment
  const { isMenuOpen } = useNaviState()
  const scrollPos = useRef(0)

  useEffect(() => {
    if (isMenuOpen) {
      scrollPos.current = window.scrollY
      document.body.style.overflow = 'hidden'
      window.requestAnimationFrame(() => window.scrollTo(0, 0))
    } else {
      document.body.style.overflow = 'visible'
      window.requestAnimationFrame(() => window.scrollTo(0, scrollPos.current))
    }
  }, [isMenuOpen])

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <Menu />
      <Layout>
        {isMenuOpen && <MenuWrapper />}
        <St.Wrapper style={{ visibility: isMenuOpen ? 'hidden' : 'visible' }}>
          <Component {...pageProps} />
        </St.Wrapper>
      </Layout>
      <Footer />

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        closeOnClick
        draggable={false}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        hideProgressBar={true}
      />
    </>
  )
}

export default MyApp
