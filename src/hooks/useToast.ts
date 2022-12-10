import { toastContext, ToastType } from 'contexts/Toast'
import { useContext } from 'react'

const useToast = () => {
  const { onToast } = useContext(toastContext)
  return ({
    type = 'info',
    message = '',
    option = {
      position: 'bottom-right',
    },
  }: ToastType) => {
    onToast({
      type: type,
      message: message,
      option: option,
    })
  }
}

export default useToast
