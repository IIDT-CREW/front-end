/**
 * 값의 undefined, null, "" 체크
 * 예) isEmpty(value)
 * @params
 *  - value : 체크할 값
 */
export const isEmpty = (value: any) => {
  if (value === undefined || value === null) {
    return true
  }

  //array
  if (Array.isArray(value)) {
    return value.length === 0
  }

  //object
  if (value.constructor === Object) {
    return Object.keys(value).length === 0
  }

  //string
  if (String(typeof value).toLowerCase() === 'string') {
    if (value === '' || value === 'undefined' || value === 'null') {
      return true
    }
  }

  return value === '' || value === 'undefined' || value === 'null'
}

/**
 * 값의 공백으로만 된 값인지 체크
 * 예) isEmpty(value)
 * @params
 *  - value : 체크할 값
 */
export const isSpace = (value: string) => {
  return value.match(/\s/g)?.length === value.length
}

/**
 * 이메일의 유효성 검사
 * 예) isEmail(email)
 * @params
 *  - email : 전화번호
 */
export const isEmail = (email: string) => {
  const regExp = /^[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
  return regExp.test(email)
}

export const isNickname = (nickname) => {
  const nicknameRegex = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,20}$/
  return nicknameRegex.test(nickname)
}
