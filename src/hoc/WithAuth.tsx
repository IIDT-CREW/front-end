import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
// import { PERMISSION } from './UrlPermissionList'
import { useAuthState } from 'store/auth/hooks'
import LoaderPage from 'components/LoaderPage'
enum RET {
  SUCCESS, // 정상
  USER_INFO_NOT_YET, // 사용자 정보 설정 되어야함
  LOGIN_NOT_YET, // 로그인 안된 상태
  NEED_PASSWORD_CHANGE, // 패스워드 변경이 필요한 상태
  CANNOT_FOUND_URL, // 비정상 URL
  REJECT_ACCESS_USER, // 상태가 'ON'이 아님(차단 or 탈퇴)
  REJECT_ACCESS_URL, // URL 권한 없음
  ALREADY_LOGIN, // 로그인 한 사용자가 login 페이지에 접속
}

const withAuth = (Component: any) => {
  return () => {
    const router = useRouter()
    const [verifyState, setVerifyState] = useState({ isLoading: true })
    //   const { state: userState } = useContext(userContext)
    const userState = useAuthState()
    /**
     * 1. 로그인 여부 확인
     * 2. 사용자 상태 확인
     * 2-1. 차단된 사용자
     * 2-2. 패스워드 변경이 필요한 사용자
     * 3. 로그인 완료된 사용자가 로그인 페이지에 접속
     * 4. 페이지 접근 권한 확인
     * 4-1. 접속 URL이 유효한지 확인
     * 4-2. 유효한 접속 URL의 권한이 있는지 확인
     */
    const checkPermission = useCallback(() => {
      const user = userState

      // 0. 사용자 정보 초기화 전에는 알 수 없음
      if (!user) return RET.USER_INFO_NOT_YET

      /**
       * 1. 로그인 여부 확인
       */
      if (!user.isAuthenticated) return RET.LOGIN_NOT_YET

      /**
       * 2. 사용사 상태 확인
       * 2-1. 차단된 사용자
       */
      // if (user.mngr_sts_cd !== 'ON') return RET.REJECT_ACCESS_USER

      /**
       * 2-2. 패스워드 변경이 필요한 사용자
       */
      // if (
      //   router.pathname !== '/login/changePassword' &&
      //   router.asPath !== '/login/changePassword' //&&
      //   // user.pwd_chg_type === 'notify'
      // ) {
      //   return RET.NEED_PASSWORD_CHANGE
      // }

      /**
       * 3. 로그인 완료된 사용자가 로그인 페이지에 접속
       */
      if (router.pathname === '/login' || router.asPath === '/login') return RET.ALREADY_LOGIN

      /**
       * 4. 페이지 접근 권한 확인
       * 4-1. 접속 URL이 유효한지 확인
       */
      // const url = PERMISSION.find((item) => {
      //   if (item.isEqual && (item.url === router.pathname || item.url === router.asPath))
      //     return true
      //   if (
      //     !item.isEqual &&
      //     (router.pathname.includes(item.url) || router.asPath.includes(item.url))
      //   ) {
      //     return true
      //   }
      //   return false
      // })
      // if (!url) return RET.CANNOT_FOUND_URL

      /**
       * 4-2. 유효한 접속 URL의 권한이 있는지 확인
       */
      // if (!url.permission.find((permission) => permission === user.mngr_autr_cd)) {
      //   return RET.REJECT_ACCESS_URL
      // }

      return RET.SUCCESS
    }, [router, userState])

    useEffect(() => {
      setVerifyState((s) => ({ ...s, isLoading: true }))
      try {
        switch (checkPermission()) {
          case RET.USER_INFO_NOT_YET:
            // 사용자 정보 설정 되어야함, 설정 중
            break
          //          case RET.REJECT_ACCESS_USER:
          // 접속 불가능한 사용자(정지 or 탈퇴)
          // NOTE. 정지된 사용자가
          // localStorage.removeItem('NFT-FRIENDS-USER-INFO')
          // sessionStorage.removeItem('NFT-FRIENDS-USER-INFO')
          // router.push('/login')
          // break
          case RET.LOGIN_NOT_YET:
            // 로그인 안된 상태
            if (router.pathname === '/login' || router.asPath === '/login') {
              setVerifyState((s) => ({ ...s, isLoading: false }))
            } else {
              router.push('/login')
            }
            break
          // case RET.NEED_PASSWORD_CHANGE:
          //   // 패스워드 변경필요
          //   router.push('/login/changePassword')
          //   break
          // case RET.CANNOT_FOUND_URL:
          // case RET.REJECT_ACCESS_URL:
          case RET.ALREADY_LOGIN:
            // 비정상 URL, 사용자가 권한 없는 URL 접근, 이미 로그인
            router.push('/')
            break
          case RET.SUCCESS:
            // 성공
            setVerifyState((s) => ({ ...s, isLoading: false }))
            break
          default:
        }
      } catch (error) {
        if (router.pathname === '/login' || router.asPath === '/login') {
          setVerifyState((s) => ({ ...s, isLoading: false }))
        } else {
          router.push('/login')
        }
      }
    }, [checkPermission, router])

    return verifyState.isLoading ? (
      <LoaderPage />
    ) : (
      <>
        <Component />
      </>
    )
  }
}

export default withAuth
