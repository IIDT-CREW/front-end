import axios from '.'
import axiosDefault from 'axios'
//* 쿠키의 access_token의 유저 정보 받아오는 api
export const test = () => axios.get('/api/oauth/test')

export const getUserInfo = () => axios.get('/api/oauth/userInfo')

export const logout = () => axiosDefault.get('/api/oauth/logout')

export const refresh = () => axios.get('/api/oauth/refresh')
