import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { decryptWithAES } from 'utils/crypto'
import { authActions } from 'store/auth'
import { STORAGE_NAME, API_CODE } from 'config/constants/api'
import { getUserInfo } from 'api/auth'
import { useIsLogin } from 'store/auth/hooks'
import axios from 'api'

const useAuthAccessToken = () => {
  const dispatch = useDispatch()
  const isLogin = useIsLogin()
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

  useEffect(() => {
    if (isLogin) return
    const getUserInfo = async () => {
      const storageData = localStorage.getItem(STORAGE_NAME.USER)
      if (!storageData) return

      const encryptStorageData = JSON.parse(decryptWithAES(storageData))
      if (!encryptStorageData) return
      const ACCESS_TOKEN = encryptStorageData.accessToken

      const bearer = `Bearer ${ACCESS_TOKEN}`
      axios.defaults.headers.common['Authorization'] = bearer

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
      }
    }

    getUserInfo()
  })

  return { hi: 'hi' }
}

export default useAuthAccessToken
