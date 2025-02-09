// import { NotepadLoader } from 'react-loaders-kit'
import { Text, Flex } from '@/components/Common'
import PageSection from '@/components/PageSection'
import NotepadLoader from 'react-loaders-kit/lib/notepad/NotepadLoader'

const LoaderPage = () => {
  const loaderProps = {
    loading: true,
    size: 35,
    duration: 1,
    colors: ['#5e22f0', '#f6b93b'],
  }
  const PageStyle = { height: '100vh', width: '100%' }
  return (
    <PageSection innerProps={{ style: PageStyle }} index={1}>
      <Flex
        justifyContent="center"
        alignItems="center"
        style={{ height: '100%', width: '100%' }}
        flexDirection="column"
      >
        <NotepadLoader {...loaderProps} />
      </Flex>
    </PageSection>
  )
}
export default LoaderPage
