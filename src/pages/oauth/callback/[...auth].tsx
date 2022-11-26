import { useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { authActions } from 'store/auth'
import { getUserInfo } from 'api/auth'
import LoaderPage from 'components/LoaderPage'
import { STORAGE_NAME, API_CODE, API_URL } from 'config/constants/api'
import { encryptWithAES } from 'utils/crypto'
import { Modal } from 'components/Common'
import { useModal } from 'components/Common'
import NickNameModal from 'components/NickNameModal'
// Create axios instance.
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

const AuthCallback = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  //overlay click not dismiss
  const [presentNickNameModal] = useModal(<NickNameModal />, false)

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
  const handleNicknameModal = () => {
    //todo login
    presentNickNameModal()
  }

  async function loginTransaction(cooperation: string, code: string) {
    try {
      const res = await axiosInstance({
        method: 'GET',
        url: `${API_URL}/api/oauth/callback/${cooperation}?code=${code}`,
      })

      //가입이 안되어있으면
      if (res.data.code === API_CODE.INVALID_USER) {
        handleNicknameModal()
        return
      }
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
      const cooperation = authParams[0]
      try {
        loginTransaction(cooperation, code)
      } catch (e) {
        console.log(e)
      }

      //...todo
      if (cooperation === 'apple') {
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
