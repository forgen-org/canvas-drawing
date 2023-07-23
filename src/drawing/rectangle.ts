type RectangleToDraw = {
  x: number
  y: number
  width: number
  height: number
  backgroundColor?: string
  borderColor?: string
  borderWidth?: number
  opacity?: number
}

const DEFAULT_OPACITY = 1
const DEFAULT_BORDER_WIDTH = 4
const DEFAULT_BORDER_COLOR = '#000'

export const drawRectangle = (
  context: CanvasRenderingContext2D,
  args: RectangleToDraw
) => {
  context.save()

  context.beginPath()
  context.rect(args.x, args.y, args.width, args.height)

  context.globalAlpha = args.opacity ?? DEFAULT_OPACITY

  if (args.backgroundColor) {
    context.fillStyle = args.backgroundColor
    context.fill()
  }

  context.strokeStyle = args.borderColor ?? DEFAULT_BORDER_COLOR
  context.lineWidth = args.borderWidth ?? DEFAULT_BORDER_WIDTH
  context.stroke()

  context.restore()
}
