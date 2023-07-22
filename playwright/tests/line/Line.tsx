import React from 'react'
import Canvas from '../Canvas'
import { line, LineCap, LineStyle } from '../../../pkg/canvas_drawing'

export const DefaultLine = () => {
  const draw = (context: CanvasRenderingContext2D) => {
    line().draw(context)
  }
  return <Canvas width={200} height={200} draw={draw} />
}

export const LineFromXToY = () => {
  const draw = (context: CanvasRenderingContext2D) => {
    line().from(10, 10).to(190, 190).draw(context)
  }
  return <Canvas width={200} height={200} draw={draw} />
}

export const LineWithStyle = () => {
  const draw = (context: CanvasRenderingContext2D) => {
    line().from(20, 20).to(180, 20).style(LineStyle.Solid).draw(context)
    line().from(20, 100).to(180, 100).style(LineStyle.Dashed).draw(context)
    line().from(20, 180).to(180, 180).style(LineStyle.Dotted).draw(context)
  }
  return <Canvas width={200} height={200} draw={draw} />
}

export const LineWithCap = () => {
  const draw = (context: CanvasRenderingContext2D) => {
    line().from(20, 20).to(180, 20).width(10).cap(LineCap.Butt).draw(context)
    line().from(20, 40).to(180, 40).width(10).cap(LineCap.Round).draw(context)
    line().from(20, 60).to(180, 60).width(10).cap(LineCap.Square).draw(context)
  }
  return <Canvas width={200} height={200} draw={draw} />
}

export const LineWithColor = () => {
  const draw = (context: CanvasRenderingContext2D) => {
    line().from(20, 100).to(180, 100).color('red').draw(context)
  }
  return <Canvas width={200} height={200} draw={draw} />
}

export const LineWithWidth = () => {
  const draw = (context: CanvasRenderingContext2D) => {
    line().from(20, 100).to(180, 100).width(10).draw(context)
  }
  return <Canvas width={200} height={200} draw={draw} />
}

export const QuadraticCurvedLine = () => {
  const draw = (context: CanvasRenderingContext2D) => {
    line().from(20, 100).to(180, 100).quadraticCurve(180, 20).draw(context)
  }
  return <Canvas width={200} height={200} draw={draw} />
}

export const BezierCurvedLine = () => {
  const draw = (context: CanvasRenderingContext2D) => {
    line()
      .from(20, 100)
      .to(180, 100)
      .bezierCurve(20, 180, 180, 20)
      .draw(context)
  }
  return <Canvas width={200} height={200} draw={draw} />
}
