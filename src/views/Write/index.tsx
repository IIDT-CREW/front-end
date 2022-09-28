import { TextareaHTMLAttributes, useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { fontSize, FontSizeProps } from 'styled-system'
import { getWill, insertWill, updateWill } from 'api/will'
import { ArrowLeft, ArrowRight } from 'components/Common/Svg'
import { useRouter } from 'next/router'
import { Flex, useModal } from 'components/Common'
import SelectPostTypeModal from 'views/Write/components/modal/SelectPostTypeModal'
import WarningHistoryBackModal from 'views/Write/components/modal/WarningHistoryBackModal'
import { FOOTER_HEIGHT, MENU_HEIGHT } from 'config/constants/default'
import { useUserInfo } from 'store/auth/hooks'
import { nanoid } from 'nanoid'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toastContext } from 'contexts/Toast'
import ProgressBar from 'components/Common/ProgressBar'
import useMatchBreakpoints from 'hooks/useMatchBreakpoints'

const QUESTION_LIST = [
  '1. 살아오면서 가장 기뻤던 일은?',
  '2. 부끄러워서 친구들에게 하지 못한 말은?',
  '3. 부끄러워서 가족들에게 하지 못한 말은?',
  '4. 살아오면서 후회하는 일은?',
  '5. 하지못해서 아쉬운 일은?',
  '6. 과거로 돌아간다면 바꾸고 싶은 것은?',
  '7. 지금 가장 생각나는 사람 세명에게',
]

const DEFAULT_TITLE = `${new Date().toLocaleDateString('ko-KR', {
  year: '2-digit',
  month: 'long',
  day: 'numeric',
})}에 쓰는 마지막 일기`

