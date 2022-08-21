import { createContext, ReactNode } from 'react'
import { toast, ToastOptions } from 'react-toastify'

export const TYPE_OPTIONS = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
}
export type TypeOptions = typeof TYPE_OPTIONS[keyof typeof TYPE_OPTIONS]

export const TOAST_POSITION = {
  TOP_RIGHT: 'top-right',
  TOP_CENTER: 'top-center',
  TOP_LEFT: 'top-left',
  BOTTOM_RIGHT: 'bottom-right',
  BOTTOM_CENTER: 'bottom-center',
  BOTTOM_LEFT: 'bottom-left',
}
export type ToastPosition = typeof TOAST_POSITION[keyof typeof TOAST_POSITION]

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

export const ToastContextProvider = ({ children }) => {
  const { Provider } = toastContext
  const onToast = ({ type, isOfficialError = false, message, option }: ToastType) => {
    switch (type) {
      case 'info': {
        toast.info(message, { autoClose: 3000, ...option })
        break
      }
      case 'success': {
        toast.success(message, { autoClose: 2000, ...option })
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
          { autoClose: 5000, ...option },
        )
        break
      }
      case 'warning': {
        toast.warn(message, { autoClose: 3000, ...option })
        break
      }
      default:
        toast.info(message)
    }
  }

  return <Provider value={{ onToast }}>{children}</Provider>
}
