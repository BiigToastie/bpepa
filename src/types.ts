export type QuestionType = 'multiple-choice' | 'text-input' | 'sequence-input'

export interface Question {
  id: string
  type: QuestionType
  title: string
  prompt: string
  options?: { id: string; label: string }[]
  correctAnswer: string | string[]
  explanation: string
  visual?: string
  hint?: string
  acceptVariants?: string[]
}

export interface Category {
  id: string
  title: string
  shortTitle: string
  description: string
  icon: string
  gradient: string
  questions: Question[]
}

export type View =
  | { screen: 'home' }
  | { screen: 'category'; categoryId: string }
  | { screen: 'quiz'; categoryId: string; questionIndex: number }
  | { screen: 'result'; categoryId: string; score: number; total: number }
