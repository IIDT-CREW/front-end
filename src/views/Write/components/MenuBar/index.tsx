import { ArrowLeft, ArrowRight } from 'components/Common/Svg'
import styled, { CSSProp, useTheme } from 'styled-components'
import { FOOTER_HEIGHT, IS_DEFAULT_MODE, MENU_HEIGHT } from 'config/constants/default'
import { useCallback } from 'react'
import { Flex } from 'components/Common'
import useToast from 'hooks/useToast'
import { PREV, NEXT, DONE } from 'views/Write/data'
import PrivateToggle from '@components/PrivateToggle'
type Variant = 'primary' | 'secondary'

export const StyleMenuButton = styled.button<{ variant?: Variant; isFull?: boolean; css?: CSSProp }>`
  width: ${({ isFull }) => (isFull ? '100%' : '76px')};
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
    // if (variant === 'disable') {
    //   return `
    //   background-color: ${theme.colors.grayscale5};
    //   color: ${theme.colors.grayscale0};
    //   `
    // }
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
  ${({ theme }) => theme.isDark && 'border: 1px solid rgb(203, 212, 255, 0.5)'};
  ${({ css }) => css}
`
const St = {
  MenuBar: styled.nav`
    border: none;
    height: ${MENU_HEIGHT}px;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    color: ${({ theme }) => theme.colors.text};
    cursor: pointer;
  `,
  RoundIconButton: styled.button`
    width: 24px;
    height: 24px;
    border-radius: 100%;
    border: 1px solid ${({ theme }) => theme.colors.grayscale2};
    background-color: ${({ theme }) => theme.colors.grayscale0};
    padding: 0;
    box-sizing: border-box;
  `,
}

type MenuButtonProps = {
  isMobile: boolean
  text: string
  isDisabled: boolean
  handleMenuButton: (e: any) => void
  variant?: Variant
  buttonType: 'prev' | 'next' | 'done'
}

const MenuButton = ({
  handleMenuButton,
  isMobile,
  text,
  isDisabled,
  variant = 'primary',
  buttonType,
}: MenuButtonProps) => {
  if (isMobile) {
    return (
      <St.RoundIconButton onClick={handleMenuButton} id={buttonType}>
        {buttonType === PREV ? (
          <ArrowLeft css={{ fill: '#000', width: '21px' }} />
        ) : (
          <ArrowRight css={{ fill: '#000', width: '21px' }} />
        )}
      </St.RoundIconButton>
    )
  }
  return (
    <StyleMenuButton id={buttonType} variant={variant} onClick={handleMenuButton} disabled={isDisabled}>
      {text}
    </StyleMenuButton>
  )
}

type MenuButtonListProps = {
  isMobile: boolean
  handleMenuButton: (e: any) => void
  page: number
  isLastPage: boolean
  isDisabled: boolean
  isDefaultPostType: boolean
}
const MenuButtonList = ({
  isMobile,
  handleMenuButton,
  page,
  isLastPage,
  isDisabled,
  isDefaultPostType,
}: MenuButtonListProps) => {
  return (
    <Flex style={{ gap: '10px' }}>
      {!isDefaultPostType && page !== 0 && (
        <MenuButton
          text="이전 질문"
          isMobile={isMobile}
          handleMenuButton={handleMenuButton}
          isDisabled={false}
          variant="secondary"
          buttonType={PREV}
        />
      )}

      {!isDefaultPostType && !isLastPage && (
        <MenuButton
          text="다음 질문"
          isMobile={isMobile}
          handleMenuButton={handleMenuButton}
          isDisabled={isDisabled}
          buttonType={NEXT}
        />
      )}

      {isDefaultPostType && !isMobile && (
        <MenuButton
          text={'작성 완료'}
          isMobile={isMobile}
          handleMenuButton={handleMenuButton}
          isDisabled={isDisabled}
          buttonType={DONE}
        />
      )}
      {!isDefaultPostType && !isMobile && isLastPage && (
        <MenuButton
          text={'작성 완료'}
          isMobile={isMobile}
          handleMenuButton={handleMenuButton}
          isDisabled={isDisabled}
          buttonType={DONE}
        />
      )}
    </Flex>
  )
}

type MenuBarProps = {
  isMobile: boolean
  text: string
  isDisabled: boolean
  handlePage: () => void
  handleUpsert: () => void
  handleMenuButton: (e: any) => void
  variant?: Variant
  buttonType: 'prev' | 'next' | 'done'
  isDefaultPostType: boolean
  isPrivate: boolean
  handleSetIsPrivate: () => void
}
const MenuBar = ({
  isMobile,
  handlePage,
  handleUpsert,
  page,
  isLastPage,
  isDisabled,
  isDefaultPostType,
  isPrivate,
  handleSetIsPrivate,
}) => {
  const goToMain = () => {}
  const theme = useTheme()
  const onToast = useToast()

  const handleMenuButton = useCallback(
    (e) => {
      if (isDisabled)
        return onToast({
          type: 'error',
          message: '내용을 입력해주세요',
          option: {
            position: 'top-center',
            style: {
              top: `${MENU_HEIGHT}px`,
              backgroundColor: `${theme.colors.background}`,
              color: `${theme.colors.error}`,
              border: '1px solid #EFEFEF',
              boxShadow: '0px 0px 1px rgb(0 0 0 / 8%), 0px 2px 6px rgb(0 0 0 / 5%)',
              borderRadius: '2px',
              margin: '0 16px',
            },
          },
        })
      if (e.target.id === PREV) {
        handlePage(page - 1)
        return
      }
      if (e.target.id === NEXT) {
        handlePage(page + 1)
        return
      }

      return handleUpsert()
    },
    [handlePage, handleUpsert, isDisabled, onToast, page, theme.colors.background, theme.colors.error],
  )

  return (
    <St.MenuBar>
      <St.GoToHistoryButton onClick={goToMain}>
        <ArrowLeft fill={theme.colors.text} width="26px" />내 기록
      </St.GoToHistoryButton>
      <Flex justifyContent={'center'} alignItems="center">
        <PrivateToggle isPrivate={isPrivate} handleSetIsPrivate={handleSetIsPrivate} />
        <MenuButtonList
          handleMenuButton={handleMenuButton}
          isMobile={isMobile}
          page={page}
          isLastPage={isLastPage}
          isDisabled={isDisabled}
          isDefaultPostType={isDefaultPostType}
        />
      </Flex>
    </St.MenuBar>
  )
}

export default MenuBar
