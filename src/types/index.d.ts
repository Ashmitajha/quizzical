import { IconType } from 'react-icons'

export type QuestionCategory = {
  id: number
  name: string
  icon: IconType
}

type IQuestion = {
  question: string
  options: string[]
  answer: number
}

export type QuizDifficulty = 'easy' | 'medium' | 'hard'
