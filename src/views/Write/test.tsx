import React from 'react'
import { HTMLAttributes, TextareaHTMLAttributes, useState } from 'react'
import styled from 'styled-components'
import { fontSize, FontSizeProps } from 'styled-system'
import { nanoid } from 'nanoid'
import { getWill, insertWill, getWillCount, deleteWill, getMyWill } from 'api/will'
import { toastContext } from '../../contexts/Toast'
import { useContext } from 'react'
import { API_CODE } from 'config/constants/api'
import { useIsLogin, useUserInfo } from 'store/auth/hooks'
import WriteCard from 'views/Main/components/WriteCard'
import { useQuery, useMutation, useQueryClient } from 'react-query'

const Write = () => {
  const { onToast } = useContext(toastContext)
  const [wills, setWills] = useState([])
  const [myWills, setMyWills] = useState([])
  const [title, setTitle] = useState('')
  const [contents, setContents] = useState('')
  const { userid, name, email, nickname, memIdx } = useUserInfo()

  console.log('userid, name, email, nickname, memIdx = ', userid, name, email, nickname, memIdx)
  const handleTitle = (e) => {
    setTitle(e.target.value)
  }
  const handleContents = (e) => {
    setContents(e.target.value)
  }
  const handleClick = (e) => {
    setContents((contents) => {
      return `${contents} ${new Date().toLocaleTimeString([], { timeStyle: 'medium', hour12: false })} `
    })
  }
  const handleToast = ({ message = '' }) => {
    onToast({
      type: 'success',
      message,
      option: {
        position: 'top-center',
      },
    })
  }

  const handleInsertWill = async () => {
    try {
      const parameter = {
        title: title,
        content: contents,
        thumbnail: 'title',
        mem_idx: memIdx,
        will_id: nanoid(),
      }
      const res = await insertWill(parameter)
      handleToast({ message: '저장에 성공하였습니다.' })
      console.log(res)
    } catch (e) {
      console.log(e)
    }
  }

  const handleWillCount = async () => {
    try {
      const res = await getWillCount()
      // handleToast()
      console.log(res)
    } catch (e) {
      console.log(e)
    }
  }

  const handleGeMytWill = async () => {
    try {
      const parameter = {
        mem_userid: userid,
        mem_email: email,
      }
      const res = await getMyWill(parameter)
      console.log(res)
      if (res.data && res.data.code === API_CODE.SUCCESS) {
        const { result } = res.data
        console.log(res.data)
        setMyWills(result)

        handleToast({ message: '데이터를 가져왔습니다' })
      }

      console.log(res)
    } catch (e) {
      console.log(e)
    }
  }

  const handleGetWill = async () => {
    try {
      const res = await getWill('SNfTCOM5iFz5mxoRbotrb')
      handleToast({ message: '데이터를 가져왔습니다' })
      console.log(res)
    } catch (e) {
      console.log(e)
    }
  }

  const handledeleteWill = async (willId: string) => {
    try {
      const parameter = {
        will_id: willId,
      }
      const res = await deleteWill(parameter)
      console.log(res)
      if (res.data && res.data.code === API_CODE.SUCCESS) {
        const { result } = res.data
        handleToast({ message: '데이터 삭제 완료' })
        await handleGeMytWill()
      }

      console.log(res)
    } catch (e) {
      console.log(e)
    }
  }

  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery('myWill', () =>
    getMyWill({
      mem_userid: '2342340674',
      mem_email: email,
    }),
  )

  const mutation = useMutation(insertWill, {
    onSuccess: () => {
      handleToast({ message: '데이터를 가져왔습니다' })
      // myWill로 시작하는 모든 쿼리를 무효화한다
      queryClient.invalidateQueries('myWill')
    },
  })

  const deleteMutation = useMutation(deleteWill, {
    onSuccess: () => {
      handleToast({ message: '데이터를 삭제했습니다.' })
      // myWill로 시작하는 모든 쿼리를 무효화한다
      queryClient.invalidateQueries('myWill')
    },
  })

  return (
    <div style={{ marginTop: '100px' }}>
      <Title value={title} onChange={handleTitle}></Title>
      <Contents value={contents} onChange={handleContents}></Contents>
      <button onClick={handleClick}>시간</button>
      <button onClick={handleInsertWill}>저장 일반</button>
      <button
        onClick={() => {
          mutation.mutate({ title: title, content: contents, thumbnail: 'title', mem_idx: memIdx, will_id: nanoid() })
        }}
      >
        저장 뮤테이션 ㅇ
      </button>
      <button onClick={handleWillCount}>유서 카운트 ㅇ </button>

      <button onClick={handleGetWill}>유서 가져오기(공유용) o</button>
      <button onClick={handleGeMytWill}>내 유서 가져오기</button>

      <div>
        {data?.result?.map((myWill) => {
          return (
            <WriteCard
              will={myWill}
              handleDelete={() => deleteMutation.mutate({ will_id: myWill.WILL_ID as string })}
            />
          )
        })}
      </div>
    </div>
  )
}

const Title = ({ ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return <St.Textarea {...props} fontSize={'2rem'} placeholder="제목을 입력하세요." />
}

const Contents = ({ ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return <St.Textarea {...props} fontSize={'2rem'} placeholder="당신의 이야기를 적어보세요..." />
}

interface TextAreaProps extends FontSizeProps, HTMLAttributes<HTMLTextAreaElement> {}
const St = {
  Textarea: styled.textarea<TextAreaProps>`
    outline: none;
    border: none;
    resize: none;
    width: 100%;
    font-weight: bold;
    ::placeholder {
      font-size: 1.5em;
    }
    ${fontSize}
  `,
}

export default Write
