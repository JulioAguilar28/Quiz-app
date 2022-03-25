export interface PossibleAnswers {
  answerA: string
  answerB: string
  answerC: string
  answerD: string
  answerE?: string
  answerF?: string
}

export interface CorrectAnswers {
  answerACorrect: boolean
  answerBCorrect: boolean
  answerCCorrect: boolean
  answerDCorrect: boolean
  answerECorrect: boolean
  answerFCorrect: boolean
}

export interface QuestionModel {
  id: number
  question: string
  answers: PossibleAnswers
  category: string
  correctAnswer: string
  correctAnswers: CorrectAnswers
  difficulty: string
  multipleCorrectAnswers: boolean
}

// const answers = {
//   answer_a: '<dl>',
//   answer_b: '<ul>',
//   answer_c: '<ol>',
//   answer_d: '<list>',
//   answer_e: null,
//   answer_f: null
// }

// function someObject<Obj, FirstKey extends keyof Obj>(obj: Obj, firstKey: FirstKey) {
//   return {} as any
// }

// someObject(answers, 'answer_a')
