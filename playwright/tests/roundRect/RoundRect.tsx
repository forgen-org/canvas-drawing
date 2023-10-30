import React from 'react'
import Canvas from '../Canvas'
import { LineStyle, roundRect } from '../../../pkg/canvas_drawing'

export const DefaultRoundRect = () => {
  const draw = (context: CanvasRenderingContext2D) => {
    roundRect().draw(context)
  }
  return <Canvas width={200} height={200} draw={draw} />
}

export const RoundRectWithRadius = () => {
  const draw = (context: CanvasRenderingContext2D) => {
    roundRect().radius(50).draw(context)
  }
  return <Canvas width={200} height={200} draw={draw} />
}

export const RoundRectWithBackground = () => {
  const draw = (context: CanvasRenderingContext2D) => {
    roundRect().backgroundColor('red').draw(context)
  }
  return <Canvas width={200} height={200} draw={draw} />
}

export const RoundRectWithWidth = () => {
  const draw = (context: CanvasRenderingContext2D) => {
    roundRect().width(80).draw(context)
  }
  return <Canvas width={200} height={200} draw={draw} />
}

export const RoundRectWithHeight = () => {
  const draw = (context: CanvasRenderingContext2D) => {
    roundRect().height(80).draw(context)
  }
  return <Canvas width={200} height={200} draw={draw} />
}

export const RoundRectWithX = () => {
  const draw = (context: CanvasRenderingContext2D) => {
    roundRect().x(50).draw(context)
  }
  return <Canvas width={200} height={200} draw={draw} />
}

export const RoundRectWithY = () => {
  const draw = (context: CanvasRenderingContext2D) => {
    roundRect().y(50).draw(context)
  }
  return <Canvas width={200} height={200} draw={draw} />
}

export const RoundRectWithBorderWidth = () => {
  const draw = (context: CanvasRenderingContext2D) => {
    roundRect().borderWidth(16).draw(context)
  }
  return <Canvas width={200} height={200} draw={draw} />
}

export const RoundRectWithBorderStyle = () => {
  const draw = (context: CanvasRenderingContext2D) => {
    roundRect().borderStyle(LineStyle.Solid).draw(context)
    roundRect().x(20).y(20).borderStyle(LineStyle.Dashed).draw(context)
    roundRect().x(40).y(40).borderStyle(LineStyle.Dotted).draw(context)
  }
  return <Canvas width={200} height={200} draw={draw} />
}

export const RoundRectWithBorderColor = () => {
  const draw = (context: CanvasRenderingContext2D) => {
    roundRect().borderColor('red').draw(context)
  }
  return <Canvas width={200} height={200} draw={draw} />
}

export const RoundRectWithOpacity = () => {
  const draw = (context: CanvasRenderingContext2D) => {
    roundRect().backgroundColor('red').opacity(1).draw(context)
    roundRect().width(100).height(100).backgroundColor('blue').opacity(0.5).draw(context)
  }
  return <Canvas width={200} height={200} draw={draw} />
}
