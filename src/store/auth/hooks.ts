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

export function useUserInfo(): { name: string; email: string } {
  const { name, email } = useSelector<AppState, AppState['auth']>((state) => state.auth)
  return { name, email }
}
