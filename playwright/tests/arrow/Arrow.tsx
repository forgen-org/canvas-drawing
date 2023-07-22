import React from 'react'
import Canvas from '../Canvas'
import { arrow, arrowHead, line } from '../../../pkg/canvas_drawing'

export const DefaultArrow = () => {
  const draw = (context: CanvasRenderingContext2D) => {
    arrow().draw(context)
  }
  return <Canvas width={200} height={200} draw={draw} />
}

export const ArrowFromXToY = () => {
  const draw = (context: CanvasRenderingContext2D) => {
    arrow().body(line().from(10, 10).to(100, 150)).draw(context)
  }
  return <Canvas width={200} height={200} draw={draw} />
}

export const ArrowWithHeadColor = () => {
  const draw = (context: CanvasRenderingContext2D) => {
    arrow().body(line().from(10, 10).to(100, 150)).head(arrowHead().color('red')).draw(context)
  }
  return <Canvas width={200} height={200} draw={draw} />
}

export const ArrowWithHeadWidth = () => {
  const draw = (context: CanvasRenderingContext2D) => {
    arrow().body(line().from(10, 10).to(100, 150)).head(arrowHead().width(10)).draw(context)
  }
  return <Canvas width={200} height={200} draw={draw} />
}

export const ArrowWithSize = () => {
  const draw = (context: CanvasRenderingContext2D) => {
    arrow().body(line().from(10, 10).to(100, 150)).head(arrowHead().size(24)).draw(context)
  }
  return <Canvas width={200} height={200} draw={draw} />
}

export const ArrowWithCurvedBody = () => {
  const draw = (context: CanvasRenderingContext2D) => {
    arrow().body(line().from(10, 10).to(100, 150).quadraticCurve(200, 200)).head(arrowHead()).draw(context)
  }
  return <Canvas width={200} height={200} draw={draw} />
}
