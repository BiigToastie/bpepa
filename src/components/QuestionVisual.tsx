import type { Question } from '../types'
import { resolveVisual, type VisualSpec } from '../lib/resolveVisual'
import { SpatialVisual } from './visuals/SpatialVisuals'

interface Props {
  question: Question
}

const SPATIAL_IDS = new Set([
  'shape-box-6', 'shape-box-8', 'cube', 'two-cubes', 'three-cubes-row',
  'tetrahedron', 'pyramid', 'cylinder', 'cone', 'sphere', 'triangular-prism',
  'octahedron', 'icosahedron', 'dodecahedron', 'cube-net', 'mirror-letter',
  'folded-paper', 'cube-rotation', 'sphere-shadow', 'arrow-rotation', 'rectangle-area',
])

export function QuestionVisual({ question }: Props) {
  const spec = resolveVisual(question)
  if (!spec) return null

  if (SPATIAL_IDS.has(spec.id)) {
    return <SpatialVisual spec={spec} />
  }

  return <LegacyVisual spec={spec} />
}

function LegacyVisual({ spec }: { spec: VisualSpec }) {
  switch (spec.id) {
    case 'symbol-sequence-a':
      return <SymbolSequenceA />
    case 'symbol-sequence-b':
      return <SymbolSequenceB />
    case 'net-fold-a':
      return <NetFoldA />
    case 'stability-shapes':
      return <StabilityShapes />
    case 'gear-system':
      return <GearSystem />
    default:
      return null
  }
}

function SymbolSequenceA() {
  const shapes = ['○', '△', '○', '△', '○']
  return (
    <div className="visual visual--symbols">
      <div className="symbol-row">
        {shapes.map((s, i) => (
          <span key={i} className="symbol-item">{s}</span>
        ))}
        <span className="symbol-item symbol-item--question">?</span>
      </div>
    </div>
  )
}

function SymbolSequenceB() {
  const counts = [1, 2, 3, 4, 5]
  return (
    <div className="visual visual--symbols">
      <div className="symbol-row symbol-row--bars">
        {counts.map((n, i) => (
          <div key={i} className="bar-group">
            {Array.from({ length: n }).map((_, j) => (
              <div key={j} className="bar" />
            ))}
          </div>
        ))}
        <div className="bar-group bar-group--question">?</div>
      </div>
    </div>
  )
}

function NetFoldA() {
  return (
    <div className="visual visual--net">
      <svg viewBox="0 0 160 160" className="shape-svg" aria-hidden>
        <rect x="55" y="10" width="50" height="50" fill="none" stroke="#43e97b" strokeWidth="2" strokeDasharray="4 3" />
        <rect x="55" y="60" width="50" height="50" fill="#43e97b" opacity="0.2" stroke="#43e97b" strokeWidth="2" strokeDasharray="4 3" />
        <rect x="5" y="60" width="50" height="50" fill="none" stroke="#43e97b" strokeWidth="2" strokeDasharray="4 3" />
        <rect x="105" y="60" width="50" height="50" fill="none" stroke="#43e97b" strokeWidth="2" strokeDasharray="4 3" />
        <rect x="55" y="110" width="50" height="50" fill="none" stroke="#43e97b" strokeWidth="2" strokeDasharray="4 3" />
        <circle cx="80" cy="85" r="8" fill="#fee140" />
        <g transform="translate(5, 130)">
          {['a', 'b', 'c', 'd'].map((label, i) => (
            <g key={label} transform={`translate(${i * 38}, 0)`}>
              <rect x="2" y="2" width="22" height="22" fill="#667eea" opacity="0.3" stroke="#667eea" strokeWidth="1.5" />
              {label === 'd' && <circle cx="13" cy="13" r="4" fill="#fee140" />}
              <text x="13" y="35" textAnchor="middle" fill="currentColor" fontSize="10">{label}</text>
            </g>
          ))}
        </g>
      </svg>
      <p className="visual-caption">Netz (gestrichelt = Falzlinien)</p>
    </div>
  )
}

function StabilityShapes() {
  const shapes = [
    { id: 'a', w: 50, h: 25, label: 'a' },
    { id: 'b', w: 35, h: 40, label: 'b' },
    { id: 'c', w: 18, h: 55, label: 'c' },
  ]
  return (
    <div className="visual visual--stability">
      {shapes.map((s) => (
        <div key={s.id} className="stability-item">
          <div className="stability-block" style={{ width: s.w, height: s.h }} />
          <span>{s.label}</span>
        </div>
      ))}
    </div>
  )
}

function GearSystem() {
  return (
    <div className="visual visual--gears">
      <svg viewBox="0 0 200 80" className="shape-svg" aria-hidden>
        <path d="M 30 40 L 70 40 L 130 40 L 170 40" fill="none" stroke="#94a3b8" strokeWidth="3" />
        <circle cx="30" cy="40" r="22" fill="none" stroke="#fa709a" strokeWidth="3" />
        <circle cx="30" cy="40" r="4" fill="#fa709a" />
        <text x="30" y="75" textAnchor="middle" fill="currentColor" fontSize="12">a</text>
        <circle cx="100" cy="40" r="14" fill="none" stroke="#fee140" strokeWidth="3" />
        <circle cx="100" cy="40" r="3" fill="#fee140" />
        <text x="100" y="75" textAnchor="middle" fill="currentColor" fontSize="12">b</text>
        <circle cx="170" cy="40" r="8" fill="none" stroke="#43e97b" strokeWidth="3" />
        <circle cx="170" cy="40" r="2" fill="#43e97b" />
        <text x="170" y="75" textAnchor="middle" fill="currentColor" fontSize="12">c</text>
        <text x="100" y="15" textAnchor="middle" fill="#94a3b8" fontSize="10">← Antrieb</text>
      </svg>
    </div>
  )
}
