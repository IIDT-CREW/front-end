import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import EarthIcon from '../../public/images/write/earth.svg'
import LockIcon from '../../public/images/write/lock.svg'

// import WbSunnyIcon from '@material-ui/icons/WbSunny'
// import NightsStayIcon from '@material-ui/icons/NightsStay'

type PrivateToggleProps = {
  isPrivate: boolean
  handleSetIsPrivate: () => void
}
const PrivateToggle = ({ isPrivate, handleSetIsPrivate }: PrivateToggleProps) => {
  return (
    <St.Wrapper onClick={handleSetIsPrivate} isPrivate={isPrivate}>
      <>
        <EarthIcon />

        {/* {isPrivate && '게시하기'} */}
      </>
      <>
        <LockIcon />
        {/* {!isPrivate && '비공개'} */}
      </>
    </St.Wrapper>
  )
}

type WrapperProps = {
  isPrivate: boolean
}
const St = {
  Wrapper: styled.button<WrapperProps>`
    margin: 0px 5px;
    background: ${({ isPrivate, theme }) => (!isPrivate ? theme.colors.grayscale7 : theme.colors.grayscale5)};
    transition: all 0.25s ease 0.1s;
    border: 1px solid #d1d5da;
    border-radius: 30px;
    cursor: pointer;
    display: flex;
    font-size: 0.5rem;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    padding: 0.5rem;
    z-index: 1;
    width: 4rem;
    height: 2rem;
    bottom: 2rem;
    right: 1.3rem;
    svg {
      &:first-child {
        opacity: ${({ isPrivate }) => (!isPrivate ? '1' : '0')};
        transform: ${({ isPrivate }) => (!isPrivate ? 'translateX(0)' : 'translateX(2rem)')};
        transition: all 0.25s ease 0.1s;
      }
      &:nth-child(2) {
        opacity: ${({ isPrivate }) => (isPrivate ? '1' : '0')};
        transform: ${({ isPrivate }) => (isPrivate ? 'translateX(0)' : 'translateX(-2rem)')};
        transition: all 0.25s ease 0.1s;
      }
    }
  `,
}

export default PrivateToggle
