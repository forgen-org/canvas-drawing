import { ShapeToDraw, drawShape } from './shape'

export const drawEllipse = (
  context: CanvasRenderingContext2D,
  args: ShapeToDraw
) => {
  const path = (context: CanvasRenderingContext2D, args: ShapeToDraw) => {
    context.beginPath()
    context.ellipse(
      (args.x + args.width / 2),
      (args.y + args.height / 2),
      args.width / 2,
      args.height / 2,
      Math.PI,
      0,
      2 * Math.PI
    )
  }
  drawShape(context, path, args)
}
