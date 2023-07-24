import { ShapeToDraw, drawShape } from './shape'

export const drawRectangle = (
  context: CanvasRenderingContext2D,
  args: ShapeToDraw
) => {
  const path = (context: CanvasRenderingContext2D, args: ShapeToDraw) => {
    context.beginPath()
    context.rect(args.x, args.y, args.width, args.height)
  }
  drawShape(context, path, args)
}
