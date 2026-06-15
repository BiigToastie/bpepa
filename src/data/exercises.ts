import type { Category, Difficulty, Question } from '../types'
import { wortQuestions } from './categories/wort-beziehungen'
import { zahlenQuestions } from './categories/zahlen-beziehungen'
import { symbolQuestions } from './categories/symbol-beziehungen'
import { raumQuestions } from './categories/raeumliches-denken'
import { mechQuestions } from './categories/mechanisch-technisch'
import { rechnenQuestions } from './categories/rechnen'
import { textrechenQuestions } from './categories/textrechen'
import {
  wortExtras,
  zahlenExtras,
  symbolExtras,
  raumExtras,
  mechExtras,
  rechnenExtras,
  textrechenExtras,
} from './extras'
import { filterByDifficulty } from './difficulty'

function merge(...parts: Question[][]) {
  return parts.flat()
}

export const categories: Category[] = [
  {
    id: 'wort-beziehungen',
    title: 'Wort-Beziehungen',
    shortTitle: 'Wörter',
    description: 'Logisches Denken mit sprachlichem Material – finde das passende vierte Wort.',
    icon: '💬',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    questions: merge(wortQuestions, wortExtras),
  },
  {
    id: 'zahlen-beziehungen',
    title: 'Zahlen-Beziehungen',
    shortTitle: 'Zahlen',
    description: 'Erkenne das Muster und setze die Zahlenreihe um zwei Zahlen fort.',
    icon: '🔢',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    questions: merge(zahlenQuestions, zahlenExtras),
  },
  {
    id: 'symbol-beziehungen',
    title: 'Symbol-Beziehungen',
    shortTitle: 'Symbole',
    description: 'Erkenne die Regel in Symbolreihen und wähle die richtige Fortsetzung.',
    icon: '🔷',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    questions: merge(symbolQuestions, symbolExtras),
  },
  {
    id: 'raeumliches-denken',
    title: 'Räumliches Denken',
    shortTitle: 'Räumlich',
    description: 'Flächen zählen, Körper vorstellen und Netze mental falten.',
    icon: '📐',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    questions: merge(raumQuestions, raumExtras),
  },
  {
    id: 'mechanisch-technisch',
    title: 'Mechanisch-Technisch',
    shortTitle: 'Technik',
    description: 'Physikalisches Verständnis – Stabilität, Hebel und Getriebe.',
    icon: '⚙️',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    questions: merge(mechQuestions, mechExtras),
  },
  {
    id: 'rechnen',
    title: 'Rechnen & Mathematik',
    shortTitle: 'Rechnen',
    description: 'Grundrechenarten, Brüche und Dezimalzahlen – ohne Taschenrechner üben.',
    icon: '🧮',
    gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    questions: merge(rechnenQuestions, rechnenExtras),
  },
  {
    id: 'textrechen',
    title: 'Textrechenaufgaben',
    shortTitle: 'Textaufgaben',
    description: 'Alltagsmathematik – Prozentrechnung, Flächen und Dreisatz.',
    icon: '📝',
    gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    questions: merge(textrechenQuestions, textrechenExtras),
  },
]

export function getCategory(id: string): Category | undefined {
  return categories.find((c) => c.id === id)
}

export function getCategoryQuestions(categoryId: string, difficulty: Difficulty): Question[] {
  const category = getCategory(categoryId)
  if (!category) return []
  return filterByDifficulty(category.questions, difficulty)
}
