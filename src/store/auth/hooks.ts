import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, AppState } from '../index'
import { authActions } from './'

export function useAuthState(): AppState['auth'] {
  return useSelector<AppState, AppState['auth']>((state) => state.auth)
}

export function useIsLogin(): boolean {
  const { isAuthenticated } = useSelector<AppState, AppState['auth']>((state) => state.auth)
  return isAuthenticated
}

export function useUserInfo(): { memIdx: number; userid: string; name: string; email: string; nickname: string } {
  const { userid, name, email, nickname, memIdx } = useSelector<AppState, AppState['auth']>((state) => state.auth)
  return { userid, name, email, nickname, memIdx }
}
