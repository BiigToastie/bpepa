import type { VisualSpec } from '../../lib/resolveVisual'

interface Props {
  spec: VisualSpec
}

export function SpatialVisual({ spec }: Props) {
  const caption = spec.caption

  const body = (() => {
    switch (spec.id) {
      case 'shape-box-6':
        return <Quader />
      case 'shape-box-8':
        return <LShapeBlocks />
      case 'cube':
        return <Cube />
      case 'two-cubes':
        return <TwoCubes />
      case 'three-cubes-row':
        return <ThreeCubesRow />
      case 'tetrahedron':
        return <Tetrahedron />
      case 'pyramid':
        return <Pyramid />
      case 'cylinder':
        return <Cylinder />
      case 'cone':
        return <Cone />
      case 'sphere':
        return <Sphere />
      case 'triangular-prism':
        return <TriangularPrism />
      case 'octahedron':
        return <Octahedron />
      case 'icosahedron':
        return <Icosahedron />
      case 'dodecahedron':
        return <Dodecahedron />
      case 'cube-net':
        return <CubeNet />
      case 'mirror-letter':
        return (
          <MirrorLetter
            letter={String(spec.params?.letter ?? 'A')}
            axis={spec.params?.axis === 'horizontal' ? 'horizontal' : 'vertical'}
          />
        )
      case 'folded-paper':
        return <FoldedPaper folds={Number(spec.params?.folds ?? 2)} />
      case 'cube-rotation':
        return (
          <CubeRotation
            degrees={Number(spec.params?.degrees ?? 90)}
            axis={spec.params?.axis === 'horizontal' ? 'horizontal' : 'vertical'}
          />
        )
      case 'sphere-shadow':
        return <SphereShadow />
      case 'arrow-rotation':
        return <ArrowRotation />
      case 'rectangle-area':
        return (
          <RectangleArea
            length={spec.params?.length ? Number(spec.params.length) : undefined}
            width={spec.params?.width ? Number(spec.params.width) : undefined}
          />
        )
      default:
        return null
    }
  })()

  if (!body) return null

  return (
    <div className="visual visual--3d">
      {body}
      {caption && <p className="visual-caption">{caption}</p>}
    </div>
  )
}

function Quader() {
  return (
    <svg viewBox="0 0 120 100" className="shape-svg" aria-hidden>
      <polygon points="40,20 80,20 90,35 50,35" fill="#667eea" opacity="0.9" />
      <polygon points="50,35 90,35 90,75 50,75" fill="#764ba2" />
      <polygon points="40,20 50,35 50,75 40,60" fill="#5a6fd6" opacity="0.8" />
    </svg>
  )
}

function Cube() {
  return (
    <svg viewBox="0 0 100 100" className="shape-svg" aria-hidden>
      <polygon points="30,35 55,20 80,35 55,50" fill="#667eea" opacity="0.95" />
      <polygon points="55,50 80,35 80,60 55,75" fill="#764ba2" />
      <polygon points="30,35 55,50 55,75 30,60" fill="#5a6fd6" opacity="0.85" />
    </svg>
  )
}

function LShapeBlocks() {
  return (
    <svg viewBox="0 0 140 110" className="shape-svg" aria-hidden>
      <polygon points="20,50 55,50 55,85 20,85" fill="#43e97b" />
      <polygon points="55,50 90,50 90,35 55,35" fill="#38f9d7" opacity="0.85" />
      <polygon points="55,35 90,35 100,45 65,45" fill="#2dd4a8" opacity="0.9" />
      <polygon points="90,50 100,45 100,80 90,85" fill="#2dd4a8" opacity="0.7" />
      <polygon points="55,50 65,45 65,80 55,85" fill="#1fb88a" opacity="0.6" />
      <polygon points="20,50 30,45 65,45 55,50" fill="#5eecc0" opacity="0.5" />
    </svg>
  )
}

function TwoCubes() {
  return (
    <svg viewBox="0 0 150 90" className="shape-svg" aria-hidden>
      <g transform="translate(5,10)">
        <polygon points="20,30 45,15 70,30 45,45" fill="#667eea" />
        <polygon points="45,45 70,30 70,55 45,70" fill="#764ba2" />
        <polygon points="20,30 45,45 45,70 20,55" fill="#5a6fd6" opacity="0.85" />
      </g>
      <g transform="translate(55,10)">
        <polygon points="20,30 45,15 70,30 45,45" fill="#43e97b" />
        <polygon points="45,45 70,30 70,55 45,70" fill="#2dd4a8" />
        <polygon points="20,30 45,45 45,70 20,55" fill="#1fb88a" opacity="0.85" />
      </g>
    </svg>
  )
}

