import Shape, { ShapeToDraw } from './shape'

type DiamondToDraw = Omit<ShapeToDraw, 'path'> & {
  x: number,
  y: number,
  width: number,
  height: number
}

export default class Diamond extends Shape {
  constructor(args: DiamondToDraw) {
    let path = new Path2D()
    path.moveTo(args.x + args.width / 2, args.y)
    path.lineTo(args.x + args.width, args.y + args.height / 2)
    path.lineTo(args.x + args.width / 2, args.y + args.height)
    path.lineTo(args.x, args.y + args.height / 2)
    path.closePath()
    super({...args, path })
  }
  draw(context: CanvasRenderingContext2D): void {
    super.draw(context) 
  }
}
