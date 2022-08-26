import type { GetServerSideProps, NextPage } from 'next'
import Will from 'views/Will'
import { dehydrate, QueryClient, useQuery } from 'react-query'
import { getWill } from 'api/will'
const WillPage = () => {
  return <Will />
}

export default WillPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient()
  const { id } = context.query

  await queryClient.prefetchQuery('getWill', () => getWill(id as string))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
