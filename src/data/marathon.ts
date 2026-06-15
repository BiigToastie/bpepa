import { categories, getCategory } from './exercises'
import { filterByDifficulty } from './difficulty'
import type { MarathonDifficulty, Question } from '../types'

export function buildQuestionMap(
  categoryIds: string[],
  difficulty: MarathonDifficulty,
): Record<string, { id: string }[]> {
  const map: Record<string, { id: string }[]> = {}
  for (const id of categoryIds) {
    const cat = getCategory(id)
    if (!cat) continue
    const qs =
      difficulty === 'all'
        ? cat.questions
        : filterByDifficulty(cat.questions, difficulty)
    map[id] = qs.map((q) => ({ id: q.id }))
  }
  return map
}

export function findQuestion(categoryId: string, questionId: string): Question | undefined {
  return getCategory(categoryId)?.questions.find((q) => q.id === questionId)
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export const ALL_CATEGORY_IDS = categories.map((c) => c.id)
