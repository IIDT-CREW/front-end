/* eslint-disable no-sparse-arrays */
import { TextareaHTMLAttributes, useCallback, useEffect, useState } from 'react'
import styled, { CSSProp } from 'styled-components'
import { fontSize, FontSizeProps } from 'styled-system'
import { useRouter } from 'next/router'
import { useModal } from 'components/Common'
import SelectPostTypeModal from 'views/Write/components/modal/SelectPostTypeModal'
import { FOOTER_HEIGHT, IS_DEFAULT_MODE, MENU_HEIGHT } from 'config/constants/default'
import { useUserInfo } from 'store/auth/hooks'
import { nanoid } from 'nanoid'
import ProgressBar from 'components/Common/ProgressBar'
import useMatchBreakpoints from 'hooks/useMatchBreakpoints'
import MenuBar, { StyleMenuButton } from 'views/Write/components/MenuBar'
import { QUESTION_LIST } from 'views/Write/data'
import useAddPostMutation from 'hooks/queries/Write/useAddPostMutation'
import useUpdatePostMutation from 'hooks/queries/Write/useUpdatePostMutation'
import { useGetWill } from 'hooks/queries/Write/useGetWill'
import useWarningHistoryBack from './hooks/useWarningHistoryBack'

const DEFAULT_TITLE = `${new Date().toLocaleDateString('ko-KR', {
  year: '2-digit',
  month: 'long',
  day: 'numeric',
})}에 쓰는 오늘 유서`

const Write = () => {
  const router = useRouter()
  const { memIdx } = useUserInfo()
  const { isMobile } = useMatchBreakpoints()
  const goToBack = useCallback(() => {
    router.push('/main')
  }, [router])
  const { mutate: addPostMutate } = useAddPostMutation({ goToBack })
  const { mutate: updatePostMutate } = useUpdatePostMutation({ goToBack })
  const isEditMode = !!router?.query?.will_id
  const willId = router?.query?.will_id as string
  const [isDefaultPostType, setIsDefaultPostType] = useState(true)
  const [page, setPage] = useState(0)
  const [title, setTitle] = useState('')
  const [contents, setContents] = useState(
    QUESTION_LIST.map((question) => ({
      questionEssayIndex: '',
      questionIndex: question.qusIdx,
      answer: '',
    })),
  )
  const [isDisableSave, setIsDisableSave] = useState(true)

  const { data, isSuccess: isPostLoaded } = useGetWill(willId, {
    enabled: router.isReady && isEditMode,
  })

  useWarningHistoryBack({ title, contents, goToBack, page })

  const [isPrivate, setPrivate] = useState(false)
  const handleSetIsPrivate = useCallback(() => {
    setPrivate((prev) => !prev)
  }, [])

  useEffect(() => {
    setIsDisableSave(contents[page].answer.length ? false : true)
  }, [contents, page])

  const setPostWhenEditMode = useCallback(() => {
    const {
      result: {
        TITLE: title,
        CONTENT: content,
        CONTENT_TYPE: contentType,
        ANSWER_LIST: answerList,
        IS_PRIVATE: isPrivate,
      },
    } = data

    setTitle(title)
    setPrivate(isPrivate)
    if (contentType === IS_DEFAULT_MODE) {
      const answer = [{ questionIndex: 1, answer: content }, ...contents.slice(1)]
      return setContents(answer)
    }
    /* 질문 타입  */
    setIsDefaultPostType(false)
    const answer = answerList?.map((answer) => {
      return {
        questionEssayIndex: answer.question_essay_index,
        questionIndex: answer.question_index,
        answer: answer.question_answer,
      }
    })
    setContents(answer)
  }, [contents, data])

  /* 모달 onOpen */
  useEffect(
    function initialScreenByEditMode() {
      if (router.isReady) {
        if (isEditMode && isPostLoaded) setPostWhenEditMode()
        if (!isEditMode) modal()
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.isReady, isPostLoaded, isEditMode],
  )

  const handlePostType = useCallback(() => {
    setIsDefaultPostType(false)
  }, [])
  const [modal, onDismiss] = useModal(<SelectPostTypeModal handlePostType={handlePostType} />, false)

  const handleContents = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setContents(contents.map((content, i) => (i === page ? { ...content, answer: e.target.value } : content)))
    },
    [contents, page],
  )

  const handleTitle = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value)
  }, [])

  const handlePage = useCallback((page: number) => {
    setPage(page)
  }, [])

  const handleUpsert = useCallback(() => {
    const parameter = {
      title: title.length ? title : DEFAULT_TITLE,
      thumbnail: 'title',
      mem_idx: memIdx,
      content: isDefaultPostType ? contents[0].answer : '',
      will_id: isEditMode ? willId : nanoid(),
      is_private: isPrivate,
      content_type: isDefaultPostType ? 0 : 1,
      answer_list: isDefaultPostType
        ? null
        : contents?.map((content) => ({
            qs_essay_idx: content.questionEssayIndex,
            qs_idx: content.questionIndex.toString(),
            qs_essay_answer: content.answer,
          })),
    }
    // console.log(parameter)
    isEditMode ? updatePostMutate(parameter) : addPostMutate(parameter)
  }, [addPostMutate, contents, isDefaultPostType, isEditMode, isPrivate, memIdx, title, updatePostMutate, willId])

  return (
    <St.Article>
      <MenuBar
        isMobile={isMobile}
        handleUpsert={handleUpsert}
        handlePage={handlePage}
        page={page}
        isDisabled={isDisableSave}
        isLastPage={page === QUESTION_LIST.length - 1}
        isDefaultPostType={isDefaultPostType}
        isPrivate={isPrivate}
        handleSetIsPrivate={handleSetIsPrivate}
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
          value={contents[page]?.answer}
          onChange={handleContents}
          fontSize={[, '16px', '18px']}
          css={{ flex: 'auto' }}
        />
        {isDefaultPostType && isMobile && (
          <StyleMenuButton
            isFull={true}
            variant="primary"
            onClick={handleUpsert}
            disabled={false}
            css={{ marginBottom: '16px' }}
          >
            작성 완료
          </StyleMenuButton>
        )}
        {!isDefaultPostType && isMobile && page === QUESTION_LIST.length - 1 && (
          <StyleMenuButton
            isFull={true}
            variant="primary"
            onClick={handleUpsert}
            disabled={isDisableSave}
            css={{ marginBottom: '16px' }}
          >
            모두 다 작성했어요
          </StyleMenuButton>
        )}
      </St.Editor>
      {!isDefaultPostType || <ProgressBar value={page + 1} max={QUESTION_LIST.length} wrapperCss={progressStyle} />}
    </St.Article>
  )
}
const progressStyle = { marginBottom: '10px' }
interface TextAreaProps extends FontSizeProps, TextareaHTMLAttributes<HTMLTextAreaElement> {
  isDefaultPostType?: boolean
  css?: CSSProp
}

const Title = ({ ...props }: TextAreaProps) => {
  return <St.Textarea {...props} maxLength={30} />
}
const Contents = ({ ...props }: TextAreaProps) => {
  return <St.Textarea placeholder="내용을 입력하세요" {...props} maxLength={1500} />
}
const St = {
  Editor: styled.section`
    padding: 0px 24px 0 24px;
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
