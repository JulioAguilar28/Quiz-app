import type { CorrectAnswers, PossibleAnswers, QuestionModel } from './AppModels'

export class Question implements QuestionModel {
  id: number
  question: string
  answers: PossibleAnswers
  category: string
  correctAnswer: string
  correctAnswers: CorrectAnswers
  difficulty: string
  multipleCorrectAnswers: boolean

  public constructor(question: QuestionModel) {
    this.id = question.id
    this.question = question.question
    this.answers = question.answers
    this.category = question.category
    this.correctAnswer = question.correctAnswer
    this.correctAnswers = question.correctAnswers
    this.difficulty = question.difficulty
    this.multipleCorrectAnswers = question.multipleCorrectAnswers
  }
}
