import { useSelector } from 'react-redux'
import { RootState } from 'store'

export function useNaviState(): RootState['navi'] {
  return useSelector<RootState, RootState['navi']>((state) => state.navi)
}

// export function useIsLogin(): boolean {
//   const { isAuthenticated } = useSelector<AppState, AppState['auth']>((state) => state.auth)
//   return isAuthenticated
// }

// export function useUserInfo(): { name: string; email: string } {
//   const { name, email } = useSelector<AppState, AppState['auth']>((state) => state.auth)
//   return { name, email }
// }
