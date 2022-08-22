import { Modal, ModalProps } from 'components/Common'
import { Flex, Box, Text } from 'components/Common'
import styled from 'styled-components'
const St = {
  ConfirmButton: styled.div`
    /* Auto layout */

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 14px 16px;
    gap: 10px;

    width: 335px;
    height: 50px;

    /* Color/Grayscale 7 */

    background: #000000;
    border-radius: 4px;

    /* Inside auto layout */

    flex: none;
    order: 0;
    flex-grow: 1;

    color: #fff;

    cursor: pointer;
  `,
}

const WriteWarningInfoModal = ({ onDismiss, ...props }: any) => {
  return (
    <Modal title="내 삶을 돌아보기위한 유서 입니다" onDismiss={onDismiss} {...props}>
      <Flex flexDirection="column" justifyContent="center" alignItems="center">
        <Text>이 유서는 그 누구도 아닌 나 자신을 돌아보는 일기입니다.</Text>
        <Text>죽음은 치료할 수 있는 질병이 아니에요. </Text>
        <Text>인간은 누구나 죽습니다.</Text>
        <Text mb="14px">그렇기에 당신이 맞이하는 하루하루의 삶이 빛나고 소중해요.</Text>

        <Text bold>나 자신을 제일 소중히 아끼고 </Text>

        <Text bold>내 주변의 이들에게 사랑한다고 표현하며 </Text>
        <Text bold>진정으로 좋아하는 일,</Text>
        <Text bold mb="14px">
          {' '}
          꿈꾸고 있는 일을 생각해보세요.
        </Text>

        <Text mb="20px">마음이 힘들다면 1577-0199로 전화해주세요. 당신은 그 누구보다 소중하니까요.</Text>
        <Box>
          <St.ConfirmButton onClick={onDismiss}>확인했어요</St.ConfirmButton>
        </Box>
      </Flex>
    </Modal>
  )
}

export default WriteWarningInfoModal
