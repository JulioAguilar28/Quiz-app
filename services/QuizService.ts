import { parseRequestCommonError } from './ApiErrors'
import { QuizApiService } from './ApiService'
import { parseQuestion } from './ParseModels'

export const getQuizByCategory = async (category: string) => {
  const response = await getQuizByCategoryRequest(category)
  return response.data.map((question: any) => parseQuestion(question))
}

const getQuizByCategoryRequest = async (category: string) => {
  try {
    return await QuizApiService.of().get(`questions?category=${category}&difficulty=Easy&limit=10`)
  } catch (error) {
    throw parseRequestCommonError(error)
  }
}
