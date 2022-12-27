import styled from 'styled-components'
import Link from 'next/link'

type StyledMenuItemProps = {
  isActive: boolean
}
const St = {
  StyledMenuItem: styled.div<StyledMenuItemProps>`
    font-size: 12px;
    margin: 0 10px;
    align-items: center;
    cursor: pointer;
    font-weight: ${({ isActive }) => (isActive ? '600' : '400')};
    &:hover {
      background: ${({ theme }) => theme.colors.tertiary};
    }
    z-index: 9999;

    ${({ theme }) => theme.mediaQueries.sm} {
      font-size: 14px;
    }
    ${({ theme }) => theme.mediaQueries.lg} {
      font-size: 18px;
    }
  `,
}
type MenuItemProps = {
  isActive: boolean
  children: React.ReactNode
  href: string
}
const MenuItem = ({ isActive, children, href }: MenuItemProps) => {
  return (
    <St.StyledMenuItem isActive={isActive}>
      <Link href={href}>{children}</Link>
    </St.StyledMenuItem>
  )
}

export default MenuItem
