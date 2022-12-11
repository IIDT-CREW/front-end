// src/hooks/
import { insertWill } from 'api/will'
import { InsertWillParams } from 'api/will/types'
import { AxiosError } from 'axios'
import { useMutation, UseMutationResult } from 'react-query'
import useToast from 'hooks/useToast'

export default function useAddPostMutation({ goToBack }): UseMutationResult<any, AxiosError, InsertWillParams> {
  const onToast = useToast()
  return useMutation(insertWill, {
    onSuccess: (data) => {
      onToast({
        type: '',
        message: '작성이 완료 되었어요',
        option: {
          position: 'top-center',
        },
      })
      goToBack()
    },

    onError: (error) => {
      // mutation 이 에러가 났을 경우 error를 받을 수 있다.
      console.error(error)
    },
  })
}
