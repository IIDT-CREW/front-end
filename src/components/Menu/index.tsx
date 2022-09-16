import { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import Flex from '../Common/Box/Flex'
import { Heading } from '../Common'
import Link from 'next/link'
import { Box } from '../Common/Box'
import { Button } from 'components/Common/Button'
import MenuItem from 'components/Menu/MenuItem'
import DropdownMenu from './DropdownMenu'
import MenuConfig from './config'
import { naviActions } from 'store/navi'
import { useIsLogin } from 'store/auth/hooks'
import useTheme, { THEME_TYPE } from 'hooks/useTheme'
import ThemeToggleButton from '../Common/Button/ThemeToggleButton'
import { useModal } from 'components/Common'
import { MENU_HEIGHT } from 'config/constants/default'
import MenuOutline from 'components/Common/Svg/Icons/MenuOutline'
import LoginModal from 'components/LoginModal'

export const St = {
  Wrapper: styled.div`
    position: relative;
    width: 100%;
    z-index: 10;
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
  const [showMenu, setShowMenu] = useState(true)
  const isLogin = useIsLogin()
  const [presentLoginModal] = useModal(<LoginModal />)

  const handleLogin = () => {
    //todo login
    presentLoginModal()
  }

  const { setTheme, isDark } = useTheme()

  const handleDark = () => {
    setTheme(isDark ? THEME_TYPE.LIGHT : THEME_TYPE.DARK)
  }

  const handleMenu = () => {
    dispatch(naviActions.menuOnOff())
  }

  return (
    <St.Wrapper>
      <St.FixedContainer showMenu={showMenu} height={MENU_HEIGHT}>
        <St.StyledNav>
          <Flex justifyContent="center" alignItems="center">
            <Flex style={{ cursor: 'pointer' }}>
              <Link href={isLogin ? '/main' : '/'}>
                <Heading scale="lg" style={{ fontFamily: 'Cormorant' }}>
                  IIDT
                </Heading>
              </Link>
            </Flex>
            {MenuConfig &&
              MenuConfig.map((menuItem, i) => {
                return (
                  <DropdownMenu key={`${menuItem}-${i}`} items={menuItem.items}>
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
                <Box onClick={handleMenu} style={{ cursor: 'pointer' }}>
                  <MenuOutline />
                </Box>
              </>
            ) : (
              <>
                <Button onClick={handleLogin}>시작하기</Button>
              </>
            )}
          </Flex>
        </St.StyledNav>
      </St.FixedContainer>
    </St.Wrapper>
  )
}

export default MenuWrapper
