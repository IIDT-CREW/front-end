import { TextareaHTMLAttributes, useContext, useEffect, useState } from 'react'
import styled, { CSSProp, useTheme } from 'styled-components'
import { fontSize, FontSizeProps } from 'styled-system'
import { getWill, insertWill, updateWill } from 'api/will'
import { useRouter } from 'next/router'
import { Box, Flex, useModal } from 'components/Common'
import SelectPostTypeModal from 'views/Write/components/modal/SelectPostTypeModal'
import WarningHistoryBackModal from 'views/Write/components/modal/WarningHistoryBackModal'
import { FOOTER_HEIGHT, MENU_HEIGHT } from 'config/constants/default'
import { useUserInfo } from 'store/auth/hooks'
import { nanoid } from 'nanoid'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import ProgressBar from 'components/Common/ProgressBar'
import PrivateToggle from 'components/PrivateToggle'
import useMatchBreakpoints from 'hooks/useMatchBreakpoints'
import MenuBar, { StyleMenuButton } from 'views/Write/components/MenuBar'

//question number;
//answer
const QUESTION_LIST = [
  {
    qusIdx: 1,
    question: '살아오면서 가장 기뻤던 일은?',
  },
  {
    qusIdx: 2,
    question: '부끄러워서 친구들에게 하지 못한 말은?',
  },
  {
    qusIdx: 3,
    question: '부끄러워서 친구들에게 하지 못한 말은?',
  },
  {
    qusIdx: 4,
    question: '살아오면서 후회하는 일은?',
  },
  {
    qusIdx: 5,
    question: '하지못해서 아쉬운 일은?',
  },
  {
    qusIdx: 6,
    question: '과거로 돌아간다면 바꾸고 싶은 것은?',
  },
  {
    qusIdx: 7,
    question: '지금 가장 생각나는 사람 세명에게',
  },
]

const DEFAULT_TITLE = `${new Date().toLocaleDateString('ko-KR', {
  year: '2-digit',
  month: 'long',
  day: 'numeric',
})}에 쓰는 오늘의 유서`

const Write = () => {
  const router = useRouter()
  const { memIdx } = useUserInfo()
  const { isMobile } = useMatchBreakpoints()

  const [presentWarningHistoryBackModal] = useModal(<WarningHistoryBackModal goToBack={goToBack} />)
  const isEditMode = !!router?.query?.will_id
  const willId = router?.query?.will_id as string
  const [isDefaultPostType, setIsDefaultPostType] = useState(true)
  const [page, setPage] = useState(0)
  const [title, setTitle] = useState('')
  //const content = isDefaultPostType ? contents[page] : contents.map((v, i) => `${QUESTION_LIST[i]}\n${v}`).join('\n')
  const [contents, setContent] = useState(QUESTION_LIST.map((_) => {}))

  const handlePostType = () => {
    setIsDefaultPostType(false)
    onDismiss()
  }
  const [modal, onDismiss] = useModal(<SelectPostTypeModal onClick={handlePostType} />)

  const handleContents = (e) => {
    //setContent(contents.map((content, i) => (i === page ? e.target.value : content)))
  }

  const handleTitle = (e) => {
    setTitle(e.target.value)
  }

  const handleContent = () => {}
  const handlePage = (page: number) => {
    setPage(page)
  }
  const handleSave = () => {
    // const parameter = {
    //   title: title.length ? title : DEFAULT_TITLE,
    //   thumbnail: 'title',
    //   mem_idx: memIdx,
    //   content,
    //   will_id: isEditMode ? willId : nanoid(),
    //   content_type: isDefaultPostType ? 0 : 1,
    // }
    //isEditMode ? updatePost.mutate(parameter) : addPost.mutate(parameter)
  }
  const isDisabledSave = false
  return (
    <St.Article>
      <MenuBar
        isMobile={isMobile}
        handleSave={handleSave}
        handlePage={handlePage}
        isDisabled={false}
        page={page}
        isLastPage={page === QUESTION_LIST.length - 1}
      />
      <St.Editor>
        <Title
          value={title}
          onChange={handleTitle}
          fontSize={[, '16px', '26px']}
          rows={1}
          wrap="off"
          placeholder={DEFAULT_TITLE}
          css={{ height: '30px', marginBottom: '24px', overflow: 'hidden' }}
        />

        {isDefaultPostType || <St.Question fontSize={[, '16px', '26px']}>{QUESTION_LIST[page]?.question}</St.Question>}
        <Contents
          isDefaultPostType={isDefaultPostType}
          value={contents[page]}
          onChange={handleContents}
          fontSize={[, '16px', '18px']}
          css={{ flex: 'auto' }}
        />
        {isDefaultPostType && isMobile && (
          <StyleMenuButton
            isFull={true}
            variant="primary"
            onClick={handleSave}
            disabled={isDisabledSave}
            css={{ marginBottom: '16px' }}
          >
            {'작성 완료'}
          </StyleMenuButton>
        )}
        {!isDefaultPostType && isMobile && page === QUESTION_LIST.length - 1 && (
          <StyleMenuButton
            isFull={true}
            variant="primary"
            onClick={handleSave}
            disabled={isDisabledSave}
            css={{ marginBottom: '16px' }}
          >
            {'모두 다 작성했어요'}
          </StyleMenuButton>
        )}
      </St.Editor>
      {isDefaultPostType || <ProgressBar value={page + 1} max={QUESTION_LIST.length} wrapperCss={progressStyle} />}
    </St.Article>
  )
}
const progressStyle = { marginBottom: '10px' }
interface TextAreaProps extends FontSizeProps, TextareaHTMLAttributes<HTMLTextAreaElement> {
  isDefaultPostType?: boolean
  css?: CSSProp
}
type variant = 'primary' | 'secondary'
const Title = ({ ...props }: TextAreaProps) => {
  return <St.Textarea {...props} />
}
const Contents = ({ ...props }: TextAreaProps) => {
  return <St.Textarea placeholder="내용을 입력하세요" {...props} />
}
const St = {
  Editor: styled.section`
    margin: ${MENU_HEIGHT}px 24px 0 24px;
    height: 100%;
    display: flex;
    flex-direction: column;
  `,
  Question: styled.div<FontSizeProps>`
    font-family: 'Nanum Myeongjo';
    font-style: normal;
    font-weight: 700;
    font-size: 26px;
    margin: 0 0 16px 0;
    color: ${({ theme }) => theme.colors.textPrimary};
    ${fontSize}
  `,
  Article: styled.article`
    margin-top: ${MENU_HEIGHT}px;
    position: relative;
    height: calc(100vh - ${MENU_HEIGHT}px - ${FOOTER_HEIGHT}px);
  `,

  Textarea: styled.textarea<TextAreaProps>`
    outline: none;
    border: none;
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
      color: ${({ theme }) => theme.colors.grayscale5};
      ${fontSize}
    }
    ${({ css }) => css}
    ${fontSize}
  `,
}

export default Write
