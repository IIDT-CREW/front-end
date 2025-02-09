import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'
import LoaderPage from '@/components/LoaderPage'

import useLoginTransaction from '@/hooks/useLoginTransaction'
const AuthCallback = () => {
  const router = useRouter()
  const { handleLoginTransaction } = useLoginTransaction()

  const loginTransaction = useCallback(() => {
    handleLoginTransaction({ isLogin: true })
  }, [handleLoginTransaction])

  // with
  useEffect(() => {
    const authParams = router.query.auth
    const code = router.query.code as string
    const access_token = router?.asPath?.split('=')[1]?.split('&')[0] //token 출력
    if (code || access_token) {
      if (authParams?.length === 0) return
      try {
        loginTransaction()
      } catch (e) {
        console.log(e)
      }
    }
  }, [router])

  return <LoaderPage />
}
export default AuthCallback
