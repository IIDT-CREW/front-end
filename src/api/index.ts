// lib/axios.ts
import axios from 'axios'
import { refresh } from './auth'
import { decryptWithAES, encryptWithAES } from '@/utils/crypto'
import { API_CODE, API_URL } from '@/config/constants/api'
import { STORAGE_NAME } from '@/config/constants/api'

const asyncLocalStorage = {
  setItem: function (key: string, value: string) {
    return Promise.resolve().then(function () {
      localStorage.setItem(key, value)
    })
  },
  getItem: function (key: string) {
    return Promise.resolve().then(function () {
      return localStorage.getItem(key)
    })
  },
}
// Create axios instance.
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const strData = await asyncLocalStorage.getItem(STORAGE_NAME.USER)
      //onsole.log('strData = ', strData)
      const addConfigHeaders: any = {}
      if (strData) {
        const data = JSON.parse(decryptWithAES(strData))
        if (data.accessToken) {
          addConfigHeaders.Authorization = data.accessToken ? `Bearer ${data.accessToken}` : ''
        }
      }
      const newConfig = { ...config, headers: { ...config.headers, ...addConfigHeaders } }
      //console.log('[AXIOS] INTERCEPTORS[REQ] = ', newConfig)
      return newConfig
    } catch (e) {
      return config
    }
  },
  (error) => {
    //console.log('error ', error)
    // 요청 에러 처리를 작성합니다.
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  async (response) => {
    if (response.config.url !== '/api/oauth/refresh' && response.data.code === API_CODE.CREDENTIAL_EXPIRED) {
      const token_response = await refresh()
      //console.log('[AXIOS] isRefresh ')
      if (token_response.status !== 200 || token_response.data.code !== API_CODE.SUCCESS) {
        return Promise.reject(
          new Error(
            `Failed Request Refresh Token ${
              token_response.data
                ? `${token_response.data.result} ${token_response.data.reason}`
                : token_response.status
            }`,
          ),
        )
      }

      //console.log('[AXIOS] INTERCEPTORS[RES] = token_response.data = ', token_response.data)
      /* refresh 토큰 및 access_token 저장  */
      const { accessToken } = token_response.data.result

      /* storage 저장  */
      const storageData = await asyncLocalStorage.getItem(STORAGE_NAME.USER)
      if (storageData) {
        // console.log('storageData= ', storageData)
        const parsedData = JSON.parse(decryptWithAES(storageData))
        const encDataString = encryptWithAES(JSON.stringify({ ...parsedData, accessToken }))
        await asyncLocalStorage.setItem(STORAGE_NAME.USER, encDataString)
      }

      /* accesstoken header 값 제 세팅 */
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`
      // eslint-disable-next-line no-param-reassign
      response.config.headers.Authorization = `Bearer ${accessToken}`
      return axiosInstance(response.config)
    }

    // return Promise.resolve(response)
    switch (response.data.code) {
      case API_CODE.SUCCESS: // 정상
        // console.log('[AXIOS] INTERCEPTORS[RES] success!!')
        return Promise.resolve(response)
      case API_CODE.FAILURE_USER_AUTH:
      case API_CODE.CREDENTIAL_EXPIRED:
      case API_CODE.INVALID_TOKEN: // 유효하지 않은 토큰 키
      case API_CODE.INVALID_SIGNATURE: // 사용할 수 없는 토큰입니다.
      case API_CODE.BLACKLIST_TOKEN:
      case API_CODE.BAD_USER_STATUS: // 정지된 사용자
        if (localStorage) localStorage.removeItem(STORAGE_NAME.USER)
        return Promise.reject(
          new Error(`${response.data ? `[${response.data.result}] ${response.data.reason}` : response.status}`),
        )
      case API_CODE.INVALID_USER: // 사용자 정보가 존재하지 않음
      case API_CODE.BAD_CREDENTIAL: // 아이디나 비밀번호가 맞지 않습니다. 다시 확인해 주십시오
      case API_CODE.ACCOUNT_DISABLED: // 계정이 비활성화 되었습니다. 관리자에게 문의하세요
      //then으로 보내기
      // eslint-disable-next-line no-fallthrough
      default: {
        //catch로 보내기
        return Promise.reject(
          new Error(`${response.data ? `[${response.data.result}] ${response.data.reason}` : response.status}`),
        )
      }
    }
  },

  (error) => {
    switch (error?.response?.data?.code) {
      case API_CODE.CREDENTIAL_EXPIRED: // 정상
      case API_CODE.FAILURE_USER_AUTH:
        if (localStorage) localStorage.removeItem(STORAGE_NAME.USER)
        return Promise.reject(error)
      default: {
        return Promise.reject(error)
      }
      /*
      http status가 200이 아닌 경우
      응답 에러 처리를 작성합니다.
      .catch() 으로 이어집니다.
    */
    }
  },
)

export default axiosInstance
