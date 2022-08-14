import { useSelector } from 'react-redux'
import { AppDispatch, AppState } from '../index'

export function useNaviState(): AppState['navi'] {
  return useSelector<AppState, AppState['navi']>((state) => state.navi)
}
