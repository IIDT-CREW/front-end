import { Modal } from 'components/Common'
import { Flex, Box, Text } from 'components/Common'
import styled from 'styled-components'
const St = {
  ConfirmButton: styled.div<any>`
    /* Auto layout */

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
    height: 50px;
    padding: 10px 12px;
    font-size: 14px;
    width: auto;
    font-weight: 600;
    ${({ theme }) => theme.mediaQueries.sm} {
      padding: 14px 16px;
      width: 195px;
      font-size: 16px;
    }

    /* Color/Grayscale 7 */

    background: ${({ background }) => (background ? background : '#000')};
    border-radius: 4px;

    /* Inside auto layout */

    flex: none;
    order: 0;
    flex-grow: 1;
    color: #fff;
    cursor: pointer;
    font-family: SUIT;
  `,
}

const WarningHistoryBackModal = ({ onDismiss, ...props }: any) => {
  const { goToBack } = props

  const handleGoToMain = () => {
    onDismiss()
    goToBack()
  }

  return (
    <Modal title="일기 작성을 나중에 하시겠어요?" onDismiss={onDismiss} {...props} minWidth="272px">
      <Flex flexDirection="column" justifyContent="center" alignItems="center">
        <Text>일기 작성을 나중에 하시겠어요?</Text>
        <Text css={{ fontWeight: '600', textAlign: 'center', wordBreak: 'keep-all' }}>
          지금까지 작성된 내용은 저장되지 않습니다
        </Text>
        <Box mt="20px">
          <Flex style={{ gap: '8px' }}>
            <St.ConfirmButton background="grey" onClick={handleGoToMain}>
              나중에 다시 쓸게요
            </St.ConfirmButton>
            <St.ConfirmButton onClick={onDismiss}>지금 계속 쓸게요</St.ConfirmButton>
          </Flex>
        </Box>
      </Flex>
    </Modal>
  )
}

export default WarningHistoryBackModal
