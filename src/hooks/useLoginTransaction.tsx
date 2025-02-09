import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getUserInfo } from 'api/auth'
import { API_CODE, STORAGE_NAME } from 'config/constants/api'
import axios from 'axios'
import { signup, socialLogin } from 'api/auth'
import { encryptWithAES } from 'utils/crypto'
import { useSetAuth } from 'store/auth/hooks'
import { ModalProps } from 'components/Common'
import { useModal } from 'components/Common'
import NickNameModal from 'components/NickNameModal'

const getUser = async () => {
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

type HandleLoginTransactionProps = ModalProps & {
  accessToken?: string
  isLogin?: boolean
  nickName?: string
}
const useLoginTransaction = () => {
  const router = useRouter()
  const handleSetAuth = useSetAuth()
  const authParams = router.query.auth
  const code = router.query.code as string
  const [accessToken, setAccessToken] = useState('')
  //overlay click not dismiss
  const [presentNickNameModal] = useModal(<NickNameModal accessToken={accessToken} />, false, true)

  const handleNicknameModal = useCallback(() => {
    presentNickNameModal()
  }, [presentNickNameModal])

  const handleLoginTransaction = useCallback(
    async ({ accessToken, isLogin, nickName, onDismiss }: HandleLoginTransactionProps) => {
      if (!code && !authParams) return
      const cooperation = authParams[0]
      try {
        const res = isLogin
          ? await socialLogin({ cooperation, code })
          : await signup({ cooperation, code, accessToken, nickname: nickName })

        //가입이 안되어있으면
        if (res.data.code === API_CODE.INVALID_USER) {
          //console.log('setting ,res.data.result.access_token ', res.data.result.access_token)
          setAccessToken(res.data.result.access_token)
          handleNicknameModal()
          return
        }

        if (res.data.code !== API_CODE.SUCCESS) return
        const ACCESS_TOKEN = res.data.accessToken
        const bearer = `Bearer ${ACCESS_TOKEN}`
        axios.defaults.headers.common['Authorization'] = bearer

        const info = await getUser()
        if (!info) return

        handleSetAuth({
          accessToken: ACCESS_TOKEN,
          info,
        })
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
        const path = localStorage.getItem('login_path')

        if (path === '/') router.push('/main')
        if (path !== '/') router.replace(path)
        localStorage.removeItem('login_path')
      } catch (e) {
        alert('오류가 발생했습니다. 로그인 재 시도해주세요')
        console.log(e)
        router.replace('/')
        return null
      } finally {
        if (onDismiss) onDismiss()
      }
    },
    [authParams, code, handleNicknameModal, handleSetAuth, router],
  )

  return { handleLoginTransaction }
}

export default useLoginTransaction
