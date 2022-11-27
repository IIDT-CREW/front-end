import { DefaultResponse } from '../types'

export type checkDuplicateNicknameRequest = {
  mem_nickname: string
}

export type checkDuplicateNicknameResponse = Omit<DefaultResponse, 'result'> & {
  result: {
    IS_EXIST: boolean
  }
}
