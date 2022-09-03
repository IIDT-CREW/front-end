import { Modal, ModalProps } from 'components/Common'
import { Flex, Box, Text } from 'components/Common'
import styled from 'styled-components'
const St = {
  ConfirmButton: styled.div<any>`
    /* Auto layout */

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 14px 16px;
    gap: 10px;

    width: 195px;
    height: 50px;

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
  const { handleDelete } = props

  const deleteAndClose = () => {
    handleDelete()
    onDismiss()
  }

  return (
    <Modal title="일기 작성을 나중에 하시겠어요?" onDismiss={onDismiss} {...props}>
      <Flex flexDirection="column" justifyContent="center" alignItems="center">
        <Text>일기 작성을 나중에 하시겠어요?</Text>
        <Text fontWeight="600">지금까지 작성된 내용은 저장되지 않습니다</Text>
        <Box mt="20px">
          <Flex style={{ gap: '8px' }}>
            <St.ConfirmButton background="grey" onClick={onDismiss}>
              나중에 다시 쓸게요
            </St.ConfirmButton>
            <St.ConfirmButton onClick={deleteAndClose}>지금 계속 쓸게요</St.ConfirmButton>
          </Flex>
        </Box>
      </Flex>
    </Modal>
  )
}

export default WarningHistoryBackModal
