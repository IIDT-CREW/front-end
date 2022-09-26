import { Box } from 'components/Common'
import { getColor } from 'components/Common/Text/Text'
import styled from 'styled-components'
import { Will } from 'api/types'

const St = {
  CardWrapper: styled(Box)`
    background: ${({ theme }) => theme.colors.background};
  `,

  CardHeader: styled(Box)`
    box-shadow: 0 -1px 4px rgb(0 0 0 / 70%);
    background: ${({ theme }) => theme.colors.contrast};
  `,

  Contents: styled.pre`
    white-space: break-spaces;
    font-weight: 400;
    line-height: 1.5;
    font-size: 18px;
    padding: 20px;
    color: ${getColor};
  `,
}

type WillCardProps = {
  will?: Will
}

const WillCard = ({ will }: WillCardProps) => {
  const { CONTENT: content } = will

  return (
    <St.CardWrapper className="box" mb="40px" padding="20px" minWidth="362px" maxWidth="582px" borderRadius="4px">
      <Box data-aos="fade" data-aos-duration="2500">
        <St.CardHeader height="25px"></St.CardHeader>
        <Box mt="40px">
          <St.Contents>{content}</St.Contents>
        </Box>
      </Box>
    </St.CardWrapper>
  )
}

export default WillCard
