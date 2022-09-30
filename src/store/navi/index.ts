import { createSlice } from '@reduxjs/toolkit'

export const naviSlice = createSlice({
  name: 'navi',
  initialState: {
    isMenuOpen: false,
  },
  reducers: {
    menuOnOff: (state) => {
      state.isMenuOpen = !state.isMenuOpen
    },
    menuOff: (state) => {
      state.isMenuOpen = false
    },
  },
})

export const naviActions = { ...naviSlice.actions }
export default naviSlice
