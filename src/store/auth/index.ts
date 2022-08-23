import { createSlice } from '@reduxjs/toolkit'

export const TOKEN_TIME_OUT = 600 * 1000

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    accessToken: null,
    name: '',
    email: '',
    nickname: '',
    userid: '',
    memIdx: -1,
  },
  reducers: {
    setAuth: (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated
      state.accessToken = action.payload.accessToken
      state.name = action.payload.name
      state.email = action.payload.email
      state.nickname = action.payload.nickname
      state.userid = action.payload.userid
      state.memIdx = action.payload.memIdx
    },
    initAuth: (state) => {
      state.isAuthenticated = false
      state.accessToken = null
      state.name = ''
      state.email = ''
      state.nickname = ''
      state.userid = ''
      state.memIdx = -1
    },
    setToken: (state, action) => {
      state.accessToken = action.payload
      state.isAuthenticated = true
    },
  },
})

export const authActions = { ...authSlice.actions }
export default authSlice.reducer
