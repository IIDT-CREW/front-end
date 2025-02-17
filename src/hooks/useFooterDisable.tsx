import { useRouter } from 'next/router'
const useFooterDisable = () => {
  const router = useRouter()
  const pathname = router.pathname
  const isWritePage = pathname.indexOf('/write') !== -1
  return isWritePage
}

export default useFooterDisable
