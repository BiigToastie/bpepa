import type { Question } from '../../types'

export const zahlenQuestions: Question[] = [
  // ── Standard ──
  {
    id: 'zahl-a', difficulty: 'default', type: 'sequence-input', title: 'Aufgabe A',
    prompt: '2  4  6  8  10  12  14  ?  ?',
    correctAnswer: ['16', '18'], explanation: 'Immer plus 2 → 16 und 18.', hint: 'Konstante Differenz.',
  },
  {
    id: 'zahl-b', difficulty: 'default', type: 'sequence-input', title: 'Aufgabe B',
    prompt: '3  5  8  10  13  15  18  ?  ?',
    correctAnswer: ['20', '23'], explanation: 'Wechselnd +2, +3 → 20 und 23.', hint: 'Die Schritte wechseln.',
  },
  {
    id: 'zahl-c', difficulty: 'default', type: 'sequence-input', title: 'Aufgabe C',
    prompt: '4  8  16  20  40  44  88  ?  ?',
    correctAnswer: ['92', '184'], explanation: 'Wechselnd +4, ×2 → 92 und 184.',
  },
  {
    id: 'zahl-d', difficulty: 'default', type: 'sequence-input', title: 'Aufgabe D',
    prompt: '1  3  5  7  9  11  ?  ?',
    correctAnswer: ['13', '15'], explanation: 'Ungerade Zahlen, jeweils +2 → 13 und 15.',
  },
  {
    id: 'zahl-e', difficulty: 'default', type: 'sequence-input', title: 'Aufgabe E',
    prompt: '10  20  30  40  50  ?  ?',
    correctAnswer: ['60', '70'], explanation: 'Zehnerreihe, plus 10 → 60 und 70.',
  },
  // ── Schwer ──
  {
    id: 'zahl-f', difficulty: 'hard', type: 'sequence-input', title: 'Aufgabe F',
    prompt: '2  6  18  54  162  ?  ?',
    correctAnswer: ['486', '1458'], explanation: 'Jeweils ×3 → 486 und 1 458.',
    hint: 'Multiplikation statt Addition.',
  },
  {
    id: 'zahl-g', difficulty: 'hard', type: 'sequence-input', title: 'Aufgabe G',
    prompt: '1  4  9  16  25  36  ?  ?',
    correctAnswer: ['49', '64'], explanation: 'Quadratzahlen: 7²=49, 8²=64.',
    hint: '1=1², 4=2², 9=3² …',
  },
  {
    id: 'zahl-h', difficulty: 'hard', type: 'sequence-input', title: 'Aufgabe H',
    prompt: '5  10  20  25  50  55  ?  ?',
    correctAnswer: ['110', '115'], explanation: 'Wechselnd ×2, +5 → 110 und 115.',
  },
  {
    id: 'zahl-i', difficulty: 'hard', type: 'sequence-input', title: 'Aufgabe I',
    prompt: '100  95  90  85  80  ?  ?',
    correctAnswer: ['75', '70'], explanation: 'Minus 5 pro Schritt → 75 und 70.',
  },
  {
    id: 'zahl-j', difficulty: 'hard', type: 'sequence-input', title: 'Aufgabe J',
    prompt: '3  6  12  15  30  33  ?  ?',
    correctAnswer: ['66', '69'], explanation: 'Wechselnd ×2, +3 → 66 und 69.',
  },
  // ── Extrem ──
  {
    id: 'zahl-k', difficulty: 'extreme', type: 'sequence-input', title: 'Aufgabe K',
    prompt: '1  1  2  3  5  8  13  ?  ?',
    correctAnswer: ['21', '34'], explanation: 'Fibonacci: Summe der zwei vorherigen → 21 und 34.',
    hint: 'Jede Zahl ist die Summe der beiden davor.',
  },
  {
    id: 'zahl-l', difficulty: 'extreme', type: 'sequence-input', title: 'Aufgabe L',
    prompt: '2  3  5  9  17  33  ?  ?',
    correctAnswer: ['65', '129'], explanation: 'Jedes Mal ×2 minus 1: 33×2−1=65, 65×2−1=129.',
  },
  {
    id: 'zahl-m', difficulty: 'extreme', type: 'sequence-input', title: 'Aufgabe M',
    prompt: '1  2  6  24  120  ?  ?',
    correctAnswer: ['720', '5040'], explanation: 'Fakultät: ×2, ×3, ×4, ×5, ×6, ×7 → 720 und 5 040.',
    hint: 'Der Multiplikator steigt jedes Mal um 1.',
  },
  {
    id: 'zahl-n', difficulty: 'extreme', type: 'sequence-input', title: 'Aufgabe N',
    prompt: '1  3  2  6  4  12  8  ?  ?',
    correctAnswer: ['24', '16'], explanation: 'Zwei verflochtene Reihen: ungerade Positionen ×2 (1,2,4,8,16), gerade ×3 (3,6,12,24).',
  },
]
