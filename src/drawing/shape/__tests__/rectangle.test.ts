import Rectangle from '../rectangle'

describe('[Rectangle]', () => {
  let canvas: HTMLCanvasElement
  let context: CanvasRenderingContext2D
  beforeEach(function () {
    canvas = document.createElement('canvas')
    canvas.setAttribute('width', '100')
    canvas.setAttribute('height', '100')
    context = canvas.getContext('2d') as CanvasRenderingContext2D
  })
  it('should draw square on top left corner', () => {
    const square = new Rectangle({ x: 0, y: 0, width: 20, height: 20 })
    square.draw(context)
    expect(canvas.toDataURL('image/png')).toMatchSnapshot()
  })
  it('should draw square on bottom right corner', () => {
    const square = new Rectangle({ x: 80, y: 80, width: 20, height: 20 })
    square.draw(context)
    expect(canvas.toDataURL('image/png')).toMatchSnapshot()
  })
  it('should draw rectangle in the middle', () => {
    const rectangle = new Rectangle({ x: 30, y: 40, width: 40, height: 20 })
    rectangle.draw(context)
    expect(canvas.toDataURL('image/png')).toMatchSnapshot()
  })
})
