import Ellipse from "../ellipse"

describe('[Ellipse]', () => {
  let canvas: HTMLCanvasElement
  let context: CanvasRenderingContext2D
  beforeEach(function () {
    canvas = document.createElement('canvas')
    canvas.setAttribute('width', "100")
    canvas.setAttribute('height', "100")
    context = canvas.getContext('2d') as CanvasRenderingContext2D
  })
  it('should draw circle on top left corner', () => {
    const circle = new Ellipse({ x: 0, y: 0, width: 20, height: 20})
    circle.draw(context)
    expect(canvas.toDataURL('image/png')).toMatchSnapshot()
  })
  it('should draw circle on bottom right corner', () => {
    const circle = new Ellipse({ x: 80, y: 80, width: 20, height: 20})
    circle.draw(context)
    expect(canvas.toDataURL('image/png')).toMatchSnapshot()
  })
  it('should draw ellipse in the middle', () => {
    const ellipse = new Ellipse({ x: 30, y: 40, width: 40, height: 20})
    ellipse.draw(context)
    expect(canvas.toDataURL('image/png')).toMatchSnapshot()
  })
})
