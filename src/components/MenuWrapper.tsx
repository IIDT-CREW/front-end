import { Box, Text } from '@/components/Common'
import { MENU_HEIGHT } from '@/config/constants/default'
import { usePathname, useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { naviActions } from '@/store/navi'
import { authActions } from '@/store/auth'
import { STORAGE_NAME } from '@/config/constants/api'
import styled from 'styled-components'
import axios from '@/api'
import { logout } from '@/api/auth'

const St = {
  TextLink: styled(Text)`
    cursor: pointer;
  `,
}
const MenuWrapper = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const pathname = usePathname()

  const returnMarginTop = () => {
    if (pathname.includes('/main')) return 0
    if (pathname.includes('/write')) return 0
    return MENU_HEIGHT
  }

  const handleLogout = async () => {
    try {
      //...todo
      await logout()
      axios.defaults.headers.common.Authorization = ''
      axios.defaults.headers.common.refresh = ''
      localStorage.removeItem(STORAGE_NAME.USER)
      sessionStorage.removeItem(STORAGE_NAME.USER)
      dispatch(
        authActions.setAuth({
          isAuthenticated: false,
          accessToken: '',
          refreshToken: '',
          name: '',
          email: '',
        }),
      )
      dispatch(naviActions.menuOnOff())
    } catch (e) {
      console.log('logout ', e)
    }
  }

  const handleRoute = (path: string) => {
    router.push(path)
    dispatch(naviActions.menuOff())
  }
  return (
    <Box mt={`${returnMarginTop()}px`} position="absolute" padding="10px">
      <Box>
        <St.TextLink mb="24px" onClick={() => handleRoute('/')}>
          HOME
        </St.TextLink>
        <St.TextLink mb="24px" onClick={() => handleRoute('/main')}>
          MAIN
        </St.TextLink>
        <St.TextLink mb="24px" onClick={handleLogout}>
          로그아웃
        </St.TextLink>
        {/* <St.TextLink mb="24px">개인정보 처리방침</St.TextLink>
        <St.TextLink mb="24px">서비스 이용약관</St.TextLink> */}
      </Box>
    </Box>
  )
}

export default MenuWrapper
