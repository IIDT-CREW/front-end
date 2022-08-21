import axiosDefault from 'axios'

const url = 'http://3.35.24.26:3031'

// Create axios instance.
const axiosInstance = axiosDefault.create({
  baseURL: url,
  withCredentials: true,
})

export const getWill = (will_id: string) => {
  return axiosInstance.get('api/will/getWill', {
    params: {
      will_id,
    },
  })
}
export const getMyWill = () => {
  return axiosInstance.get('api/will/getMyWill', {
    params: {
      mem_userid: '',
      mem_email: '',
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
  return axiosInstance.post('api/will/insertWill', data)
}

export const getWillCount = () => {
  return axiosInstance.get('api/will/getWillCount')
}

export const deleteWill = () => {
  return axiosInstance.get('api/will/deleteWill')
}