function ThreeCubesRow() {
  return (
    <svg viewBox="0 0 200 90" className="shape-svg" aria-hidden>
      {[0, 50, 100].map((x, i) => (
        <g key={i} transform={`translate(${x},10)`}>
          <polygon points="20,30 45,15 70,30 45,45" fill={['#667eea', '#43e97b', '#fa709a'][i]} />
          <polygon points="45,45 70,30 70,55 45,70" fill={['#764ba2', '#2dd4a8', '#fee140'][i]} />
          <polygon points="20,30 45,45 45,70 20,55" fill={['#5a6fd6', '#1fb88a', '#f5576c'][i]} opacity="0.85" />
        </g>
      ))}
    </svg>
  )
}

function Tetrahedron() {
  return (
    <svg viewBox="0 0 100 100" className="shape-svg" aria-hidden>
      <polygon points="50,15 85,75 15,75" fill="none" stroke="#43e97b" strokeWidth="2.5" />
      <line x1="50" y1="15" x2="50" y2="75" stroke="#43e97b" strokeWidth="2" opacity="0.6" />
      <line x1="15" y1="75" x2="67" y2="45" stroke="#43e97b" strokeWidth="2" opacity="0.6" />
      <line x1="85" y1="75" x2="33" y2="45" stroke="#43e97b" strokeWidth="2" opacity="0.6" />
      <polygon points="33,45 67,45 50,15" fill="#43e97b" opacity="0.25" />
    </svg>
  )
}

function Pyramid() {
  return (
    <svg viewBox="0 0 110 100" className="shape-svg" aria-hidden>
      <polygon points="25,70 85,70 55,20" fill="#fee140" opacity="0.35" stroke="#fee140" strokeWidth="2" />
      <polygon points="25,70 85,70 70,55 40,55" fill="#fa709a" opacity="0.5" />
      <line x1="25" y1="70" x2="55" y2="20" stroke="#fee140" strokeWidth="2" />
      <line x1="85" y1="70" x2="55" y2="20" stroke="#fee140" strokeWidth="2" />
      <line x1="55" y1="20" x2="55" y2="70" stroke="#fee140" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5" />
    </svg>
  )
}

function Cylinder() {
  return (
    <svg viewBox="0 0 90 110" className="shape-svg" aria-hidden>
      <ellipse cx="45" cy="25" rx="30" ry="10" fill="#667eea" opacity="0.9" />
      <rect x="15" y="25" width="60" height="55" fill="#764ba2" />
      <ellipse cx="45" cy="80" rx="30" ry="10" fill="#5a6fd6" />
      <ellipse cx="45" cy="25" rx="30" ry="10" fill="none" stroke="#fff" strokeWidth="1" opacity="0.3" />
    </svg>
  )
}

function Cone() {
  return (
    <svg viewBox="0 0 100 110" className="shape-svg" aria-hidden>
      <polygon points="50,15 85,85 15,85" fill="#fa709a" opacity="0.4" stroke="#fa709a" strokeWidth="2" />
      <ellipse cx="50" cy="85" rx="35" ry="12" fill="none" stroke="#fa709a" strokeWidth="2" strokeDasharray="5 4" opacity="0.5" />
    </svg>
  )
}

function Sphere() {
  return (
    <svg viewBox="0 0 100 100" className="shape-svg" aria-hidden>
      <defs>
        <radialGradient id="sphereGrad" cx="35%" cy="30%">
          <stop offset="0%" stopColor="#a8b4ff" />
          <stop offset="100%" stopColor="#4a5fc1" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="35" fill="url(#sphereGrad)" />
      <ellipse cx="50" cy="50" rx="35" ry="8" fill="none" stroke="#fff" strokeWidth="1" opacity="0.2" />
      <ellipse cx="50" cy="50" rx="8" ry="35" fill="none" stroke="#fff" strokeWidth="1" opacity="0.15" />
    </svg>
  )
}

