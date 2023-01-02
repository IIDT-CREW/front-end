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
        title: `오늘 유서`,
        description: '마지막으로, 오늘 당신에게 유서를 전달합니다.',
        image: '',
      }
    case '/about':
      return {
        title: `오늘 유서에 대하여 `,
        description: '오늘 유서를 써보기로 했습니다.',
        image: '',
      }

    case '/memorials':
      return {
        title: `어떤 날의 오늘 유서들`,
        description: '누군가의, 어느날의 유서. 삶을 되돌아 보세요',
        image: '',
      }
    default:
      return null
  }
}
