import { ShapeToDraw, drawShape } from './shape'

export const drawDiamond = (
  context: CanvasRenderingContext2D,
  args: ShapeToDraw
) => {
  const path = (context: CanvasRenderingContext2D, args: ShapeToDraw) => {
    context.beginPath()
    context.moveTo(args.x + args.width / 2, args.y)
    context.lineTo(args.x + args.width, args.y + args.height / 2)
    context.lineTo(args.x + args.width / 2, args.y + args.height)
    context.lineTo(args.x, args.y + args.height / 2)
    context.closePath()
  }
  drawShape(context, path, args)
}
