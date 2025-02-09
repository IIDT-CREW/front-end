import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store'
import { naviActions } from '.'

export function useNaviState(): RootState['navi'] {
  return useSelector<RootState, RootState['navi']>((state) => state.navi)
}

export function useGetIsScrollDown() {
  return useSelector<RootState, boolean>((state) => state.navi.isScrollDown)
}

export function useMenuOff() {
  const dispatch = useDispatch()
  const handleMenuOff = useCallback(() => {
    dispatch(naviActions.menuOff())
  }, [dispatch])

  return handleMenuOff
}
export function useIsScrollDown() {
  const isScrollDown = useGetIsScrollDown()
  const dispatch = useDispatch()
  const handleSetIsScrollDown = useCallback(
    (payload: boolean) => {
      dispatch(naviActions.scrollDown(payload))
    },
    [dispatch],
  )

  return { isScrollDown, handleSetIsScrollDown }
}

// export function useUserInfo(): { name: string; email: string } {
//   const { name, email } = useSelector<AppState, AppState['auth']>((state) => state.auth)
//   return { name, email }
// }
