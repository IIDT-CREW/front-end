import { HTMLAttributes, TextareaHTMLAttributes, useEffect, useState } from 'react'
import styled from 'styled-components'
import { fontSize, FontSizeProps } from 'styled-system'
import axios from 'axios'
import { getWill, insertWill } from 'api/will'
import { ArrowLeft } from 'components/Common/Svg'
import { useRouter } from 'next/router'
import { useModal } from 'components/Common'
import { Modal, ModalProps } from 'components/Common'

const Write = () => {
  const [title, setTitle] = useState('')
  const [contents, setContents] = useState('')
  const router = useRouter()
  const [modal, onDismiss] = useModal(
    // <Modal>
    // </Modal>,
    <St.SelectPostTypeModal>
      <St.ModalTitle>유서 작성 방식을 선택할 수 있어요.</St.ModalTitle>

      <St.ModalDescription>
        유서를 처음 작성하시는 분들을 위해 두 가지의 선택방식을 두었어요. 편하신 방법을 선택하여, 당신의 마지막 일기를
        작성해주세요.
      </St.ModalDescription>
      <button>질문에 따라 유서를 적고 싶어요</button>
      <button>제 마음대로 유서를 적고 싶어요</button>
    </St.SelectPostTypeModal>,
  )
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
    <article>
      <St.MenuBar>
        <St.GoToHistoryButton onClick={handleGoToHistory}>
          <ArrowLeft />내 기록
        </St.GoToHistoryButton>
        {/* <button onClick={handleClick}>시간</button> */}
        <St.SaveButton onClick={handleSave} disabled={contents.length ? false : true}>
          작성 완료
        </St.SaveButton>
      </St.MenuBar>
      {/* <Title value={title} onChange={handleTitle}></Title> */}
      <Contents value={contents} onChange={handleContents}></Contents>
    </article>
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
  ModalTitle: styled.div`
    font-weight: 600;
    font-size: 18px;
    margin-top: 32px;
  `,
  ModalDescription: styled.div`
    width: 410px;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    margin-top: 8px;
    text-align: center;
  `,
  SelectPostTypeModal: styled.div`
    width: 586px;
    height: 375px;
    background: #ffffff;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.06), 0px 0px 1px rgba(0, 0, 0, 0.08);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
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
      cursor: none;
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
