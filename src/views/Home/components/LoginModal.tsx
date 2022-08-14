import React from 'react'
import { Modal, ModalProps } from 'components/Common'
import styled, { css } from 'styled-components'
import { useRouter } from 'next/router'

enum EType {
  NAVER,
  KAKAO,
  GOOGLE,
  TEST,
}
interface LoginProps {
  loginType: EType
}

const LoginButton = styled.button<LoginProps>`
  height: 40px;
  width: 310px;
  margin-top: 10px;
  border: none;
  cursor: pointer;
  padding-left: 0px;
  vertical-align: middle;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    width: 264px;
  }
  &:focus {
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  }
  &:hover {
    // background: #e49600;
  }
  &:active {
    // background: #e49600;
  }
  ${({ loginType }) => {
    switch (loginType) {
      case EType.NAVER: {
        return css`
          background-color: #03c75a;
          color: #fff;
          font-size: 14.5px;
        `
      }
      case EType.KAKAO: {
        return css`
          background-color: #fee500;
          color: #000000d8;
          font-size: 14.5px; ;
        `
      }
      case EType.GOOGLE: {
        return css`
          background-color: #4285f4;
          color: #fff;
          font-size: 14.5px;
          span {
            font-family: 'Roboto', 'Spoqa Han Sans Neo', 'sans-serif';
          }
        `
      }
      default: {
        return css`
          background-color: #fdb11a;
          color: white;
        `
      }
    }
  }}
`
const LoginIcon = styled.i<LoginProps>`
  width: 40px;
  height: 40px;
  display: inline-block;
  background-repeat: no-repeat;
  background-position: center;
  ${({ loginType }) => {
    switch (loginType) {
      case EType.NAVER: {
        return css`
          background-image: url('/images/login/logo/naver.svg');
          filter: brightness(0%) invert(100%);
        `
      }
      case EType.KAKAO: {
        return css`
          background-image: url('/images/login/btn_kakao_icon.svg');
        `
      }
      case EType.GOOGLE: {
        return css`
          background-image: url('/images/login/btn_google_icon.svg');
          border-radius: 0.25rem;
        `
      }
    }
  }}
`
const KAKAO_LOGIN_URL =
  `https://kauth.kakao.com/oauth/authorize` +
  `?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}` +
  `&redirect_uri=${process.env.NEXT_PUBLIC_LOGIN_CALLBACK_URL_PREFIX}/kakao` +
  `&response_type=code`

const GOOGLE_LOGIN_URL =
  `https://accounts.google.com/o/oauth2/v2/auth` +
  `?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}` +
  `&redirect_uri=${process.env.NEXT_PUBLIC_LOGIN_CALLBACK_URL_PREFIX}/google` +
  `&response_type=code` +
  `&scope=https://www.googleapis.com/auth/userinfo.email`

const NAVER_LOGIN_URL =
  'https://nid.naver.com/oauth2.0/authorize' +
  `?client_id=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}` +
  `&redirect_uri=${process.env.NEXT_PUBLIC_LOGIN_CALLBACK_URL_PREFIX}/naver` +
  '&response_type=code' +
  '&state=RANDOM_STATE'

export const LoginModal: React.FC<ModalProps> = ({ onDismiss, ...props }) => {
  const router = useRouter()
  return (
    <Modal title="로그인" onDismiss={onDismiss} {...props}>
      <LoginButton
        loginType={EType.NAVER}
        onClick={() => {
          router.push(NAVER_LOGIN_URL)
        }}
      >
        <LoginIcon loginType={EType.NAVER} />
        <span>네이버 로그인</span>
      </LoginButton>
      <LoginButton
        loginType={EType.KAKAO}
        onClick={() => {
          router.push(KAKAO_LOGIN_URL)
        }}
      >
        <LoginIcon loginType={EType.KAKAO} />
        <span>카카오 로그인</span>
      </LoginButton>
      <LoginButton
        loginType={EType.GOOGLE}
        onClick={() => {
          router.push(GOOGLE_LOGIN_URL)
        }}
      >
        <LoginIcon loginType={EType.GOOGLE} />
        <span>Google 로그인</span>
      </LoginButton>
    </Modal>
  )
}
