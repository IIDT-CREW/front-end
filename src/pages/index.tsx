import dynamic from 'next/dynamic'
const Home = dynamic(import('views/Home'))

// import { withAuthComponent, withAuthServerSideProps } from 'hoc/withAuthServerSide'

const IndexPage = () => {
  return <Home />
}

export default IndexPage
// export default withAuthComponent(IndexPage, false)
// export const getServerSideProps = withAuthServerSideProps()
