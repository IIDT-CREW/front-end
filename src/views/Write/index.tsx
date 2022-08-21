import {
  ButtonHTMLAttributes,
  HTMLAttributes,
  MouseEventHandler,
  TextareaHTMLAttributes,
  useEffect,
  useState,
} from 'react'
import styled from 'styled-components'
import { fontSize, FontSizeProps } from 'styled-system'
import axios from 'axios'
import { getWill, insertWill } from 'api/will'
import { ArrowLeft } from 'components/Common/Svg'
import { useRouter } from 'next/router'
import { ModalCloseButton, useModal } from 'components/Common'
import { Handler } from 'components/Common/Modal/types'
import SelectPostTypeModal from 'views/Write/components/SelectPostTypeModal'
const questionList = [
  '1. 살아오면서 가장 기뻤던 일은?',
  '2. 살아오면서 가장 자부심을 느꼈던 일은?',
  '3. 살아오면서 가장 노여웠던 일은?',
  '4. 살아오면서 가장 자존심이 상했던 일은?',
  '5. 살아오면서 가장 슬펐던 일은?',
  '6. 살아오면서 가장 상처받았던 일은?',
  '7. 살아오면서 가장 수치스러웠던 일은?',
  '8. 살아오면서 가장 후회스러운 일은?',
  '9. 살아오면서 가장 미워했던 사람은?',
  '10. 살아오면서 가장 사랑했던 사람은?',
  '11. 죽음을 앞두고 가장 하고 싶은 말은?',
]

const Write = () => {
  const [title, setTitle] = useState('')
  const [contents, setContents] = useState('')
  const router = useRouter()
  const [isDefaultPostType, setPostType] = useState(true)
  const handlePostType = () => {
    setPostType(false)
    onDismiss()
  }
  const [modal, onDismiss] = useModal(<SelectPostTypeModal onClick={handlePostType} />)
  useEffect(() => {
    modal()
  }, [])

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
      .then((res) => router.push('main'))
  }

  const handleGoToHistory = () => {
    router.push('main')
  }
  return (
    <St.Article>
      <St.MenuBar>
        <St.GoToHistoryButton onClick={handleGoToHistory}>
          <ArrowLeft fill="none" />내 기록
        </St.GoToHistoryButton>
        {/* <button onClick={handleClick}>시간</button> */}
        <St.SaveButton onClick={handleSave} disabled={contents.length ? false : true}>
          작성 완료
        </St.SaveButton>
      </St.MenuBar>
      {/* <Title value={title} onChange={handleTitle}></Title> */}
      {isDefaultPostType ? (
        <Contents value={contents} onChange={handleContents}></Contents>
      ) : (
        questionList.map((question, i) => (
          <div key={`${i}-${question}`}>
            <St.Question>{question}</St.Question>
            <Contents value={contents} onChange={handleContents}></Contents>
          </div>
        ))
      )}
    </St.Article>
  )
}
const Title = ({ ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return <St.Textarea {...props} fontSize={'2rem'} placeholder="제목을 입력하세요." />
}

const Contents = ({ ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return <St.Textarea {...props} placeholder="내용을 입력하세요" />
}

interface TextAreaProps extends FontSizeProps, HTMLAttributes<HTMLTextAreaElement> {}
const St = {
  Question: styled.div`
    font-family: 'Nanum Myeongjo';
    font-style: normal;
    font-weight: 700;
    font-size: 26px;
    margin-bottom: 16px;
    color: ${({ theme }) => theme.colors.grayscale6};
  `,
  Article: styled.article`
    margin-top: 78px;
    padding: 0 24px;
  `,
  MenuBar: styled.div`
    border: none;
    height: 78px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  GoToHistoryButton: styled.button`
    display: flex;
    border: none;
    background: none;
    font-family: 'SUIT';
    justify-content: space-between;
    width: 72px;
    height: 24px;
    padding: unset;
    align-items: center;
    cursor: pointer;
    svg {
      margin-left: 7px;
    }
  `,
  SaveButton: styled.button`
    width: 76px;
    height: 38px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
    font-weight: 500;
    font-size: 14px;
    font-family: 'SUIT-Medium';
    font-style: normal;
    border-radius: 4px;
    border: none;
    line-height: 18px;
    color: ${({ theme }) => theme.colors.grayscale0};
    background-color: ${({ theme }) => theme.colors.grayscale7};
    cursor: pointer;
    :disabled {
      color: ${({ theme }) => theme.colors.grayscale5};
      background-color: ${({ theme }) => theme.colors.grayscale1};
      cursor: not-allowed;
    }
  `,
  Textarea: styled.textarea<TextAreaProps>`
    outline: none;
    border: none;
    resize: none;
    width: 100%;
    font-size: 18px;
    font-weight: 400;
    font-family: 'Nanum Myeongjo';
    color: ${({ theme }) => theme.colors.grayscale7};
    height: calc(100vh - 72px - 78px);
    ::placeholder {
      color: ${({ theme }) => theme.colors.grayscale5};
      font-size: 18px;
    }
    ${fontSize}
  `,
}

export default Write
