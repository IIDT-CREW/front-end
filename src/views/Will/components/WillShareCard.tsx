import { Box, Text, Flex } from '@/components/Common'
import styled from 'styled-components'
import { Will } from '@/types/will'
import { QUESTION_LIST } from '@/views/Write/data'
import { IS_DEFAULT_MODE } from '@/config/constants/default'

const St = {
  CardWrapper: styled(Box)`
    background: ${({ theme }) => theme.colors.background};
  `,

  CardHeader: styled(Box)`
    box-shadow: 0 -1px 4px rgb(0 0 0 / 70%);
    background: ${({ theme }) => theme.colors.contrast};
  `,

  Contents: styled.pre`
    white-space: break-spaces;
    font-weight: 400;
    line-height: 1.5;
    font-size: 18px;
    padding: 20px;
    color: ${({ theme }) => theme.colors.text};
  `,
  Author: styled(Text)`
    color: ${({ theme }) => theme.colors.grayscale5};
  `,
}

type WillCardProps = {
  will?: Will
  isDisplayHeader?: boolean
}

const WillCard = ({ will, isDisplayHeader = true }: WillCardProps) => {
  const {
    CONTENT: content,
    //EDIT_DATE: editDate,
    MEM_NICKNAME: memNickname,
    //REG_DATE: regDate,
    //THUMBNAIL,
    //TITLE: title,
    //WILL_ID,
    CONTENT_TYPE: contentType,
    ANSWER_LIST: answerList,
  } = will

  const isDefaultType = contentType === IS_DEFAULT_MODE

  return (
    <St.CardWrapper className="box" mb="40px" padding="20px" minWidth="362px" maxWidth="582px" borderRadius="4px">
      <Box data-aos="fade" data-aos-duration="2500">
        {isDisplayHeader && (
          <St.CardHeader height="25px">
            <Text color="#fff" fontSize="18px" textAlign="center">
              마지막으로...
            </Text>
          </St.CardHeader>
        )}
        <Box mt="40px">
          {isDefaultType ? (
            <St.Contents>{content}</St.Contents>
          ) : (
            <St.Contents>
              {answerList?.map((answer) => {
                return (
                  <>
                    <Text bold>{QUESTION_LIST[parseInt(answer?.question_index)]?.question}</Text>
                    <Text>{answer?.question_answer}</Text>
                  </>
                )
              })}
            </St.Contents>
          )}
        </Box>
        <Flex mt="18px" justifyContent="end">
          <St.Author>{memNickname ? memNickname : '익명'} 마침.</St.Author>
        </Flex>
      </Box>
    </St.CardWrapper>
  )
}

export default WillCard
