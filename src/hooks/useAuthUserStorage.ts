import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { isEqual, isEmpty } from 'lodash'
import { decryptWithAES, encryptWithAES } from 'utils/crypto'
import { useAuthState } from 'store/auth/hooks'
import { authActions } from 'store/auth'
import { STORAGE_NAME } from 'config/constants/api'

const useAuthUserStorage = () => {
  const dispatch = useDispatch()
  const authState = useAuthState()

  // a. 최초 진입 시
  useEffect(() => {
    const strData =
      localStorage.getItem(STORAGE_NAME.USER) || sessionStorage.getItem(STORAGE_NAME.USER)
    if (!isEmpty(strData)) {
      dispatch(authActions.setAuth(JSON.parse(decryptWithAES(strData))))
    }
  }, [])

  //b. state 변경 시, localStorage/sessionStorage 갱신
  useEffect(() => {
    // 아직 초기화 되지 않은 데이터는 저장하지 않는다.
    if (!authState.isAuthenticated) return

    const currLocalValue = localStorage.getItem(STORAGE_NAME.USER)
    const currSessionValue = sessionStorage.getItem(STORAGE_NAME.USER)
    const currDecryptLocalValue = decryptWithAES(currLocalValue)
    const currDecryptSessionValue = decryptWithAES(currSessionValue)

    // 전부 다 같으면 pass
    if (
      currLocalValue === currSessionValue &&
      isEqual(JSON.parse(currDecryptLocalValue), authState)
    ) {
      return
    }

    // 다르면!
    if (isEqual(JSON.parse(currDecryptLocalValue), authState)) {
      // localStorage 만 state와 같으면 sessionStorage 같은 값 설정
      sessionStorage.setItem(STORAGE_NAME.USER, currLocalValue)
    } else if (isEqual(JSON.parse(currDecryptSessionValue), authState)) {
      // sessionStorage 만 state와 같으면 localStorage 같은 값 설정
      localStorage.setItem(STORAGE_NAME.USER, currSessionValue)
    } else {
      // localStorage/sessionStorage 이 state와 다르면, 신규 값 설정
      const encDataString = encryptWithAES(JSON.stringify(authState))
      sessionStorage.setItem(STORAGE_NAME.USER, encDataString)
      localStorage.setItem(STORAGE_NAME.USER, encDataString)
    }
  }, [authState])

  useEffect(() => {
    // LocalStorage 변경 이벤트! (sessionStorage는 감지되지 않는다!)
    const setStorage = ({ key, oldValue, newValue }) => {
      // 내 storage만 확인
      if (key !== STORAGE_NAME.USER) return

      // newValue가 null 이면 다른 페이지가 닫힘, 로그인 유지
      if (isEmpty(newValue)) {
        localStorage.setItem(STORAGE_NAME.USER, oldValue)
        return
      }

      const decOldValue = decryptWithAES(oldValue)
      const decNewValue = decryptWithAES(newValue)
      if (
        decOldValue === decNewValue ||
        (!isEmpty(decOldValue) && isEqual(JSON.parse(decOldValue), JSON.parse(decNewValue)))
      ) {
        return
      }

      sessionStorage.setItem(STORAGE_NAME.USER, newValue)
      dispatch(authActions.setAuth(JSON.parse(decNewValue)))
    }

    // LocalStorage 만 반응함
    window.addEventListener('storage', setStorage, false)
    return () => {
      window.removeEventListener('storage', setStorage, false)
    }
  }, [])

  useEffect(() => {
    const handleLogout = () => {
      localStorage.removeItem(STORAGE_NAME.USER)
    }
    window.addEventListener('beforeunload', handleLogout)
  }, [])
}

export default useAuthUserStorage
