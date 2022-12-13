import { DefaultResponse } from '../types'
export type Answer = {
  question_index: string
  question_answer: string
}
export interface Meta {
  pageNo: number
  pageSize: number
  totalCount: number
  totalPageCount: number
  nextPageNo: number
  isLast: boolean
}

export type Will = {
  CONTENT: string
  EDIT_DATE: string
  IS_DELETE: number
  IS_PRIVATE: number
  MEM_IDX: number
  REG_DATE: string
  THUMBNAIL: string
  TITLE: string
  WILL_ID: string
  CONTENT_TYPE: number
  ANSWER_LIST?: Answer[]
  MEM_NICKNAME?: string
}

export type GetWillCount = Omit<DefaultResponse, 'result'> & {
  result: number
}

export type GetMyWill = Omit<DefaultResponse, 'result'> & {
  result: Will[]
}

export type GetWill = Omit<DefaultResponse, 'data'> & {
  result: Will
}

export type GetMyWillParams = {
  memIdx: string
  pageNo: string
  pageSize: string
}

export type InsertWillParams = {
  title: string
  content: string
  thumbnail: string
  mem_idx: number
  will_id: string
  content_type
  is_private: boolean
  answer_list?: Answer[] | null
}

export type DeleteWillParams = {
  will_id: string
}
