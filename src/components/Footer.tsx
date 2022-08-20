import { Box, Text, Flex } from 'components/Common'
import { FOOTER_HEIGHT } from 'config/constants/default'

const Footer = () => {
  return (
    <Box height={`${FOOTER_HEIGHT}px`} padding="20px" border="1px solid #D4D4D4 ">
      <Text fontSize="12px">개인정보수집방침 이용약관</Text>
      <Flex>
        <Text fontSize="12px">팀 프로젝트 명 | IIDT</Text>
        <Text fontSize="12px">팀 소개 Notion</Text>
        <Text fontSize="12px">Email | ifteam@gmail.com</Text>
      </Flex>
    </Box>
  )
}

export default Footer
