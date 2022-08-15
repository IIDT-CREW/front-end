import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Page from 'components/Layout/Page'
import { Flex, Box, Text } from 'components/Common'
import { Heading } from 'components/Common/Heading'
import { getWill, insertWill } from 'api/will'
import styled from 'styled-components'

const St = {
  ImageWrapper: styled.div`
    width: 100%;
    height: 600px;
    position: absolute;
    z-index: -1;
  `,
  Paper: styled.div`
    padding : 50px;
    background-color: #fff3e0;
    background: url(/images/home/textured-paper.png) local;
    height: 600px;
    width: 100%
    padding: 0 2%;
    font-weight: 400;
    overflow-y: auto;
  `,
}
const WillPage = () => {
  const router = useRouter()
  console.log(router.query.id)
  useEffect(() => {}, [router.query.id])
  const handleGetWill = async () => {
    try {
      const res = await getWill(router.query.id as string)
      console.log(res)
    } catch (e) {
      console.log(e)
    }
  }

  const handleInsertWill = async () => {
    try {
      const parameter = {
        title: 'test',
        content: 'hello',
        thumbnail: 'title',
        mem_idx: null,
        will_id: 'tttt',
      }
      const res = await insertWill(parameter)
      console.log(res)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Page>
      <Heading>마지막으로 남깁니다. </Heading>
      <Flex flexDirection="column">
        <Box mt="20px" position="relative">
          <St.ImageWrapper>
            <img
              src="https://source.unsplash.com/random/"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </St.ImageWrapper>
          <Flex justifyContent="center" flexDirection="column">
            <St.Paper>
              <Heading fontFamily="MapoGoldenPier" mb="5px">
                제목...,
              </Heading>
              <Text fontFamily="MapoGoldenPier" bold>
                TEXT TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT TEXT
                TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT TEXT
                TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT TEXT
                TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT
              </Text>
            </St.Paper>
          </Flex>
        </Box>
      </Flex>
      <div></div>

      <Heading>잠시라도 쉬어가는 시간을 가지셨다면 공유부탁드립니다.</Heading>
      <button onClick={handleGetWill}>handleGetWill</button>
      <button onClick={handleInsertWill}>handleInsertWill</button>
    </Page>
  )
}

export default WillPage
