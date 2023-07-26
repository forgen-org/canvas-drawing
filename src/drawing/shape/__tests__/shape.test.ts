import {drawDiamond} from '../diamond'
import {drawEllipse} from '../ellipse'
import { drawRectangle } from '../rectangle'

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
    drawRectangle(context, { x: 20, y: 30, width: 60, height: 40, backgroundColor: 'red'})
    expect(canvas.toDataURL('image/png')).toMatchSnapshot()
  })
  it('should have a solid, dashed and dotted borders', () => {
    drawRectangle(context, { x: 10, y: 5, width: 80, height: 25, borderStyle: 'solid' })
    drawRectangle(context, { x: 10, y: 37, width: 80, height: 25, borderStyle: 'dashed' })
    drawRectangle(context, { x: 10, y: 70, width: 80, height: 25, borderStyle: 'dotted' })
    expect(canvas.toDataURL('image/png')).toMatchSnapshot()
  })
  it('should have a green border', () => {
    drawEllipse(context, { x: 20, y: 30, width: 60, height: 40, borderColor: 'green'})
    expect(canvas.toDataURL('image/png')).toMatchSnapshot()
  })
  it('should have a 10 pts width border', () => {
    drawEllipse(context, { x: 20, y: 30, width: 60, height: 40, borderWidth: 10})
    expect(canvas.toDataURL('image/png')).toMatchSnapshot()
  })
  it('should have a transparent opacity', () => {
    drawRectangle(context, { x: 10, y: 10, width: 80, height: 60, backgroundColor: 'orange'})
    drawDiamond(context, { x: 20, y: 30, width: 60, height: 60, backgroundColor: 'green', opacity: 0.5})
    expect(canvas.toDataURL('image/png')).toMatchSnapshot()
  })
})
