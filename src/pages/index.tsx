import dynamic from 'next/dynamic'
const Home = dynamic(import('@/views/Home'))

const IndexPage = () => {
  return <Home />
}

export default IndexPage