function TriangularPrism() {
  return (
    <svg viewBox="0 0 130 100" className="shape-svg" aria-hidden>
      <polygon points="20,70 45,25 70,70" fill="#43e97b" opacity="0.35" stroke="#43e97b" strokeWidth="2" />
      <polygon points="60,70 85,25 110,70" fill="#2dd4a8" opacity="0.35" stroke="#2dd4a8" strokeWidth="2" />
      <line x1="20" y1="70" x2="60" y2="70" stroke="#43e97b" strokeWidth="2" />
      <line x1="45" y1="25" x2="85" y2="25" stroke="#43e97b" strokeWidth="2" />
      <line x1="70" y1="70" x2="110" y2="70" stroke="#2dd4a8" strokeWidth="2" />
      <polygon points="60,70 85,25 70,70 45,25" fill="#1fb88a" opacity="0.25" />
    </svg>
  )
}

function Octahedron() {
  return (
    <svg viewBox="0 0 100 110" className="shape-svg" aria-hidden>
      <polygon points="50,10 85,55 50,100 15,55" fill="#667eea" opacity="0.2" stroke="#667eea" strokeWidth="2" />
      <line x1="50" y1="10" x2="50" y2="100" stroke="#667eea" strokeWidth="1.5" opacity="0.5" />
      <line x1="15" y1="55" x2="85" y2="55" stroke="#667eea" strokeWidth="1.5" opacity="0.5" />
    </svg>
  )
}

function Icosahedron() {
  return (
    <svg viewBox="0 0 100 100" className="shape-svg" aria-hidden>
      <circle cx="50" cy="50" r="38" fill="none" stroke="#43e97b" strokeWidth="2" />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2
        const x1 = 50 + Math.cos(a) * 38
        const y1 = 50 + Math.sin(a) * 38
        const x2 = 50 + Math.cos(a + Math.PI / 4) * 20
        const y2 = 50 + Math.sin(a + Math.PI / 4) * 20
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#43e97b" strokeWidth="1.2" opacity="0.7" />
      })}
      <polygon points="50,12 72,40 28,40" fill="none" stroke="#43e97b" strokeWidth="1.5" />
      <polygon points="50,88 72,60 28,60" fill="none" stroke="#43e97b" strokeWidth="1.5" />
    </svg>
  )
}

function Dodecahedron() {
  return (
    <svg viewBox="0 0 100 100" className="shape-svg" aria-hidden>
      <polygon points="50,8 65,20 62,38 38,38 35,20" fill="#fee140" opacity="0.25" stroke="#fee140" strokeWidth="2" />
      <polygon points="50,92 65,80 62,62 38,62 35,80" fill="#fa709a" opacity="0.2" stroke="#fa709a" strokeWidth="2" />
      <line x1="50" y1="8" x2="50" y2="92" stroke="#fee140" strokeWidth="1" opacity="0.4" />
      <line x1="35" y1="20" x2="38" y2="62" stroke="#fee140" strokeWidth="1" opacity="0.4" />
      <line x1="65" y1="20" x2="62" y2="62" stroke="#fee140" strokeWidth="1" opacity="0.4" />
    </svg>
  )
}

function CubeNet() {
  return (
    <svg viewBox="0 0 160 130" className="shape-svg" aria-hidden>
      {[
        [55, 10], [55, 60], [5, 60], [105, 60], [55, 110],
      ].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="50" height="50" fill="none" stroke="#43e97b" strokeWidth="2" strokeDasharray="4 3" />
      ))}
    </svg>
  )
}

function MirrorLetter({ letter, axis }: { letter: string; axis: 'vertical' | 'horizontal' }) {
  const isVertical = axis === 'vertical'
  return (
    <svg viewBox="0 0 160 100" className="shape-svg" aria-hidden>
      <line
        x1={isVertical ? 80 : 10}
        y1={isVertical ? 10 : 50}
        x2={isVertical ? 80 : 150}
        y2={isVertical ? 90 : 50}
        stroke="#f5576c"
        strokeWidth="2"
        strokeDasharray="6 4"
      />
      <text x={isVertical ? 45 : 80} y={55} textAnchor="middle" fontSize="42" fontWeight="700" fill="#f4f6ff" fontFamily="Georgia, serif">
        {letter}
      </text>
      {isVertical ? (
        <text x="125" y="55" textAnchor="middle" fontSize="42" fontWeight="700" fill="#43e97b" opacity="0.5" fontFamily="Georgia, serif">?</text>
      ) : (
        <text x="80" y="82" textAnchor="middle" fontSize="42" fontWeight="700" fill="#43e97b" opacity="0.5" fontFamily="Georgia, serif">?</text>
      )}
    </svg>
  )
}

