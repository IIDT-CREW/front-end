import { IidtMember } from './member'
import { WillEssayAnswer } from './will-essay'

export interface Will {
  will_id: string
  title: string
  content: string | null
  thumbnail: string | null
  views: number
  likes: number
  tags: string[]
  is_private: boolean
  is_deleted: boolean
  mem_idx: number
  content_type: number
  created_at: string
  updated_at: string
}

export type WillWithRelations = Will & {
  iidt_member: Pick<IidtMember, 'mem_nickname' | 'profile_img'>
  will_essay_answer: WillEssayAnswer[]
}

export type WillInsert = Omit<Will, 'will_id' | 'views' | 'likes' | 'created_at' | 'updated_at'>
export type WillUpdate = Partial<WillInsert>
