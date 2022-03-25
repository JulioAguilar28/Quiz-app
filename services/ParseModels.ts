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
  answerACorrect: answers.answer_a_correct,
  answerBCorrect: answers.answer_b_correct,
  answerCCorrect: answers.answer_c_correct,
  answerDCorrect: answers.answer_d_correct,
  answerECorrect: answers.answer_e_correct,
  answerFCorrect: answers.answer_f_correct
})

export const parseQuestion = (data: any) => {
  const question: QuestionModel = {
    id: data.id,
    question: data.question,
    answers: parsePossibleAnswers(data.answers),
    category: data.category,
    correctAnswer: data.correct_answer,
    correctAnswers: parseCorrectAnswers(data.correct_answers),
    difficulty: data.difficulty,
    multipleCorrectAnswers: data.multiple_correct_answers
  }

  return new Question(question)
}
