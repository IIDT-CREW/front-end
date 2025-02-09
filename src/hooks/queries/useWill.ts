import { createClient } from '@supabase/supabase-js'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { WillInsert, WillWithRelations } from '@/types/will'
import { WillEssayAnswerUpdate, WillQuestionUpdate } from '@/types/will-essay'

export const useWill = () => {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
  const queryClient = useQueryClient()

  // 조회수 증가 함수
  const incrementViews = async (willId: string) => {
    const { error } = await supabase.rpc('increment_views', {
      will_id: willId,
    })
    if (error) throw error
  }

  const getWill = async (willId: string): Promise<WillWithRelations | null> => {
    const { data, error } = await supabase
      .from('will')
      .select(
        `
        *,
        iidt_member (
          mem_nickname,
          profile_img
        ),
        will_essay_answer (
          answer_id,
          question_id,
          answer
        )
      `,
      )
      .eq('will_id', willId)
      .single()

    if (error) return null

    // 조회수 증가
    await incrementViews(willId)

    return data
  }

  const getWillList = async () => {
    const { data, error } = await supabase
      .from('will')
      .select(
        `
        *,
        iidt_member (
          mem_nickname,
          profile_img
        ),
        will_essay_answer (
          answer_id,
          question_id,
          answer
        )
      `,
      )
      .eq('is_private', false)
      .eq('is_deleted', false)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  }

  const getWillCount = async () => {
    const { count, error } = await supabase
      .from('will')
      .select('*', { count: 'exact', head: true })
      .eq('is_deleted', false)

    if (error) throw error
    return count
  }

  const insertWill = async (will: WillInsert) => {
    const { data, error } = await supabase.from('will').insert(will).select().single()

    if (error) throw error
    return data
  }

  // React Query Hooks
  const useWillQuery = (willId: string) => {
    return useQuery({ queryKey: ['will', willId], queryFn: () => getWill(willId), enabled: !!willId })
  }

  const useWillListQuery = () => {
    return useQuery({ queryKey: ['wills'], queryFn: getWillList })
  }
  const useWillCountQuery = () => {
    return useQuery({ queryKey: ['willCount'], queryFn: getWillCount })
  }

  const useInsertWillMutation = () => {
    return useMutation({
      mutationFn: insertWill,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['wills'] })
      },
    })
  }
  // 질문 업데이트를 위한 함수 예시
  const updateWillQuestion = async (questionId: number, updateData: WillQuestionUpdate) => {
    const { data, error } = await supabase
      .from('will_question')
      .update(updateData)
      .eq('question_id', questionId)
      .select()
      .single()

    if (error) throw error
    return data
  }

  // 에세이 답변 업데이트를 위한 함수 예시
  const updateWillEssayAnswer = async (answerId: number, updateData: WillEssayAnswerUpdate) => {
    const { data, error } = await supabase
      .from('will_essay_answer')
      .update(updateData)
      .eq('answer_id', answerId)
      .select()
      .single()

    if (error) throw error
    return data
  }

  return {
    getWill,
    getWillList,
    insertWill,
    useWillQuery,
    useWillListQuery,
    useInsertWillMutation,
    updateWillQuestion,
    updateWillEssayAnswer,
    useWillCountQuery,
  }
}
