import { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import Flex from '../Common/Box/Flex'
import Link from 'next/link'
import { Box } from '../Common/Box'
import { Button, ToggleButton } from 'components/Common/Button'
import { Text } from 'components/Common/Text'
import MenuItem from 'components/Menu/MenuItem'
import DropdownMenu from './DropdownMenu'
import MenuConfig from './config'
import { useRouter } from 'next/router'
import { getActiveMenuItem, getActiveSubMenuItem } from './utils'
import { authActions } from 'store/auth'
import { useIsLogin, useUserInfo } from 'store/auth/hooks'
import useTheme, { THEME_TYPE } from 'hooks/useTheme'
import ThemeToggleButton from '../Common/Button/ThemeToggleButton'

const MENU_HEIGHT = 50
const St = {
  Wrapper: styled.div`
    position: relative;
    width: 100%;
    z-index: 99999;
  `,
  StyledNav: styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: ${MENU_HEIGHT}px;
    background-color: ${({ theme }) => theme?.nav?.background};
    border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
    transform: translate3d(0, 0, 0);

    padding-left: 16px;
    padding-right: 16px;
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
  FixedContainer: styled.div<{ showMenu: boolean; height: number }>`
    position: fixed;
    top: ${({ showMenu, height }) => (showMenu ? 0 : `-${height}px`)};
    left: 0;
    transition: top 0.2s;
    height: ${({ height }) => `${height}px`};
    width: 100%;
    z-index
  `,
}

const MenuWrapper = () => {
  const dispatch = useDispatch()
  const { pathname } = useRouter()
  const router = useRouter()
  const [showMenu, setShowMenu] = useState(true)
  const activeMenuItem = getActiveMenuItem({ menuConfig: MenuConfig, pathname })
  const activeSubMenuItem = getActiveSubMenuItem({ menuItem: activeMenuItem, pathname })
  const isLogin = useIsLogin()
  const { name, email } = useUserInfo()

  const handleLogin = () => {
    //todo login
  }

  const handleLogout = async () => {
    try {
      //todo logout
    } catch (e) {
      console.log('logout ', e)
    }

    router.replace('/')
  }

  const { setTheme, isDark } = useTheme()

  const handleDark = () => {
    setTheme(isDark ? THEME_TYPE.LIGHT : THEME_TYPE.DARK)
  }

  return (
    <St.Wrapper>
      <St.FixedContainer showMenu={showMenu} height={MENU_HEIGHT}>
        <St.StyledNav>
          <Flex justifyContent="center" alignItems="center">
            <Flex style={{ cursor: 'pointer' }}>
              <Link href="/">
                <Text mr="15px" bold fontSize="20px">
                  TestAPP
                </Text>
              </Link>
            </Flex>
            {MenuConfig &&
              MenuConfig.map((menuItem) => {
                return (
                  <DropdownMenu items={menuItem.items}>
                    <MenuItem isActive={false} href={menuItem.href}>
                      {menuItem.label}
                    </MenuItem>
                  </DropdownMenu>
                )
              })}
          </Flex>
          <Flex justifyContent="center" alignItems="center">
            <Box width="40px" height="40px" borderRadius="50%"></Box>
            <ThemeToggleButton selected={isDark} onClick={handleDark} />
            {isLogin ? (
              <>
                <Box width="40px" height="40px" borderRadius="50%">
                  <img src="" alt="" style={{ width: '100%', height: '100%' }} />
                </Box>
                <Text>{name}</Text>
                <Text>{email}</Text>
                <Button onClick={handleLogout}>로그아웃</Button>
              </>
            ) : (
              <Button onClick={handleLogin}>로그인</Button>
            )}
          </Flex>
        </St.StyledNav>
      </St.FixedContainer>
    </St.Wrapper>
  )
}

export default MenuWrapper
