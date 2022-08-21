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
  `,
}

const WriteDeleteModal = ({ onDismiss, ...props }: any) => {
  return (
    <Modal title="유서를 삭제하시겠어요?" onDismiss={onDismiss} {...props}>
      <Flex flexDirection="column" justifyContent="center" alignItems="center">
        <Text>삭제한 유서는 복구할 수 없어요</Text>
        <Text>하지만 이 유서를 통해 하루하루의 삶이 빛나고 소중해졌다면 삭제해도 좋아요</Text>
        <Box mt="20px">
          <Flex style={{ gap: '8px' }}>
            <St.ConfirmButton background="grey">나중에 할게요</St.ConfirmButton>
            <St.ConfirmButton>삭제할게요</St.ConfirmButton>
          </Flex>
        </Box>
      </Flex>
    </Modal>
  )
}

export default WriteDeleteModal
