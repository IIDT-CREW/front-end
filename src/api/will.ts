import axiosDefault from 'axios'
import { API_URL } from 'config/constants/api'

const url = API_URL

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
type getMyWillParams = {
  mem_email: string
  mem_userid: string
}
export const getMyWill = ({ mem_email, mem_userid }: getMyWillParams) => {
  return axiosInstance.get('api/will/getMyWill', {
    params: {
      mem_userid,
      mem_email,
    },
  })
}
type insertWillParams = {
  title: string
  content: string
  thumbnail: string
  mem_idx: number
  will_id: string
}
export const insertWill = (data: insertWillParams) => {
  return axiosInstance.post('api/will/insertWill', data)
}

export const getWillCount = () => {
  return axiosInstance.get('api/will/getWillCount')
}

type deleteWillParams = {
  will_id: string
}
export const deleteWill = (data: deleteWillParams) => {
  return axiosInstance.post('api/will/deleteWill', data)
}
