import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { authActions } from '.'
import { RootState } from '../index'

export function useAuthState(): RootState['auth'] {
  return useSelector<RootState, RootState['auth']>((state) => state.auth)
}

export function useIsLogin(): boolean {
  const { isAuthenticated } = useSelector<RootState, RootState['auth']>((state) => state.auth)
  return isAuthenticated
}

export function useUserInfo(): { memIdx: number; userid: string; name: string; email: string; nickname: string } {
  const { userid, name, email, nickname, memIdx } = useSelector<RootState, RootState['auth']>((state) => state.auth)
  return { userid, name, email, nickname, memIdx }
}

export function useSetAuth() {
  const dispatch = useDispatch()
  const handleSetAuth = ({ accessToken, info }: { accessToken: string; info: any }) => {
    return dispatch(
      authActions.setAuth({
        isAuthenticated: true,
        accessToken: accessToken,
        name: info.name,
        email: info.email,
        nickname: info.nickname,
        userid: info.userid,
        memIdx: info.memIdx,
      }),
    )
  }
  return handleSetAuth
}
