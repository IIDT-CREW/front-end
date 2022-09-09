import { ElementType } from 'react'
import { LayoutProps, SpaceProps } from 'styled-system'
import { PolymorphicComponentProps } from 'utils/polymorphic'
export const scales = {
  MD: 'md',
  SM: 'sm',
  XS: 'xs',
} as const

export const variants = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  TERTIARY: 'tertiary',
  TEXT: 'text',
  DANGER: 'danger',
  SUBTLE: 'subtle',
  SUCCESS: 'success',
  LIGHT: 'light',
} as const

export type Scale = typeof scales[keyof typeof scales]
export type Variant = typeof variants[keyof typeof variants]

export interface BaseButtonProps extends LayoutProps, SpaceProps {
  as?: 'a' | 'button' | ElementType
  external?: boolean
  scale?: Scale
  variant?: Variant
  disabled?: boolean
  width?: string
}
export type ButtonProps<P extends ElementType = 'button'> = PolymorphicComponentProps<P, BaseButtonProps>
