import { HTMLAttributes, ImgHTMLAttributes, ReactElement } from 'react'
import { SpaceProps } from 'styled-system'

export interface WrapperProps extends SpaceProps, HTMLAttributes<HTMLDivElement> {
  width: number
  height: number
  isFill?: boolean
}

export interface ImageProps extends SpaceProps, ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  isUseBlur?: boolean
  width?: number
  height?: number
  isFill?: boolean
}
