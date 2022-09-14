interface DefaultResponse {
  code: string
  reason: string
  result: any
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
}

export type GetWillCount = Omit<DefaultResponse, 'result'> & {
  result: number
}

export type GetMyWill = Omit<DefaultResponse, 'result'> & {
  result: Will[]
}

export type GetWill = Omit<DefaultResponse, 'result'> & {
  result: Will
}

// export type InsertWill = {}
// export type DeleteWill = {}
// export type UpdateWill = {}

export type GetMyWillParams = {
  mem_email: string
  mem_userid: string
}

export type InsertWillParams = {
  title: string
  content: string
  thumbnail: string
  mem_idx: number
  will_id: string
}

export type DeleteWillParams = {
  will_id: string
}
