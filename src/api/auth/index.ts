import axios from '../'
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
