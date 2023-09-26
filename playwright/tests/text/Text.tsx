import React from 'react'
import Canvas from '../Canvas'
import { line, text, FontStyle, FontWeight } from '../../../pkg/canvas_drawing'

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

export const TextWithFontStyle = () => {
  const draw = (context: CanvasRenderingContext2D) => {
    text('Hello world').start(0, 40).fontSize(32).fontStyle(FontStyle.Normal).draw(context)
    text('Hello world').start(0, 80).fontSize(32).fontStyle(FontStyle.Italic).draw(context)
    text('Hello world').start(0, 120).fontSize(32).fontStyle(FontStyle.Oblique).draw(context)
    text('Hello world').start(0, 160).fontSize(32).italic().draw(context)
  }
  return <Canvas width={200} height={200} draw={draw} />
}

export const TextWithFontWeight = () => {
  const draw = (context: CanvasRenderingContext2D) => {
    text('Hello world').start(0, 40).fontSize(32).fontWeight(FontWeight.Normal).draw(context)
    text('Hello world').start(0, 80).fontSize(32).fontWeight(FontWeight.Light).draw(context)
    text('Hello world').start(0, 120).fontSize(32).fontWeight(FontWeight.Bold).draw(context)
    text('Hello world').start(0, 160).fontSize(32).bold().draw(context)
  }
  return <Canvas width={200} height={200} draw={draw} />
}

export const TextWithUnderline = () => {
  const draw = (context: CanvasRenderingContext2D) => {
    text('Hello world').start(0, 20).fontSize(14).underline().draw(context)
    text('Hello world').start(0, 60).fontSize(30).underline().draw(context)
    text('Hello world').start(0, 120).fontSize(44).underline().draw(context)
    text('Hello world').start(0, 180).fontSize(70).color('red').underline().draw(context)
  }
  return <Canvas width={200} height={200} draw={draw} />
}

export const TextWithStrikethrough = () => {
  const draw = (context: CanvasRenderingContext2D) => {
    text('Hello world').start(0, 20).fontSize(14).strikethrough().draw(context)
    text('Hello world').start(0, 60).fontSize(30).strikethrough().draw(context)
    text('Hello world').start(0, 120).fontSize(44).strikethrough().draw(context)
    text('Hello world').start(0, 180).fontSize(70).color('red').strikethrough().draw(context)
  }
  return <Canvas width={200} height={200} draw={draw} />
}
