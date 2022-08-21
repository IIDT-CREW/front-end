import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
      <path d="M8.375 14.75L1.625 8L8.375 1.25" stroke="black" />
    </svg>
  )
}
export default Icon
