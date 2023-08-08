import StraightLine from '../straight'

describe('[Line]', () => {
  let canvas: HTMLCanvasElement
  let context: CanvasRenderingContext2D
  beforeEach(function () {
    canvas = document.createElement('canvas')
    canvas.setAttribute('width', '100')
    canvas.setAttribute('height', '100')
    context = canvas.getContext('2d') as CanvasRenderingContext2D
  })
  it('should draw a solid, dashed and dotted line', () => {
    const solid = new StraightLine({
      style: 'solid',
      from: {
        x: 10,
        y: 20,
      },
      to: {
        x: 90,
        y: 20,
      }
    })
    const dashed = new StraightLine({
      style: 'dashed',
      from: {
        x: 10,
        y: 50,
      },
      to: {
        x: 90,
        y: 50,
      }
    })
    const dotted = new StraightLine({
      style: 'dotted',
      from: {
        x: 10,
        y: 80,
      },
      to: {
        x: 90,
        y: 80,
      }
    })
    solid.draw(context)
    dashed.draw(context)
    dotted.draw(context)
    expect(canvas.toDataURL('image/png')).toMatchSnapshot()
  })
  it('should draw a 10 pts width line', () => {
    const line = new StraightLine({
      width: 10,
      from: {
        x: 10,
        y: 20,
      },
      to: {
        x: 90,
        y: 20,
      }
    })
    line.draw(context)
    expect(canvas.toDataURL('image/png')).toMatchSnapshot()
  })
  it('should draw a red line', () => {
    const line = new StraightLine({
      color: 'red',
      from: {
        x: 10,
        y: 20,
      },
      to: {
        x: 90,
        y: 20,
      }
    })
    line.draw(context)
    expect(canvas.toDataURL('image/png')).toMatchSnapshot()
  })
})
