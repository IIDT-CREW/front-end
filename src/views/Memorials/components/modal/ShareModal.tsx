import { useEffect } from 'react'
import { Modal } from 'components/Common'
import { Flex, Box, Text } from 'components/Common'
import CopyToClipboard from 'views/Will/components/CopyToClipboard'
import { API_URL } from 'config/constants/api'
import { useRouter } from 'next/navigation'

const ShareModal = ({ onDismiss, content, willId, title, ...props }: any) => {
  const router = useRouter()

  function kakaoShareFix() {
    // Kakao.Link.cleanup()
    Kakao.cleanup()
    if (process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT) {
      // 새로운 키를 이용하여 init
      Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT)
    }
  }
  useEffect(() => {
    // init 체크
    if (!Kakao.isInitialized()) {
      kakaoShareFix()
    }
  }, [router.query.id, content, willId])

  const handleKakao = () => {
    // 공유 정보 가져오기
    // const shareContent = {
    //   title: document.querySelector('[property="og:title"]').attributes.content.value,
    //   desc: document.querySelector('[property="og:description"]').attributes.content.value,
    //   image: document.querySelector('[property="og:image"]').attributes.content.value,
    //   url: router.asPath,
    // }
    // 카카오 공유
    const kakaoShareFunc = () => {
      Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: '오늘 유서',
          description: `${title}\n${content}`,
          imageUrl: 'https://www.if-i-die-tomorrow.com/images/home/patrick-ryan-3kUIaB2EPp8-unsplash.jpg',
          imageWidth: 1200,
          imageHeight: 630,
          link: {
            webUrl: `${API_URL}/will/${willId}`,
            mobileWebUrl: `${API_URL}/will/${willId}`,
          },
        },
        buttons: [
          {
            title: '읽으러 가기',
            link: {
              webUrl: `${API_URL}/will/${willId}`,
              mobileWebUrl: `${API_URL}/will/${willId}`,
            },
          },
        ],
        // serverCallbackArgs: {
        //   // 사용자 정의 파라미터 설정
        //   key: 'value',
        // },
      })
    }
    kakaoShareFunc()
    onDismiss()
  }

  return (
    <Modal title="오늘 유서를 공유하세요" onDismiss={onDismiss} {...props} minWidth="272px">
      <Flex flexDirection="column" justifyContent="center" alignItems="center">
        <Text>마음을 담아서 작성하셨나요?</Text>
        <Text>남들에게도 자신의 오늘 유서를 공유해보세요 </Text>
        <Text mb="20px">마음이 힘들다면 1577-0199로 전화해주세요.</Text>
        <Text mb="20px">당신은 그 누구보다 소중합니다.</Text>
        <Box>
          <Flex justifyContent="center" alignItems="center" flexWrap="wrap" style={{ gap: '10px' }}>
            <CopyToClipboard toCopy={`${API_URL}/will/${willId}`} />
            <div onClick={handleKakao}>
              <img alt="" src="//developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_small.png" />
            </div>
          </Flex>
          <div></div>
        </Box>

        <Box>{/* <St.ConfirmButton onClick={onDismiss}></St.ConfirmButton> */}</Box>
      </Flex>
    </Modal>
  )
}

export default ShareModal
