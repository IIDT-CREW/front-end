import noop from 'lodash/noop'
import { DropdownMenuItems, DropdownMenuItemType } from './types'

const ItemsMock: DropdownMenuItems[] = [
  {
    label: 'Exchange',
    href: '/swap',
  },
  {
    label: 'Liquidity',
    href: '/pool',
  },
  {
    label: 'LP Migration',
    href: '',
    type: DropdownMenuItemType.EXTERNAL_LINK,
  },
  {
    type: DropdownMenuItemType.DIVIDER,
  },
  {
    label: 'Disconnect',
    onClick: noop,
    type: DropdownMenuItemType.BUTTON,
  },
]

const MenuItemsMock = [
  {
    label: 'Home',
    href: '/',
    items: ItemsMock,
  },
  {
    label: 'mypage',
    href: '/',
    items: ItemsMock,
  },
]

export default MenuItemsMock
