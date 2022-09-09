import { useSelector } from 'react-redux'
import { RootState } from '../index'
import { authActions } from './'

export function useAuthState(): RootState['auth'] {
  return useSelector<RootState, RootState['auth']>((state) => state.auth)
}

export function useIsLogin(): boolean {
  const { isAuthenticated } = useSelector<RootState, RootState['auth']>((state) => state.auth)
  return isAuthenticated
}

export function useUserInfo(): { memIdx: number; userid: string; name: string; email: string; nickname: string } {
  const { userid, name, email, nickname, memIdx } = useSelector<AppState, AppState['auth']>((state) => state.auth)
  return { userid, name, email, nickname, memIdx }
}
