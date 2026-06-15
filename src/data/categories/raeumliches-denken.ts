import type { Question } from '../../types'

export const raumQuestions: Question[] = [
  // ── Standard ──
  {
    id: 'raum-flaechen-a', difficulty: 'default', type: 'text-input', title: 'Flächen zählen A',
    prompt: 'Wie viele Flächen hat dieser Körper? (Nicht sichtbare mitzählen!)',
    visual: 'shape-box-6', correctAnswer: '6', acceptVariants: ['6', 'sechs'],
    explanation: 'Ein Quader hat 6 Flächen.', hint: 'Oben, unten, vorne, hinten, links, rechts.',
  },
  {
    id: 'raum-flaechen-b', difficulty: 'default', type: 'text-input', title: 'Flächen zählen B',
    prompt: 'Wie viele Flächen hat dieser Körper?',
    visual: 'shape-box-8', correctAnswer: '8', acceptVariants: ['8', 'acht'],
    explanation: 'Zusammengesetzter Körper aus zwei Quadern – 8 Außenflächen.',
  },
  {
    id: 'raum-netz-a', difficulty: 'default', type: 'multiple-choice', title: 'Netz falten',
    prompt: 'Welcher Körper entsteht beim Falten des Netzes?',
    visual: 'net-fold-a',
    options: [{ id: 'a', label: 'Körper a' }, { id: 'b', label: 'Körper b' }, { id: 'c', label: 'Körper c' }, { id: 'd', label: 'Körper d' }],
    correctAnswer: 'd', explanation: 'Das Kreuz-Netz bildet einen Würfel mit markierter Fläche → d.',
  },
  {
    id: 'raum-c', difficulty: 'default', type: 'text-input', title: 'Würfel-Flächen',
    prompt: 'Wie viele Flächen hat ein Würfel?',
    correctAnswer: '6', acceptVariants: ['6', 'sechs'],
    explanation: 'Ein Würfel ist ein spezieller Quader mit 6 gleich großen quadratischen Flächen.',
  },
  {
    id: 'raum-d', difficulty: 'default', type: 'text-input', title: 'Würfel-Ecken',
    prompt: 'Wie viele Ecken hat ein Würfel?',
    correctAnswer: '8', acceptVariants: ['8', 'acht'],
    explanation: 'Ein Würfel hat 8 Ecken (4 oben, 4 unten).',
  },
  // ── Schwer ──
  {
    id: 'raum-e', difficulty: 'hard', type: 'text-input', title: 'Tetraeder',
    prompt: 'Wie viele Flächen hat ein Tetraeder (Pyramide mit dreieckiger Grundfläche und 3 Seitenflächen)?',
    correctAnswer: '4', acceptVariants: ['4', 'vier'],
    explanation: '1 Grundfläche + 3 Seitenflächen = 4 dreieckige Flächen.',
    hint: 'Zähle Grundfläche und Seiten.',
  },
  {
    id: 'raum-f', difficulty: 'hard', type: 'text-input', title: 'Quadratische Pyramide',
    prompt: 'Wie viele Flächen hat eine Pyramide mit quadratischer Grundfläche und 4 dreieckigen Seiten?',
    correctAnswer: '5', acceptVariants: ['5', 'fünf', 'fuenf'],
    explanation: '1 quadratische Grundfläche + 4 dreieckige Seiten = 5 Flächen.',
  },
  {
    id: 'raum-g', difficulty: 'hard', type: 'text-input', title: 'Würfel-Kanten',
    prompt: 'Wie viele Kanten hat ein Würfel?',
    correctAnswer: '12', acceptVariants: ['12', 'zwölf', 'zwoelf'],
    explanation: '4 Kanten oben + 4 unten + 4 vertikal = 12 Kanten.',
    hint: 'Zähle Kanten pro Ebene.',
  },
  {
    id: 'raum-h', difficulty: 'hard', type: 'multiple-choice', title: 'Spiegelbild',
    prompt: 'Der Buchstabe „b" wird an einer senkrechten Spiegellinie gespiegelt. Wie sieht er aus?',
    options: [{ id: 'a', label: 'b (unverändert)' }, { id: 'b', label: 'd' }, { id: 'c', label: 'p' }, { id: 'd', label: 'q' }],
    correctAnswer: 'b', explanation: '„b" an einer senkrechten Achse gespiegelt ergibt „d".',
  },
  {
    id: 'raum-i', difficulty: 'hard', type: 'text-input', title: 'Zylinder',
    prompt: 'Wie viele Flächen hat ein Zylinder (ohne Deckel)?',
    correctAnswer: '3', acceptVariants: ['3', 'drei'],
    explanation: '1 Bodenfläche + 1 Deckelfläche + 1 Mantelfläche = 3 (bei geschlossenem Zylinder).',
    hint: 'Boden, Deckel und die Rundung zählen mit.',
  },
  // ── Extrem ──
  {
    id: 'raum-j', difficulty: 'extreme', type: 'text-input', title: 'Dreifach-Quader',
    prompt: 'Drei gleiche Würfel werden in einer Reihe verbunden. Wie viele Flächen hat der neue Körper?',
    correctAnswer: '14', acceptVariants: ['14', 'vierzehn'],
    explanation: '3×6=18 Flächen minus 4 verdeckte Kontaktflächen (je 2 pro Verbindung) = 14.',
    hint: 'Verdeckte Flächen zwischen den Würfeln nicht mitzählen.',
  },
  {
    id: 'raum-k', difficulty: 'extreme', type: 'multiple-choice', title: 'Gefaltetes Papier',
    prompt: 'Ein Blatt wird halbiert und nochmals halbiert, dann in der Mitte ausgestanzt. Wie viele Löcher siehst du beim Aufklappen?',
    options: [{ id: 'a', label: '1' }, { id: 'b', label: '2' }, { id: 'c', label: '4' }, { id: 'd', label: '8' }],
    correctAnswer: 'c', explanation: 'Zweimal falten = 4 Schichten → 1 Loch wird zu 4 Löchern.',
  },
  {
    id: 'raum-l', difficulty: 'extreme', type: 'text-input', title: 'Ikosaeder',
    prompt: 'Wie viele Flächen hat ein Ikosaeder? (Hinweis: 20-flächiger Körper aus gleichseitigen Dreiecken)',
    correctAnswer: '20', acceptVariants: ['20', 'zwanzig'],
    explanation: 'Ikosaeder = griech. „eikosi" = zwanzig → 20 dreieckige Flächen.',
  },
  {
    id: 'raum-m', difficulty: 'extreme', type: 'multiple-choice', title: 'Mentale Rotation',
    prompt: 'Ein Würfel mit einem Punkt auf der Oberseite wird um die vertikale Achse 90° gedreht. Wo ist der Punkt?',
    options: [{ id: 'a', label: 'Noch auf der Oberseite' }, { id: 'b', label: 'Auf einer Seitenfläche' }, { id: 'c', label: 'Auf der Unterseite' }, { id: 'd', label: 'Im Inneren' }],
    correctAnswer: 'a', explanation: 'Rotation um die vertikale Achse lässt Ober- und Unterseite unverändert – der Punkt bleibt oben.',
  },
]
