import type { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { getWill } from '@/api/will'
import dynamic from 'next/dynamic'
const Will = dynamic(import('@/views/Will'))

const WillPage = () => {
  return <Will />
}

export default WillPage

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const queryClient = new QueryClient()
//   const { id } = context.query

//   await queryClient.prefetchQuery('getWill', () => getWill(id as string))

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   }
// }
