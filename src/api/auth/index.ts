import axios from '../'
import { API_URL } from 'config/constants/api'
import defaultAxios from 'axios'
const axiosInstance = defaultAxios.create({
  baseURL: API_URL,
  withCredentials: true,
})

import { checkDuplicateNicknameRequest, checkDuplicateNicknameResponse } from './types'
//* 쿠키의 access_token의 유저 정보 받아오는 api
export const test = () => axios.get('/api/oauth/test')

export const getUserInfo = () => axios.get('/api/oauth/userInfo')

export const logout = () => axios.get('/api/oauth/logout')

export const refresh = () => axios.get('/api/oauth/refresh')

export const login = async () => axios.get('/api/oauth/login')
export const refreshTest = () => axios.get('/api/oauth/refreshTest')

export const userInfoTest = () => axios.get('/api/oauth/userInfoTest')

export const checkDuplicateNickname = (params: checkDuplicateNicknameRequest) =>
  axios
    .get<checkDuplicateNicknameResponse>('/api/oauth/checkDuplicateNickname', {
      params: {
        mem_nickname: params.mem_nickname,
      },
    })
    .then((res) => res.data)

export const signup = ({ cooperation, code, accessToken, nickname }) => {
  return axiosInstance.get(`/api/oauth/signup/${cooperation}`, {
    params: {
      code,
      access_token: accessToken,
      nickname,
    },
  })
}
export const socialLogin = ({ cooperation, code }) => {
  return axiosInstance.get(`/api/oauth/callback/${cooperation}`, {
    params: {
      code,
    },
  })
}
