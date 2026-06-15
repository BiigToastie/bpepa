import type { Difficulty, Question } from '../types'

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  default: 'Standard',
  hard: 'Schwer',
  extreme: 'Extrem',
}

export const DIFFICULTY_DESCRIPTIONS: Record<Difficulty, string> = {
  default: 'Einstieg – ähnlich den offiziellen Beispielaufgaben',
  hard: 'Anspruchsvoller – mehr Kombinationen & Kniffe',
  extreme: 'Maximum – wie die schwersten Testaufgaben am Ende',
}

export function filterByDifficulty(questions: Question[], difficulty: Difficulty): Question[] {
  return questions.filter((q) => q.difficulty === difficulty)
}

export function countByDifficulty(questions: Question[]): Record<Difficulty, number> {
  return {
    default: questions.filter((q) => q.difficulty === 'default').length,
    hard: questions.filter((q) => q.difficulty === 'hard').length,
    extreme: questions.filter((q) => q.difficulty === 'extreme').length,
  }
}
