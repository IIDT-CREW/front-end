import React from 'react'
import { Box, Text } from 'components/Common'
import styled from 'styled-components'
import moment from 'moment'
import { IS_DEFAULT_MODE } from 'config/constants/default'
import { Will } from '@api/will/types'
import { QUESTION_LIST } from '@views/Write/data'

const St = {
  Contents: styled.pre`
    white-space: break-spaces;
    font-weight: 400;
    line-height: 1.5;
    font-size: 18px;
    color: ${({ theme }) => theme.colors.text};
  `,
}

type BodyProps = {
  will?: Will
  handleDelete?: () => void
  handleShare?: () => void
  isPrivate?: boolean
}

const Body = ({ will }: BodyProps) => {
  const { CONTENT: content, REG_DATE: regDate, TITLE: title, CONTENT_TYPE: contentType, ANSWER_LIST: answerList } = will

  const isDefaultType = contentType === IS_DEFAULT_MODE

  return (
    <Box>
      <Text fontWeight="600" mb="16px" fontSize="23px">
        {title ? title : `${moment(regDate).format('YYYY년 M월 D일')}에 쓰는 오늘 유서`}
      </Text>

      {isDefaultType ? (
        <St.Contents>{content}</St.Contents>
      ) : (
        <St.Contents>
          {answerList?.map((answer, index) => {
            return (
              <Box key={`answer_${index}`}>
                <Text bold>
                  {QUESTION_LIST.find((item) => item.qusIdx === parseInt(answer?.question_index))?.question}
                </Text>
                <Text>{answer?.question_answer}</Text>
                <br />
              </Box>
            )
          })}
        </St.Contents>
      )}
    </Box>
  )
}

export default React.memo(Body)
