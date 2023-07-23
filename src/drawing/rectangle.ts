type RectangleToDraw = {
  x: number
  y: number
  width: number
  height: number
  backgroundColor?: string | CanvasGradient
  borderStyle?: 'solid' | 'dashed' | 'dotted'
  borderColor?: string
  borderWidth?: number
  opacity?: number
}

const DEFAULT_OPACITY = 1
const DEFAULT_BORDER_WIDTH = 4
const DEFAULT_BORDER_COLOR = '#000'
const DASHED_EMPTY_FULL_RATIO = 2.4

export const drawRectangle = (
  context: CanvasRenderingContext2D,
  args: RectangleToDraw
) => {
  context.save()
  context.clip()

  context.beginPath()
  context.rect(args.x, args.y, args.width, args.height)

  context.globalAlpha = args.opacity ?? DEFAULT_OPACITY

  if (args.backgroundColor) {
    context.fillStyle = args.backgroundColor
    context.fill()
  }

  context.strokeStyle = args.borderColor ?? DEFAULT_BORDER_COLOR

  // Default stroke in centered and cannot be changed to inner
  // so clip + multiplying by 2 do the job
  context.lineWidth = (args.borderWidth ?? DEFAULT_BORDER_WIDTH) * 2

  switch(args.borderStyle){
    case 'dashed':
      context.setLineDash([context.lineWidth * DASHED_EMPTY_FULL_RATIO / 2, context.lineWidth])
      break;
    case 'dotted':
      context.setLineDash([context.lineWidth / 2, context.lineWidth / 2])
      break;
    case 'solid':
    default:
      context.setLineDash([])
      break;
  }

  context.stroke()

  context.restore()
}
