import { Box, Text, Flex } from 'components/Common'
import { FOOTER_HEIGHT } from 'config/constants/default'

const Footer = () => {
  const handleNotion = () => {
    window.open('https://iidtcrew.notion.site/IIDT-CREW-74a141ff2a93486594249a8c84fe9270', '_blank')
  }

  return (
    <Box height={`${FOOTER_HEIGHT}px`} padding="20px" borderTop="1px solid #D4D4D4 " borderBottom="none">
      {/* <Text fontSize="12px">개인정보수집방침 이용약관</Text> */}
      <Text fontSize="12px" mr="10px">
        IIDT
      </Text>
      <Flex>
        <Text mr="10px" fontSize="12px" onClick={handleNotion} style={{ cursor: 'pointer' }}>
          * 팀 소개 | Notion
        </Text>
        <Text mr="10px" fontSize="12px">
          * Email | iidtcrew@gmail.com
        </Text>
      </Flex>
    </Box>
  )
}

export default Footer
