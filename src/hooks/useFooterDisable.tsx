import { useRouter } from 'next/router'
const useFooterDisable = () => {
  const router = useRouter()
  const isWritePage = router.pathname.indexOf('/write') !== -1
  return isWritePage
}

export default useFooterDisable
