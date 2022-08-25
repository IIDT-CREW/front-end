import { NotepadLoader } from 'react-loaders-kit'
import { Flex } from 'components/Common/Box'
import PageSection from 'components/PageSection'

const LoaderPage = () => {
  const PageStyle = { height: '100vh', width: '100%' }
  return (
    <PageSection innerProps={{ style: PageStyle }} index={1}>
      <Flex justifyContent="center" alignItems="center" style={{ height: '100%', width: '100%' }}>
        <NotepadLoader loading={true} size={45} duration={3} colors={['#000', '#000']} />
      </Flex>
    </PageSection>
  )
}
export default LoaderPage
