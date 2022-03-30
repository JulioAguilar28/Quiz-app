import type { CorrectAnswers, PossibleAnswers, QuestionModel } from '~/models/AppModels'
import { Question } from '~/models/Question'

const parsePossibleAnswers = (answers: any): PossibleAnswers => ({
  answerA: answers.answer_a,
  answerB: answers.answer_b,
  answerC: answers.answer_c,
  answerD: answers.answer_d,
  answerE: answers.answer_e,
  answerF: answers.answer_f
})

const parseCorrectAnswers = (answers: any): CorrectAnswers => ({
  answerA: answers.answer_a_correct,
  answerB: answers.answer_b_correct,
  answerC: answers.answer_c_correct,
  answerD: answers.answer_d_correct,
  answerE: answers.answer_e_correct,
  answerF: answers.answer_f_correct
})

const getCorrectAnswer = (answers: CorrectAnswers): string =>
  Object.entries(answers)
    .find(([_key, value]) => value === 'true')
    .at(0) as string

export const parseQuestion = (data: any) => {
  const correctAnswers = parseCorrectAnswers(data.correct_answers)

  const question: QuestionModel = {
    id: data.id,
    question: data.question,
    possibleAnswers: parsePossibleAnswers(data.answers),
    category: data.category,
    correctAnswers,
    correctAnswer: getCorrectAnswer(correctAnswers),
    difficulty: data.difficulty,
    multipleCorrectAnswers: data.multiple_correct_answers
  }

  return new Question(question)
}
