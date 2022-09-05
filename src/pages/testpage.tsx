import { withAuthServerSideProps } from 'hoc/withAuthServerSide'
const TestPage = (props) => {
  return <div style={{ marginTop: '100px' }}></div>
}

export default withAuthServerSideProps(TestPage)
