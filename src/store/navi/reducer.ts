import { createReducer } from '@reduxjs/toolkit'
import { setOpenSideBar, setCloseSideBar, setPath } from './actions'
import { NaviState } from './types'

const initialState: NaviState = {
  sidebar: {
    open: false,
  },
  path: '',
  restorePage: '',
}

export default createReducer(
  initialState,
  (builder) =>
    builder.addCase(setOpenSideBar, (state) => {
      state.sidebar.open = true
    }),
  // .addCase(setCloseSideBar, (state) => {
  //   state.sidebar.open = false
  // })
  // .addCase(setPath, (state, { payload }) => {
  //   state.path = payload.path
  // }),
)
