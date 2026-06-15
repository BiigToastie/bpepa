import type { Question } from '../../types'

export const mechQuestions: Question[] = [
  {
    id: 'mech-a', difficulty: 'default', type: 'multiple-choice', title: 'Stabilität',
    prompt: 'Welcher Körper kann am leichtesten umgestoßen werden?',
    visual: 'stability-shapes',
    options: [{ id: 'a', label: 'Körper a – breit & flach' }, { id: 'b', label: 'Körper b – mittel' }, { id: 'c', label: 'Körper c – schmal & hoch' }],
    correctAnswer: 'c', explanation: 'Hoher Schwerpunkt + schmale Standfläche = instabil.', hint: 'Schwerpunkt und Standfläche beachten.',
  },
  {
    id: 'mech-b', difficulty: 'default', type: 'multiple-choice', title: 'Räder & Getriebe',
    prompt: 'Welches Rad dreht sich am schnellsten?',
    visual: 'gear-system',
    options: [{ id: 'a', label: 'Rad a (groß)' }, { id: 'b', label: 'Rad b (mittel)' }, { id: 'c', label: 'Rad c (klein)' }],
    correctAnswer: 'c', explanation: 'Das kleinste Rad dreht sich bei verbundenen Rädern am schnellsten.',
  },
  {
    id: 'mech-c', difficulty: 'default', type: 'multiple-choice', title: 'Hebel',
    prompt: 'Wo muss man am wenigsten Kraft aufwenden, um einen Balken anzuheben?',
    options: [{ id: 'a', label: 'Nah am Drehpunkt' }, { id: 'b', label: 'In der Mitte' }, { id: 'c', label: 'Weit vom Drehpunkt entfernt' }, { id: 'd', label: 'Egal wo' }],
    correctAnswer: 'c', explanation: 'Je weiter vom Drehpunkt, desto größer der Hebelarm – weniger Kraft nötig.',
  },
  {
    id: 'mech-d', difficulty: 'default', type: 'multiple-choice', title: 'Gleichgewicht',
    prompt: 'Auf einer Wippe sitzt links ein schweres Kind, rechts ein leichtes. Was passiert?',
    options: [{ id: 'a', label: 'Links geht nach unten' }, { id: 'b', label: 'Rechts geht nach unten' }, { id: 'c', label: 'Bleibt waagerecht' }, { id: 'd', label: 'Beide fliegen hoch' }],
    correctAnswer: 'a', explanation: 'Das schwerere Gewicht drückt die linke Seite nach unten.',
  },
  {
    id: 'mech-e', difficulty: 'default', type: 'multiple-choice', title: 'Schwerkraft',
    prompt: 'Was fällt in luftleerem Raum schneller: eine Feder oder ein Stein?',
    options: [{ id: 'a', label: 'Der Stein' }, { id: 'b', label: 'Die Feder' }, { id: 'c', label: 'Beide gleich schnell' }, { id: 'd', label: 'Keines von beiden' }],
    correctAnswer: 'c', explanation: 'Ohne Luftwiderstand fallen alle Körper gleich schnell.',
  },
  {
    id: 'mech-f', difficulty: 'hard', type: 'multiple-choice', title: 'Flaschenzug',
    prompt: 'Ein Flaschenzug mit 2 Rollen reduziert die nötige Kraft auf …',
    options: [{ id: 'a', label: 'die Hälfte' }, { id: 'b', label: 'ein Drittel' }, { id: 'c', label: 'ein Viertel' }, { id: 'd', label: 'das Doppelte' }],
    correctAnswer: 'a', explanation: 'Ein einfacher Flaschenzug mit 2 Trummlagen halbiert die Kraft.',
  },
  {
    id: 'mech-g', difficulty: 'hard', type: 'multiple-choice', title: 'Getriebe-Verhältnis',
    prompt: 'Ein großes Zahnrad (40 Zähne) treibt ein kleines (10 Zähne) an. Wie oft dreht sich das kleine pro Umdrehung des großen?',
    options: [{ id: 'a', label: '2-mal' }, { id: 'b', label: '4-mal' }, { id: 'c', label: '10-mal' }, { id: 'd', label: '40-mal' }],
    correctAnswer: 'b', explanation: 'Übersetzung = 40 ÷ 10 = 4 Umdrehungen.',
  },
  {
    id: 'mech-h', difficulty: 'hard', type: 'multiple-choice', title: 'Schiefe Ebene',
    prompt: 'Eine Rampe macht es leichter, eine Kiste zu heben, weil …',
    options: [{ id: 'a', label: 'die Schwerkraft wegfällt' }, { id: 'b', label: 'der Weg länger, die Kraft kleiner wird' }, { id: 'c', label: 'die Kiste leichter wird' }, { id: 'd', label: 'Reibung zunimmt' }],
    correctAnswer: 'b', explanation: 'Mechanischer Vorteil: längerer Weg bei geringerer Kraft.',
  },
  {
    id: 'mech-i', difficulty: 'hard', type: 'multiple-choice', title: 'Reibung',
    prompt: 'Auf Eis rutscht man leichter als auf Asphalt, weil …',
    options: [{ id: 'a', label: 'Eis schwerer ist' }, { id: 'b', label: 'die Reibung auf Eis geringer ist' }, { id: 'c', label: 'Asphalt glatter ist' }, { id: 'd', label: 'die Schwerkraft auf Eis fehlt' }],
    correctAnswer: 'b', explanation: 'Geringere Reibung auf glatten Oberflächen.',
  },
  {
    id: 'mech-j', difficulty: 'hard', type: 'multiple-choice', title: 'Schwerpunkt',
    prompt: 'Ein Lkw ist mit schwerer Ladung hinten beladen. Was ist die Folge beim Bremsen?',
    options: [{ id: 'a', label: 'Stabiler' }, { id: 'b', label: 'Hinterachse wird stärker belastet' }, { id: 'c', label: 'Verbraucht weniger' }, { id: 'd', label: 'Keine Änderung' }],
    correctAnswer: 'b', explanation: 'Der Schwerpunkt verlagert sich nach hinten – mehr Last auf der Hinterachse.',
  },
  {
    id: 'mech-k', difficulty: 'extreme', type: 'multiple-choice', title: 'Zahnradkette',
    prompt: 'Rad A (60 Zähne) → Rad B (20 Zähne) → Rad C (10 Zähne). Wie oft dreht sich C pro Umdrehung von A?',
    options: [{ id: 'a', label: '3-mal' }, { id: 'b', label: '6-mal' }, { id: 'c', label: '9-mal' }, { id: 'd', label: '12-mal' }],
    correctAnswer: 'b', explanation: 'A→B: 3×, B→C: 2×, gesamt: 6×.',
  },
  {
    id: 'mech-l', difficulty: 'extreme', type: 'multiple-choice', title: 'Hebelkraft',
    prompt: 'Am Hebel: Last 100 kg in 1 m Entfernung. Wo wirkt 25 kg Gegenkraft im Gleichgewicht?',
    options: [{ id: 'a', label: '0,25 m' }, { id: 'b', label: '2 m' }, { id: 'c', label: '4 m' }, { id: 'd', label: '8 m' }],
    correctAnswer: 'c', explanation: '100 × 1 = 25 × l → l = 4 m.',
  },
  {
    id: 'mech-m', difficulty: 'extreme', type: 'multiple-choice', title: 'Drehmoment',
    prompt: 'Wo ist ein Türgriff am besten platziert?',
    options: [{ id: 'a', label: 'Direkt an der Angel' }, { id: 'b', label: 'In der Mitte' }, { id: 'c', label: 'Weit von der Angel entfernt' }, { id: 'd', label: 'Egal' }],
    correctAnswer: 'c', explanation: 'Maximaler Hebelarm = geringstes Drehmoment nötig.',
  },
  {
    id: 'mech-n', difficulty: 'extreme', type: 'text-input', title: 'Geschwindigkeit',
    prompt: 'Rad Ø 30 cm, 10 Umdrehungen/s. Wie viele cm/s am Rand? (π ≈ 3,14, runden)',
    correctAnswer: '942', acceptVariants: ['942', '942cm', '942 cm'],
    explanation: 'Umfang ≈ 94,2 cm × 10 = 942 cm/s.', hint: 'Umfang × Umdrehungen.',
  },
]
