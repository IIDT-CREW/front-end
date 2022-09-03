import { TextareaHTMLAttributes, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { fontSize, FontSizeProps } from 'styled-system'
import { insertWill } from 'api/will'
import { ArrowLeft } from 'components/Common/Svg'
import { useRouter } from 'next/router'
import { useModal } from 'components/Common'
import SelectPostTypeModal from 'views/Write/components/modal/SelectPostTypeModal'
import WarningHistoryBackModal from 'views/Write/components/modal/WarningHistoryBackModal'

import { MENU_HEIGHT } from 'config/constants/default'
import { useUserInfo } from 'store/auth/hooks'
import { nanoid } from 'nanoid'
import { useMutation } from 'react-query'
const questionList = [
  '1. 살아오면서 가장 기뻤던 일은?',
  '2. 부끄러워서 친구들에게 하지 못한 말은?',
  '3. 부끄러워서 가족들에게 하지 못한 말은?',
  '4. 살아오면서 후회하는 일은?',
  '5. 하지못해서 아쉬운 일은?',
  '6. 과거로 돌아간다면 바꾸고 싶은 것은?',
  '7. 지금 가장 생각나는 사람 세명에게',
]

const Write = () => {
  const [title, setTitle] = useState('')
  const [content, setContents] = useState('')
  const router = useRouter()
  const [isDefaultPostType, setPostType] = useState(true)
  const inputRef = useRef<HTMLFormElement>(null)
  const { memIdx } = useUserInfo()

  const handlePostType = () => {
    setPostType(false)
    onDismiss()
  }
  const goToBack = () => {
    router.push('/main')
  }
  const [modal, onDismiss] = useModal(<SelectPostTypeModal onClick={handlePostType} />)
  const [presentWarningHistoryBackModal] = useModal(<WarningHistoryBackModal goToBack={goToBack} />)

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

  const isWriteDown = () => {
    if (inputRef.current === null) return true
    return ![...inputRef.current.children]
      .map((element) => {
        const [, textarea] = element.children
        return (textarea as HTMLTextAreaElement).value
      })
      .every((value) => value.length === 0)
  }

  const goToMain = () => {
    if (isDefaultPostType) {
      if (title || content) {
        presentWarningHistoryBackModal()
        return
      }
    }
    if (!isDefaultPostType && isWriteDown()) {
      presentWarningHistoryBackModal()
      return
    }
    router.push('main')
  }
  const savePost = useMutation(insertWill, {
    onSuccess: () => {
      goToBack()
    },
  })

  const handleSave = () => {
    const parameter = {
      title,
      thumbnail: 'title',
      mem_idx: memIdx,
      content: isDefaultPostType
        ? content
        : [...inputRef.current.children]
            .map((element) => {
              const [div, textarea] = element.children
              return `${div.textContent}\n${(textarea as HTMLTextAreaElement).value}`
            })
            .join('\n'),
      will_id: nanoid(),
    }

    savePost.mutate(parameter)
  }

  const isDisabledSave = () => {
    if (isDefaultPostType) return content.length ? false : true
    if (inputRef.current === null) return true
    return ![...inputRef.current.children]
      .map((element) => {
        const [, textarea] = element.children
        return (textarea as HTMLTextAreaElement).value
      })
      .every((value) => value.length)
  }

  return (
    <St.Article>
      <St.MenuBar>
        <St.GoToHistoryButton onClick={goToMain}>
          <ArrowLeft fill="none" />내 기록
        </St.GoToHistoryButton>
        {/* <button onClick={handleClick}>시간</button> */}
        <St.SaveButton onClick={handleSave} disabled={isDisabledSave()}>
          작성 완료
        </St.SaveButton>
      </St.MenuBar>
      {/* <Title value={title} onChange={handleTitle}></Title> */}
      <St.Editor>
        {isDefaultPostType ? (
          <Contents value={content} onChange={handleContents}></Contents>
        ) : (
          <form ref={inputRef}>
            {questionList.map((question, i) => (
              <div key={`${i}-${question}`}>
                <St.Question>{question}</St.Question>
                <Contents height="200px" onChange={handleContents}></Contents>
              </div>
            ))}
          </form>
        )}
      </St.Editor>
    </St.Article>
  )
}
interface TextAreaProps extends FontSizeProps, TextareaHTMLAttributes<HTMLTextAreaElement> {
  height?: string
}
const Title = ({ ...props }: TextAreaProps) => {
  return <St.Textarea {...props} fontSize={'2rem'} placeholder="제목을 입력하세요." />
}
const Contents = ({ ...props }: TextAreaProps) => {
  return <St.Textarea {...props} placeholder="내용을 입력하세요" />
}

const St = {
  Editor: styled.section`
    padding: ${MENU_HEIGHT}px 24px 0 24px;
  `,
  Question: styled.div`
    font-family: 'Nanum Myeongjo';
    font-style: normal;
    font-weight: 700;
    font-size: 26px;
    margin: 10px 0 16px 0;
    color: ${({ theme }) => theme.colors.grayscale6};
  `,
  Article: styled.article`
    margin-top: ${MENU_HEIGHT}px;
    position: relative;
  `,
  MenuBar: styled.nav`
    border: none;
    height: ${MENU_HEIGHT}px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    width: 100%;
    padding: 0 24px;
    background-color: ${({ theme }) => theme.colors.background};
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
    ${({ height }) => `height: ${height}`};
    ${fontSize}
  `,
}

export default Write