const Write = () => {
  const [title, setTitle] = useState('')
  const [contents, setContent] = useState(QUESTION_LIST.map((_) => ''))
  const [isDefaultPostType, setPostType] = useState(true)
  const [page, setPage] = useState(0)
  const router = useRouter()
  const { memIdx } = useUserInfo()
  const { onToast } = useContext(toastContext)
  const { isMobile } = useMatchBreakpoints()
  const queryClient = useQueryClient()
  const content = isDefaultPostType ? contents[page] : contents.map((v, i) => `${QUESTION_LIST[i]}\n${v}`).join('\n')
  const isEditMode = !!router?.query?.will_id
  const willId = router?.query?.will_id as string
  const { data, isSuccess: isPostLoaded } = useQuery(['getWill', willId], () => getWill(willId), {
    enabled: router.isReady && isEditMode,
  })

  const setPostWhenEditMode = () => {
    const {
      result: { TITLE, CONTENT, CONTENT_TYPE },
    } = data
    setTitle(TITLE)
    if (CONTENT_TYPE === 0) {
      contents[page] = CONTENT
      return setContent(contents)
    }
    setPostType(false)
    setContent(
      CONTENT.split(
        new RegExp(`${QUESTION_LIST.map((question) => `${question.replaceAll(/[\?]/g, '\\?')}\\n`).join('|')}`, 'g'),
      )
        .filter((v) => v)
        .map((v) => v.replace('\n', '')),
    )
  }
  useEffect(
    function initialScreenByEditMode() {
      if (router.isReady) {
        if (isEditMode && isPostLoaded) setPostWhenEditMode()
        if (!isEditMode) modal()
      }
    },
    [router.isReady, isPostLoaded, isEditMode],
  )

  const handlePostType = () => {
    setPostType(false)
    onDismiss()
  }
  const goToBack = () => router.push('/main')

  const isWriteDown = () => !contents.every((value) => value.length === 0)

  const [modal, onDismiss] = useModal(<SelectPostTypeModal onClick={handlePostType} />)
  const [presentWarningHistoryBackModal] = useModal(<WarningHistoryBackModal goToBack={goToBack} />)

  const isWriteDownTitleAndContent = title !== '' || contents[page] !== '' || isWriteDown()

  const preventGoBack = () => {
    if (isWriteDownTitleAndContent) {
      presentWarningHistoryBackModal()
    } else {
      history.pushState(null, '', location.href)
    }
  }

  useEffect(() => {
    if (!isWriteDownTitleAndContent) return
    if (isWriteDownTitleAndContent) {
      history.pushState(null, '', location.href)
    }
    window.addEventListener('popstate', preventGoBack)
    return () => {
      window.removeEventListener('popstate', preventGoBack)
    }
  }, [isWriteDownTitleAndContent])

  const handleTitle = (e) => {
    setTitle(e.target.value)
  }

  const handleContents = (e) => {
    setContent(contents.map((content, i) => (i === page ? e.target.value : content)))
  }

  const goToMain = () => {
    if (isDefaultPostType) {
      if (title !== '' || contents[page] !== '') {
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
  const addPost = useMutation(insertWill, {
    onSuccess: () => {
      onToast({
        type: '',
        message: '작성이 완료 되었어요',
        option: {
          position: 'top-center',
        },
      })
      goToBack()
    },
  })
  const updatePost = useMutation(updateWill, {
    onSuccess: () => {
      queryClient.setQueryData(['myWill', 0], content)
      queryClient.setQueryData(['getWill', willId], content)
      onToast({
        type: '',
        message: '수정이 완료 되었어요',
        option: {
          position: 'top-center',
        },
      })
      goToBack()
    },
  })
  const handleSave = () => {
    const parameter = {
      title: title.length ? title : DEFAULT_TITLE,
      thumbnail: 'title',
      mem_idx: memIdx,
      content,
      will_id: isEditMode ? willId : nanoid(),
      content_type: isDefaultPostType ? 0 : 1,
    }
    isEditMode ? updatePost.mutate(parameter) : addPost.mutate(parameter)
  }

  const isDisabledSave = () => (contents[page].length ? false : true)
  const createMenuButton = (text, handleClick, disabled, variant: variant = 'primary') =>
    isMobile ? (
      <St.RoundIconButton onClick={handleClick} disabled={disabled}>
        {text === '이전 질문' ? <ArrowLeft /> : <ArrowRight />}
      </St.RoundIconButton>
    ) : (
      <St.MenuButton variant={variant} onClick={handleClick} disabled={disabled}>
        {text}
      </St.MenuButton>
    )

  const createMenuButtons = () => {
    if (!isMobile && isDefaultPostType) return createMenuButton('작성 완료', handleSave, isDisabledSave())
    return (
      <Flex style={{ gap: '10px' }}>
        {page !== 0 && createMenuButton('이전 질문', () => setPage((page) => page - 1), false, 'secondary')}
        {page !== QUESTION_LIST.length - 1
          ? createMenuButton('다음 질문', () => setPage((page) => page + 1), isDisabledSave())
          : !isMobile && createMenuButton('작성 완료', handleSave, isDisabledSave())}
      </Flex>
    )
  }

  return (
    <St.Article>
      <St.MenuBar>
        <St.GoToHistoryButton onClick={goToMain}>
          <ArrowLeft fill="none" width="26px" />내 기록
        </St.GoToHistoryButton>
        {/* <button onClick={handleClick}>시간</button> */}
        {createMenuButtons()}
      </St.MenuBar>
      <St.Editor>
        <Title
          value={title}
          onChange={handleTitle}
          fontSize={[, '16px', '26px']}
          height="30px"
          marginBottom="24px"
          placeholder={DEFAULT_TITLE}
        ></Title>
        {isDefaultPostType || <St.Question fontSize={[, '16px', '26px']}>{QUESTION_LIST[page]}</St.Question>}
        <Contents isDefaultPostType={isDefaultPostType} value={contents[page]} onChange={handleContents} />
      </St.Editor>
      {isDefaultPostType || <ProgressBar value={page + 1} max={QUESTION_LIST.length} />}
    </St.Article>
  )
}
interface TextAreaProps extends FontSizeProps, TextareaHTMLAttributes<HTMLTextAreaElement> {
  height?: string
  marginBottom?: string
  isDefaultPostType?: boolean
}
type variant = 'primary' | 'secondary'
const Title = ({ ...props }: TextAreaProps) => {
  return <St.Textarea {...props} />
}
const Contents = ({ ...props }: TextAreaProps) => {
  return <St.Textarea fontSize={'18px'} placeholder="내용을 입력하세요" {...props} />
}
const St = {
  RoundIconButton: styled.button`
    width: 24px;
    height: 24px;
    border-radius: 100%;
    border: 1px solid ${({ theme }) => theme.colors.grayscale2};
    background-color: ${({ theme }) => theme.colors.grayscale0};
    padding: 0;
  `,
  Editor: styled.section`
    padding: ${MENU_HEIGHT}px 24px 0 24px;
    height: 100%;
  `,
  Question: styled.div<FontSizeProps>`
    font-family: 'Nanum Myeongjo';
    font-style: normal;
    font-weight: 700;
    font-size: 26px;
    margin: 10px 0 16px 0;
    color: ${({ theme }) => theme.colors.grayscale6};
    ${fontSize}
  `,
  Article: styled.article`
    margin-top: ${MENU_HEIGHT}px;
    position: relative;
    height: calc(100vh - ${MENU_HEIGHT}px - ${FOOTER_HEIGHT}px);
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
  `,
  MenuButton: styled.button<{ variant?: variant }>`
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
    cursor: pointer;
    ${({ variant, theme }) => {
      if (variant === 'primary') {
        return `
        background-color: ${theme.colors.grayscale7};
        color: ${theme.colors.grayscale0};
        `
      }
      return `
        border: 1px solid ${theme.colors.grayscale7};
        background-color: ${theme.colors.grayscale0};
        color: ${theme.colors.grayscale7};
      `
    }}
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
    padding: unset;
    color: ${({ theme }) => theme.colors.grayscale7};
    height: ${({ height, isDefaultPostType }) =>
      `${height || `calc(100% - 57px${isDefaultPostType ? '' : ' - 52px'})`}`};
    line-height: 28px;
    ::placeholder {
      color: ${({ theme }) => theme.colors.grayscale5};
      ${fontSize}
    }
    ${({ marginBottom }) => `margin-bottom:${marginBottom}`};
    ${fontSize}
  `,
}

export default Write
