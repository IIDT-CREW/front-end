import dynamic from 'next/dynamic'
const Write = dynamic(import('views/Write'))

const write = () => {
  return <Write />
}

export default write
