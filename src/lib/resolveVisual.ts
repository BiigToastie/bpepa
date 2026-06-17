import type { Question } from '../types'

export interface VisualSpec {
  id: string
  caption?: string
  params?: Record<string, string | number>
}

function textOf(q: Question) {
  return `${q.title} ${q.prompt} ${q.explanation}`.toLowerCase()
}

function extractLetter(q: Question): string {
  const m = q.prompt.match(/[„"]([a-zA-Z])[„"]/) ?? q.prompt.match(/buchstabe\s+[„"]?([a-zA-Z])/i)
  return (m?.[1] ?? 'A').toUpperCase()
}

export function resolveVisual(question: Question): VisualSpec | null {
  if (question.visual) return { id: question.visual }

  const text = textOf(question)

  if (/spiegel|spiegelbild/.test(text)) {
    const axis = /waagerecht|horizontal/.test(text) ? 'horizontal' : 'vertical'
    return {
      id: 'mirror-letter',
      caption: axis === 'vertical' ? 'Spiegelung an senkrechter Achse' : 'Spiegelung an waagerechter Achse',
      params: { letter: extractLetter(question), axis },
    }
  }

  if (/gefaltet|aufklapp|loch gestanzt|papier/.test(text)) {
    const folds = /3×|3-mal|dreimal/.test(text) ? 3 : 2
    return { id: 'folded-paper', caption: 'Gefaltetes Blatt (von oben)', params: { folds } }
  }

  if (/pfeil/.test(text) && (/gedreht|rotation|uhrzeiger/.test(text))) {
    return { id: 'arrow-rotation', caption: 'Pfeil vor der Drehung' }
  }

  if (/schatten/.test(text) && /kugel/.test(text)) {
    return { id: 'sphere-shadow', caption: 'Kugel mit Licht von oben' }
  }

  if (/mentale rotation|gedreht/.test(text) && /würfel/.test(text)) {
    const deg = /180/.test(text) ? 180 : 90
    const axis = /horizontal|waagerecht/.test(text) ? 'horizontal' : 'vertical'
    return {
      id: 'cube-rotation',
      caption: `Würfel – ${deg}° Drehung`,
      params: { degrees: deg, axis },
    }
  }

  if (/würfelnetz|abwicklung|netz/.test(text)) {
    return { id: 'cube-net', caption: 'Abwicklungsnetz eines Würfels' }
  }

  if (/netz falten|falten des netzes/.test(text)) {
    return { id: 'net-fold-a', caption: 'Netz (gestrichelt = Falzlinien)' }
  }

  if (/dodekaeder/.test(text)) {
    return { id: 'dodecahedron', caption: 'Dodekaeder (12 Fünfecke)' }
  }

  if (/ikosaeder/.test(text)) {
    return { id: 'icosahedron', caption: 'Ikosaeder (20 Dreiecke)' }
  }

  if (/oktaeder/.test(text)) {
    return { id: 'octahedron', caption: 'Oktaeder (8 Dreiecke)' }
  }

  if (/tetraeder/.test(text)) {
    return { id: 'tetrahedron', caption: 'Tetraeder (4 Dreiecksflächen)' }
  }

  if (/pyramide/.test(text)) {
    return { id: 'pyramid', caption: 'Pyramide mit quadratischer Grundfläche' }
  }

  if (/zylinder/.test(text)) {
    return { id: 'cylinder', caption: 'Zylinder (Boden, Deckel, Mantel)' }
  }

  if (/kegel/.test(text)) {
    return { id: 'cone', caption: 'Kegel' }
  }

  if (/kugel/.test(text)) {
    return { id: 'sphere', caption: 'Kugel' }
  }

  if (/prisma|dreiseitig/.test(text)) {
    return { id: 'triangular-prism', caption: 'Dreiseitiges Prisma' }
  }

  if (/dreifach|drei würfel in einer reihe|reihe verbunden/.test(text)) {
    return { id: 'three-cubes-row', caption: 'Drei verbundene Würfel (Reihe)' }
  }

  if (/verbundkörper|l-form|zwei quader im l|zusammengesetzt/.test(text)) {
    return { id: 'shape-box-8', caption: 'Zusammengesetzter Körper (L-Form)' }
  }

  if (/doppelwürfel|zwei würfel/.test(text)) {
    return { id: 'two-cubes', caption: 'Zwei verbundene Würfel' }
  }

  if (/quader/.test(text)) {
    return { id: 'shape-box-6', caption: 'Quader (rechteckiger Körper)' }
  }

  if (/würfel/.test(text)) {
    return { id: 'cube', caption: 'Würfel (alle Seiten gleich lang)' }
  }

  if (/dieser körper|flächen zählen/.test(text)) {
    return { id: 'shape-box-6', caption: 'Körper zur Orientierung' }
  }

  if (/grundstück|rechteck.*breit|fläche.*lang/.test(text)) {
    const dim = question.prompt.match(/(\d+)\s*m?\s*lang.*?(\d+)\s*m?\s*breit/i)
    return {
      id: 'rectangle-area',
      caption: 'Rechteckige Fläche',
      params: dim ? { length: dim[1], width: dim[2] } : {},
    }
  }

  if (/fläche/.test(text) && /(m\s*lang|meter|rechteck|grundstück)/.test(text)) {
    return { id: 'rectangle-area', caption: 'Rechteckige Fläche' }
  }

  return null
}
