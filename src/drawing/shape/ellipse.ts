import Shape, { ShapeToDraw } from './shape'

type EllipseToDraw = Omit<ShapeToDraw, 'path'> & {
  x: number,
  y: number,
  width: number,
  height: number
}

export default class Ellipse extends Shape {
  constructor(args: EllipseToDraw) {
    let path = new Path2D()
    path.ellipse(
      (args.x + args.width / 2),
      (args.y + args.height / 2),
      args.width / 2,
      args.height / 2,
      Math.PI,
      0,
      2 * Math.PI
    )
    super({...args, path })
  }
  draw(context: CanvasRenderingContext2D): void {
    super.draw(context) 
  }
}
