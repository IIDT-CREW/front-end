import { createSlice, PayloadAction } from '@reduxjs/toolkit'

//* 초기 상태
const initialState: any = {
  validateMode: false,
}

const common = createSlice({
  name: 'common',
  initialState,
  reducers: {
    //* validateMode 변경하기
    setValidateMode(state, action: PayloadAction<boolean>) {
      state.validateMode = action.payload
    },
  },
})

export const commonActions = { ...common.actions }

export default common.reducer
