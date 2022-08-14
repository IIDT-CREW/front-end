import Heading from './Heading'

export default {
  title: 'components/Heading',
  component: Heading,
  argTypes: {},
}

export const HeadingSize = () => {
  return (
    <>
      <Heading>Default</Heading>
      <Heading scale="md">md</Heading>
      <Heading scale="lg">lg</Heading>
      <Heading scale="xl">xl</Heading>
      <Heading scale="xxl">xxl</Heading>
    </>
  )
}
