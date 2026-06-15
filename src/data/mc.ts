import type { Difficulty, Question } from '../types'

type Letter = 'a' | 'b' | 'c' | 'd'

export function mc(
  id: string,
  difficulty: Difficulty,
  title: string,
  prompt: string,
  options: [string, string, string, string],
  correct: Letter,
  explanation: string,
  extra?: Partial<Question>,
): Question {
  const letters: Letter[] = ['a', 'b', 'c', 'd']
  return {
    id,
    difficulty,
    type: 'multiple-choice',
    title,
    prompt,
    options: letters.map((letter, i) => ({ id: letter, label: options[i] })),
    correctAnswer: correct,
    explanation,
    ...extra,
  }
}
