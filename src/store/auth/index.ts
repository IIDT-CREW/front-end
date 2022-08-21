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
  },
  reducers: {
    setAuth: (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated
      state.accessToken = action.payload.accessToken
      state.name = action.payload.name
      state.email = action.payload.email
      state.nickname = action.payload.nickname
    },
    initAuth: (state) => {
      state.isAuthenticated = false
      state.accessToken = null
      state.name = ''
      state.email = ''
      state.nickname = ''
    },
    setToken: (state, action) => {
      state.accessToken = action.payload
      state.isAuthenticated = true
    },
  },
})

export const authActions = { ...authSlice.actions }
export default authSlice.reducer
