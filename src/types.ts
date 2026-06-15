export type Difficulty = 'default' | 'hard' | 'extreme'

export type MarathonDifficulty = Difficulty | 'all'

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
  | { screen: 'auth'; redirect?: 'marathon-setup' | 'leaderboard' }
  | { screen: 'category'; categoryId: string }
  | { screen: 'quiz'; categoryId: string; difficulty: Difficulty; questionIndex: number }
  | { screen: 'result'; categoryId: string; difficulty: Difficulty; score: number; total: number }
  | { screen: 'marathon-setup' }
  | {
      screen: 'marathon-quiz'
      categoryIds: string[]
      difficulty: MarathonDifficulty
      queue: { categoryId: string; questionId: string }[]
      index: number
      runCorrect: number
      runAnswered: number
      sectionRunStats: Record<string, { correct: number; answered: number }>
    }
  | {
      screen: 'marathon-result'
      categoryIds: string[]
      difficulty: MarathonDifficulty
      runCorrect: number
      runAnswered: number
      sectionRunStats?: Record<string, { correct: number; answered: number }>
    }
  | { screen: 'leaderboard' }
