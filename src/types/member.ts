// types/member.ts
export interface IidtMember {
  mem_idx: number
  mem_userid: string
  mem_email: string | null
  mem_nickname: string
  mem_social: string | null
  mem_status: 'ACTIVE' | 'INACTIVE' | 'BANNED'
  profile_img: string | null
  is_deleted: boolean
  created_at: string
  updated_at: string
}

export type IidtMemberInsert = Omit<IidtMember, 'mem_idx' | 'created_at' | 'updated_at'>
export type IidtMemberUpdate = Partial<IidtMemberInsert>
