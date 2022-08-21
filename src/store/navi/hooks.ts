import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, AppState } from '../index'
import { naviActions } from './'

export function useNaviState(): AppState['navi'] {
  return useSelector<AppState, AppState['navi']>((state) => state.navi)
}

// export function useIsLogin(): boolean {
//   const { isAuthenticated } = useSelector<AppState, AppState['auth']>((state) => state.auth)
//   return isAuthenticated
// }

// export function useUserInfo(): { name: string; email: string } {
//   const { name, email } = useSelector<AppState, AppState['auth']>((state) => state.auth)
//   return { name, email }
// }
