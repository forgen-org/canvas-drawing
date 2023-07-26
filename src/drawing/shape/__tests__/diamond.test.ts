import Diamond from "../diamond"

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
    const diamond = new Diamond({ x: 0, y: 0, width: 20, height: 20})
    diamond.draw(context)
    expect(canvas.toDataURL('image/png')).toMatchSnapshot()
  })
  it('should draw diamond on bottom right corner', () => {
    const diamond = new Diamond({ x: 80, y: 80, width: 20, height: 20})
    diamond.draw(context)
    expect(canvas.toDataURL('image/png')).toMatchSnapshot()
  })
  it('should draw diamond in the middle', () => {
    const diamond = new Diamond({ x: 30, y: 40, width: 40, height: 20})
    diamond.draw(context)
    expect(canvas.toDataURL('image/png')).toMatchSnapshot()
  })
})