function FoldedPaper({ folds }: { folds: number }) {
  const sections = 2 ** folds
  return (
    <svg viewBox="0 0 120 120" className="shape-svg" aria-hidden>
      <rect x="15" y="15" width="90" height="90" fill="#f4f6ff" opacity="0.15" stroke="#f4f6ff" strokeWidth="2" rx="2" />
      {folds >= 1 && <line x1="60" y1="15" x2="60" y2="105" stroke="#667eea" strokeWidth="2" strokeDasharray="4 3" />}
      {folds >= 2 && <line x1="15" y1="60" x2="105" y2="60" stroke="#667eea" strokeWidth="2" strokeDasharray="4 3" />}
      {folds >= 3 && <line x1="37" y1="15" x2="37" y2="105" stroke="#764ba2" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />}
      <circle cx="60" cy="60" r="8" fill="none" stroke="#f5576c" strokeWidth="2.5" />
      <text x="60" y="115" textAnchor="middle" fill="var(--text-muted)" fontSize="10">{sections} Lagen</text>
    </svg>
  )
}

function CubeRotation({ degrees, axis }: { degrees: number; axis: 'vertical' | 'horizontal' }) {
  return (
    <svg viewBox="0 0 120 110" className="shape-svg" aria-hidden>
      <g transform={axis === 'horizontal' ? 'translate(60,55) rotate(30) translate(-60,-55)' : ''}>
        <polygon points="35,40 60,25 85,40 60,55" fill="#667eea" />
        <polygon points="60,55 85,40 85,65 60,80" fill="#764ba2" />
        <polygon points="35,40 60,55 60,80 35,65" fill="#5a6fd6" opacity="0.85" />
        <circle cx="60" cy="32" r="6" fill="#fee140" />
      </g>
      <path d="M 95 20 A 18 18 0 0 1 110 38" fill="none" stroke="#43e97b" strokeWidth="2" markerEnd="url(#arrow)" />
      <defs>
        <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#43e97b" />
        </marker>
      </defs>
      <text x="60" y="105" textAnchor="middle" fill="var(--text-muted)" fontSize="10">
        {degrees}° {axis === 'vertical' ? 'senkrecht' : 'horizontal'}
      </text>
    </svg>
  )
}

function SphereShadow() {
  return (
    <svg viewBox="0 0 120 110" className="shape-svg" aria-hidden>
      <defs>
        <radialGradient id="sphereGrad2" cx="35%" cy="30%">
          <stop offset="0%" stopColor="#a8b4ff" />
          <stop offset="100%" stopColor="#4a5fc1" />
        </radialGradient>
        <marker id="light" markerWidth="6" markerHeight="6" refX="3" refY="3">
          <circle cx="3" cy="3" r="3" fill="#fee140" />
        </marker>
      </defs>
      <line x1="60" y1="5" x2="60" y2="30" stroke="#fee140" strokeWidth="2" markerEnd="url(#light)" />
      <circle cx="60" cy="48" r="22" fill="url(#sphereGrad2)" />
      <ellipse cx="60" cy="92" rx="28" ry="9" fill="#000" opacity="0.35" />
    </svg>
  )
}

function ArrowRotation() {
  return (
    <svg viewBox="0 0 100 100" className="shape-svg" aria-hidden>
      <line x1="20" y1="50" x2="75" y2="50" stroke="#667eea" strokeWidth="4" strokeLinecap="round" />
      <polygon points="75,50 62,42 62,58" fill="#667eea" />
      <path d="M 78 28 A 20 20 0 0 1 88 48" fill="none" stroke="#43e97b" strokeWidth="2" />
      <text x="50" y="85" textAnchor="middle" fill="var(--text-muted)" fontSize="10">Start: nach rechts</text>
    </svg>
  )
}

function RectangleArea({ length, width }: { length?: number; width?: number }) {
  const label = length && width ? `${length} m × ${width} m` : 'Länge × Breite'
  return (
    <svg viewBox="0 0 160 100" className="shape-svg" aria-hidden>
      <rect x="25" y="25" width="110" height="55" fill="#43e97b" opacity="0.2" stroke="#43e97b" strokeWidth="2" rx="2" />
      <text x="80" y="58" textAnchor="middle" fill="#f4f6ff" fontSize="13" fontWeight="600">{label}</text>
      <text x="80" y="95" textAnchor="middle" fill="var(--text-muted)" fontSize="10">Rechteckige Fläche</text>
    </svg>
  )
}
