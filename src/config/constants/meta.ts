import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'title',
  description: 'description',
  image: 'image',
}

export const getCustomMeta = (path: string): PageMeta => {
  let basePath
  if (path.startsWith('/a')) {
    basePath = '/a'
  } else if (path.startsWith('/b')) {
    basePath = '/b'
  } else {
    basePath = path
  }

  switch (basePath) {
    case '/':
      return {
        title: `${'Home'} | ${'your_home'}`,
      }
    default:
      return null
  }
}
