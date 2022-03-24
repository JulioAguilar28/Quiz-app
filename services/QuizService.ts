import { parseRequestError } from './ApiErrors'
import { QuizApiService } from './ApiService'

export const getQuizByCategory = async (category: string) => {
  const response = await getQuizByCategoryRequest(category)
  console.log(response)
}

const getQuizByCategoryRequest = async (category: string) => {
  try {
    return await QuizApiService.of().get(`questions?category=${category}`)
  } catch (error) {
    throw parseRequestError(error)
  }
}
