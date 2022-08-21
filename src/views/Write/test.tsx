import { HTMLAttributes, TextareaHTMLAttributes, useState } from 'react'
import styled from 'styled-components'
import { fontSize, FontSizeProps } from 'styled-system'
import axios from 'axios'
import { nanoid } from 'nanoid'
import { getWill, insertWill, getWillCount } from 'api/will'
import { toastContext } from '../../contexts/Toast'
import { useContext } from 'react'

const Write = () => {
  const { onToast } = useContext(toastContext)
  const [title, setTitle] = useState('')
  const [contents, setContents] = useState('')
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
  const handleToast = () => {
    onToast({
      type: 'success',
      message: 'test!!!!',
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
        mem_idx: 7,
        will_id: nanoid(),
      }
      const res = await insertWill(parameter)
      handleToast()
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

  // const handleGeMytWill = async () => {
  //   try {
  //     const parameter = {
  //       title: title,
  //       content: contents,
  //     }
  //     const res = await insertWill(parameter)
  //     handleToast()
  //     console.log(res)
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  const handleSave = (e) => {
    axios
      .post('/api/write', {
        title,
        contents,
      })
      .then((res) => console.log(res))
  }
  return (
    <div style={{ marginTop: '100px' }}>
      <Title value={title} onChange={handleTitle}></Title>
      <Contents value={contents} onChange={handleContents}></Contents>
      <button onClick={handleClick}>시간</button>
      <button onClick={handleInsertWill}>save다 뫤~</button>
      <button onClick={handleWillCount}>getWillCount</button>
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
