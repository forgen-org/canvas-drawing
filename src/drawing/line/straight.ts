import Line, {LineToDraw} from "./line"

type StraightLineToDraw = Omit<LineToDraw, 'path'> & {
  from: {
    x: number,
    y: number,
  },
  to: {
    x: number,
    y: number,
  },
}

export default class StraightLine extends Line {
  constructor(args: StraightLineToDraw) {
    let path = new Path2D()
    path.moveTo(args.from.x, args.from.y)
    path.lineTo(args.to.x, args.to.y)
    super({...args, path })
  }
  draw(context: CanvasRenderingContext2D): void {
    super.draw(context) 
  }
}
