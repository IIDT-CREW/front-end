import { useRouter } from 'next/router'
import { useMemo, useState, useEffect, useRef, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import styled, { css } from 'styled-components'
import useScrollDown from 'hooks/useScrollDown'
import Flex from '../Common/Box/Flex'
import { Box, Text, useModal } from 'components/Common'
import { Heading } from '../Common'
import Link from 'next/link'

import { Button } from 'components/Common/Button'
import MenuItem from 'components/Menu/MenuItem'
import DropdownMenu from './DropdownMenu'
import MenuConfig from './config'
import { naviActions } from 'store/navi'
import { useIsLogin } from 'store/auth/hooks'
import ThemeToggleButton from '../Common/Button/ThemeToggleButton'

import { MENU_HEIGHT } from 'config/constants/default'
import MenuOutline from 'components/Common/Svg/Icons/MenuOutline'
import LoginModal from 'components/LoginModal'
import { STORAGE_NAME } from 'config/constants/api'
import axios from 'api'
import { authActions } from '@store/auth'
import { useNaviState } from '@store/navi/hooks'
import useOnClickOutside from '@hooks/useOnClickOutside'

type StyledNavigationProps = {
  isSharePage: boolean
}
const navigationBackgroundCss = css`
  background-color: rgba(19, 23, 64, 0.5);
  backdrop-filter: blur(8px);
  border: none;

  div {
    color: #fff !important;
  }
  svg {
    fill: #fff;
  }
`
export const St = {
  Wrapper: styled.div`
    position: relative;
    width: 100%;
    z-index: 10;
  `,
  StyledNav: styled.nav<StyledNavigationProps>`
    transition: background, border 0.5s;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme?.nav?.background};
    border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
    transform: translate3d(0, 0, 0);
    padding-left: 16px;
    padding-right: 16px;

    ${({ isSharePage }) => {
      return isSharePage ? `${navigationBackgroundCss}` : null
    }}
  `,
  NavigationInner: styled.div`
    display: flex;
    height: 100%;
  `,
  NavigationContainerLinkWrapper: styled.ul`
    flex-flow: row nowrap;
    display: flex;
    align-items: center;
  `,
  FixedContainer: styled.div<{ showMenu: boolean; height: number; isScrollDown: boolean }>`
    position: fixed;
    top: ${({ showMenu, height }) => (showMenu ? 0 : `-${height}px`)};
    left: 0;
    transition: all 0.5s;
    height: ${({ height }) => `${height}px`};
    width: 100%;
    transform: ${({ isScrollDown }) => (isScrollDown ? 'translate3d(0px, -100%, 0px)' : 'translate3d(0px, 0px, 0px)')};
  `,
  TextLink: styled(Text)`
    cursor: pointer;
  `,
  MobileMenuBoxWrapper: styled(Box)`
    border-radius: 4px;
    background: ${({ theme }) => theme.colors.background};
    position: absolute;
    width: 192px;
    padding: 16px 16px;
    display: flex;
    align-items: center;
    transform: translateX(-190px) translateY(25px);
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.08), 0px 16px 30px 4px rgba(0, 0, 0, 0.1);
  `,
  MenuBoxWrapper: styled(Box)`
    border-radius: 4px;
    background: ${({ theme }) => theme.colors.background};
    position: absolute;
    width: 192px;
    padding: 16px 16px;
    display: flex;
    align-items: center;
    transform: translateX(-190px) translateY(25px);
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.08), 0px 16px 30px 4px rgba(0, 0, 0, 0.1);
  `,

  MenuFlex: styled(Flex)`
    display: none;
    ${({ theme }) => theme.mediaQueries.sm} {
      display: flex;
    }
  `,
}

const MobileMenuBox = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const handleRoute = (path: string) => {
    router.push(path)
    dispatch(naviActions.menuOff())
  }
  return (
    <St.MobileMenuBoxWrapper>
      <Flex flexDirection={'column'}>
        <St.TextLink mb="24px" onClick={() => handleRoute('/')}>
          HOME
        </St.TextLink>
        <St.TextLink mb="24px" onClick={() => handleRoute('/main')}>
          MAIN
        </St.TextLink>
        <St.TextLink mb="24px" onClick={() => handleRoute('/about')}>
          소개
        </St.TextLink>
        <St.TextLink mb="24px" onClick={() => handleRoute('/memorials')}>
          어느날의 기록
        </St.TextLink>
        {/* <St.TextLink mb="24px" onClick={handleLogout}>
          로그아웃
        </St.TextLink> */}
      </Flex>
    </St.MobileMenuBoxWrapper>
  )
}
const MenuBox = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const handleLogout = async () => {
    try {
      //...todo
      //await logout()
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
    <St.MenuBoxWrapper>
      <Flex flexDirection={'column'}>
        <St.TextLink mb="24px" onClick={() => handleRoute('/')}>
          HOME
        </St.TextLink>
        <St.TextLink mb="24px" onClick={() => handleRoute('/main')}>
          MAIN
        </St.TextLink>
        <St.TextLink mb="24px" onClick={() => handleRoute('/about')}>
          소개
        </St.TextLink>
        <St.TextLink mb="24px" onClick={() => handleRoute('/memorials')}>
          어느날의 기록
        </St.TextLink>
        <St.TextLink mb="24px" onClick={handleLogout}>
          로그아웃
        </St.TextLink>
      </Flex>
    </St.MenuBoxWrapper>
  )
}
const MenuWrapper = ({ themeMode, toggleTheme }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [showMenu, setShowMenu] = useState(true)
  const isLogin = useIsLogin()
  const { isScrollDown, setIsScrollDown } = useScrollDown()
  const [presentLoginModal] = useModal(<LoginModal />)
  const { isMenuOpen } = useNaviState()
  const targetRef = useRef(null)
  const onClickEvent = () => {
    dispatch(naviActions.menuOff())
  }
  useOnClickOutside(targetRef, onClickEvent)
  const handleLogin = useCallback(() => {
    //todo login
    presentLoginModal()
  }, [presentLoginModal])

  const handleDark = useCallback(() => {
    toggleTheme()
  }, [toggleTheme])

  const handleMenu = useCallback(() => {
    dispatch(naviActions.menuOnOff())
  }, [dispatch])

  const isSharePage = useMemo(() => {
    return router.route === '/will/[id]'
  }, [router])

  useEffect(() => {
    if (isSharePage) setIsScrollDown(true)
  }, [isSharePage, setIsScrollDown])

  return (
    <St.Wrapper>
      <St.FixedContainer showMenu={showMenu} height={MENU_HEIGHT} isScrollDown={isScrollDown} id="app-bar">
        <St.StyledNav isSharePage={isSharePage}>
          <Flex justifyContent="center" alignItems="center">
            <Flex style={{ cursor: 'pointer', paddingRight: '20px' }}>
              <Link href={isLogin ? '/main' : '/'}>
                <Heading style={{ fontFamily: 'Cormorant' }}>IIDT</Heading>
              </Link>
            </Flex>
            <Flex>
              {/* 필수 띄우기 항목 */}
              <DropdownMenu items={[]}>
                <MenuItem isActive={router?.asPath?.includes('/about')} href={'/about'}>
                  소개
                </MenuItem>
              </DropdownMenu>
            </Flex>
            <St.MenuFlex>
              {MenuConfig?.map((menuItem, i) => {
                return (
                  <DropdownMenu key={`${menuItem}-${i}`} items={menuItem?.items}>
                    <MenuItem isActive={router?.asPath?.includes(menuItem?.href)} href={menuItem.href}>
                      {menuItem.label}
                    </MenuItem>
                  </DropdownMenu>
                )
              })}
            </St.MenuFlex>
          </Flex>
          <Flex justifyContent="center" alignItems="center">
            <Box width="40px" height="40px" borderRadius="50%"></Box>
            <ThemeToggleButton selected={themeMode === 'dark'} onClick={handleDark} />
            {isLogin ? (
              <Box onClick={handleMenu} style={{ cursor: 'pointer' }}>
                <MenuOutline stroke={isSharePage && '#fff'} themeMode={themeMode} />
              </Box>
            ) : (
              <Button onClick={handleLogin}>시작하기</Button>
            )}
            {isMenuOpen && (
              <Box position={'relative'} ref={targetRef}>
                <MenuBox />
              </Box>
            )}
          </Flex>
        </St.StyledNav>
      </St.FixedContainer>
      {/* <MobileMenuBox /> */}
    </St.Wrapper>
  )
}

export default MenuWrapper
