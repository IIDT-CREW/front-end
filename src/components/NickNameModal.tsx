import React, { useEffect, InputHTMLAttributes, useState, useCallback } from 'react'
import { Modal, ModalProps, Flex, Box, Text, Button } from 'components/Common'
import styled, { CSSProp } from 'styled-components'
import { fontSize, FontSizeProps } from 'styled-system'
import { useQuery } from 'react-query'
import { checkDuplicateNickname } from 'api/auth'
import { API_CODE } from 'config/constants/api'
import useLoginTransaction from 'hooks/useLoginTransaction'

interface InputProps extends FontSizeProps, InputHTMLAttributes<HTMLInputElement> {
  isDefaultPostType?: boolean
  css?: CSSProp
}

const St = {
  NicknameInput: styled.input<InputProps>`
    outline: none;
    border: 1px solid;
    margin: 2rem 0px;
    resize: none;
    width: 100%;
    font-size: 18px;
    font-weight: 400;
    font-family: 'Nanum Myeongjo';
    padding: unset;
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 28px;
    background-color: inherit;
    ::placeholder {
      text-align: center;
      color: ${({ theme }) => theme.colors.grayscale5};
      ${fontSize}
    }
    ${({ css }) => css}
    ${fontSize}
  `,
}

type NickNameModalProps = ModalProps & {
  accessToken: string
}
const NickName = ({ ...props }) => {
  return (
    <Flex flexDirection="column">
      <Text textAlign="center">닉네임을 결정해주세요</Text>
      <St.NicknameInput {...props} />
    </Flex>
  )
}
const NickNameModal: React.FC<NickNameModalProps> = ({ onDismiss, ...props }) => {
  const { handleLoginTransaction } = useLoginTransaction()
  const [isFetched, setIsFetched] = useState(false)
  const [isDuplicateNickname, setIsDuplicateNickname] = useState(false)
  const [nickName, setNickName] = useState('')
  const [isValidateNickname, setIsValidateNickname] = useState(false)
  const handleNickName = useCallback((e) => {
    setNickName(e.target.value)
    setIsDuplicateNickname(false)
    setIsFetched(false)
    setIsValidateNickname(e.target.value)
  }, [])

  const {
    data: checkNicknameRes,
    isLoading,
    isError,
    refetch,
  } = useQuery(['checkDuplicateNickname', nickName], () => checkDuplicateNickname({ mem_nickname: nickName }), {
    enabled: false,
  })

  const handleCheckDuplicateNickname = useCallback(() => {
    setIsFetched(true)
    refetch()
  }, [refetch])

  useEffect(() => {
    if (!checkNicknameRes) return
    if (checkNicknameRes?.code !== API_CODE.SUCCESS) return
    if (checkNicknameRes?.result.IS_EXIST) {
      setIsDuplicateNickname(true)
      return
    } else setIsDuplicateNickname(false)
  }, [checkNicknameRes])

  const handleSignUp = useCallback(() => {
    const { accessToken } = props
    handleLoginTransaction({ accessToken, isLogin: false, nickName, onDismiss })
  }, [handleLoginTransaction, nickName, onDismiss, props])

  return (
    <Modal title="마지막으로..." onDismiss={onDismiss} {...props} width="100%" height="100%" hideCloseButton>
      <Flex justifyContent="center" alignItems="center" flexDirection="column">
        <NickName onChange={handleNickName} placeholder="닉네임" />
        {isValidateNickname && !isDuplicateNickname && isFetched ? (
          <Box>
            <Button onClick={handleSignUp}>[{nickName}]로 등록할게요!</Button>
          </Box>
        ) : (
          <Button onClick={handleCheckDuplicateNickname} disabled={!isValidateNickname}>
            결정했습니다.
          </Button>
        )}

        <Box>
          {!isValidateNickname && isDuplicateNickname && <Text color="red">아쉽지만 다른 닉네임을 사용해주세요.</Text>}
        </Box>
      </Flex>
    </Modal>
  )
}

export default NickNameModal
