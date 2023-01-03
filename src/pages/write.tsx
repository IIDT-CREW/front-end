import Page from '@components/Layout/Page'
import dynamic from 'next/dynamic'
const Write = dynamic(import('views/Write'))

const write = () => {
  return (
    <Page>
      <Write />
    </Page>
  )
}

export default write
