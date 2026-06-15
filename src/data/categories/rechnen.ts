import type { Question } from '../../types'

export const rechnenQuestions: Question[] = [
  {
    id: 'rech-a', difficulty: 'default', type: 'text-input', title: 'Addition',
    prompt: '527 + 863 = ?', correctAnswer: '1390', acceptVariants: ['1390', '1 390', '1.390'], explanation: '527 + 863 = 1 390',
  },
  {
    id: 'rech-b', difficulty: 'default', type: 'text-input', title: 'Subtraktion',
    prompt: '8 342 − 537 = ?', correctAnswer: '7805', acceptVariants: ['7805', '7 805', '7.805'], explanation: '8 342 − 537 = 7 805',
  },
  {
    id: 'rech-c', difficulty: 'default', type: 'text-input', title: 'Multiplikation',
    prompt: '76 423 × 91 = ?', correctAnswer: '6954493', acceptVariants: ['6954493', '6 954 493', '6.954.493'], explanation: '76 423 × 91 = 6 954 493',
  },
  {
    id: 'rech-d', difficulty: 'default', type: 'text-input', title: 'Division',
    prompt: '2 584 : 34 = ?', correctAnswer: '76', acceptVariants: ['76'], explanation: '2 584 ÷ 34 = 76',
  },
  {
    id: 'rech-e', difficulty: 'default', type: 'text-input', title: 'Addition II',
    prompt: '1 456 + 2 789 = ?', correctAnswer: '4245', acceptVariants: ['4245', '4 245', '4.245'], explanation: '1 456 + 2 789 = 4 245',
  },
  {
    id: 'rech-bruch-a', difficulty: 'default', type: 'text-input', title: 'Bruchrechnung A',
    prompt: '¼ − ⅛ = ? (als gekürzter Bruch, z. B. 1/8)',
    correctAnswer: '1/8', acceptVariants: ['1/8', '1 / 8', '⅛'], explanation: '¼ − ⅛ = ²⁄₈ − ⅛ = ⅛',
  },
  {
    id: 'rech-dez-a', difficulty: 'default', type: 'text-input', title: 'Dezimalrechnung A',
    prompt: '1 027,38 − 16,5213 = ?', correctAnswer: '1010.8587', acceptVariants: ['1010.8587', '1010,8587', '1 010,8587'], explanation: '1 027,38 − 16,5213 = 1 010,8587',
  },
  {
    id: 'rech-dez-b', difficulty: 'default', type: 'text-input', title: 'Dezimalrechnung B',
    prompt: '9,3 × 1,9 = ?', correctAnswer: '17.67', acceptVariants: ['17.67', '17,67'], explanation: '9,3 × 1,9 = 17,67',
  },
  {
    id: 'rech-f', difficulty: 'hard', type: 'text-input', title: 'Multiplikation II',
    prompt: '347 × 28 = ?', correctAnswer: '9716', acceptVariants: ['9716', '9 716', '9.716'], explanation: '347 × 28 = 9 716',
  },
  {
    id: 'rech-g', difficulty: 'hard', type: 'text-input', title: 'Division II',
    prompt: '4 928 : 56 = ?', correctAnswer: '88', acceptVariants: ['88'], explanation: '4 928 ÷ 56 = 88',
  },
  {
    id: 'rech-bruch-b', difficulty: 'hard', type: 'text-input', title: 'Bruchrechnung B',
    prompt: '¼ + ²⁄₁₂ + ⁵⁄₆ = ? (als gemischte Zahl, z. B. 1 1/4)',
    correctAnswer: '1 1/4', acceptVariants: ['1 1/4', '1 1 / 4', '5/4', '1.25', '1,25'], explanation: '¼ + ⅙ + ⁵⁄₆ = ¼ + 1 = 1 ¼',
  },
  {
    id: 'rech-h', difficulty: 'hard', type: 'text-input', title: 'Bruchrechnung C',
    prompt: '⅔ × ¾ = ? (als gekürzter Bruch)',
    correctAnswer: '1/2', acceptVariants: ['1/2', '1 / 2', '½', '0.5', '0,5'], explanation: '⅔ × ¾ = ⁶⁄₁₂ = ½',
  },
  {
    id: 'rech-i', difficulty: 'hard', type: 'text-input', title: 'Dezimalrechnung C',
    prompt: '12,5 × 3,6 = ?', correctAnswer: '45', acceptVariants: ['45', '45.0', '45,0'], explanation: '12,5 × 3,6 = 45',
  },
  {
    id: 'rech-j', difficulty: 'extreme', type: 'text-input', title: 'Multiplikation III',
    prompt: '1 847 × 63 = ?', correctAnswer: '116361', acceptVariants: ['116361', '116 361', '116.361'], explanation: '1 847 × 63 = 116 361',
  },
  {
    id: 'rech-k', difficulty: 'extreme', type: 'text-input', title: 'Division III',
    prompt: '15 876 : 47 = ?', correctAnswer: '338', acceptVariants: ['338'], explanation: '15 876 ÷ 47 = 338',
  },
  {
    id: 'rech-l', difficulty: 'extreme', type: 'text-input', title: 'Bruchrechnung D',
    prompt: '2 ¼ − 1 ½ = ? (als gekürzter Bruch, z. B. 3/4)',
    correctAnswer: '3/4', acceptVariants: ['3/4', '3 / 4', '¾', '0.75', '0,75'], explanation: '2¼ − 1½ = ⁹⁄₄ − ⁶⁄₄ = ¾',
  },
  {
    id: 'rech-m', difficulty: 'extreme', type: 'text-input', title: 'Dezimalrechnung D',
    prompt: '47,85 × 2,4 = ?', correctAnswer: '114.84', acceptVariants: ['114.84', '114,84'], explanation: '47,85 × 2,4 = 114,84',
  },
]
