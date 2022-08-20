import { Heading, Box, Text, Flex } from 'components/Common'
import { MENU_HEIGHT } from 'config/constants/default'
import CloseOutline from 'components/Common/Svg/Icons/MenuOutline'
import { St } from 'components/Menu'

const MenuWrapper = () => {
  return (
    <Box mt={`${MENU_HEIGHT}px`}>
      <Box>
        <Text mb="24px">로그아웃</Text>
        <Text mb="24px">개인정보 처리방침</Text>
        <Text mb="24px">서비스 이용약관</Text>
      </Box>
    </Box>
  )
}

export default MenuWrapper
