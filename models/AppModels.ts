export interface PossibleAnswers {
  answerA: string
  answerB: string
  answerC: string
  answerD: string
  answerE?: string
  answerF?: string
}

export interface CorrectAnswers {
  answerA: boolean
  answerB: boolean
  answerC: boolean
  answerD: boolean
  answerE: boolean
  answerF: boolean
}

export interface QuestionModel {
  id: number
  question: string
  possibleAnswers: PossibleAnswers
  category: string
  correctAnswer: string
  correctAnswers: CorrectAnswers
  difficulty: string
  multipleCorrectAnswers: boolean
}

export interface UserRanking {
  username: string
  score: number
}
