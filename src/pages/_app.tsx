import { Fragment } from 'react'
import ResetCSS from '@/style/ResetCSS'
import Script from 'next/script'
import '../style/index.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import store from '@/store'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import GlobalStyle from '../style/Global'
import Menu from '@/components/Menu'
import Footer from '@/components/Footer'
import { MENU_HEIGHT, FOOTER_HEIGHT } from '@/config/constants/default'
import useAuthAccessToken from '@/hooks/useAuthAccessToken'
import useFooterDisable from '@/hooks/useFooterDisable'
import { useDarkMode } from '@/hooks/useDarkMode'
import styled, { ThemeProvider } from 'styled-components'
import { ToastContainer } from 'react-toastify'
import { light, dark } from '@/theme'
import ModalProvider from '@/components/Common/Modal/ModalContext'
import { Provider } from 'react-redux'
import { ToastContextProvider } from '@/contexts/Toast'
// import '@/style/custom-react-toastify.css'
import 'aos/dist/aos.css'
import { AuthProvider } from '@/components/AuthProvider'

// scrollPositionRestorer()

// /* 스크롤 restore  */
// function scrollPositionRestorer() {
//   console.log('scrollMemories= ', scrollMemories)
//   let isPop = false

//   if (process.browser) {
//     window.history.scrollRestoration = 'manual'
//     window.onpopstate = () => {
//       isPop = true
//     }
//   }

//   Router.events.on('routeChangeStart', () => {
//     console.log('routeChangeStart')
//     saveScroll()
//   })

//   Router.events.on('routeChangeComplete', () => {
//     console.log('routeChangeComplete is pop', isPop)
//     if (isPop) {
//       restoreScroll()
//       isPop = false
//     } else {
//       scrollToTop()
//     }
//   })

//   function saveScroll() {
//     console.log('save scroll ', Router.asPath, window.scrollY)
//     scrollMemories[Router.asPath] = window.scrollY
//   }

//   function restoreScroll() {
//     const prevScrollY = scrollMemories[Router.asPath]
//     console.log('restoreScroll ', prevScrollY)
//     if (prevScrollY !== undefined) {
//       window.requestAnimationFrame(() => window.scrollTo(0, prevScrollY))
//     }
//   }

//   function scrollToTop() {
//     window.requestAnimationFrame(() => window.scrollTo(0, 0))
//   }
// }

function GlobalHooks() {
  // useAuthUserStorage()
  useAuthAccessToken()
  return null
}

function MyApp(props: AppProps) {
  const { pageProps } = props
  const queryClient = new QueryClient()

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, minimum-scale=1, viewport-fit=cover"
        />
        <meta name="title" content="IF I DIE TOMORROW" />
        <meta name="description" content="만약 오늘이 마지막이라면" />
        <meta name="theme-color" content="#FFFFFF" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
        <meta name="twitter:image" content="" />
        <meta name="twitter:description" content="-" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="" />
        <meta name="google-site-verification" content="PTFzfhsg8i8wffMXA_9m6MPEBWiP7uHIIcXZo2_unOI" />
        <meta name="naver-site-verification" content="42db81bfd2d4d29a8e0074a206cdf9532048a969" />

        <title>IIDT</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <AuthProvider>
            <GlobalHooks />
            <App {...props} />
          </AuthProvider>
        </Provider>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
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

  // useEffect(() => {
  //   const handleRouteChange = (url: string) => {
  //     gtag.pageview(url)
  //   }
  //   router.events.on('routeChangeComplete', handleRouteChange)
  //   return () => {
  //     router.events.off('routeChangeComplete', handleRouteChange)
  //   }
  // }, [router.events])

  // const [mounted, setMounted] = useState(false)

  // useEffect(() => {
  //   setMounted(true)
  // }, [])

  const [themeMode, toggleTheme] = useDarkMode()
  const theme = themeMode === 'light' ? light : dark

  const isFooterDisable = useFooterDisable()

  const body = (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <ResetCSS />
        <GlobalStyle />
        <ToastContextProvider>
          <ModalProvider>
            <Layout>
              <Menu themeMode={themeMode} toggleTheme={toggleTheme} />
              {/* {isMenuOpen && <MenuWrapper />} */}
              <St.Wrapper>
                <Component {...pageProps} />
              </St.Wrapper>
            </Layout>
            {!isFooterDisable && <Footer />}

            <ToastContainer
              position="bottom-right"
              autoClose={3000}
              closeOnClick
              draggable={false}
              pauseOnHover={false}
              pauseOnFocusLoss={false}
              hideProgressBar={true}
            />
          </ModalProvider>
        </ToastContextProvider>
      </AuthProvider>
    </ThemeProvider>
  )

  // if (!mounted) {
  //   return <div style={{ visibility: 'hidden' }}>{body}</div>
  // }
  return <>{body}</>
}

export default MyApp
