import { QuizDifficulty } from '../types'

export const QuizOptions: Array<{
  label: string
  value: QuizDifficulty
}> = [
  { label: 'Rookie', value: 'easy' },
  { label: 'Veteran', value: 'medium' },
  { label: 'Master', value: 'hard' },
]

export const QuizQuestionLimit: Record<
  QuizDifficulty,
  { min: number; max: number }
> = {
  easy: {
    min: 10,
    max: 15,
  },
  medium: {
    min: 12,
    max: 16,
  },
  hard: {
    min: 12,
    max: 20,
  },
}
