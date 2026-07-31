import type { CSSProperties } from 'react'
import './BrowserFrame.css'

interface Props {
  src: string
  url?: string
  alt?: string
  className?: string
  style?: CSSProperties
}

export function BrowserFrame({
  src,
  url = 'voxel.design',
  alt = '',
  className = '',
  style,
}: Props) {
  return (
    <div className={`browser-frame ${className}`.trim()} style={style}>
      <div className="browser-frame__chrome">
        <span className="browser-frame__dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="browser-frame__url">{url}</span>
      </div>
      <div className="browser-frame__viewport">
        <img src={src} alt={alt} draggable={false} />
      </div>
    </div>
  )
}
