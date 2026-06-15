import type { Question } from '../../types'

export const wortQuestions: Question[] = [
  // ── Standard ──
  {
    id: 'wort-a', difficulty: 'default', type: 'multiple-choice', title: 'Aufgabe A',
    prompt: 'groß : klein = breit : ?',
    options: [{ id: 'a', label: 'dick' }, { id: 'b', label: 'schmal' }, { id: 'c', label: 'riesig' }, { id: 'd', label: 'Körpergröße' }],
    correctAnswer: 'b', explanation: '„Klein" ist das Gegenteil von „groß" – „schmal" das Gegenteil von „breit".', hint: 'Denke an Gegensätze.',
  },
  {
    id: 'wort-b', difficulty: 'default', type: 'multiple-choice', title: 'Aufgabe B',
    prompt: 'Bleistift : spitzen = Messer : ?',
    options: [{ id: 'a', label: 'schneiden' }, { id: 'b', label: 'stechen' }, { id: 'c', label: 'schleifen' }, { id: 'd', label: 'essen' }],
    correctAnswer: 'c', explanation: 'So wie man einen Bleistift spitzt, schleift man ein Messer zum Schneiden.', hint: 'Was bereitet man am Werkzeug vor?',
  },
  {
    id: 'wort-c', difficulty: 'default', type: 'multiple-choice', title: 'Aufgabe C',
    prompt: 'Hund : Welpe = Katze : ?',
    options: [{ id: 'a', label: 'Maus' }, { id: 'b', label: 'Kätzchen' }, { id: 'c', label: 'Fell' }, { id: 'd', label: 'Tier' }],
    correctAnswer: 'b', explanation: 'Welpe ist der Nachwuchs des Hundes – Kätzchen der der Katze.', hint: 'Jungtier zu Erwachsenem.',
  },
  {
    id: 'wort-d', difficulty: 'default', type: 'multiple-choice', title: 'Aufgabe D',
    prompt: 'Sommer : Winter = Tag : ?',
    options: [{ id: 'a', label: 'Morgen' }, { id: 'b', label: 'Nacht' }, { id: 'c', label: 'Jahr' }, { id: 'd', label: 'Licht' }],
    correctAnswer: 'b', explanation: 'Sommer und Winter sind Jahreszeiten-Gegensätze – Tag und Nacht Tageszeit-Gegensätze.',
  },
  {
    id: 'wort-e', difficulty: 'default', type: 'multiple-choice', title: 'Aufgabe E',
    prompt: 'Arzt : Krankenhaus = Lehrer : ?',
    options: [{ id: 'a', label: 'Schüler' }, { id: 'b', label: 'Schule' }, { id: 'c', label: 'Buch' }, { id: 'd', label: 'Prüfung' }],
    correctAnswer: 'b', explanation: 'Der Arzt arbeitet im Krankenhaus – der Lehrer in der Schule (Ort der Tätigkeit).',
  },
  // ── Schwer ──
  {
    id: 'wort-f', difficulty: 'hard', type: 'multiple-choice', title: 'Aufgabe F',
    prompt: 'Mehl : Brot = Traube : ?',
    options: [{ id: 'a', label: 'Wein' }, { id: 'b', label: 'Obst' }, { id: 'c', label: 'Saft' }, { id: 'd', label: 'Rebe' }],
    correctAnswer: 'a', explanation: 'Aus Mehl wird Brot – aus Trauben wird Wein (Rohstoff → Produkt).',
  },
  {
    id: 'wort-g', difficulty: 'hard', type: 'multiple-choice', title: 'Aufgabe G',
    prompt: 'Kompass : Norden = Uhr : ?',
    options: [{ id: 'a', label: 'Zeiger' }, { id: 'b', label: 'Zeit' }, { id: 'c', label: 'Minute' }, { id: 'd', label: 'Sekunde' }],
    correctAnswer: 'b', explanation: 'Der Kompass zeigt die Himmelsrichtung – die Uhr die Zeit.', hint: 'Was misst bzw. zeigt das Gerät an?',
  },
  {
    id: 'wort-h', difficulty: 'hard', type: 'multiple-choice', title: 'Aufgabe H',
    prompt: 'Feder : Schreiben = Pinsel : ?',
    options: [{ id: 'a', label: 'Farbe' }, { id: 'b', label: 'Malen' }, { id: 'c', label: 'Leinwand' }, { id: 'd', label: 'Künstler' }],
    correctAnswer: 'b', explanation: 'Mit der Feder schreibt man – mit dem Pinsel malt man (Werkzeug : Tätigkeit).',
  },
  {
    id: 'wort-i', difficulty: 'hard', type: 'multiple-choice', title: 'Aufgabe I',
    prompt: 'Wasser : Ertrinken = Feuer : ?',
    options: [{ id: 'a', label: 'Brennen' }, { id: 'b', label: 'Verbrennen' }, { id: 'c', label: 'Löschen' }, { id: 'd', label: 'Hitze' }],
    correctAnswer: 'b', explanation: 'Im Wasser kann man ertrinken – im Feuer verbrennen (Element : Gefahr).',
  },
  {
    id: 'wort-j', difficulty: 'hard', type: 'multiple-choice', title: 'Aufgabe J',
    prompt: 'Buch : Seite = Baum : ?',
    options: [{ id: 'a', label: 'Wald' }, { id: 'b', label: 'Blatt' }, { id: 'c', label: 'Ast' }, { id: 'd', label: 'Wurzel' }],
    correctAnswer: 'b', explanation: 'Ein Buch besteht aus Seiten – ein Baum aus Blättern (Ganzes : Bestandteil).',
  },
  // ── Extrem ──
  {
    id: 'wort-k', difficulty: 'extreme', type: 'multiple-choice', title: 'Aufgabe K',
    prompt: 'Demokratie : Wahl = Monarchie : ?',
    options: [{ id: 'a', label: 'König' }, { id: 'b', label: 'Thronfolge' }, { id: 'c', label: 'Gesetz' }, { id: 'd', label: 'Palast' }],
    correctAnswer: 'b', explanation: 'In der Demokratie legitimiert die Wahl – in der Monarchie die Thronfolge (System : Legitimation).',
  },
  {
    id: 'wort-l', difficulty: 'extreme', type: 'multiple-choice', title: 'Aufgabe L',
    prompt: 'Evaporation : Gas = Kondensation : ?',
    options: [{ id: 'a', label: 'Eis' }, { id: 'b', label: 'Flüssigkeit' }, { id: 'c', label: 'Dampf' }, { id: 'd', label: 'Wolke' }],
    correctAnswer: 'b', explanation: 'Bei der Evaporation wird Flüssigkeit zu Gas – bei der Kondensation Gas zu Flüssigkeit.',
  },
  {
    id: 'wort-m', difficulty: 'extreme', type: 'multiple-choice', title: 'Aufgabe M',
    prompt: 'Synonym : gleiche Bedeutung = Antonym : ?',
    options: [{ id: 'a', label: 'gleicher Klang' }, { id: 'b', label: 'entgegengesetzte Bedeutung' }, { id: 'c', label: 'fremde Sprache' }, { id: 'd', label: 'mehrere Bedeutungen' }],
    correctAnswer: 'b', explanation: 'Synonyme haben die gleiche Bedeutung – Antonyme die entgegengesetzte.',
  },
  {
    id: 'wort-n', difficulty: 'extreme', type: 'multiple-choice', title: 'Aufgabe N',
    prompt: 'Ursache : Wirkung = Prämisse : ?',
    options: [{ id: 'a', label: 'Frage' }, { id: 'b', label: 'Schlussfolgerung' }, { id: 'c', label: 'Beweis' }, { id: 'd', label: 'These' }],
    correctAnswer: 'b', explanation: 'Aus der Ursache folgt die Wirkung – aus der Prämisse die Schlussfolgerung (logische Kette).',
  },
]
