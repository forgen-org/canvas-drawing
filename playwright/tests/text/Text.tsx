import React from 'react'
import Canvas from '../Canvas'
import { line, text } from '../../../pkg/canvas_drawing'

export const DefaultText = () => {
  const draw = (context: CanvasRenderingContext2D) => {
    text('Hello world').start(100, 100).draw(context)
  }
  return <Canvas width={200} height={200} draw={draw} />
}

export const TextWithFontSize = () => {
  const draw = (context: CanvasRenderingContext2D) => {
    text('Hello world').start(0, 100).fontSize(32).draw(context)
  }
  return <Canvas width={200} height={200} draw={draw} />
}

export const TextWithColor = () => {
  const draw = (context: CanvasRenderingContext2D) => {
    text('Hello world').start(0, 100).color('blue').draw(context)
  }
  return <Canvas width={200} height={200} draw={draw} />
}

export const TextWithFontFamily = () => {
  const draw = (context: CanvasRenderingContext2D) => {
    text('Hello world').start(0, 100).fontFamily('Times New Roman').draw(context)
  }
  return <Canvas width={200} height={200} draw={draw} />
}

export const TextWithBorderColor = () => {
  const draw = (context: CanvasRenderingContext2D) => {
    text('Hello world').start(0, 100).fontSize(48).borderColor('red').draw(context)
  }
  return <Canvas width={200} height={200} draw={draw} />
}

export const TextWithLineHeight = () => {
  const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eleifend quam in velit cursus, quis pharetra nibh porta."
  const draw = (context: CanvasRenderingContext2D) => {
    text(loremIpsum).start(0, 24).lineHeight(1.2).fontSize(12).maxWidth(200).draw(context)
    text(loremIpsum).start(0, 100).lineHeight(1).fontSize(16).maxWidth(200).draw(context)
  }
  return <Canvas width={200} height={200} draw={draw} />
}

export const TextWithMaxWidth = () => {
  const draw = (context: CanvasRenderingContext2D) => {
    line().from(100, 0).to(100, 200).color('red').draw(context)
    text('Hello world').start(0, 40).lineHeight(1.1).fontSize(32).maxWidth(100).draw(context)
    text('HellooOoOo woRld!').start(0, 120).lineHeight(1.1).fontSize(32).maxWidth(100).draw(context)
  }
  return <Canvas width={200} height={200} draw={draw} />
}
