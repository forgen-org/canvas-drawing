export type ShapeToDraw = {
  path: Path2D
  backgroundColor?: string | CanvasGradient
  borderStyle?: 'solid' | 'dashed' | 'dotted'
  borderColor?: string
  borderWidth?: number
  opacity?: number
}

const DEFAULT_OPACITY = 1
const DEFAULT_BORDER_WIDTH = 4
const DEFAULT_BORDER_COLOR = '#000'
const DEFAULT_BORDER_STYLE = 'solid'
const DASHED_EMPTY_FULL_RATIO = 2.4

export default class Shape {
  private path: Path2D
  private backgroundColor: string | CanvasGradient | undefined
  private borderStyle: 'solid' | 'dashed' | 'dotted'
  private borderColor: string
  private borderWidth: number
  private opacity: number

  constructor(args: ShapeToDraw) {
    this.path = args.path
    this.backgroundColor = args.backgroundColor
    this.borderColor = args.borderColor ?? DEFAULT_BORDER_COLOR
    this.borderStyle = args.borderStyle ?? DEFAULT_BORDER_STYLE
    this.borderWidth = args.borderWidth ?? DEFAULT_BORDER_WIDTH
    this.opacity = args.opacity ?? DEFAULT_OPACITY
  }

  draw(context: CanvasRenderingContext2D) {
    context.save()

    // Clip because stroke is centered
    // so shape (border included)
    // can overflow the given width and height
    // if borderWidth > 1
    context.clip(this.path)

    context.globalAlpha = this.opacity

    if (this.backgroundColor) {
      context.fillStyle = this.backgroundColor
      context.fill(this.path)
    }

    context.strokeStyle = this.borderColor

    // Default stroke is centered and cannot be changed to inner
    // so clip + multiplying by 2 do the job
    context.lineWidth = this.borderWidth * 2

    switch (this.borderStyle) {
      case 'dashed':
        context.setLineDash([
          (context.lineWidth * DASHED_EMPTY_FULL_RATIO) / 2,
          context.lineWidth,
        ])
        break
      case 'dotted':
        context.setLineDash([context.lineWidth / 2, context.lineWidth / 2])
        break
      case 'solid':
      default:
        context.setLineDash([])
        break
    }

    context.stroke(this.path)

    context.restore()
  }
}
