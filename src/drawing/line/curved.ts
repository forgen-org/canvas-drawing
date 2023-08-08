import Line, {LineToDraw} from "./line"

type CurvedLineToDraw = Omit<LineToDraw, 'path'> & {
  from: {
    x: number,
    y: number,
  },
  to: {
    x: number,
    y: number,
  },
  control: {
    x: number,
    y: number,
  },
}

export default class CurvedLine extends Line {
  constructor(args: CurvedLineToDraw) {
    let path = new Path2D()
    path.moveTo(args.from.x, args.from.y)
    path.quadraticCurveTo(args.control.x, args.control.y, args.to.x, args.to.y)
    super({...args, path })
  }
  draw(context: CanvasRenderingContext2D): void {
    super.draw(context) 
  }
}
