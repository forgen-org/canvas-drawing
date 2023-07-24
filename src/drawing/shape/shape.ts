export type ShapeToDraw = {
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

export const drawShape = (
  context: CanvasRenderingContext2D,
  path: (context: CanvasRenderingContext2D, args: ShapeToDraw) => void,
  args: ShapeToDraw
) => {
  context.save()

  path(context, args)

  // Clip because stroke is centered
  // so shape (border included)
  // can overflow the given width and height
  // if borderWidth > 1
  context.clip()

  context.globalAlpha = args.opacity ?? DEFAULT_OPACITY

  if (args.backgroundColor) {
    context.fillStyle = args.backgroundColor
    context.fill()
  }

  context.strokeStyle = args.borderColor ?? DEFAULT_BORDER_COLOR

  // Default stroke is centered and cannot be changed to inner
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
