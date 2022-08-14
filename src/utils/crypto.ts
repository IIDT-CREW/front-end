import CryptoJS from 'crypto-js'
/**
 * 텍스트 암호화
 * @param text
 * @returns 암호화 된 text
 */
export const encryptWithAES = (text: string) => {
  const passphrase = process.env.NEXT_PUBLIC_PASSPHRASE
  return CryptoJS.AES.encrypt(text, passphrase).toString()
}

/**
 * 텍스트 복호화
 * @param ciphertext
 * @returns 복호화 된 text
 */
export const decryptWithAES = (ciphertext: string) => {
  const passphrase = process.env.NEXT_PUBLIC_PASSPHRASE
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase)
    return bytes.toString(CryptoJS.enc.Utf8)
  } catch (error) {
    return null
  }
}
