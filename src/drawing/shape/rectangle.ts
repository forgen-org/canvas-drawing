import Shape, { ShapeToDraw } from './shape'

type RectangleToDraw = Omit<ShapeToDraw, 'path'> & {
  x: number,
  y: number,
  width: number,
  height: number
}

export default class Rectangle extends Shape {
  constructor(args: RectangleToDraw) {
    let path = new Path2D()
    path.rect(args.x, args.y, args.width, args.height)
    super({...args, path })
  }
  draw(context: CanvasRenderingContext2D): void {
    super.draw(context) 
  }
}
