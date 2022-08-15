import axiosDefault from 'axios'

export const getWill = (will_id: string) => {
  return axiosDefault.get('http://localhost:3031/api/will/getWill', {
    params: {
      will_id,
    },
  })
}
type insertWillParams = {
  title: string
  content: string
  thumbnail: string
  mem_idx: number | null
  will_id: string
}
export const insertWill = (data: insertWillParams) => {
  return axiosDefault.post('http://localhost:3031/api/will/insertWill', data)
}
