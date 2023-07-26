import Rectangle from '../rectangle'
import Ellipse from '../ellipse'
import Diamond from '../diamond'

describe('[Shape]', () => {
  let canvas: HTMLCanvasElement
  let context: CanvasRenderingContext2D
  beforeEach(function () {
    canvas = document.createElement('canvas')
    canvas.setAttribute('width', "100")
    canvas.setAttribute('height', "100")
    context = canvas.getContext('2d') as CanvasRenderingContext2D
  })
  it('should have a red background', () => {
    const rectangle = new Rectangle({ x: 20, y: 30, width: 60, height: 40, backgroundColor: 'red'})
    rectangle.draw(context)
    expect(canvas.toDataURL('image/png')).toMatchSnapshot()
  })
  it('should have a solid, dashed and dotted borders', () => {
    const solidRectangle = new Rectangle({ x: 10, y: 5, width: 80, height: 25, borderStyle: 'solid' })
    const dashedRectangle = new Rectangle({ x: 10, y: 37, width: 80, height: 25, borderStyle: 'dashed' })
    const dottedRectangle = new Rectangle({ x: 10, y: 70, width: 80, height: 25, borderStyle: 'dotted' })
    solidRectangle.draw(context)
    dashedRectangle.draw(context)
    dottedRectangle.draw(context)
    expect(canvas.toDataURL('image/png')).toMatchSnapshot()
  })
  it('should have a green border', () => {
    const ellipse = new Ellipse({ x: 20, y: 30, width: 60, height: 40, borderColor: 'green'})
    ellipse.draw(context)
    expect(canvas.toDataURL('image/png')).toMatchSnapshot()
  })
  it('should have a 10 pts width border', () => {
    const ellipse = new Ellipse({ x: 20, y: 30, width: 60, height: 40, borderWidth: 10})
    ellipse.draw(context)
    expect(canvas.toDataURL('image/png')).toMatchSnapshot()
  })
  it('should have a transparent opacity', () => {
    const rectangle = new Rectangle({ x: 10, y: 10, width: 80, height: 60, backgroundColor: 'orange'})
    const diamond = new Diamond({ x: 20, y: 30, width: 60, height: 60, backgroundColor: 'green', opacity: 0.5})
    rectangle.draw(context)
    diamond.draw(context)
    expect(canvas.toDataURL('image/png')).toMatchSnapshot()
  })
})
