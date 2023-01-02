import { createSlice } from '@reduxjs/toolkit'

export const naviSlice = createSlice({
  name: 'navi',
  initialState: {
    isMenuOpen: false,
    isScrollDown: false,
  },
  reducers: {
    menuOnOff: (state) => {
      state.isMenuOpen = !state.isMenuOpen
    },
    menuOff: (state) => {
      state.isMenuOpen = false
    },
    scrollDown: (state, action) => {
      state.isScrollDown = action.payload
    },
  },
})

export const naviActions = { ...naviSlice.actions }
export default naviSlice
