import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import isEqual from 'lodash/isEqual'
import isEmpty from 'lodash/isEmpty'
import { useRouter } from 'next/router'
import { decryptWithAES, encryptWithAES } from 'utils/crypto'
import { useAuthState } from 'store/auth/hooks'
import { authActions } from 'store/auth'
import { STORAGE_NAME, API_CODE, API_URL } from 'config/constants/api'
import { getUserInfo } from 'api/auth'

import axios from 'api'

const useAuthAccessToken = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  async function getUser() {
    try {
      const res = await getUserInfo()
      if (res.data && res.data.code === API_CODE.SUCCESS) {
        const { data: userInfo } = res.data
        console.log(userInfo)
        return {
          memIdx: userInfo.MEM_IDX,
          name: userInfo.MEM_USERNAME,
          email: userInfo.MEM_EMAIL,
          nickname: userInfo.MEM_NICKNAME,
          userid: userInfo.MEM_USERID,
        }
      }
    } catch (e) {
      return null
    }
  }

  useEffect(() => {
    const getUserInfo = async () => {
      const storageData = localStorage.getItem(STORAGE_NAME.USER) || sessionStorage.getItem(STORAGE_NAME.USER)
      if (!storageData) return

      const encryptStorageData = JSON.parse(decryptWithAES(storageData))
      if (!encryptStorageData) return
      const ACCESS_TOKEN = encryptStorageData.accessToken
      const REFRESH_TOKEN = encryptStorageData.refreshToken
      const bearer = `Bearer ${ACCESS_TOKEN}`
      axios.defaults.headers.common['Authorization'] = bearer
      axios.defaults.headers.common['refresh'] = REFRESH_TOKEN

      const info = await getUser()

      if (info) {
        dispatch(
          authActions.setAuth({
            isAuthenticated: true,
            accessToken: ACCESS_TOKEN,
            name: info.name,
            email: info.email,
            nickname: info.nickname,
            userid: info.userid,
            memIdx: info.memIdx,
          }),
        )
      }
    }
    getUserInfo()
  })

  return { hi: 'hi' }
}

export default useAuthAccessToken
