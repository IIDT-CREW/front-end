import { IidtMember, IidtMemberInsert, IidtMemberUpdate } from './member'
import { Will, WillInsert, WillUpdate } from './will'
import {
  WillEssayAnswer,
  WillEssayAnswerInsert,
  WillEssayAnswerUpdate,
  WillQuestion,
  WillQuestionInsert,
  WillQuestionUpdate,
} from './will-essay'

// types/database.ts
export interface Database {
  public: {
    Tables: {
      iidt_member: {
        Row: IidtMember // 반환되는 데이터 타입
        Insert: IidtMemberInsert // 삽입 시 필요한 데이터 타입
        Update: IidtMemberUpdate // 업데이트 시 필요한 데이터 타입
      }
      will: {
        Row: Will
        Insert: WillInsert
        Update: WillUpdate
      }
      will_essay_answer: {
        Row: WillEssayAnswer
        Insert: WillEssayAnswerInsert
        Update: WillEssayAnswerUpdate
      }
      will_question: {
        Row: WillQuestion
        Insert: WillQuestionInsert
        Update: WillQuestionUpdate
      }
      //   will_like: {
      //     Row: WillLike
      //     Insert: WillLikeInsert
      //     Update: WillLikeUpdate
      //   }
    }
  }
}
