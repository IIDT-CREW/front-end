// lib/axios.ts
import axios from 'axios'
import { refresh } from './auth'
import { decryptWithAES, encryptWithAES } from 'utils/crypto'
import { API_CODE, API_URL } from 'config/constants/api'
import { STORAGE_NAME } from 'config/constants/api'

// Create axios instance.
const axiosInstance = axios.create({
  // baseURL: 'http://localhost:3031',
  baseURL: API_URL,
  //withCredentials: true,
})

axiosInstance.interceptors.request.use(
  (config) => {
    // 리프레시 토큰 및 엑세스 토큰 헤더 세팅
    //console.log('[SEO][AXIOS][INTERCEPTORS] Reqest Config', config)
    const strData = localStorage.getItem(STORAGE_NAME.USER) || sessionStorage.getItem(STORAGE_NAME.USER)
    //console.log('[SEO][AXIOS][INTERCEPTORS] strData', strData)
    const addConfigHeaders: any = {}
    if (strData) {
      const data = JSON.parse(decryptWithAES(strData))
      if (config.url === '/api/oauth/refresh') {
        addConfigHeaders.refresh = data?.refreshToken || ''
      }
      addConfigHeaders.Authorization = data?.accessToken ? `Bearer ${data.accessToken}` : ''
    }

    const newConfig = { ...config, headers: { ...config.headers, ...addConfigHeaders } }
    console.log('config = ', newConfig)
    return newConfig
  },
  (error) => {
    console.log('error ', error)
    // 요청 에러 처리를 작성합니다.
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  (response) => {
    console.log('response = ', response.config.url)
    /*
      http status가 200인 경우
    응답 바로 직전에 대해 작성합니다.
      .then() 으로 이어집니다.
    */

    if (response.config.url !== '/api/oauth/refresh' && response.data.result === API_CODE.CREDENTIAL_EXPIRED) {
      return refresh()
        .then((token_response) => {
          // error
          if (token_response.status !== 200 || token_response.data.result !== API_CODE.SUCCESS) {
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
          /* refresh 토큰 및 access_token 저장  */
          const { access_token, refresh_token } = token_response.data
          const strData = localStorage.getItem(STORAGE_NAME.USER) || sessionStorage.getItem(STORAGE_NAME.USER)

          if (strData) {
            const data = JSON.parse(decryptWithAES(strData))
            const encDataString = encryptWithAES(JSON.stringify({ ...data, access_token, refresh_token }))
            localStorage.setItem(STORAGE_NAME.USER, encDataString)
          }
          return axios(response.config)
        })
        .catch((error) => {
          return error
        })
    }
    // console.log('response.data = ', response.data)
    // return Promise.resolve(response)
    switch (response.data.code) {
      case API_CODE.SUCCESS: // 정상
      case API_CODE.INVALID_USER: // 사용자 정보가 존재하지 않음
      case API_CODE.INVALID_COMMON_GROUP_CODE: // 미수금 등록 불가
      case API_CODE.BAD_CREDENTIAL: // 아이디나 비밀번호가 맞지 않습니다. 다시 확인해 주십시오
      case API_CODE.ACCOUNT_DISABLED: // 계정이 비활성화 되었습니다. 관리자에게 문의하세요
        //then으로 보내기
        return Promise.resolve(response)
      case API_CODE.INVALID_TOKEN: // 유효하지 않은 토큰 키
      case API_CODE.INVALID_SIGNATURE: // 사용할 수 없는 토큰입니다.
      case API_CODE.BLACKLIST_TOKEN:
      case API_CODE.BAD_USER_STATUS: // 정지된 사용자
        //then, 로그인으로 보내기
        localStorage.removeItem(STORAGE_NAME.USER)
        sessionStorage.removeItem(STORAGE_NAME.USER)
        // window.location.href = '/login'
        return Promise.reject(
          new Error(`${response.data ? `[${response.data.result}] ${response.data.reason}` : response.status}`),
        )
      default: {
        //catch로 보내기
        return Promise.reject(
          new Error(`${response.data ? `[${response.data.result}] ${response.data.reason}` : response.status}`),
        )
      }
    }
  },

  (error) => {
    console.log('error= ', error)
    /*
      http status가 200이 아닌 경우
      응답 에러 처리를 작성합니다.
      .catch() 으로 이어집니다.
    */
    return Promise.reject(error)
  },
)

export default axiosInstance
