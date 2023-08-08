import {setLineStyle} from "../line-style"

export type LineToDraw = {
  path: Path2D
  style?: 'solid' | 'dashed' | 'dotted'
  width?: number
  color?: string
}

const DEFAULT_LINE_WIDTH = 4
const DEFAULT_LINE_COLOR = '#000'
const DEFAULT_LINE_STYLE = 'solid'

export default abstract class Line {
  private path: Path2D
  private color: string | CanvasGradient
  private style: 'solid' | 'dashed' | 'dotted'
  private width: number

  constructor(args: LineToDraw) {
    this.path = args.path
    this.color = args.color ?? DEFAULT_LINE_COLOR
    this.style = args.style ?? DEFAULT_LINE_STYLE
    this.width = args.width ?? DEFAULT_LINE_WIDTH
  }

  draw(context: CanvasRenderingContext2D) {
    context.save()

    context.strokeStyle = this.color

    context.lineWidth = this.width

    setLineStyle(context, this.style)

    context.stroke(this.path)

    context.restore()
  }
}
