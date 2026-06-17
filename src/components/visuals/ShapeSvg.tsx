import type { ReactNode } from 'react'

interface Props {
  w: number
  h: number
  pad?: number
  children: ReactNode
}

/** SVG-Hülle mit Padding, damit Striche/Marker nicht abgeschnitten werden. */
export function ShapeSvg({ w, h, pad = 14, children }: Props) {
  return (
    <div className="visual-svg-wrap">
      <svg
        viewBox={`${-pad} ${-pad} ${w + pad * 2} ${h + pad * 2}`}
        className="shape-svg"
        overflow="visible"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        {children}
      </svg>
    </div>
  )
}
