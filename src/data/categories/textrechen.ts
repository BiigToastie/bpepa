import type { Question } from '../../types'

export const textrechenQuestions: Question[] = [
  {
    id: 'text-a', difficulty: 'default', type: 'text-input', title: 'Prozentrechnung',
    prompt: 'Eine Hose wird um 20 % reduziert und kostet jetzt 48 €. Wie viel hat sie vorher gekostet?',
    correctAnswer: '60', acceptVariants: ['60', '60€', '60 €', '60 euro', '60eur'],
    explanation: '48 € = 80 % → 48 ÷ 0,8 = 60 €', hint: '48 € sind 80 % – nicht 100 %.',
  },
  {
    id: 'text-b-umfang', difficulty: 'default', type: 'text-input', title: 'Grundstück – Umfang',
    prompt: 'Ein rechteckiges Grundstück ist 40 m lang und 15 m breit. Wie groß ist der Umfang?',
    correctAnswer: '110', acceptVariants: ['110', '110m', '110 m', '110 meter', '110meter'],
    explanation: 'Umfang = 2 × (40 + 15) = 110 Meter',
  },
  {
    id: 'text-b-flaeche', difficulty: 'default', type: 'text-input', title: 'Grundstück – Fläche',
    prompt: 'Ein rechteckiges Grundstück ist 40 m lang und 15 m breit. Wie groß ist die Fläche?',
    correctAnswer: '600', acceptVariants: ['600', '600m2', '600 m2', '600 qm', '600qm', '600 quadratmeter'],
    explanation: 'Fläche = 40 × 15 = 600 Quadratmeter',
  },
  {
    id: 'text-c', difficulty: 'default', type: 'text-input', title: 'Dreisatz',
    prompt: '4 Arbeiter benötigen 6 Stunden zum Streichen. Wie lange brauchen 3 Arbeiter?',
    correctAnswer: '8', acceptVariants: ['8', '8h', '8 h', '8 stunden', '8stunden'],
    explanation: 'Gesamtarbeit = 24 h → 24 ÷ 3 = 8 Stunden.', hint: 'Erst Gesamtarbeit, dann teilen.',
  },
  {
    id: 'text-d', difficulty: 'default', type: 'text-input', title: 'Einfacher Rabatt',
    prompt: 'Ein Buch kostet 25 €. Mit 10 % Rabatt: wie viel zahlst du?',
    correctAnswer: '22.5', acceptVariants: ['22.5', '22,5', '22.50', '22,50'],
    explanation: '25 × 0,9 = 22,50 €',
  },
  {
    id: 'text-e', difficulty: 'hard', type: 'text-input', title: 'Mehrwertsteuer',
    prompt: 'Ein Artikel kostet 84 € brutto (19 % MwSt. enthalten). Nettopreis? (2 Dezimalen)',
    correctAnswer: '70.59', acceptVariants: ['70.59', '70,59'],
    explanation: '84 ÷ 1,19 ≈ 70,59 €', hint: 'Brutto ÷ 1,19 = Netto.',
  },
  {
    id: 'text-f', difficulty: 'hard', type: 'text-input', title: 'Geschwindigkeit',
    prompt: 'Ein Auto fährt 180 km in 2,5 Stunden. Durchschnittsgeschwindigkeit in km/h?',
    correctAnswer: '72', acceptVariants: ['72', '72km/h', '72 km/h', '72kmh'],
    explanation: '180 ÷ 2,5 = 72 km/h',
  },
  {
    id: 'text-g', difficulty: 'hard', type: 'text-input', title: 'Zinsrechnung',
    prompt: '2 000 € zu 3 % Jahreszins. Zinsen nach einem Jahr?',
    correctAnswer: '60', acceptVariants: ['60', '60€', '60 €'],
    explanation: '2 000 × 0,03 = 60 €',
  },
  {
    id: 'text-h', difficulty: 'hard', type: 'text-input', title: 'Umgekehrter Dreisatz',
    prompt: '5 Pumpen leeren ein Becken in 12 Stunden. Wie lange brauchen 8 Pumpen?',
    correctAnswer: '7.5', acceptVariants: ['7.5', '7,5', '7.50', '7,50'],
    explanation: '60 Pumpenstunden gesamt → 60 ÷ 8 = 7,5 Stunden.',
  },
  {
    id: 'text-i', difficulty: 'hard', type: 'text-input', title: 'Mischungsrechnung',
    prompt: '2 kg Äpfel à 2,50 €/kg und 3 kg Birnen à 3,20 €/kg. Gesamtpreis?',
    correctAnswer: '14.6', acceptVariants: ['14.6', '14,6', '14.60', '14,60'],
    explanation: '5 + 9,60 = 14,60 €',
  },
  {
    id: 'text-j', difficulty: 'extreme', type: 'text-input', title: 'Gehaltserhöhung',
    prompt: 'Gehalt 2 800 €, Erhöhung um 8 %. Neues Gehalt?',
    correctAnswer: '3024', acceptVariants: ['3024', '3 024', '3024€', '3024 €'],
    explanation: '2 800 × 1,08 = 3 024 €',
  },
  {
    id: 'text-k', difficulty: 'extreme', type: 'text-input', title: 'Zusammengesetzter Dreisatz',
    prompt: '6 Arbeiter, 5 Tage à 8 h für eine Arbeit. Wie viele Tage à 8 h für 10 Arbeiter?',
    correctAnswer: '3', acceptVariants: ['3', '3 tage', '3tage'],
    explanation: '240 Gesamtstunden ÷ (10×8) = 3 Tage.',
  },
  {
    id: 'text-l', difficulty: 'extreme', type: 'text-input', title: 'Rabatt & MwSt.',
    prompt: 'Netto 150 €, 15 % Rabatt, dann 19 % MwSt. Bruttopreis? (2 Dezimalen)',
    correctAnswer: '151.73', acceptVariants: ['151.73', '151,73'],
    explanation: '150 × 0,85 × 1,19 ≈ 151,73 €',
  },
  {
    id: 'text-m', difficulty: 'extreme', type: 'text-input', title: 'Zinseszins',
    prompt: '1 000 € zu 4 % für 2 Jahre (einfache Verzinsung). Endbetrag?',
    correctAnswer: '1080', acceptVariants: ['1080', '1 080', '1080€', '1080 €'],
    explanation: '1 000 + 2 × (1 000 × 0,04) = 1 080 €',
  },
]
