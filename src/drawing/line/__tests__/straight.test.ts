import StraightLine from '../straight'

describe('[StraightLine]', () => {
  let canvas: HTMLCanvasElement
  let context: CanvasRenderingContext2D
  beforeEach(function () {
    canvas = document.createElement('canvas')
    canvas.setAttribute('width', '100')
    canvas.setAttribute('height', '100')
    context = canvas.getContext('2d') as CanvasRenderingContext2D
  })
  it('should draw a straight line', () => {
    const line = new StraightLine({
      from: {
        x: 10,
        y: 10,
      },
      to: {
        x: 90,
        y: 90,
      }
    })
    line.draw(context)
    expect(canvas.toDataURL('image/png')).toMatchSnapshot()
  })
})
