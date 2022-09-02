import Main from 'views/Main'
import type { GetServerSideProps, NextPage } from 'next'
import { dehydrate, QueryClient, useQuery } from 'react-query'
import { getWill, getMyWill } from 'api/will'

const MainPage = () => {
  return <Main />
}

export default MainPage
export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient()
  const token = context.req?.cookies
  console.log('token = ', token)
  console.log('token = ', token?.accessToken)
  // await queryClient.prefetchQuery('getMyWill', () => getMyWill({
  //   mem_userid,
  //   mem_email,
  // })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
