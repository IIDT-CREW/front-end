export interface WillEssayAnswer {
  answer_id: number
  will_id: string
  question_id: number
  answer: string
  created_at: string
  updated_at: string
}

export type WillEssayAnswerInsert = Omit<WillEssayAnswer, 'answer_id' | 'created_at' | 'updated_at'>

// WillEssayAnswerUpdate 타입 정의
// answer만 수정 가능하도록 설정
export type WillEssayAnswerUpdate = {
  answer: string
}

// WillQuestion 인터페이스는 이미 정의되어 있다고 가정
export interface WillQuestion {
  question_id: number
  question: string
  order_num: number
  is_active: boolean
  created_at: string
  updated_at: string
}

// WillQuestionInsert 타입 정의
// created_at, updated_at은 자동 생성되므로 제외
export type WillQuestionInsert = Omit<WillQuestion, 'question_id' | 'created_at' | 'updated_at'>

// WillQuestionUpdate 타입 정의
// 모든 필드를 선택적으로 만들되, id와 타임스탬프 필드는 제외
export type WillQuestionUpdate = Partial<Omit<WillQuestion, 'question_id' | 'created_at' | 'updated_at'>>
