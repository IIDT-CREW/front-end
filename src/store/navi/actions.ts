import { createAction } from '@reduxjs/toolkit'

export const setOpenSideBar = createAction('navi/setOpenSideBar')
export const setCloseSideBar = createAction('navi/setCloseSideBar')
export const setPath = createAction<{ path: string }>('navi/setPath')
