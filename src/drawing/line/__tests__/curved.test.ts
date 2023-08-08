import CurvedLine from '../curved'

describe('[CurvedLine]', () => {
  let canvas: HTMLCanvasElement
  let context: CanvasRenderingContext2D
  beforeEach(function () {
    canvas = document.createElement('canvas')
    canvas.setAttribute('width', '100')
    canvas.setAttribute('height', '100')
    context = canvas.getContext('2d') as CanvasRenderingContext2D
  })
  it('should draw a curved line', () => {
    const line = new CurvedLine({
      from: {
        x: 10,
        y: 10,
      },
      to: {
        x: 90,
        y: 90,
      },
      control: {
        x: 0,
        y: 100,
      }
    })
    line.draw(context)
    expect(canvas.toDataURL('image/png')).toMatchSnapshot()
  })
})
