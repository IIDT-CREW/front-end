import axiosDefault from 'axios'
import authAxios from '.'
import { API_URL } from 'config/constants/api'

const url = API_URL

// Create axios instance.
export const axiosInstance = axiosDefault.create({
  baseURL: url,
  // withCredentials: true,
})

export const getWill = async (will_id: string) => {
  const response = await axiosInstance.get('api/will/getWill', {
    params: {
      will_id,
    },
  })
  return response.data
}
type getMyWillParams = {
  mem_email: string
  mem_userid: string
}
export const getMyWill = async ({ mem_email, mem_userid }: getMyWillParams) => {
  const response = await authAxios.get('api/will/getMyWill', {
    params: {
      mem_userid,
      mem_email,
    },
  })
  return response.data
}
type insertWillParams = {
  title: string
  content: string
  thumbnail: string
  mem_idx: number
  will_id: string
}

export const getWillCount = async () => {
  const response = await axiosInstance.get('api/will/getWillCount')
  return response.data
}

type deleteWillParams = {
  will_id: string
}

export const insertWill = (data: insertWillParams) => {
  return authAxios.post('api/will/insertWill', data)
}

export const deleteWill = (data: deleteWillParams) => {
  return authAxios.post('api/will/deleteWill', data)
}

export const updateWill = (data: deleteWillParams) => {
  return authAxios.post('api/will/updateWill', data)
}
