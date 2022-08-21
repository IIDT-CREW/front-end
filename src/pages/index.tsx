import Home from 'views/Home'
// import { withAuthComponent, withAuthServerSideProps } from 'hoc/withAuthServerSide'

const IndexPage = ({ theme }) => {
  return <Home />
}

export default IndexPage
// export default withAuthComponent(IndexPage, false)
// export const getServerSideProps = withAuthServerSideProps()
