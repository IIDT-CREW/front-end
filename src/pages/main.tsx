import Page from '@/components/Layout/Page'
import dynamic from 'next/dynamic'
// import type { GetServerSideProps } from 'next'
// import { dehydrate, QueryClient } from 'react-query'
// import { getWill, getMyWill } from 'api/will'

const Main = dynamic(import('@/views/Main'))

const MainPage = () => {
  return (
    <Page isFullPage>
      <Main />
    </Page>
  )
}

export default MainPage
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const queryClient = new QueryClient()
//   // const token = context.req?.cookies
//   // console.log('token = ', token)
//   // console.log('token = ', token?.accessToken)
//   // await queryClient.prefetchQuery('getMyWill', () => getMyWill({
//   //   mem_userid,
//   //   mem_email,
//   // })

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   }
// }
