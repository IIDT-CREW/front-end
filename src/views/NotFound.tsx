import styled from 'styled-components'
import { Button, Heading, Text, Box } from '@/components/Common'
import Page from '@/components/Layout/Page'
import Link from 'next/link'
import { MainButton } from '@/views/Home'

const StyledNotFound = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const NotFound = () => {
  return (
    <Box style={{ minHeight: 'calc(100vh - 64px)', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
      {/* <img
        src="/images/home/joshua-sortino-XMcoTHgNcQA-unsplash.jpg"
        alt=""
        style={{
          width: '100%',
          minHeight: 'calc(100vh - 64px)',
          position: 'absolute',
          zIndex: '-1',
          background:
            'linear-gradient(0deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url("/images/home/joshua-sortino-XMcoTHgNcQA-unsplash.jpg)',
        }}
      /> */}
      <Box
        style={{
          width: '100%',
          minHeight: 'calc(100vh - 64px)',
          position: 'absolute',
          zIndex: '-1',
          background:
            'linear-gradient(0deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url(/images/home/joshua-sortino-XMcoTHgNcQA-unsplash.jpg)',
        }}
      ></Box>
      <StyledNotFound>
        <Text fontSize="36px" mb="18px">
          길을 잃으셨나요?
        </Text>
        <Text style={{ fontFamily: 'SUIT' }}> 괜찮아요. 저희가 안내할게요.</Text>
        <Text style={{ fontFamily: 'SUIT' }}> 찾으시는 페이지의 주소가 잘못 입력되었거나,</Text>
        <Text style={{ fontFamily: 'SUIT' }} mb="18px">
          주소의 변경 혹은 삭제로 인해 사용하실수 없습니다.
        </Text>

        <Text style={{ fontFamily: 'SUIT' }}>
          입력하신 페이지의 주소가 정확한지 다시 한 번 획인해주시고, 같은 문제가 또 발생한다면
        </Text>
        <Text style={{ fontFamily: 'SUIT' }} mb="18px">
          ifteam@gmail.com으로 알려주세요.
        </Text>
        <Link href="/">
          <MainButton style={{ fontFamily: 'SUIT' }}>홈으로 가기</MainButton>
        </Link>
      </StyledNotFound>
    </Box>
  )
}

export default NotFound
