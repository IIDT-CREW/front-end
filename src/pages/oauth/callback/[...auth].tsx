import { useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { authActions } from 'store/auth'
import { getUserInfo } from 'api/auth'
import LoaderPage from 'components/LoaderPage'
import { STORAGE_NAME, API_CODE, API_URL } from 'config/constants/api'
import { encryptWithAES } from 'utils/crypto'

// Create axios instance.
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

const AuthCallback = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  async function getUser() {
    try {
      const res = await getUserInfo()
      if (res.data && res.data.code === API_CODE.SUCCESS) {
        const { result: userInfo } = res.data

        return {
          memIdx: userInfo.MEM_IDX,
          name: userInfo.MEM_USERNAME,
          email: userInfo.MEM_EMAIL,
          nickname: userInfo.MEM_NICKNAME,
          userid: userInfo.MEM_USERID,
        }
      }
    } catch (e) {
      return null
    }
  }

  async function loginTransaction(coperation: string, code: string) {
    try {
      if (coperation === 'apple') {
        const test = async () => {
          try {
            //appleid.apple.com/auth/token" -H "Content-Type: application/x-www-form-urlencoded" -d "client_id={client_id}&client_secret={client_secret}&grant_type=authorization_code&code={code}" | json_pp

            const data = {
              client_id: 'com.bundle.sample.client.test',
              client_secret: process.env.NEXT_APPLE_SECRET,
              code: code,
              grant_type: 'authorization_code',
            }
            const res = await axios.post('https://appleid.apple.com/auth/token', data)
            console.log('res = ', res)
          } catch (e) {
            console.log('apple error ! ', e)
          }
        }
        test()
        return
      }

      const res = await axiosInstance({
        method: 'GET',
        url: `${API_URL}/api/oauth/callback/${coperation}?code=${code}`,
      })
      if (res) {
        const ACCESS_TOKEN = res.data.accessToken
        const bearer = `Bearer ${ACCESS_TOKEN}`
        axios.defaults.headers.common['Authorization'] = bearer
        // axios.defaults.headers.common['refresh'] = REFRESH_TOKEN

        const info = await getUser()
        if (info) {
          dispatch(
            authActions.setAuth({
              isAuthenticated: true,
              accessToken: ACCESS_TOKEN,
              name: info.name,
              email: info.email,
              nickname: info.nickname,
              userid: info.userid,
              memIdx: info.memIdx,
            }),
          )
          const encDataString = encryptWithAES(
            JSON.stringify({
              isAuthenticated: true,
              accessToken: ACCESS_TOKEN,
              name: info.name,
              email: info.email,
              nickname: info.nickname,
              userid: info.userid,
              memIdx: info.memIdx,
            }),
          )
          localStorage.setItem(STORAGE_NAME.USER, encDataString) //예시로 로컬에 저장함
        }

        const path = localStorage.getItem('login_path')
        if (path === '/') router.push('/main')
        if (path !== '/') router.replace(path)

        localStorage.removeItem('login_path')
      }
    } catch (e) {
      alert('오류가 발생했습니다. 로그인 재 시도해주세요')
      router.replace('/')
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
