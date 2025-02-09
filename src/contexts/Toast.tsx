import { createContext, ReactNode } from 'react'
import { toast, ToastOptions, Slide } from 'react-toastify'
import { Flex, Text } from '@/components/Common'
import styled from 'styled-components'

const St = {
  ToastWrapper: styled.div`
    background: #191919;
  `,
}
export const TYPE_OPTIONS = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
}
export type TypeOptions = (typeof TYPE_OPTIONS)[keyof typeof TYPE_OPTIONS]

export const TOAST_POSITION = {
  TOP_RIGHT: 'top-right',
  TOP_CENTER: 'top-center',
  TOP_LEFT: 'top-left',
  BOTTOM_RIGHT: 'bottom-right',
  BOTTOM_CENTER: 'bottom-center',
  BOTTOM_LEFT: 'bottom-left',
}
export type ToastPosition = (typeof TOAST_POSITION)[keyof typeof TOAST_POSITION]

type ToastContextOptions = {
  position: ToastPosition
}

export type ToastType = {
  type: TypeOptions
  isOfficialError?: boolean
  message: string | ReactNode
  option?: ToastOptions & ToastContextOptions
}

export const toastContext = createContext<any>(undefined)

export const CustomToast = (props: { message: string }) => {
  return (
    <St.ToastWrapper>
      <Flex justifyContent="space-between" alignItems="center">
        <Text style={{ fontFamily: 'SUIT', color: '#fff' }}>{props.message}</Text>
        <Text style={{ fontFamily: 'SUIT', color: '#fff' }}>닫기</Text>
      </Flex>
    </St.ToastWrapper>
  )
}
export const ToastContextProvider = ({ children }: { children: ReactNode }) => {
  const { Provider } = toastContext
  const onToast = ({ type, isOfficialError = false, message, option }: ToastType) => {
    switch (type) {
      case 'info': {
        toast.info(message, { autoClose: 3000, hideProgressBar: true, ...option })
        break
      }
      case 'success': {
        toast.success(message, { autoClose: 3000, hideProgressBar: true, ...option })
        break
      }
      case 'error': {
        toast.error(
          isOfficialError ? (
            <>
              오류가 발생하였습니다. <br />
              잠시 후 다시 시도해 주세요. <br />({message})
            </>
          ) : (
            message
          ),
          { autoClose: 5000, hideProgressBar: true, ...option },
        )
        break
      }
      case 'warning': {
        toast.warn(message, { autoClose: 3000, hideProgressBar: true, ...option })
        break
      }
      default:
        toast(<CustomToast message={message} type={type} />, {
          autoClose: 3000,
          hideProgressBar: true,
          transition: Slide,
          ...option,
        })
    }
  }

  return <Provider value={{ onToast }}>{children}</Provider>
}
