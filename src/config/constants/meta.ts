import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'IIDT',
  description: '만약 오늘이 마지막이라면.',
  image: '/images/home/patrick-ryan-3kUIaB2EPp8-unsplash.jpg',
}

export const getCustomMeta = (path: string): PageMeta => {
  const basePath = path

  switch (basePath) {
    case '/will':
      return {
        title: `당신의 마지막 일기`,
        description: '',
        image: '',
      }
    default:
      return null
  }
}
