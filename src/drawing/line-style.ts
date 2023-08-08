export type LineStyle = 'solid' | 'dotted' | 'dashed'

const DASHED_EMPTY_FULL_RATIO = 2.4

export const setLineStyle = (context: CanvasRenderingContext2D, style: LineStyle) => {
    switch (style) {
      case 'dashed':
        context.setLineDash([
          (context.lineWidth * DASHED_EMPTY_FULL_RATIO),
          context.lineWidth,
        ])
        break
      case 'dotted':
        context.setLineDash([context.lineWidth, context.lineWidth])
        break
      case 'solid':
      default:
        context.setLineDash([])
        break
    }
}
