import type { Question } from '../../types'

export const symbolQuestions: Question[] = [
  // ── Standard ──
  {
    id: 'symbol-a', difficulty: 'default', type: 'multiple-choice', title: 'Aufgabe A',
    prompt: 'Welche Figur setzt die Reihe richtig fort?',
    visual: 'symbol-sequence-a',
    options: [{ id: 'a', label: '○ △' }, { id: 'b', label: '△ ○' }, { id: 'c', label: '△' }, { id: 'd', label: '○ ○' }, { id: 'e', label: '△ △' }],
    correctAnswer: 'c', explanation: 'Kreis und Dreieck wechseln sich ab → nach ○ kommt △.', hint: 'Zwei Formen im Wechsel.',
  },
  {
    id: 'symbol-b', difficulty: 'default', type: 'multiple-choice', title: 'Aufgabe B',
    prompt: 'Welche Figur hat 6 senkrechte Striche in gleicher Länge?',
    visual: 'symbol-sequence-b',
    options: [{ id: 'a', label: '4 Striche' }, { id: 'b', label: '5 Striche' }, { id: 'c', label: '6 kurze Striche' }, { id: 'd', label: '6 gleiche Striche' }, { id: 'e', label: '6 ungleiche Striche' }],
    correctAnswer: 'd', explanation: 'Jeweils ein Strich mehr → 6 gleich lange Striche.',
  },
  {
    id: 'symbol-c', difficulty: 'default', type: 'multiple-choice', title: 'Aufgabe C',
    prompt: 'Reihe: ■ ○ ■ ○ ■  —  Was folgt?',
    options: [{ id: 'a', label: '■' }, { id: 'b', label: '○' }, { id: 'c', label: '■ ○' }, { id: 'd', label: '△' }],
    correctAnswer: 'b', explanation: 'Quadrat und Kreis wechseln sich ab → nach ■ kommt ○.',
  },
  {
    id: 'symbol-d', difficulty: 'default', type: 'multiple-choice', title: 'Aufgabe D',
    prompt: 'Reihe: ▲ ▼ ▲ ▼ ▲  —  Was folgt?',
    options: [{ id: 'a', label: '▲' }, { id: 'b', label: '▼' }, { id: 'c', label: '●' }, { id: 'd', label: '▲ ▼' }],
    correctAnswer: 'b', explanation: 'Dreieckspitze oben und unten im Wechsel → ▼.',
  },
  {
    id: 'symbol-e', difficulty: 'default', type: 'multiple-choice', title: 'Aufgabe E',
    prompt: 'Reihe: ● ● ○ ● ● ○ ● ●  —  Was folgt?',
    options: [{ id: 'a', label: '●' }, { id: 'b', label: '○' }, { id: 'c', label: '● ●' }, { id: 'd', label: '○ ○' }],
    correctAnswer: 'b', explanation: 'Muster: zwei gefüllte Kreise, ein leerer – wiederholt sich → ○.',
  },
  // ── Schwer ──
  {
    id: 'symbol-f', difficulty: 'hard', type: 'multiple-choice', title: 'Aufgabe F',
    prompt: 'Reihe: ○ ○ △ ○ ○ △ ○ ○  —  Was folgt?',
    options: [{ id: 'a', label: '○' }, { id: 'b', label: '△' }, { id: 'c', label: '○ ○' }, { id: 'd', label: '△ △' }],
    correctAnswer: 'b', explanation: 'Zwei Kreise, dann ein Dreieck – Zyklus von drei → △.',
  },
  {
    id: 'symbol-g', difficulty: 'hard', type: 'multiple-choice', title: 'Aufgabe G',
    prompt: 'Reihe: □ ■ □ ■ □ ■  —  Was folgt?',
    options: [{ id: 'a', label: '□' }, { id: 'b', label: '■' }, { id: 'c', label: '△' }, { id: 'd', label: '□ ■' }],
    correctAnswer: 'a', explanation: 'Leeres und gefülltes Quadrat wechseln → nach ■ kommt □.',
  },
  {
    id: 'symbol-h', difficulty: 'hard', type: 'multiple-choice', title: 'Aufgabe H',
    prompt: 'Reihe: | || ||| ||||  —  Wie viele Striche folgen als Nächstes?',
    options: [{ id: 'a', label: '4' }, { id: 'b', label: '5' }, { id: 'c', label: '6' }, { id: 'd', label: '3' }],
    correctAnswer: 'b', explanation: '1, 2, 3, 4 Striche – jeweils +1 → 5 Striche.',
  },
  {
    id: 'symbol-i', difficulty: 'hard', type: 'multiple-choice', title: 'Aufgabe I',
    prompt: 'Reihe: ◇ ◆ ◇ ◆ ◇  —  Was folgt?',
    options: [{ id: 'a', label: '◇' }, { id: 'b', label: '◆' }, { id: 'c', label: '○' }, { id: 'd', label: '●' }],
    correctAnswer: 'b', explanation: 'Leere und gefüllte Raute im Wechsel → ◆.',
  },
  {
    id: 'symbol-j', difficulty: 'hard', type: 'multiple-choice', title: 'Aufgabe J',
    prompt: 'Reihe: △ △ ○ △ △ ○ △ △  —  Was folgt?',
    options: [{ id: 'a', label: '△' }, { id: 'b', label: '○' }, { id: 'c', label: '□' }, { id: 'd', label: '△ △ △' }],
    correctAnswer: 'b', explanation: 'Zwei Dreiecke, ein Kreis – wiederholt sich → ○.',
  },
  // ── Extrem ──
  {
    id: 'symbol-k', difficulty: 'extreme', type: 'multiple-choice', title: 'Aufgabe K',
    prompt: 'Reihe: ○ △ □ ○ △ □ ○  —  Was folgt?',
    options: [{ id: 'a', label: '○' }, { id: 'b', label: '△' }, { id: 'c', label: '□' }, { id: 'd', label: '○ △' }],
    correctAnswer: 'b', explanation: 'Drei Symbole rotieren: Kreis → Dreieck → Quadrat → Kreis → … → △.',
  },
  {
    id: 'symbol-l', difficulty: 'extreme', type: 'multiple-choice', title: 'Aufgabe L',
    prompt: 'Reihe: | / — | / — |  —  Was folgt?',
    options: [{ id: 'a', label: '|' }, { id: 'b', label: '/' }, { id: 'c', label: '—' }, { id: 'd', label: '\\' }],
    correctAnswer: 'b', explanation: 'Senkrecht, schräg, waagerecht – Dreierzyklus → /.',
  },
  {
    id: 'symbol-m', difficulty: 'extreme', type: 'multiple-choice', title: 'Aufgabe M',
    prompt: 'Reihe: ● ○○ ● ○○○ ● ○○○○  —  Was folgt als Nächstes?',
    options: [{ id: 'a', label: '●' }, { id: 'b', label: '○' }, { id: 'c', label: '○○○○○' }, { id: 'd', label: '○○' }],
    correctAnswer: 'a', explanation: 'Ein gefüllter Kreis, dann 2, 3, 4 leere Kreise – Zyklus beginnt neu → ●.',
  },
  {
    id: 'symbol-n', difficulty: 'extreme', type: 'multiple-choice', title: 'Aufgabe N',
    prompt: 'Reihe: ▲ ▲▼ ▲▼▲ ▲▼▲▼  —  Was folgt?',
    options: [{ id: 'a', label: '▲▼▲▼▲' }, { id: 'b', label: '▲▼▲▼▲▼' }, { id: 'c', label: '▼▲▼▲' }, { id: 'd', label: '▲▲▲▲▲' }],
    correctAnswer: 'a', explanation: 'Die Gruppe wächst: 1, 2, 3, 4 Symbole im Wechsel – nächste Gruppe hat 5: ▲▼▲▼▲.',
  },
]
