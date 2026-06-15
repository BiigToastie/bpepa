interface VisualProps {
  name: string
}

export function QuestionVisual({ name }: VisualProps) {
  switch (name) {
    case 'symbol-sequence-a':
      return <SymbolSequenceA />
    case 'symbol-sequence-b':
      return <SymbolSequenceB />
    case 'shape-box-6':
      return <ShapeBox6 />
    case 'shape-box-8':
      return <ShapeBox8 />
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

function ShapeBox6() {
  return (
    <div className="visual visual--3d">
      <svg viewBox="0 0 120 100" className="shape-svg">
        <polygon points="40,20 80,20 90,35 50,35" fill="#667eea" opacity="0.9" />
        <polygon points="50,35 90,35 90,75 50,75" fill="#764ba2" />
        <polygon points="40,20 50,35 50,75 40,60" fill="#5a6fd6" opacity="0.8" />
        <line x1="40" y1="20" x2="80" y2="20" stroke="#fff" strokeWidth="1" opacity="0.3" />
      </svg>
      <p className="visual-caption">Quader (Schachtel)</p>
    </div>
  )
}

function ShapeBox8() {
  return (
    <div className="visual visual--3d">
      <svg viewBox="0 0 140 110" className="shape-svg">
        {/* L-shaped block - two cubes */}
        <polygon points="20,50 55,50 55,85 20,85" fill="#43e97b" />
        <polygon points="55,50 90,50 90,35 55,35" fill="#38f9d7" opacity="0.85" />
        <polygon points="55,35 90,35 100,45 65,45" fill="#2dd4a8" opacity="0.9" />
        <polygon points="90,50 100,45 100,80 90,85" fill="#2dd4a8" opacity="0.7" />
        <polygon points="55,50 65,45 65,80 55,85" fill="#1fb88a" opacity="0.6" />
        <polygon points="20,50 30,45 65,45 55,50" fill="#5eecc0" opacity="0.5" />
      </svg>
      <p className="visual-caption">Zusammengesetzter Körper</p>
    </div>
  )
}

function NetFoldA() {
  return (
    <div className="visual visual--net">
      <svg viewBox="0 0 160 160" className="shape-svg">
        {/* Cross net */}
        <rect x="55" y="10" width="50" height="50" fill="none" stroke="#43e97b" strokeWidth="2" strokeDasharray="4 3" />
        <rect x="55" y="60" width="50" height="50" fill="#43e97b" opacity="0.2" stroke="#43e97b" strokeWidth="2" strokeDasharray="4 3" />
        <rect x="5" y="60" width="50" height="50" fill="none" stroke="#43e97b" strokeWidth="2" strokeDasharray="4 3" />
        <rect x="105" y="60" width="50" height="50" fill="none" stroke="#43e97b" strokeWidth="2" strokeDasharray="4 3" />
        <rect x="55" y="110" width="50" height="50" fill="none" stroke="#43e97b" strokeWidth="2" strokeDasharray="4 3" />
        {/* Markierung auf einer Fläche */}
        <circle cx="80" cy="85" r="8" fill="#fee140" />
        {/* Option cubes below */}
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
          <div
            className="stability-block"
            style={{ width: s.w, height: s.h }}
          />
          <span>{s.label}</span>
        </div>
      ))}
    </div>
  )
}

function GearSystem() {
  return (
    <div className="visual visual--gears">
      <svg viewBox="0 0 200 80" className="shape-svg">
        {/* Belt connecting gears */}
        <path d="M 30 40 L 70 40 L 130 40 L 170 40" fill="none" stroke="#94a3b8" strokeWidth="3" />
        {/* Gear a - large */}
        <circle cx="30" cy="40" r="22" fill="none" stroke="#fa709a" strokeWidth="3" />
        <circle cx="30" cy="40" r="4" fill="#fa709a" />
        <text x="30" y="75" textAnchor="middle" fill="currentColor" fontSize="12">a</text>
        {/* Gear b - medium */}
        <circle cx="100" cy="40" r="14" fill="none" stroke="#fee140" strokeWidth="3" />
        <circle cx="100" cy="40" r="3" fill="#fee140" />
        <text x="100" y="75" textAnchor="middle" fill="currentColor" fontSize="12">b</text>
        {/* Gear c - small */}
        <circle cx="170" cy="40" r="8" fill="none" stroke="#43e97b" strokeWidth="3" />
        <circle cx="170" cy="40" r="2" fill="#43e97b" />
        <text x="170" y="75" textAnchor="middle" fill="currentColor" fontSize="12">c</text>
        {/* Drive arrow */}
        <text x="100" y="15" textAnchor="middle" fill="#94a3b8" fontSize="10">← Antrieb</text>
      </svg>
    </div>
  )
}
