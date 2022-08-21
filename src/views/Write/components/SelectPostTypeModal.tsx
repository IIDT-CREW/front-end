import { ModalCloseButton } from 'components/Common'
import { Handler } from 'components/Common/Modal/types'
import { ButtonHTMLAttributes, MouseEventHandler } from 'react'
import styled from 'styled-components'
interface customModalProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onDismiss?: MouseEventHandler<HTMLButtonElement>
}
const SelectPostTypeModal = ({ onClick, onDismiss }: customModalProps) => {
  return (
    <St.SelectPostTypeModal>
      <St.ModalTitle>
        유서 작성 방식을 선택할 수 있어요.
        <ModalCloseButton onDismiss={onDismiss as Handler} />
      </St.ModalTitle>

      <St.ModalDescription>
        유서를 처음 작성하시는 분들을 위해 두 가지의 선택방식을 두었어요. 편하신 방법을 선택하여, 당신의 마지막 일기를
        작성해주세요.
      </St.ModalDescription>
      <St.ModalButton onClick={onClick}>질문에 따라 유서를 적고 싶어요</St.ModalButton>
      <St.ModalButton onClick={onDismiss} variant="primary">
        제 마음대로 유서를 적고 싶어요
      </St.ModalButton>
    </St.SelectPostTypeModal>
  )
}
type variant = 'primary' | 'secondary'
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
    z-index: 100;
    position: relative;
    width: 586px;
    height: 375px;
    background: #ffffff;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.06), 0px 0px 1px rgba(0, 0, 0, 0.08);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  ModalButton: styled.button<{ variant?: variant }>`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 14px 16px;
    gap: 10px;

    width: 335px;
    height: 50px;
    margin-top: 40px;

    ${({ variant, theme }) => {
      if (variant === 'primary') {
        return `
        background-color: ${theme.colors.grayscale7};
        color: ${theme.colors.grayscale0};
        `
      }
      return `
        background-color: ${theme.colors.grayscale2};
        color: ${theme.colors.grayscale7};
      `
    }}
    cursor: pointer;
    border-radius: 4px;
    border: none;

    font-family: 'SUIT';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
  `,
}

export default SelectPostTypeModal
