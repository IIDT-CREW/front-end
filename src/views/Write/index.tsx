import { HTMLAttributes, TextareaHTMLAttributes, useState } from 'react'
import styled from 'styled-components'
import { fontSize, FontSizeProps } from 'styled-system'
import axios from 'axios'
import { getWill, insertWill } from 'api/will'

const Write = () => {
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

  const handleInsertWill = async () => {
    try {
      const parameter = {
        title: 'test',
        content: 'hello',
        thumbnail: 'title',
        mem_idx: null,
        will_id: 'tttt',
      }
      const res = await insertWill(parameter)
      console.log(res)
    } catch (e) {
      console.log(e)
    }
  }

  const handleSave = (e) => {
    axios
      .post('/api/write', {
        title,
        contents,
      })
      .then((res) => console.log(res))
  }
  return (
    <div>
      <Title value={title} onChange={handleTitle}></Title>
      <Contents value={contents} onChange={handleContents}></Contents>
      <button onClick={handleClick}>시간</button>
      <button onClick={handleSave}>save다 뫤~</button>
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
