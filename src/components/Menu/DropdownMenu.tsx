/* eslint-disable react/no-array-index-key */
import React, { useContext, useEffect, useState } from 'react'
import { usePopper } from 'react-popper'
import useOnClickOutside from 'hooks/useOnClickOutside'
import { Box } from '../Common/Box'
import Text from '../Common/Text/Text'
import { Colors } from 'theme'
import { DropdownMenuItemType, DropdownMenuProps } from './types'
import Link from 'next/link'
import styled from 'styled-components'

export const StyledDropdownMenu = styled.div<{ isOpen: boolean; isBottomNav: boolean }>`
  background-color: ${({ theme }) => theme.card.background};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: 16px;
  padding-bottom: 4px;
  padding-top: 4px;
  pointer-events: auto;
  width: ${({ isBottomNav }) => (isBottomNav ? 'calc(100% - 32px)' : '280px')};
  visibility: visible;
  z-index: 1001;

  ${({ isOpen }) =>
    !isOpen &&
    `
    pointer-events: none;
    visibility: hidden;
  `}
`
export const LinkStatus = styled(Text)<{ color: keyof Colors }>`
  border-radius: ${({ theme }) => theme.radii.default};
  padding: 0 8px;
  border: 2px solid;
  border-color: ${({ theme, color }) => theme.colors[color]};
  box-shadow: none;
  color: ${({ theme, color }) => theme.colors[color]};
  margin-left: 8px;
`
export interface StyledDropdownMenuItemProps extends React.ComponentPropsWithoutRef<'button'> {
  disabled?: boolean
  isActive?: boolean
}

export const DropdownMenuItem = styled.button<StyledDropdownMenuItemProps & { isActive: boolean }>`
  align-items: center;
  border: 0;
  background: transparent;
  color: ${({ theme, isActive }) => (isActive ? theme.colors.secondary : theme.colors.text)};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  font-weight: ${({ isActive = false }) => (isActive ? '600' : '400')};
  display: flex;
  font-size: 16px;
  height: 48px;
  justify-content: space-between;
  outline: 0;
  padding-left: 16px;
  padding-right: 16px;
  width: 100%;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.tertiary};
  }

  &:active:not(:disabled) {
    opacity: 0.85;
    transform: translateY(1px);
  }
`

export const StyledDropdownMenuItemContainer = styled.div`
  &:first-child > ${DropdownMenuItem} {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  &:last-child > ${DropdownMenuItem} {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  children,
  isBottomNav = false,
  showItemsOnMobile = false,
  activeItem = '',
  items = [],
  index,
  setMenuOpenByIndex,
  ...props
}) => {
  // const { linkComponent } = useContext(MenuContext)
  const [isOpen, setIsOpen] = useState(false)
  const [targetRef, setTargetRef] = useState<HTMLDivElement | null>(null)
  const [tooltipRef, setTooltipRef] = useState<HTMLDivElement | null>(null)
  const hasItems = items.length > 0
  const { styles, attributes } = usePopper(targetRef, tooltipRef, {
    strategy: isBottomNav ? 'absolute' : 'fixed',
    placement: isBottomNav ? 'top' : 'bottom-start',
    modifiers: [{ name: 'offset', options: { offset: [0, isBottomNav ? 6 : 0] } }],
  })

  const isMenuShow = isOpen && ((isBottomNav && showItemsOnMobile) || !isBottomNav)

  useEffect(() => {
    const showDropdownMenu = () => {
      setIsOpen(true)
    }

    const hideDropdownMenu = (evt: MouseEvent | TouchEvent) => {
      const target = evt.target as Node
      return target && !tooltipRef?.contains(target) && setIsOpen(false)
    }

    targetRef?.addEventListener('mouseenter', showDropdownMenu)
    targetRef?.addEventListener('mouseleave', hideDropdownMenu)

    return () => {
      targetRef?.removeEventListener('mouseenter', showDropdownMenu)
      targetRef?.removeEventListener('mouseleave', hideDropdownMenu)
    }
  }, [targetRef, tooltipRef, setIsOpen, isBottomNav])

  useEffect(() => {
    if (setMenuOpenByIndex && index !== undefined) {
      setMenuOpenByIndex((prevValue) => ({ ...prevValue, [index]: isMenuShow }))
    }
  }, [isMenuShow, setMenuOpenByIndex, index])

  useOnClickOutside(
    {
      current: targetRef,
    },
    () => {
      setIsOpen(false)
    },
  )

  console.log('hasITEM', hasItems)
  return (
    <Box ref={setTargetRef} {...props}>
      <Box
        onPointerDown={() => {
          setIsOpen((s) => !s)
        }}
      >
        {children}
      </Box>
      {hasItems && (
        <StyledDropdownMenu
          style={styles.popper}
          ref={setTooltipRef}
          {...attributes.popper}
          isBottomNav={isBottomNav}
          isOpen={isMenuShow}
        >
          {items
            .filter((item) => !item.isMobileOnly)
            .map(({ type = DropdownMenuItemType.INTERNAL_LINK, label, href = '/', status, ...itemProps }, itemItem) => {
              const MenuItemContent = (
                <>
                  {label}
                  {status && (
                    <LinkStatus color={status.color} fontSize="14px">
                      {status.text}
                    </LinkStatus>
                  )}
                </>
              )
              const isActive = href === activeItem
              return (
                <StyledDropdownMenuItemContainer key={itemItem}>
                  <DropdownMenuItem isActive={isActive} type="button" {...itemProps}>
                    <Link href={href}>{MenuItemContent}</Link>
                  </DropdownMenuItem>
                </StyledDropdownMenuItemContainer>
              )
            })}
        </StyledDropdownMenu>
      )}
    </Box>
  )
}

export default DropdownMenu
