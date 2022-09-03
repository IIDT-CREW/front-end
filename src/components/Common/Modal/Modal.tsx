import React, { useEffect } from 'react'
import { useTheme } from 'styled-components'
import Heading from '../Heading/Heading'
import getThemeValue from '../../../utils/getThemeValue'
import { ModalBody, ModalHeader, ModalTitle, ModalContainer, ModalCloseButton, ModalBackButton } from './styles'
import { ModalProps } from './types'

const Modal: React.FC<ModalProps> = ({
  title = '',
  onDismiss,
  onBack,
  children,
  hideTitle = false,
  hideCloseButton = false,
  bodyPadding = '32px',
  headerBackground = 'transparent',
  minWidth = '320px',
  ...props
}) => {
  const theme = useTheme()

  useEffect(() => {
    const preventGoBack = () => {
      onDismiss()
    }
    window.addEventListener('popstate', preventGoBack)
    return () => window.removeEventListener('popstate', preventGoBack)
  }, [onDismiss])

  return (
    <ModalContainer minWidth={minWidth} {...props}>
      {!hideTitle && (
        <ModalHeader background={getThemeValue(`colors.${headerBackground}`, headerBackground)(theme)}>
          <ModalTitle>
            {onBack && <ModalBackButton onBack={onBack} />}
            <Heading scale="md">{title}</Heading>
          </ModalTitle>
          {!hideCloseButton && <ModalCloseButton onDismiss={onDismiss} />}
        </ModalHeader>
      )}
      <ModalBody p={bodyPadding}>{children}</ModalBody>
    </ModalContainer>
  )
}

export default Modal
