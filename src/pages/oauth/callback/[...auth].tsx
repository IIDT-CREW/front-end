import { useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'api'
import { useDispatch } from 'react-redux'
import { authActions } from 'store/auth'
import { getUserInfo } from 'api/auth'
import LoaderPage from 'components/LoaderPage'
import { STORAGE_NAME, API_CODE } from 'config/constants/api'
import { decryptWithAES, encryptWithAES } from 'utils/crypto'

const AuthCallback = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  async function getUser() {
    try {
      const res = await getUserInfo()
      if (res.data && res.data.code === API_CODE.SUCCESS) {
        const { data: userInfo } = res.data
        console.log(userInfo)
        return {
          id: '',
          name: userInfo.MEM_USERNAME,
          email: userInfo.MEM_EMAIL,
          nickname: userInfo.MEM_NICKNAME,
        }
      }
    } catch (e) {
      return null
    }
  }

  async function loginTransaction(coperation: string, code: string) {
    try {
      const res = await axios({
        method: 'GET',
        url: `http://localhost:3031/api/oauth/callback/${coperation}?code=${code}`,
      })
      if (res) {
        const ACCESS_TOKEN = res.data.accessToken
        const REFRESH_TOKEN = res.data.refreshToken
        const bearer = `Bearer ${ACCESS_TOKEN}`
        axios.defaults.headers.common['Authorization'] = bearer
        axios.defaults.headers.common['refresh'] = REFRESH_TOKEN
        const info = await getUser()
        console.log('[getUser] info= ', info)
        if (info) {
          dispatch(
            authActions.setAuth({
              isAuthenticated: true,
              accessToken: ACCESS_TOKEN,
              name: info.name,
              email: info.email,
              nickname: info.nickname,
            }),
          )
          const encDataString = encryptWithAES(
            JSON.stringify({
              isAuthenticated: true,
              accessToken: ACCESS_TOKEN,
              name: info.name,
              email: info.email,
              nickname: info.nickname,
            }),
          )
          localStorage.setItem(STORAGE_NAME.USER, encDataString) //예시로 로컬에 저장함
          router.replace('/') // 토큰 받았았고 로그인됐으니 화면 전환시켜줌(메인으로)
        }
      }
    } catch (e) {
      console.log(e)
      alert('오류가 발생했습니다. 로그인 재 시도해주세요')
      router.replace('/') // 토큰 받았았고 로그인됐으니 화면 전환시켜줌(메인으로)
      return null
    }
  }

  // with
  useEffect(() => {
    const authParams = router.query.auth
    const code = router.query.code as string
    const access_token = router?.asPath?.split('=')[1]?.split('&')[0] //token 출력

    if (code || access_token) {
      if (authParams?.length === 0) return
      const coperation = authParams[0]
      try {
        loginTransaction(coperation, code)
      } catch (e) {
        console.log(e)
      }

      //...todo
      if (coperation === 'apple') {
      }
    }
  }, [router])

  return (
    <>
      <LoaderPage />
    </>
  )
}
export default AuthCallback
