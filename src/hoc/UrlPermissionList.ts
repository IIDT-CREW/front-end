type PermissionType = {
  menuName: string
  url: string
  isEqual: boolean
  permission: Array<string>
}

export const PERMISSION: PermissionType[] = [
  {
    menuName: 'CHECK',
    url: '/checkDec',
    isEqual: true,
    permission: ['TM', 'SM', 'GM', 'MM'],
  },
  {
    menuName: 'error page',
    url: '_error',
    isEqual: false,
    permission: ['TM', 'SM', 'GM', 'MM'],
  },
]
