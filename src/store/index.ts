import { configureStore } from '@reduxjs/toolkit'
import auth from './auth'
import navi from './navi'
import { useSelector, useDispatch } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'

// ### 리듀서 State 타입 정의
// 리덕스 store 생성함수
const makeStore = () => {
  // 슬라이스 통합 store 생성
  const store = configureStore({
    reducer: {
      auth: auth.reducer,
      navi: navi.reducer,
    },
    // middleware는 configureStore에서 자동으로 기본값 설정
    devTools: process.env.NODE_ENV === 'development', // 개발자도구 설정
  })

  return store
}

// store 생성
const store = makeStore()

// store 엑스포트
export default store

// RootState 엑스포트
export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
