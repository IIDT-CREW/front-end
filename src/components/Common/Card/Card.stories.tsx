import React from 'react'
import styled, { useTheme } from 'styled-components'
import { Meta } from '@storybook/react/types-6-0'
import Box from '../Box/Box'
import Heading from '../Heading/Heading'
import UIKitCardHeader from './CardHeader'
import CardBody from './CardBody'
import CardFooter from './CardFooter'
import Card from './Card'
import Image from '../Image/NextImage'

const Row = styled.div`
  margin-bottom: 32px;
`

export default {
  title: 'Components/Card',
  component: Card,
  argTypes: {},
} as Meta

export const Default: React.FC = () => {
  return (
    <div style={{ padding: '32px', width: '500px' }}>
      <Row>
        <Card>
          <CardBody>바디</CardBody>
          <CardFooter>Footer</CardFooter>
        </Card>
      </Row>
      <Row>
        <Card isActive>
          <CardBody>Active</CardBody>
          <CardFooter>Footer</CardFooter>
        </Card>
      </Row>
      <Row>
        <Card isSuccess>
          <CardBody>Success</CardBody>
          <CardFooter>Footer</CardFooter>
        </Card>
      </Row>
      <Row>
        <Card isWarning>
          <CardBody>Warning</CardBody>
          <CardFooter>Footer</CardFooter>
        </Card>
      </Row>
      <Row>
        <Card isDisabled>
          <CardBody>Disabled</CardBody>
          <CardFooter>Footer</CardFooter>
        </Card>
      </Row>
    </div>
  )
}

export const CardHeader: React.FC = () => {
  const theme = useTheme()
  // This is example how to make card header "overlap" the border.
  // Seems to be easiest solution that works on all screens and does not rely on absolute positioning trickery
  const headerHeight = '60px'
  const customHeadingColor = '#7645D9'
  const gradientStopPoint = `calc(${headerHeight} + 1px)`
  const borderBackground = `linear-gradient(${customHeadingColor} ${gradientStopPoint}, ${theme.colors.cardBorder} ${gradientStopPoint})`

  // Gradient overlap is also possible, just put the "dividing" gradient first and after that the header gradient
  const gradientBorderColor = `linear-gradient(transparent ${gradientStopPoint}, ${theme.colors.cardBorder} ${gradientStopPoint}), ${theme.colors.gradients.cardHeader}`
  return (
    <div style={{ padding: '32px', width: '500px' }}>
      <Row>
        <Card borderBackground={borderBackground}>
          <Box background={customHeadingColor} p="16px" height={headerHeight}>
            <Heading scale="xl" color="white">
              Custom overlapping Header
            </Heading>
          </Box>
          <CardBody>The border on sides of header is covered</CardBody>
          <CardFooter>Footer</CardFooter>
        </Card>
      </Row>
      <Row>
        <Card borderBackground={gradientBorderColor}>
          <Box background={theme.colors.gradients.cardHeader} p="16px" height={headerHeight}>
            <Heading scale="xl">Gradient overlapping Header</Heading>
          </Box>
          <CardBody>The border on sides of header is covered</CardBody>
          <CardFooter>Footer</CardFooter>
        </Card>
      </Row>
      <Row>
        <Card>
          <UIKitCardHeader>
            <Heading scale="xl">Card Header</Heading>
          </UIKitCardHeader>
          <CardBody>Body</CardBody>
          <CardFooter>Footer</CardFooter>
        </Card>
      </Row>
      <Row>
        <Card>
          <UIKitCardHeader variant="blue">
            <Heading scale="xl">Card Header</Heading>
          </UIKitCardHeader>
          <CardBody>Body</CardBody>
          <CardFooter>Footer</CardFooter>
        </Card>
      </Row>
      <Row>
        <Card>
          <UIKitCardHeader variant="violet">
            <Heading scale="xl">Card Header</Heading>
          </UIKitCardHeader>
          <CardBody>Body</CardBody>
          <CardFooter>Footer</CardFooter>
        </Card>
      </Row>
      <Row>
        <Card>
          <UIKitCardHeader variant="bubblegum">
            <Heading scale="xl">Card Header</Heading>
          </UIKitCardHeader>
          <CardBody>Body</CardBody>
          <CardFooter>Footer</CardFooter>
        </Card>
      </Row>
    </div>
  )
}

export const ImageCard = () => {
  return (
    <div style={{ padding: '32px', width: '500px' }}>
      <Card background="#f0c243" borderBackground="#b88700">
        <CardBody style={{ height: '150px' }} p={0}>
          <Image width={500} height={150} alt="" src="/src.png" isUseBlur />
        </CardBody>
        <CardFooter>Footer</CardFooter>
      </Card>
    </div>
  )
}

export const CustomBackground: React.FC = () => {
  return (
    <div style={{ padding: '32px', width: '500px' }}>
      <Card background="#f0c243" borderBackground="#b88700">
        <CardBody style={{ height: '150px' }}>Custom background</CardBody>
      </Card>
    </div>
  )
}
