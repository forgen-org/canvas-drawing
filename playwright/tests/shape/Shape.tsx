import React from 'react'
import Canvas from '../Canvas'
import { rectangle, ellipse, diamond, LineStyle } from '../../../pkg/canvas_drawing'

export const DefaultRectangle = () => {
  const draw = (context: CanvasRenderingContext2D) => {
    rectangle().draw(context)
  }
  return <Canvas width={200} height={200} draw={draw} />
}

export const DefaultEllipse = () => {
  const draw = (context: CanvasRenderingContext2D) => {
    ellipse().draw(context)
  }
  return <Canvas width={200} height={200} draw={draw} />
}

export const DefaultDiamond = () => {
  const draw = (context: CanvasRenderingContext2D) => {
    diamond().draw(context)
  }
  return <Canvas width={200} height={200} draw={draw} />
}

export const ShapeWithBackground = () => {
  const draw = (context: CanvasRenderingContext2D) => {
    diamond().backgroundColor('red').draw(context)
  }
  return <Canvas width={200} height={200} draw={draw} />
}

export const ShapeWithWidth = () => {
  const draw = (context: CanvasRenderingContext2D) => {
    rectangle().width(50).draw(context)
  }
  return <Canvas width={200} height={200} draw={draw} />
}

export const ShapeWithHeight = () => {
  const draw = (context: CanvasRenderingContext2D) => {
    rectangle().height(50).draw(context)
  }
  return <Canvas width={200} height={200} draw={draw} />
}

export const ShapeWithX = () => {
  const draw = (context: CanvasRenderingContext2D) => {
    ellipse().x(50).draw(context)
  }
  return <Canvas width={200} height={200} draw={draw} />
}

export const ShapeWithY = () => {
  const draw = (context: CanvasRenderingContext2D) => {
    ellipse().y(50).draw(context)
  }
  return <Canvas width={200} height={200} draw={draw} />
}

export const ShapeWithBorderWidth = () => {
  const draw = (context: CanvasRenderingContext2D) => {
    ellipse().borderWidth(16).draw(context)
  }
  return <Canvas width={200} height={200} draw={draw} />
}

export const ShapeWithBorderStyle = () => {
  const draw = (context: CanvasRenderingContext2D) => {
    ellipse().borderStyle(LineStyle.Solid).draw(context)
    ellipse().x(20).y(20).borderStyle(LineStyle.Dashed).draw(context)
    ellipse().x(40).y(40).borderStyle(LineStyle.Dotted).draw(context)
  }
  return <Canvas width={200} height={200} draw={draw} />
}

export const ShapeWithBorderColor = () => {
  const draw = (context: CanvasRenderingContext2D) => {
    ellipse().borderColor('red').draw(context)
  }
  return <Canvas width={200} height={200} draw={draw} />
}

export const ShapeWithOpacity = () => {
  const draw = (context: CanvasRenderingContext2D) => {
    diamond().backgroundColor('red').opacity(1).draw(context)
    ellipse().width(100).height(100).backgroundColor('blue').opacity(0.5).draw(context)
  }
  return <Canvas width={200} height={200} draw={draw} />
}
