export type Difficulty = 'default' | 'hard' | 'extreme'

export interface Question {
  id: string
  type: 'multiple-choice'
  difficulty: Difficulty
  title: string
  prompt: string
  options: { id: string; label: string }[]
  correctAnswer: string
  explanation: string
  visual?: string
  hint?: string
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
  | { screen: 'quiz'; categoryId: string; difficulty: Difficulty; questionIndex: number }
  | { screen: 'result'; categoryId: string; difficulty: Difficulty; score: number; total: number }
