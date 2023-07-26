import { drawDiamond } from '../diamond'

describe('[Diamond]', () => {
  let canvas: HTMLCanvasElement
  let context: CanvasRenderingContext2D
  beforeEach(function () {
    canvas = document.createElement('canvas')
    canvas.setAttribute('width', "100")
    canvas.setAttribute('height', "100")
    context = canvas.getContext('2d') as CanvasRenderingContext2D
  })
  it('should draw diamond on top left corner', () => {
    drawDiamond(context, { x: 0, y: 0, width: 20, height: 20})
    expect(canvas.toDataURL('image/png')).toMatchSnapshot()
  })
  it('should draw diamond on bottom right corner', () => {
    drawDiamond(context, { x: 80, y: 80, width: 20, height: 20})
    expect(canvas.toDataURL('image/png')).toMatchSnapshot()
  })
  it('should draw diamond in the middle', () => {
    drawDiamond(context, { x: 30, y: 40, width: 40, height: 20})
    expect(canvas.toDataURL('image/png')).toMatchSnapshot()
  })
})
