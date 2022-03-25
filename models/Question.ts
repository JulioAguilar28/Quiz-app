import type { CorrectAnswers, PossibleAnswers, QuestionModel } from './AppModels'

export class Question implements QuestionModel {
  id: number
  question: string
  possibleAnswers: PossibleAnswers
  category: string
  correctAnswer: string
  correctAnswers: CorrectAnswers
  difficulty: string
  multipleCorrectAnswers: boolean

  public constructor(question: QuestionModel) {
    this.id = question.id
    this.question = question.question
    this.possibleAnswers = question.possibleAnswers
    this.category = question.category
    this.correctAnswer = question.correctAnswer
    this.correctAnswers = question.correctAnswers
    this.difficulty = question.difficulty
    this.multipleCorrectAnswers = question.multipleCorrectAnswers
  }
}
