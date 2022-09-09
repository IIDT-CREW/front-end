import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import auth from './auth'
import navi from './navi'
import { useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'

// ### 리듀서 State 타입 정의
// 리덕스 store 생성함수
const makeStore = () => {
  // 미들웨어 추가(필요 없을 경우 생략)
  const middleware = getDefaultMiddleware()
  if (process.env.NODE_ENV === 'development') {
    // middleware.push(logger);
  }

  // 슬라이스 통합 store 생성
  const store = configureStore({
    reducer: {
      auth: auth.reducer,
      navi: navi.reducer,
    },
    middleware, // 미들웨어 불필요시 생략
    // middleware: [...getDefaultMiddleware(), logger]
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
