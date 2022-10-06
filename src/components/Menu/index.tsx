import { useRouter } from 'next/router'
import { useMemo, useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import styled, { css } from 'styled-components'
import useScrollDown from 'hooks/useScrollDown'
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
import ThemeToggleButton from '../Common/Button/ThemeToggleButton'
import { useModal } from 'components/Common'
import { MENU_HEIGHT } from 'config/constants/default'
import MenuOutline from 'components/Common/Svg/Icons/MenuOutline'
import LoginModal from 'components/LoginModal'

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
}

const MenuWrapper = ({ themeMode, toggleTheme }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [showMenu, setShowMenu] = useState(true)
  const isLogin = useIsLogin()
  const { isScrollDown, setIsScrollDown } = useScrollDown()
  const [presentLoginModal] = useModal(<LoginModal />)

  const handleLogin = () => {
    //todo login
    presentLoginModal()
  }

  const handleDark = () => {
    toggleTheme()
  }

  const handleMenu = () => {
    dispatch(naviActions.menuOnOff())
  }

  const isSharePage = useMemo(() => {
    return router.route === '/will/[id]'
  }, [router])

  useEffect(() => {
    if (isSharePage) setIsScrollDown(true)
  }, [isSharePage])

  return (
    <St.Wrapper>
      <St.FixedContainer showMenu={showMenu} height={MENU_HEIGHT} isScrollDown={isScrollDown} id="app-bar">
        <St.StyledNav isSharePage={isSharePage}>
          <Flex justifyContent="center" alignItems="center">
            <Flex style={{ cursor: 'pointer' }}>
              <Link href={isLogin ? '/main' : '/'}>
                <Heading scale="lg" style={{ fontFamily: 'Cormorant' }}>
                  IIDT
                </Heading>
              </Link>
            </Flex>
            {MenuConfig?.map((menuItem, i) => {
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
            <ThemeToggleButton selected={themeMode === 'dark'} onClick={handleDark} />
            {isLogin ? (
              <>
                <Box onClick={handleMenu} style={{ cursor: 'pointer' }}>
                  <MenuOutline stroke={isSharePage && '#fff'} themeMode={themeMode} />
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
